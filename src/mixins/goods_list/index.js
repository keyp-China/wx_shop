import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10,
        goodsList: [],
        total: 0,
        isLoading: false
    }

    methods = {

    }

    /**
     * 获取商品列表数据
     */
    async getGoodsList(){
        this.isLoading = true;
        const { data } = await wepy.get('/goods/search',{
            query: this.query,
            cid: this.cid,
            pagenum: this.pagenum,
            pagesize: this.pagesize
        })
        // this.goodsList.push.apply(this.goodsList,data.message.goods);
        this.goodsList.push(...data.message.goods);
        this.total = data.message.total
        this.$apply()
        this.isLoading = false
    }

    onLoad(options){
        this.query = options.query || ''
        this.cid = options.cat_id || ''
        this.getGoodsList()
    }

    onReachBottom(){
        if(this.isLoading) return
        this.pagenum++
        this.getGoodsList()
    }
}