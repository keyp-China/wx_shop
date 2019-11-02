import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        swiperData: [], //轮播图数据
        catesData: [] //分类数据
    }

    config = {}

    methods = {}

    /**
     *  获取轮播图数据 
     */
    async getSwiperData() {
        const { data } = await wepy.request({
            url: "https://uinav.com/api/public/v1/home/swiperdata"
        })
        if (data.meta.status !== 200) {
            return wepy.baseToast("轮播图获取失败")
        }
        this.swiperData = data.message
        this.$apply()
    }

    /**
     *  获取分类数据
     */
    async getCateData() {
        const { data } = await wepy.request({
            url: "https://uinav.com/api/public/v1/home/catitems"
        })
        if (data.meta.status !== 200) {
            return wepy.baseToast("分类数据获取失败")
        }
        this.catesData = data.message
        this.$apply()
    }

    onLoad() {
        this.getSwiperData()
        this.getCateData()
    }
}