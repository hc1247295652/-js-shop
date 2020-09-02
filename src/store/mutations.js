import {
    ADD_CART,
    GET_CART,
    RADIO_CART,
    SELECTALL_CART,
    ADDNUMS_CART,
    REDUCENUMS_CART,
    EMPTY_CART,
    SAVE_USER,
    DELETE_USER
} from './mutation-type'
import {setStore,getStore,removeStore} from './../config/global'
export default {
   // 添加商品到购物车
   [ADD_CART](state,{shopId,shopImg,shopName,shopPrice}) {
       let shopCart = state.shopCart;
       if(shopId){
           if(shopCart[shopId]){
               shopCart[shopId]['nums']++;
           }else{
               shopCart[shopId] = {
                  id: shopId,
                  small_image: shopImg,
                  name: shopName,
                  price: shopPrice,
                  selectFlag: true,
                  nums: 1
              }
          }
          state.shopCart = {...shopCart};
          setStore("shopCart",state.shopCart);
       }
   },

   // 获取购物车中的所有商品
   [GET_CART](state){
       let shopCart =  getStore("shopCart");
       if(shopCart){
           state.shopCart = shopCart;
       }
   },

   // 单选按钮的取消和选中
   [RADIO_CART](state,id){
      let shopCart = state.shopCart;
      if(id){
          if(shopCart[id]){
             shopCart[id]['selectFlag'] = !shopCart[id]['selectFlag'];
         }
         state.shopCart = {...shopCart};
         setStore("shopCart",state.shopCart);
      }
   },

   // 全选按钮的取消和选中
   [SELECTALL_CART](state,flag){
       let shopCart = state.shopCart;
       Object.values(shopCart).forEach((item,index)=>{
           item.selectFlag = !flag;
       });
       state.shopCart = {...shopCart};
       setStore("shopCart",state.shopCart);
   },

   // 增加购物车的商品数量
   [ADDNUMS_CART](state,id){
      if(id){
          let shopCart = state.shopCart;
          shopCart[id]['nums']++;
          state.shopCart = {...shopCart};
          setStore("shopCart",state.shopCart);

      }
   },
   // 减少购物车的商品数量
   [REDUCENUMS_CART](state,id){
      if(id){
          let shopCart = state.shopCart;
          shopCart[id]['nums']--;
          if(shopCart[id]['nums'] <= 0){
             delete shopCart[id];
          }
          state.shopCart = {...shopCart};
          setStore("shopCart",state.shopCart);
      }
   },

   // 清空购物车
   [EMPTY_CART](state){
       let shopCart = state.shopCart;
       shopCart = {};
       state.shopCart = shopCart;
       setStore("shopCart",state.shopCart);
   },

   // 保存用户数据
   [SAVE_USER](state,{userInfo}){
      if(userInfo){
          state.userInfo = userInfo;
          setStore("userInfo",state.userInfo);
      }
   },

   // 删除用户数据
   [DELETE_USER](state){
      removeStore("userInfo");
      removeStore("shopCart");
      state.userInfo = {};
      state.shopCart = {};
      setStore("userInfo",state.userInfo);
      setStore("shopCart",state.shopCart);
   }
}