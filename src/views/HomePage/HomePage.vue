<template>
    <div>
        <ul v-if="flashData.length > 0">
            <Header></Header>
            <Rotation :carouselData="carouselData"></Rotation>
            <Nav :navData="navData"></Nav>
            <FlashSale :flashData="flashData"></FlashSale>
            <Like :likeData="likeData"></Like>
        </ul>
        <div v-else-if="flashData.length <= 0">
            <van-loading  type="spinner" color="rgb(117, 163, 66)" text-size="16px"	 class="loading">加载中</van-loading>
        </div>
    </div>

</template>

<script>
    // 1.1 引入头部组件
    import Header from './components/header/Header'
    // 1.2 引入请求数据的方法
    import {getRotationChart} from './../../server/index'
    // 1.3 引入轮播图组件
    import Rotation from "./components/rotation/Rotation";
    // 1.4 引入中间导航组件
    import Nav from "./components/nav/Nav";
    // 1.5 引入抢购组件
    import FlashSale from "./components/flashsale/FlashSale";
    // 1.6 引入猜你喜欢组件
    import Like from "./components/like/Like";
    export default {
        name: "HomePage",
        data(){
            return {
                // 定义一个属性来存储轮播图数据
                carouselData: [],
                // 定义一个属性来存储中间导航的数据
                navData: [],
                // 定义一个属性来存储限时抢购里面的数据
                flashData: [],
                // 定义一个属性来存储猜你喜欢里面的数据
                likeData: []
            }
        },
        components: {
            Header,
            Rotation,
            Nav,
            FlashSale,
            Like
        },
        created() {
            this.getRotationData();
        },
        methods: {
            async getRotationData(){
                let homeRes = await getRotationChart();
                if(homeRes.status === 200){
                    let homeData = homeRes.data;
                    this.carouselData = homeData.data.list[0].icon_list;
                    this.navData = homeData.data.list[2].icon_list;
                    this.flashData = homeData.data.list[3].product_list;
                    this.likeData = homeData.data.list[12].product_list;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #HomePage{
        width: 100%;
        height: 100%;
    }
    .loading{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>