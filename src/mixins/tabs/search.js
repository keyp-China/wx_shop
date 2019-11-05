import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        value: '',
        searchData: [],
        history: wepy.getStorageSync('history') || []
    }

    config = {
    }

    methods = {
        // 输入框值改变
        onChange(event) {
            this.value = event.detail
            if (this.value.trim().length == 0) return this.searchData = []
            this.qSearch()
        },

        // 点击搜索按钮
        onSearch() {
            if (this.value.trim().length == 0) return
            this.history.unshift(this.value)
            wepy.setStorageSync('history',this.history.slice(0,10))
            wepy.navigateTo({
                url: `/pages/goods_list/index?query=${this.value}`
            })
        },

        //点击搜索记录
        onTapTag(index){
            const delItem = this.history.splice(index,1)
            this.history.unshift(delItem[0]);
            wepy.setStorageSync('history',this.history)
            wepy.navigateTo({
                url: `/pages/goods_list/index?query=${delItem[0]}`
            })
        },

        //删除历史记录
        delHistory(){
            this.history = []
            wepy.removeStorageSync('history');
        }
    }

    // 搜索查询
    async qSearch() {
        const { data } = await wepy.get('/goods/qsearch', { query: this.value })
        if (data.meta.status !== 200) {
            return wepy.baseToast()
        }
        if(this.value.trim().length == 0) return this.searchData = []
        this.searchData = data.message
        this.$apply()
    }

    onHide(){
        this.value = ''
        this.searchData = []
    }

}