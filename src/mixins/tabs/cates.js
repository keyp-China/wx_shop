import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        cateData:[],  //分类数据
        secondCate:[]
    }

    config = {
    }

    methods = {
        // 左侧列表更换
        onChange(event){
            this.secondCate = this.cateData[event.detail].children
        }
    }

    /**
     * 获取分类数据
     */
    async getCategories(){
        const { data } = await wepy.get('/categories')
        if(data.meta.status !== 200){
            return wepy.baseToast()
        }
        this.cateData = data.message
        this.secondCate = data.message[0].children
        this.$apply()
    }

    onLoad(){
        this.getCategories()
    }
}