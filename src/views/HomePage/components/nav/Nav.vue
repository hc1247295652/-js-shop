<template>
    <div id="nav">
        <div class="navContent">
            <ul class="bigBox" v-if="navData.length > 0">
                <li v-for="(navItem,index) in navData" :key="navItem.cid">
                    <ul>
                        <li>
                            <img :src="navItem.icon_url" alt="">
                            <span>{{navItem.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props: {
            navData: Array
        }
    }
</script>

<style scoped lang="less">
    #nav{
        width: 100%;
        background-color: white;
        font-size: 12px;
        padding: 10px 0;
    }
    #nav>.navContent{
        width: 100%;
        height: 100%;
    }
    #nav>.navContent>.bigBox{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    #nav>.navContent>.bigBox>li{
        width: 20%;
        height: 80px;
        padding: 3px;
    }
    #nav>.navContent>.bigBox>li>ul{
        width: 100%;
        height: 100%;
    }
    #nav>.navContent>.bigBox>li>ul>li{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    #nav>.navContent>.bigBox>li>ul>li>img{
        width: 70%;
        height: 50%;
    }
    #nav>.navContent>.bigBox>li>ul>li>span{
        display: block;
        margin-top: 10px;
    }
</style>