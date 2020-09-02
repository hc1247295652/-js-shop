<template>
  <div id="Tabbar">
      <van-tabbar v-model="active" active-color="rgb(117, 163, 66)">
          <van-tabbar-item to="/home">
              <template #icon="props">
                  <img :src="props.active ? home.selected : home.default" />
              </template>
              <span>{{ home.title }}</span>
          </van-tabbar-item>
          <van-tabbar-item to="/sort">
              <template #icon="props">
                  <img :src="props.active ? category.selected : category.default" />
              </template>
              <span>{{ category.title }}</span>
          </van-tabbar-item>
          <van-tabbar-item to="/cart" :badge="total > 0 ? total: ''">
              <template #icon="props">
                  <img :src="props.active ? shoppingcart.selected : shoppingcart.default" />
              </template>
              <span>{{ shoppingcart.title }}</span>
          </van-tabbar-item>
          <van-tabbar-item to="/mine">
              <template #icon="props">
                  <img :src="props.active ? mine.selected : mine.default" />
              </template>
              <span>{{ mine.title }}</span>
          </van-tabbar-item>
      </van-tabbar>
      <router-view></router-view>
  </div>
</template>

<script>
// 1.1 引入vuex相关
import {mapState,mapActions,mapMutations} from 'vuex'
// 1.2 引入数据相关
import {getCart} from './../../server/index'
// 1.3 引入本地化缓存相关
import {setStore,getStore} from './../../config/global';
// 1.4 引入vant相关
import { Toast } from 'vant';
export default {
   data () {
     return {
         active: JSON.parse(window.localStorage.getItem("tabIndex")) || 0,
         // 定义几个对象来存储icon图片
         home: {
             default: require("./images/home_default.png"),
             selected: require("./images/home_selected.png"),
             title: "首页"
         },
         category: {
             default: require("./images/category_default.png"),
             selected: require("./images/category_selected.png"),
             title: "分类"
         },
         shoppingcart: {
             default: require("./images/shoppingcart_default.png"),
             selected: require("./images/shoppingcart_selected.png"),
             title: "购物车"
         },
         mine: {
             default: require("./images/mine_default.png"),
             selected: require("./images/mine_selected.png"),
             title: "我的"
         }
     }
   },
   computed: {
      // 展开state
      ...mapState(['shopCart','userInfo']),
      // 定义一个计算属性来存储商品的总个数
      total(){
         if(this.shopCart){
            let nums = 0;
            Object.keys(this.shopCart).forEach((key,index)=>{
                nums += this.shopCart[key].nums;
            });
            return nums;
         }else {
            return 0;
         }
      }
   },
   watch:{
       active(){
           window.localStorage.setItem("tabIndex",JSON.stringify(this.active));
       },
   },
   mounted() {
       this.automaticLogin();
       // 获取用户对应的加购商品数据
       this.getCartData();
   },
   methods: {
        ...mapActions(['automaticLogin']),
        ...mapMutations(['GET_CART']),
        async getCartData(){
            if(this.userInfo.token){
                let cartDataRes = await getCart(this.userInfo.token);
                if(cartDataRes.status === 200){
                    let shopCart = {};
                    let cartData = cartDataRes.data.data;
                    cartData.forEach((shop,index)=>{
                        shopCart[shop.goods_id] = {
                            "id": shop.goods_id,
                            "name": shop.goods_name,
                            "nums": shop.num,
                            "price": shop.goods_price,
                            "selectFlag": shop.checked,
                             "small_image": shop.small_image
                        };
                    });
                    setStore("shopCart",shopCart);
                    this.GET_CART();
                }
            }
        }
    },
}
</script>

<style lang='less' rel='stylesheet/less'>
#Tabbar{
  width: 100%;
  overflow: hidden;
  z-index: 998;
}
</style>
