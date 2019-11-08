import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        addressInfo: null,
        cart: [],
        token: ''
    }

    methods = {
        /**
         * 选择收货地址
         */
        async chooseAddress(){
            const res = await wepy.chooseAddress().catch(err=>err)
            console.log(res);
            if(res.errMsg !== 'chooseAddress:ok'){
                return wepy.baseToast("您已取消选择收货地址")
            }
            this.addressInfo = res
            wepy.setStorageSync("address",this.addressInfo)
            this.$apply()
        },

        /**
         * 获取用户信息
         */
        async getUserInfo(even){
            /* const {encryptedData,iv,rawData,signature} = even.detail
            const {code} = await wepy.login();
            // 发送请求
            const res = await wepy.post("/users/wxlogin",{
                encryptedData,iv,rawData,signature,code
            })
            if(res.data.meta.status !== 200) {
                return wepy.baseToast('登录失败')
            }
            wepy.baseToast('登录成功')
            this.token = res.data.message.token */
            this.token = 'TOKEN'
            wepy.setStorageSync('token',this.token)
            this.$apply()
        },

        /**
         * 提交订单
         */
        async submitOrder(){
            if(this.isShowAddress){
                return wepy.baseToast("请选择收货地址")
            }

            // 准备数据 用于获取预支付订单号
            const payOrderData = {
                order_price: this.getTotalPirce,
                consignee_addr: this.addressToString,
                order_detail: JSON.stringify(this.cart),
                goods: this.cart.map(item=>({
                    goods_id:item.id,
                    goods_number:item.count,
                    goods_price: item.price/100
                }))
            }

            // 1.创建订单
            const { data } = await wepy.post('my/orders/create',payOrderData)
            if(data.meta.status !== 200) {
                return wepy.baseToast('创建订单失败')
            }

            // 2.创建订单成功后，发起生成预支付订单请求
            const { data: prePayData } = await wepy.post('my/orders/req_unifiedorder', {
                order_number: data.message.order_number
            })

            if (prePayData.meta.status !== 200) {
                return wepy.baseToast('网络异常，重新支付')
            }

            const { errMsg } = await wepy.requestPayment(prePayData.message.pay).catch(err => err)
            // 3.判断支付状态
            if (errMsg === 'requestPayment:fail cancel') {
                return wepy.baseToast('您已取消支付')
            }

            wepy.baseToast('支付成功')
            // 支付成功后跳转到订单列表页
            /* wepy.navigateTo({
                url: '/pages/orderList/index'
            }) */
        }

    }

    computed = {
        isShowAddress(){
            return this.addressInfo==null
        },
        isShowLogin(){
            return this.token == ''
        },

        /**
         * 获取地址string
         */
        addressToString(){
            if (this.addressInfo == null) return null
            const { provinceName, cityName, countyName, detailInfo } = this.addressInfo
            return provinceName + cityName + countyName + detailInfo
        },

        /**
         * 计算总价格
         */
        getTotalPirce(){
            var total = 0
            this.cart.forEach(item => {
                total += item.price * item.count
            });
            return total*100
        }
    }

    onLoad(){
        this.addressInfo = wepy.getStorageSync("address") || null
        this.cart = this.$parent.globalData.cart.filter(item=>item.isCheck)
        this.token = wepy.getStorageSync("token") || ''
    }
}