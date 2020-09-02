<template>
    <div id="MyAddress">
        <!--头部导航栏部分-->
        <van-nav-bar
                title="我的地址"
                left-arrow
                @click-left="onClickLeft"
        />

        <!--地址列表部分--><!--                v-model="userAddress.user_id"-->
        <van-address-list
                v-model="defaultAddress"
                :list="userAddress"
                switchable
                @add="$router.push('/order/MyAddress/AddAddress')"
                @edit="editUserAddress"
                @select="select"
        />
        <transition name="slide-fade" mode="out-in" >
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    // 1.1 引入数据相关
    import {getShippingAddress} from './../../../server/index';
    // 1.2 引入vuex相关
    import {mapState} from 'vuex';
    // 1.3 引入消息订阅组件
    import Pubsub  from 'pubsub-js';
    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: 0,
                // 存储用户收货地址
                userAddress: [

                ],
            }
        },
        computed: {
            ...mapState(['userInfo']),
            // 定义一个计算属性,计算默认地址
            defaultAddress: {
                get(){
                    this.chosenAddressId = 0;
                    this.userAddress.forEach((item,index)=>{
                        if(item.isDefault) {
                            this.chosenAddressId = item.id;
                        }
                    });
                    return this.chosenAddressId;
                },
                set(newValue){
                    this.chosenAddressId = newValue;

                }
            }
        },
        mounted() {
            this.getUserAddress();
            Pubsub.subscribe("initAddress",(message)=>{
                if(message === "initAddress"){
                    this.getUserAddress();
                }
            });
        },
        methods: {
            onClickLeft(){
                this.$router.back();
            },
            async getUserAddress(){
                if(this.userInfo.token){
                    let res = await getShippingAddress(this.userInfo.token);
                    if(res.data.success_code === 200){
                        let data = res.data.data;
                        this.userAddress = [];
                        console.log(data);
                        data.forEach((item,index)=>{
                            this.userAddress.push({
                                id: item._id,
                                name: item.address_name,
                                tel: item.address_phone,
                                address: item.province + item.city + item.county + item.address_area_detail,
                                isDefault: item.address_tag,
                            });
                        });
                        console.log(this.userAddress);
                    }
                }
            },
            editUserAddress(item,index){
                this.$router.push({
                    name: 'EditAddress',
                    params: {
                        id: item.id
                    }
                });
            },
            select(item){
                Pubsub.publish("initUserAddress",item);
                this.$router.back();

            }
        },
        beforeDestroy() {
           Pubsub.unsubscribe("initAddress");
        }
    }
</script>

<style scoped lang="less">
    #MyAddress{
        position: fixed;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 200%;
        background: #F5F5F5;
        overflow: auto;
    }
    .van-address-list{
        padding: 0;
        margin-top: 3px;
    }
    .van-address-item{
        margin-bottom: 0;
    }
    .van-address-item:not(:last-child){
        margin-bottom: 0;
    }
    /deep/.van-address-item{
        border-radius: 0;

        border-bottom: 1px solid #ebedf0;

    }
    .van-address-list__bottom{
        padding: 0;
        background-color: transparent;
    }
    /deep/.van-button{
        border-radius: 0;
        height: 50px;
        font-size: 16px;
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
    /deep/.van-address-list{
        height: 150%;
    }
</style>