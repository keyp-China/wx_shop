import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        addressInfo: null
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
        }

    }

    computed = {
        isShowAddress(){
            return this.addressInfo==null
        },

        /**
         * 获取地址string
         */
        addressToString(){
            if (this.addressInfo == null) return null
            const { provinceName, cityName, countyName, detailInfo } = this.addressInfo
            return provinceName + cityName + countyName + detailInfo
        }
    }

    onLoad(){
        this.addressInfo = wepy.getStorageSync("address") || null
    }
}