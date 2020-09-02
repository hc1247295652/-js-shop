<template>
    <div id="Tologin">
        <div class="bottom">
            <img src="./images/lk_logo_sm.png" alt="" width="300">
        </div>
        <h4>选择登录方式</h4>
        <router-link tag="button" to="/login">手机登录</router-link>
    </div>
</template>

<script>
    export default {
        name: "To"
    }
</script>

<style scoped lang="less">
    #Tologin{
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 3.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #Tologin button{
        width: 80%;
        height: 38px;
        background-color: #2eba5a;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        color: #fff;
        margin-top: 30px;
    }
    #Tologin>.bottom{
        position: fixed;
        top: 130px;
        left: 50%;
        transform: translateX(-50%);
    }
    #Tologin>h4{
        font-size: 16px;
    }

</style>