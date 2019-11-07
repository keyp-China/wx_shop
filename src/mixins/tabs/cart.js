import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        cart: []
    }

    methods = {
        /**
         * 改变商品数量
         */
        countChange(event){
            this.$parent.updateCount(event.target.dataset.id,event.detail);
        },
        
        /**
         * 改变是否购买商品状态
         */
        isCheckChange(event){
            this.$parent.updateIsCheck(event.target.dataset.id,event.detail);
        }
    }

    computed = {
        /**
         * 购物车是否为空
         */
        isEmpty(){
            return this.cart.length == 0
        }
    }

    onLoad(){
        this.cart = this.$parent.globalData.cart
    }
}