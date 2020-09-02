<template>
    <div id="Flashsale">
    <!--限时抢购头部-->
        <header>
            <ul>
                <li>
                    <span>限时抢购</span>
                    <span>07:00场</span>
                    <span>已结束</span>
                </li>
                <li>
                    <span>更多</span>
                </li>
            </ul>
        </header>
    <!--显示抢购的商品内容-->
        <section>
            <ul v-if="flashData.length > 0">
                <FlashItem :flashData="flashData"></FlashItem>
            </ul>
        </section>
    </div>
</template>

<script>
    // 1.1 引入抢购的具体循环组件
    import FlashItem from "./FlashItem";
    export default {
        name: "FlashSale",
        props: {
            flashData: Array
        },
        components: {
            FlashItem
        }
    }
</script>

<style scoped lang="less">
    #Flashsale{
        background-color: white;
        margin-top: 15px;
        height: 350px;
    }
    /*头部样式*/
    #Flashsale>header{
        width: 100%;
        height: 20%;
    }
    #Flashsale>header>ul{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 15px;
        padding: 2px 10px;
    }
    #Flashsale>header>ul li{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 0;
    }
    #Flashsale>header>ul li:nth-child(1) span:nth-child(1){
        font-size: 20px;
        border-left: 4px solid #3cb963;
        padding: 0 5px;
    }
    #Flashsale>header>ul li:nth-child(1) span:nth-child(2){
        margin: -2px 0 0 5px;
        color: #fe7163;
    }
    #Flashsale>header>ul li:nth-child(1) span:nth-child(3){
        width: 60px;
        margin-left: 8px;
        border: 1px solid #666666;
        border-radius: 6px;
        padding: 2px;
        text-align: center;
    }
    #Flashsale>header>ul li:nth-child(2)>span{
        color: #2eb257;
    }
    /*商品内容样式*/
    #Flashsale>section{
        width: 100%;
        overflow-x: auto;
        height: 80%;
        position: relative;
    }
    #Flashsale>section::-webkit-scrollbar{
        display: none;
    }
    #Flashsale>section>ul{
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
</style>