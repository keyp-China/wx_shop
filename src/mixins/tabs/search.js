import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        value: '',
        searchData: []
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
            wepy.navigateTo({
                url: `/pages/goods_list/index?query=${this.value}`
            })
        }
    }

    // 搜索查询
    async qSearch() {
        const { data } = await wepy.get('/goods/qsearch', { query: this.value })
        if (data.meta.status !== 200) {
            return wepy.baseToast()
        }
        this.searchData = data.message
        this.$apply()
    }
}