<template>
    <div id="Cart" v-if="userInfo.token">
        <!--头部-->
        <van-nav-bar
                title="购物车"
                right-text="清空购物车"
                @click-right="emptyCart"
        />
        <!--购物车内容-->
        <section id="Cartitem">
<!--            !== undefined-->
            <ul class="shopContent" v-if="shopCart">
                <!--每一个商品-->
                <li class="shopItem"
                    v-for="(cartItem,index) in shopCart"
                    :key="index"
                >
                    <ul class="shopItemContent">
                        <li class="left">
                            <span class="normal"
                                  :class="{active: cartItem.selectFlag}"
                                  @click="singleChoice(cartItem)"

                            >
                            </span>
                        </li>
                        <li class="right">
                            <div class="shopPic">
                                <img :src="cartItem.small_image" alt="">
                            </div>
                            <div class="shopInfo">
                                <div class="shopTitle">
                                    <span>{{ cartItem.name }}</span>
                                </div>
                                <div class="shopFooter">
                                    <span>{{ cartItem.price | moneyFormat }}</span>
                                    <div class="shopNums">
                                        <span class="reduce" @click="reduceShop(cartItem.id)">-</span>
                                        <span class="num">{{ cartItem.nums }}</span>
                                        <span class="increase" @click="addShop(cartItem.id)">+</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <!--尾部结算部分-->
        <footer>
            <ul>
                <li class="select">
                    <span class="selectAll normal"
                          :class="{active: selectFlag}"
                          @click="selectAll(selectFlag)"
                    ></span>
                    <span class="selectAlltext">全选</span>
                </li>
                <li class="total">
                    <span class="totalText">合计 :</span>
                    <span class="money">{{ totalPrice | moneyFormat}}</span>
                </li>
                <li class="settlement">
                    <button @click="toOrder">
                        去结算
                        <span>({{ settlementNums }})</span>
                    </button>
                </li>
            </ul>
        </footer>
    </div>

    <ToLogin v-else></ToLogin>

</template>

<script>
    // 1.1 引入相关组件
    import ToLogin from "../Login/ToLogin";
    // 1.2 引入state
    import {mapState,mapMutations} from 'vuex'
    import {SELECTALL_CART} from "../../store/mutation-type";
    // 1.3 引入vant相关
    import { Dialog } from 'vant';
    import { Toast } from 'vant';
    // 1.4 引入数据相关
    import {getEditCartNum,getClearCart,getSingleChoiceCart,getAllChoiceCart} from './../../server/index'
    export default {
        name: "Cart",
        data(){
            return {

            }
        },
        computed: {
            ...mapState(['shopCart','userInfo']),
            // 控制全选按钮的被动选中
            selectFlag(){
                let nums = 0;
                Object.values(this.shopCart).forEach((item,index)=>{
                    if(item.selectFlag === true){
                        nums += 1;
                    }
                });
                if(nums > 0){
                    if(Object.values(this.shopCart).length === nums){
                        return true;
                    }else {
                        return false;
                    }
                }
            },
            // 计算购物车商品总价
            totalPrice(){
                let price = 0;
                Object.values(this.shopCart).forEach((item,index)=>{
                    // price += item.price * item.nums;
                    if(item.selectFlag === true){
                        price += item.price * item.nums;
                    }
                });
                return price;
            },
            // 计算去结算的商品数量
            settlementNums(){
                let nums = 0;
                Object.values(this.shopCart).forEach((item,index)=>{
                    if(item.selectFlag === true){
                       nums += item.nums;
                    }
                });
                return nums;
            }
        },
        components: {
            ToLogin
        },
        methods: {
            ...mapMutations(['RADIO_CART','SELECTALL_CART','SELECTALL_CART','ADDNUMS_CART','REDUCENUMS_CART','EMPTY_CART']),
            // 1.1 实现单选按钮的背景图切换
            async singleChoice(shop){
                let radioRes = await getSingleChoiceCart(this.userInfo.token,shop.id);
                if(radioRes.status === 200){
                    console.log(radioRes.data);
                    this.RADIO_CART(shop.id);
                }
            },
            // 1.2 实现全选按钮的背景图切换
            async selectAll(flag){
                let selectAllRes = await getAllChoiceCart(this.userInfo.token,flag);
                if(selectAllRes.status === 200){
                    console.log(selectAllRes.data);
                    this.SELECTALL_CART(flag);
                }
            },
            // 1.3 实现增加商品的加购数量
            async addShop(id){
                let addCartRes = await getEditCartNum(this.userInfo.token,id,"add");
                if(addCartRes.status === 200){
                    console.log(addCartRes.data);
                    this.ADDNUMS_CART(id);
                }
            },
            // 1.4 实现减少商品的加购数量
            async reduceShop(id){
                let next = this.shopCart[id].nums > 1;
                console.log(next);
                if(next){
                    let reduceCartRes = await getEditCartNum(this.userInfo.token,id,"reduce");
                    if(reduceCartRes.status === 200){
                        this.REDUCENUMS_CART(id);
                    }
                }else {
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '确定删除该商品吗',
                    }).then(async ()=>{
                        let reduceCartRes = await getEditCartNum(this.userInfo.token,id,"reduce");
                        if(reduceCartRes.status === 200){
                            this.REDUCENUMS_CART(id);
                        }
                    })
                }
            },
            // 1.5 实现清空购物车
            async emptyCart(){
                let next = Object.keys(this.shopCart).length > 0;
                if(next){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '确定清空购物车吗'
                    }).then(async ()=>{
                        let clearCartRes = await getClearCart(this.userInfo.token);
                        if(clearCartRes.status === 200){
                            this.EMPTY_CART();
                        }
                    }).then(()=>{
                        Dialog.close();
                    });
                }else {
                    Dialog({
                        title: '温馨提示',
                        message: '空空如也,赶快添加商品吧~~~',
                    });
                }
            },
            // 1.6 跳转到订单页面
            toOrder(){
                if(this.totalPrice > 0){
                    this.$router.push("/order");
                }else {
                    Dialog({
                        title: '温馨提示',
                        message: '购物车中没有要结算的商品',
                    });
                }
            }
        },

    }
</script>

<style scoped lang="less">
    #Cart{
        width: 100%;
        height: auto;
        margin-bottom: 120px;
    }
    /*头部内容*/
    /deep/ .van-nav-bar__title{
        font-weight: bolder;
    }
    /deep/ .van-nav-bar__text{
        color: red;
        margin-top: -1px;
        font-size: 13px;
    }
    /*中间的购物车商品内容*/
    #Cartitem{
        width: 100%;
        margin-top: 15px;
    }
    #Cartitem>.shopContent{
        width: 100%;
        /*padding: 25px 0;*/
        background-color: white;
    }
    #Cartitem>.shopContent>.shopItem{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #e0e0e0;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        /*border: 1px solid #000;*/
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.left{
        height: 100%;
        /*border: 1px solid #000;*/
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.left>span{
        display: block;
        width: 20px;
        height: 20px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right{
        /*border: 1px solid red;*/
        width: 100%;
        display: flex;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopPic{
        width: 40%;
        height: 100%;
        padding: 5px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopPic>img{
        width: 100%;
        height: 100%;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopInfo{
        /*border: 1px solid #000;*/
        width: 100%;
        font-size: 15px;
        color: #000;
        margin-top: 10px;
        margin-left: 5px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopInfo>.shopTitle{
        width: 200px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopInfo>.shopFooter{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 40px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopInfo>.shopFooter span{
        margin-right: 10px;
    }
    #Cartitem>.shopContent>.shopItem>.shopItemContent>.right>.shopInfo>.shopFooter .num{
        display: inline-block;
        width: 30px;
        text-align: center;
        background-color: #fafafa;
        font-size: 14px;
    }
    /*尾部内容*/
    #Cart>footer{
        width: 100%;
        /*border: 1px solid #000;*/
        position: fixed;
        bottom: 8%;
        font-size: 16px;
        height: 40px;
        background-color: white;
        margin-bottom: -2px;
    }
    #Cart>footer>ul{
        width: 100%;
        height: 100%;
    }
    #Cart>footer>ul li{
        float: left;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #Cart>footer>ul li:nth-child(1){
        width: 20%;
    }
    #Cart>footer>ul li:nth-child(2),
    #Cart>footer>ul li:nth-child(3){
        width: 40%;
    }
    #Cart>footer>ul>.select>.selectAll{
        margin-left: 10px;
        display: block;
        width: 20px;
        height: 20px;
    }
    #Cart>footer>ul>.select>.selectAlltext{
        margin-left: 2px;
    }
    #Cart>footer>ul>.total>.totalText{
        display: inline-block;
        margin-left: 10px;
        /*border: 1px solid #000;*/
    }
    #Cart>footer>ul>.total>.money{
        display: inline-block;
        margin-top: 1px;
        margin-left: 5px;
    }
    #Cart>footer>ul>.settlement{
        padding: 5px 0;
    }
    #Cart>footer>ul>.settlement>button{
        width: 80%;
        border: none;
        background-color: #e9232c;
        padding: 6px;
        border-radius: 40px;
        margin-left: 20px;
        color: #fef9f9;
    }
    /*特殊样式*/
    .normal{
        background:url("./images/shop-icon.png") no-repeat;
        background-position: 0 0;
        background-size: 260%;
    }
    .active{
        background:url("./images/shop-icon.png") no-repeat;
        background-position: -25px 0;
        background-size: 260%;
    }
</style>