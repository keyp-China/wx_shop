import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10,
        goodsList: [],
        total: 0,
        isLoading: false,
        isMore: true
    }

    methods = {
        /**
         * 跳转到商品详情页
         */
        goGoodsDetail(goods_id){
            wepy.navigateTo({
                url:`/pages/goods_detail/index?goods_id=${goods_id}`
            })
        }
    }

    /**
     * 获取商品列表数据
     */
    async getGoodsList(callback){
        this.isLoading = true;
        const { data } = await wepy.get('/goods/search',{
            query: this.query,
            cid: this.cid,
            pagenum: this.pagenum,
            pagesize: this.pagesize
        })
        if(data.meta.status !== 200) {
            return wepy.baseToast
        }
        //下拉数据获取完成
        callback && callback()
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

    /**
     * 上拉获取
     */
    onReachBottom(){
        if(this.pagenum*this.pagesize >= this.total) return this.isMore = false
        if(this.isLoading) return
        this.pagenum++
        this.getGoodsList()
    }

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        this.pagenum = 1
        this.isLoading = false 
        this.isMore = true
        this.goodsList = []
        this.getGoodsList(function(){
            wepy.stopPullDownRefresh()
        })
      }
}