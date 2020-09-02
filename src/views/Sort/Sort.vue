<template>
    <div id="Sort">
        <!--头部部分-->
        <Header></Header>
        <!--左边部分-->
        <section class="left">
            <div class="wrapper" ref="wrapper">
                <ul class="content">
                    <li
                        v-for="(leftItem,index) in leftTitleData"
                        :key="index"
                        @click="clickLeft(index)"
                        :class="{currentTitle: index === currentIndex}"
                        ref="liItem"
                    >
                        <span>{{leftItem.name}}</span>
                    </li>
                </ul>
                <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
            </div>
        </section>
        <!--右边商品内容部分-->
        <section class="right">
            <ul v-if="rightData.length > 0">
                <ShopItem :rightData="rightData"></ShopItem>
            </ul>
            <div v-else-if="rightData.length <= 0">
                <van-loading type="spinner" color="#1989fa" class="loading" />
            </div>
        </section>
    </div>
</template>

<script>
    // 1.1 引入头部组件和商品内容组件
    import Header from './components/Header'
    import ShopItem from "./components/ShopItem";
    // 1.2 引入better-scroll
    import BScroll from 'better-scroll'
    // 1.3 引入请求数据的方法
    import {getSortLeft,getSortRight} from './../../server/index'

    export default {
        name: "Sort",
        data(){
            return {
               // 定义 better-scroll
               scroll: null,
               // 定义一个属性存储左边的标题数据
               leftTitleData: [],
               // 定义一个属性存储右边的商品数据
               rightData: [],
               // 定义一个数组来存储左边的被选中的索引
               currentIndex: 0,

            }
        },
        components: {
            Header,
            ShopItem

        },
        created() {
            // 请求数据
            this.getData();
        },
        mounted() {
            // 1.1 初始化better-scroll
            let wrapper = this.$refs.wrapper;
            this.scroll = new BScroll(wrapper,{
                click: true,
                probeType: 3
            });
        },
        methods: {
            async getData(){
                // 请求左边的数据
                let leftRes = await getSortLeft();
                // console.log(leftRes);
                if(leftRes.status === 200){
                    this.leftTitleData = leftRes.data.data.cate;
                    // console.log(this.leftTitleData);
                }
                // 请求右边的数据
                let rightRes = await getSortRight(1);

                if(rightRes.status === 200){
                   this.rightData = rightRes.data.data.cate;
                    console.log(this.rightData);
                }
            },
            async clickLeft(index){
                this.currentIndex = index;
                let currentEl = this.$refs.liItem[index];
                console.log(currentEl);
                this.scroll.scrollToElement(currentEl,500);
                let rightRes = await getSortRight(index + 1);
                if(index > 5){
                    rightRes = await getSortRight(1);
                }
                if(rightRes.status === 200){
                   this.rightData = rightRes.data.data.cate;
                }
            }

        }
    }
</script>

<style scoped lang="less">
    #Sort{
        width: 100%;
        /*border: 1px solid #000;*/
    }
    /*左边部分*/
    #Sort>.left{
        width: 27%;
    }
    #Sort>.left>.wrapper{
        width: 100%;
        height: 540px;
        overflow: hidden;
    }
    #Sort>.left>.wrapper>.content{
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f4f4f4;

    }
    #Sort>.left>.wrapper>.content li{
        border-bottom: 1px solid #E8E9E8;
        padding: 10px 0;
        font-size: 15px;

    }
    #Sort>.left>.wrapper>.content li>span{
        /*border: 1px solid #000;*/
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 0px 0 20px;

        font-weight: bold;
        color: #666666;
    }
    .currentTitle{
        background-color: #ffffff;
        border-left: 3px solid #3cb963;
    }
    /*右边部分*/
    #Sort>.right{
        width: 73%;
        height: 82%;
        position: absolute;
        overflow-y: auto;
        top: 55px;
        left: 27%;
        /*border: 1px solid #000;*/
    }
    #Sort>.right>ul{
        width: 100%;
    }
    .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>