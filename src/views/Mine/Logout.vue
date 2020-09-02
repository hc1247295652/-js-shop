<template>
    <div id="Logout">
        <van-nav-bar
                title="用户中心"
                left-arrow
                @click-left="$router.back()"
        />
        <section>
            <button @click="logOut">退出登录</button>
        </section>
    </div>
</template>

<script>
    // 1.1 引入请求数据相关方法
    import { getSignoutLogin } from './../../server/index'
    // 1.2 引入vuex相关
    import { mapMutations } from 'vuex'
    // 1.3 引入vant相关
    import { Toast } from 'vant';
    export default {
        name: "Logout",
        data(){
            return {

            }
        },
        components: {

        },
        methods: {
            ...mapMutations(['DELETE_USER']),
            async logOut(){
               let logOutRes = await getSignoutLogin();
                if(logOutRes.status === 200){
                   let logOutData = logOutRes.data;
                   this.DELETE_USER();
                   Toast({
                       duration: 500,
                       message: "已退出登录"
                   });
                   this.$router.back();
                }
            }
        }

    }
</script>

<style scoped lang="less">
    #Logout{
        position: fixed;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    

        background-color: #f5f5f5;

        overflow: hidden;
    }
    /deep/.van-nav-bar__title{
        color: #323233;
    }
    #Logout .van-nav-bar{
        margin-bottom: 20px;
    }
    #Logout>section{
        width: 100%;
        padding: 13px 0;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #Logout>section>button{
        background: none;
        font-size: 16px;
    }
</style>