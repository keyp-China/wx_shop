import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        cart: []
    }

    methods = {

    }

    computed = {
        isEmpty(){
            return this.cart.length == 0
        }
    }

    onLoad(){
        this.cart = this.$parent.globalData.cart
    }
}