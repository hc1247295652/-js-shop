<template>
    <div id="Myproduct">
        <!--导航栏部分-->
        <van-nav-bar
                title="商品清单"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <van-cell title="商品" :value="`共${shopTotal}件`" style="margin-top: 3px;border-bottom: 1px solid #F5F5F5" />

        <!--商品内容部分-->
        <van-card
                v-for="(shopItem,index) in shopData" :key="index"
                :num="shopItem.nums"
                :price="shopItem.price.toFixed(2)"
                :title="shopItem.name"
                :thumb="shopItem.small_image"

        />
    </div>
</template>

<script>
    // 1.1 引入vuex相关
    import {mapState} from 'vuex'
    export default {
        name: "MyProduct",
        data() {
            return {
               // 定义一个属性存储商品数据
               shopData: []
            }
        },
        computed: {
            ...mapState(['shopCart']),
            // 计算一共有多少件商品
            shopTotal(){
                let nums = 0;
                this.shopData.forEach((shop)=>{
                    nums += shop.nums;
                });
                return nums;
            }
        },
        mounted() {
            this.initShopCart();
        },
        methods: {
            initShopCart(){
                this.shopData = [];
                Object.values(this.shopCart).forEach((shop,index)=>{
                    if(shop.selectFlag === true){
                        this.shopData.push(shop);
                    }
                });
                console.log(this.shopData);
            },
            onClickLeft(){
                this.$router.back();
            },
            onClickRight(){

            }
        }
    }
</script>

<style scoped lang="less">
    #Myproduct{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        background-color: #f5f5f5;
    }
    .van-card__title{
        font-size: 16px;
    }
    .van-card__price{
        color: red;
    }
</style>