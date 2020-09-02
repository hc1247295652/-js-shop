<template>
    <div id="Order">
        <!--头部导航栏部分-->
        <van-nav-bar
                title="填写订单"
                left-arrow
                @click-left="onClickLeft"
        />
        <!--添加地址部分-->
        <van-contact-card
                :type="type"
                add-text="添加地址"
                @click="$router.push('/order/MyAddress')"
                :name="name"
                :tel="tel"
        />
        <!--送达时间部分-->
        <van-cell title="送达时间" is-link :value="selectDate?selectDate:'请选择送达时间'" style="margin-top: 8px" @click="showTimer"/>
        <van-overlay :show="show">

        </van-overlay>
        <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" style="z-index: 9999;background-color: white">
            <van-datetime-picker
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    item-height="30"
                    @confirm="confirm"
                    @cancel="cancel"
            />
        </van-popup>

        <!--部分商品展示部分-->
        <van-cell :value="`共${total}件`" is-link center @click="$router.push('order/MyProduct')">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <img v-for="(shopItem,index) in partShopData" :key="index" style="width: 33%;"
                     :src="shopItem.small_image"
                     alt=""
                >
            </template>
        </van-cell>

        <van-cell title="支付方式" value="微信" />

        <van-cell>
            <template #title>
                <span>备注</span>
            </template>
            
            <template #right-icon>
                <input type="text" v-model="remarks" placeholder="选填,备注您的特殊需求" style="text-align: right">
            </template>
        </van-cell>

        <van-cell title="商品金额" :value="`¥ ${ shopMoney.toFixed(2) }`" />
        <van-cell title="配送费" :value="`¥ ${ deliveryFee }`" />

        <!--提交订单部分-->
        <van-submit-bar label="实付" :price="payment" button-text="提交订单" @submit="onSubmit" />

        <van-popup  v-model="codeShow" position="center">
            <qriously :value="initQCode" :size="200" />
        </van-popup>

        <transition name="slide-fade" mode="out-in" >
            <router-view></router-view>
        </transition>


    </div>
</template>

<script>
    // 1.1 引入消息订阅
    import Pubsub from 'pubsub-js';
    // 1.2 引入时间格式化插件
    import moment from 'moment';
    // 1.3 引入vuex相关
    import {mapState} from 'vuex';
    // 1.4 引入vant相关
    import { Toast } from 'vant';
    // 1.5 引入数据相关
    import {getQueryOrder,getPlaceOrder,getGenerateQRCode,getIsPaymentSuccessful,getSuccessfulOrder,getDleteOrder} from './../../server/index'
    // 1.6 引入二维码插件
    import QRCode from 'qrcodejs2';
    export default {
        name: "Order",
        data(){
            return {
               // 控制是添加地址还是修改地址
               type: "add",
               // 地址id
               id: 0,
               // 地址中的姓名
               name: "",
               // 地址中的手机号
               tel: "",
               minDate: new Date(2020, 8, 23),
               maxDate: new Date(2020, 12, 1),
               currentDate: new Date(),
               // 控制时间列表的显示
               show: false,
               // 存储选择的日期
               selectDate: "",
               // 存储展示的部分商品数据
               partShopData: [],
               // 存储所有被勾选的商品数据
               shopData: [],
               // 存储备注
               remarks: "",
               // 存储二维码的地址
               initQCode: "",
               // 控制二维码是否显示
               codeShow: false
            }
        },
        computed: {
            ...mapState(['shopCart','userInfo']),
            // 计算出商品一共有多少件
            total(){
                let num = 0;
                Object.values(this.shopCart).forEach((shop,index)=>{
                    console.log(shop);
                    if(shop.selectFlag === true){
                        num += shop.nums;
                    }
                });
                return num;
            },
            // 计算商品金额
            shopMoney(){
                let price = 0;
                Object.values(this.shopCart).forEach((shop,index)=>{
                    if(shop.selectFlag === true){
                        price += shop.price * shop.nums;
                    }
                });
                return price;
            },
            // 计算配送费
            deliveryFee(){
                let price = 0;
                if(this.shopMoney < 50){
                    price = 0;
                }else {
                    if(this.shopMoney < 70){
                        price = 5;
                    }else if(this.shopMoney > 70){
                        price = 10;
                    }
                }
                return price;
            },
            // 计算实付金额
            payment(){
                return (this.shopMoney + this.deliveryFee)*100;
            }

        },
        mounted() {
            Pubsub.subscribe("initUserAddress",(message,data)=>{
                if(message === "initUserAddress"){
                    this.id = data.id;
                    this.type = "edit";
                    this.name = data.name;
                    this.tel = data.tel;
                }
            });
            this.initPartShop();
            this.initShop();
        },
        methods: {
            onClickLeft(){
                this.$router.back();
            },
            showTimer(){
                this.show = !this.show;
            },
            confirm(value){
                let date = moment(value).format('YYYY-MM-DD HH:MM:SS');
                this.selectDate = date;
                this.show = !this.show;

            },
            cancel(){
                this.show = !this.show;
            },
            initPartShop(){
                this.partShopData = [];
                let num = 0;
                Object.values(this.shopCart).forEach((shop,index)=>{
                    if(shop.selectFlag === true){
                        num++;
                        if(num <= 3){
                            this.partShopData.push(shop);
                        }
                    }
                });
            },
            initShop(){
                this.shopData = [];
                Object.values(this.shopCart).forEach((shop)=>{
                    if(shop.selectFlag === true){
                        this.shopData.push(shop);
                    }
                });
            },
            // 提交订单
            onSubmit(){
                this.checkContent();
            },
            // 检查内容是否都输入了
            checkContent(){
                if(this.userInfo.token){
                    if(this.name === "" && this.tel === ""){
                        Toast({
                            message: "请填写收货地址",
                            duration: 600
                        });
                        return;
                    }else {
                        if(this.selectDate === ""){
                            Toast({
                                message: "请选择送达时间",
                                duration: 600
                            });
                            return;
                        }else {
                            this.placeOrder();
                        }
                    }
                }else {
                    Toast({
                        message: "用户身份已过期",
                        duration: 600
                    });
                    this.$router.push("/login");
                }
            },

            // 内容输入合法之后就要提交订单和后续操作
            async placeOrder(){
                    let placeOrderRes = await getPlaceOrder(this.userInfo.token, this.id, this.selectDate, this.shopData,
                        this.remarks, this.shopMoney, this.deliveryFee);
                    if(placeOrderRes.data.success_code === 200){
                        let deleteOrderRes = await getDleteOrder(this.userInfo.token);
                        if(deleteOrderRes.data.success_code === 200){
                            let codeRes = await getGenerateQRCode(placeOrderRes.data.data.order_id,1);
                            if(codeRes.status === 200){
                                this.initQCode = codeRes.data.code_url;
                                this.codeShow = true;
                                let successRes = await getIsPaymentSuccessful(codeRes.data.out_trade_no);
                                if(successRes.status === 200) {
                                    if (successRes.data.success === true) {
                                        let res = await getSuccessfulOrder(this.userInfo.token,placeOrderRes.data.data.order_id);
                                        if (res.data.success_code === 200){
                                            this.$router.push("/mine");
                                        }else {
                                            Toast({
                                                message: "支付失败",
                                                duration: 600
                                            });
                                        }
                                    } else {
                                        Toast({
                                            message: "支付失败",
                                            duration: 600
                                        });
                                    }
                                }
                            }
                        }else {
                            Toast({
                                message: "生成二维码失败",
                                duration: 600
                            });
                        }
                    }else {
                        Toast({
                            message: "创建订单失败",
                            duration: 600
                        });
                    }
                },
        },
        beforeDestroy() {
            Pubsub.unsubscribe("initUserAddress");
        }
    }
</script>

<style scoped lang="less">
    #Order{
        width: 100%;
    }
    #Order>.van-cell{
        margin-top: 5px;
    }
    .van-picker{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        border-radius: 20px;
    }
    /deep/.van-picker__confirm{
        color: #1989fa;
    }
    .van-overlay{
        opacity: 0.7;
    }
    .van-submit-bar__bar{
        padding: 0;
    }
    .van-submit-bar__price{
        margin-left: 2px;
    }
    .van-button{
        height: 100%;
        border-radius: 0;
        padding: 0;
    }
    // 转场动画
    .slide-fade-enter-active {
        transition: all .3s linear;
    }
    .slide-fade-leave-active {
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
    // 特殊样式

</style>