import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        goods_id: 0, //商品ID
        goods_detail: {}, //商品详情
        addressInfo: wepy.getStorageSync('address') || null //已选地址
    }

    methods = {
        /**
         * 加入购物车
         */
        addToCart(){
            this.$parent.addToCart(this.goods_detail)
        },

        /**
         * 选择收货地址
         */
        async chooseAddress() {
            // 小程序开发文档中 api》开放接口
            const res = await wepy.chooseAddress().catch(err => err)
            if (res.errMsg !== 'chooseAddress:ok') {
                return wepy.baseToast('获取收货地址失败')
            }
            this.addressInfo = res
            wepy.setStorageSync('address', res)
            this.$apply()
        },

        /**
         * 点击轮播图预览图片
         */
        previewImage(current) {
            //通过map获取previewImage方法所需的urls数组
            const urls = this.goods_detail.pics.map(item => {
                return item.pics_big_url
            })
            wepy.previewImage({
                urls,
                current
            })
        }
    }

    computed = {
        //地址的计算属性
        getAddressInfo() {
            if (this.addressInfo == null) return '请选择收货地址'
            const { provinceName, cityName, countyName, detailInfo } = this.addressInfo
            return provinceName + cityName + countyName + detailInfo
        },

        // 计算购物车里要购买的数量
        cartCount(){
            let count = 0
            this.$parent.globalData.cart.forEach(item => {
                if(item.isCheck){
                    count += item.count
                }
            })
            return count
        }
    }

    /**
     * 获取商品详情信息
     */
    async getGoodsDetail() {
        const { data } = await wepy.get('/goods/detail', {
            goods_id: this.goods_id
        })
        if (data.meta.status !== 200) {
            return wepy.baseToast()
        }
        this.goods_detail = data.message
        this.$apply()
    }

    onLoad(options) {
        this.goods_id = options.goods_id
        this.getGoodsDetail()
    }
}