<template>
    <div id="Like">
       <!--头部内容 -->
       <header>
           <div class="line"></div>
           <div class="like">猜你喜欢</div>
       </header>
       <!--下面的商品内容 -->
       <section>
           <ul v-if="likeData.length > 0">
               <LikeItem :likeData="likeData"></LikeItem>
           </ul>
       </section>
    </div>
</template>

<script>
    // 1.1 引入猜你喜欢的商品item
    import LikeItem from "./LikeItem";
    export default {
        name: "Like",
        data(){
            return {

            }
        },
        components: {
            LikeItem
        },
        props: {
            likeData: Array
        }
    }
</script>

<style scoped lang="less">
    #Like{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 70px;
    }
    #Like>header{
        width: 100%;
        height: 30px;
        text-align: center;
        padding: 10px;
    }
    #Like>header>.line{
        width: 100%;
        top: 2px;
        border-bottom: 1px solid #D8D8D8;
    }
    #Like>header>.like{
        display: inline-block;
        position: relative;
        top: -13px;
        padding: 0 20px;
        background: #F5F5F5;
        font-size: 19px;
    }
    #Like>section>ul{
        /*border: 1px solid #000;*/
    }
</style>