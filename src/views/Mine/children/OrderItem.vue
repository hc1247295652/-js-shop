<template>
    <div id="Orderitem">
        <ul>
            <li class="item" v-for="(orderItem,index) in shopData" :key="index">
                <ul>
                    <li class="title"><h3>{{ orderItem.order_status === "will"?"待支付":"待收货" }}</h3></li>
                    <li class="pic">
                        <img v-for="(orderPic,index) in orderItem.cart_shop" :key="index"
                             :src="orderPic.small_image"
                             alt=""
                        >
                    </li>
                    <li class="footer">
                        <span>共{{orderItem.cart_shop.length }}份商品 实付{{orderItem.dis_price + orderItem.shop_price | moneyFormat}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
        props: {
            shopData: Array,
            active: Number
        },
    }
</script>

<style scoped lang="less">
    #Orderitem{

    }
    #Orderitem>ul>.item{

        background-color: white;
        border-bottom: 2px solid #F5F5F5;
    }
    #Orderitem>ul>.item>ul{
   
    }
    #Orderitem>ul>.item>ul>.title{
        padding: 10px;
        opacity: 0.7;
        font-size: 15px;
        padding-left: 10px;
    }
    #Orderitem>ul>.item>ul>.pic{
        background-color: #F5F5F5;
        padding: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
    }
    #Orderitem>ul>.item>ul>.pic img{
        margin-left: 10px;
        width: 16%;
    }
    #Orderitem>ul>.item>ul>.footer{
        padding: 10px;
    }
</style>