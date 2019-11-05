import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        goods_id: 0,
        goods_detail: {}
    }

    methods = {
    }

    /**
     * 获取商品详情信息
     */
    async getGoodsDetail() {
        const { data } = await wepy.get('/goods/detail', {
            goods_id: this.goods_id
        })
        if(data.meta.status !== 200){
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