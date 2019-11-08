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
        },

        /**
         * 删除商品
         */
        deleteItem(id){
            this.$parent.deleteItem(id);
        },

        /**
         * 点击全选
         */
        checkAll(event){
            this.$parent.checkAll(event.detail)
        }
    }

    computed = {
        /**
         * 购物车是否为空
         */
        isEmpty(){
            return this.cart.length == 0
        },

        /**
         * 计算总价格
         */
        totalPrice(){
            let total = 0;
            this.cart.forEach(item => {
                if(item.isCheck){
                    total += item.price * item.count
                }
            })
            return total*100
        },

        /**
         * 全选的状态
         */
        isCheckAll(){
            return this.cart.every((item=>item.isCheck))
        }

    }

    onLoad(){
        this.cart = this.$parent.globalData.cart
    }

    onShow(){
        this.$parent.setTabBarBadge()
    }
}