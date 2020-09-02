<template>
    <div id="Mine" v-if="userInfo.token">
        <header>
            <!--头部导航栏-->
            <van-nav-bar title="我的"/>
            <!--头部个人信息部分-->
            <van-cell is-link center @click="toLogOut">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <img src="./b.jpg" alt="">
                    <div class="info">
                        <span>{{ userInfo.real_name }}</span>
                        <span>手机号码: {{ userInfo.phone }}</span>
                    </div>
                </template>
            </van-cell>
        </header>

        <!--我的订单部分-->
        <van-cell value="查看全部订单" is-link @click="viewOrders">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="label" color="#ff4500" size="19px"/>
                <span class="custom-title">我的订单</span>
            </template>
        </van-cell>


        <!--订单宫格部分-->
        <van-grid>
            <van-grid-item icon="cart-circle-o" text="待支付" @click="toMyOrder(1)" />
            <van-grid-item icon="gift-o" text="待收货" @click="toMyOrder(2)" />
            <van-grid-item icon="smile-comment-o" text="待评价" @click="toMyOrder(0)" />
            <van-grid-item icon="cash-back-record" text="售后/退款" @click="toMyOrder(0)" />
        </van-grid>

        <van-cell value="1张" is-link >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="gold-coin" color="#ff4500" size="19px"/>
                <span class="custom-title">我的优惠券</span>
            </template>
        </van-cell>

        <van-cell is-link >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="todo-list" color="#ff4500" size="19px"/>
                <span class="custom-title">我的收货地址</span>
            </template>
        </van-cell>

        <van-cell value="客服时间 07:00-22:00" is-link >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="phone" color="#ff4500" size="19px"/>
                <span class="custom-title">联系客服</span>
            </template>
        </van-cell>

        <van-cell is-link >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="smile-comment" color="#ff4500" size="19px"/>
                <span class="custom-title">意见反馈</span>
            </template>
        </van-cell>

        <van-cell value="下载APP体验更佳" is-link >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-icon name="smile-comment" color="#ff4500" size="19px"/>
                <span class="custom-title">叮咚买菜</span>
            </template>
        </van-cell>
        <transition name="slide-fade" mode="out-in" >
            <router-view></router-view>
        </transition>

    </div>
    <ToLogin v-else></ToLogin>
</template>

<script>
    // 1.1 引入相关组件
    import ToLogin from "../Login/ToLogin";
    // 1.2 引入vuex相关
    import {mapState} from 'vuex';
    export default {
        name: "Mine",
        data(){
          return {
              userData: {}
          }
        },
        components: {
            ToLogin
        },
        computed: {
          ...mapState(['shopCart','userInfo'])
        },
        mounted() {

        },
        methods: {
            toLogOut(){
                this.$router.push("/mine/logout");
            },
            // 查看全部订单
            viewOrders(){
                this.$router.push("/mine/ViewAllOrders");
            },
            toMyOrder(index){
                this.$router.push({
                    name: 'ViewAllOrders',
                    // params: {
                    //     index: index
                    // }
                });
            }

        }
    }
</script>

<style scoped lang="less">
    #Mine{
        width: 100%;

    }
    .van-hairline--bottom{
        border: none;
    }
    #Mine>header>.van-nav-bar{
        background: #3bba63;
        border: none;
    }
    /deep/.van-nav-bar__title{
        color: #fff;
    }
    #Mine>header>.van-cell{
        background: #3bba63;
        height: 90px;
    }
    #Mine>header>.van-cell>.van-cell__title{
        display: flex;
        flex-direction: row;
    }
    #Mine>header>.van-cell>.van-cell__title>img{
        width: 65px;
        height: 65px;
        border-radius: 50%;
        border: 3px solid #FFF;
    }
    #Mine>header>.van-cell>.van-cell__title>.info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        color: #fff;
    }

    #Mine>.van-cell>.van-cell__title{

        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #Mine>.van-cell>.van-cell__title>.van-icon{
        margin-right: 5px;

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
</style>