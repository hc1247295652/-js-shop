<template>
    <div id="Viewallorder">
        <van-nav-bar
                title="我的订单"
                left-arrow
                @click-left="$router.back()"

        />
        <van-tabs v-model="active" @click="onClick" title-active-color="rgb(117, 163, 66)">
            <van-tab title="全部">
                <OrderItem :shopData="shopData"></OrderItem>
            </van-tab>
            <van-tab title="待支付">
                <OrderItem :shopData="shopData"></OrderItem>
            </van-tab>
            <van-tab title="待收货">
                <OrderItem :shopData="shopData"></OrderItem>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    // 1.1 引入数据相关
    import {getQueryOrder} from './../../../server/index';
    // 1.2 引入vuex相关
    import {mapState} from 'vuex';
    // 1.3 引入组件相关
    import OrderItem from "./OrderItem";
    export default {
        name: "ViewAllOrders",
        data() {
            return {
                // 存储商品数据
                shopData: [],
                active: 0
            }
        },
        computed: {
          ...mapState(['userInfo']),
        },
        components: {
            OrderItem
        },
        mounted() {
            this.showType(0);
            this.active = this.$route.params.index;
        },
        methods: {
            onClick(name, title) {
                console.log(name,title);
                if(this.userInfo.token){
                    this.showType(name);
                }else {

                }

            },
            // // 根据点击事件发起对应的请求
            // async initShopOrder(title){
            //     // if(title === "待支付"){
            //     //     title = "will";
            //     // }else if(title === "待收货"){
            //     //     title = "pay";
            //     // }else {
            //     //     title = "all";
            //     // }
            //     // console.log(title);
            //     // this.showType(title);
            //
            // },

            // 封装一个函数来请求对应的商品数据
            async showType(name){
                this.shopData = [];
                let res = await getQueryOrder(this.userInfo.token);
                let data = res.data.data;
                console.log(data);
                if(res.data.success_code === 200){
                    if(name === 0){
                       data.forEach((shop,index)=>{
                           this.shopData.push(shop);
                       });
                    }else if(name === 1){
                        data.forEach((shop,index)=>{
                            if(shop.order_status === "will"){
                                this.shopData.push(shop);
                            }
                        });
                    }else {
                        data.forEach((shop,index)=>{
                            if(shop.order_status === "pay"){
                                this.shopData.push(shop);
                            }
                        });
                    }
                    console.log(this.shopData);
                }else {

                }
            },
        }
    }
</script>

<style scoped lang="less">
    #Viewallorder{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #F5F5F5;
        overflow: auto;
        z-index: 999;
    }
    /deep/.van-nav-bar__title{
        color: black;
    }
    /deep/.van-tabs__line{
        background-color: rgb(117, 163, 66);
    }
</style>