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
            // const {encryptedData,iv,rawData,signature} = even.detail
            // const {code} = await wepy.login();
            // // 发送请求
            // const res = await wepy.post("/users/wxlogin",{
            //     encryptedData,iv,rawData,signature,code
            // })
            // if(res.data.meta.status !== 200) {
            //     return wepy.baseToast('登录失败')
            // }
            // wepy.baseToast('登录成功')
            // this.token = res.data.message.token
            this.token = 'TOKEN'
            wepy.setStorageSync('token',this.token)
            this.$apply()
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