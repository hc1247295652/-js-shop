<template>
    <div id="login">
       <!--头部部分 -->
       <header>
           <img src="./images/lk_logo_sm.png" alt="">
       </header>
       <!--中间的内容部分 -->
       <section class="body">
           <div class="method">
               <span class="toPhone"
                     :class="{currentMethod: methodStyle}"
                     @click="switchMode"
               >
                   手机登录
               </span>
               <span class="toPwd"
                     :class="{currentMethod: !methodStyle}"
                     @click="switchMode"
               >
                   密码登录
               </span>
           </div>
           <!--手机登录-->
           <section class="phoneLogin" v-if="methodStyle">
               <div class="phone">
                   <input type="text" placeholder="手机号" maxlength="11" v-model="phoneNumber">
                   <button v-if="countDownHide"  :class="{highlight: checkHighlight}" @click="sendCode">获取验证码</button>
                   <button v-else-if="!countDownHide" >已发送(<span>{{ countDownTime }}s</span>)</button>
               </div>
               <div class="phoneCode">
                   <input type="text" placeholder="验证码" maxlength="6" v-model="phoneCode">
               </div>
               <div class="tips">
                   <p>
                       温馨提示：未注册小撩买菜的手机号，登录时将自动注册，且代表已同意
                   </p>
                   <a href="#">服务协议与隐私政策</a>
               </div>
           </section>
           <!--密码登录-->
           <section class="pwdLogin" v-else-if="!methodStyle">
                <div class="userName">
                    <input type="text" placeholder="用户名">
                </div>
                <div class="pwd">
                    <div v-if="pwdHide">
                        <input type="password" placeholder="密码">
                        <img src="./images/hide_pwd.png" alt="" @click="switchPwdShow">
                    </div>
                    <div v-else-if="!pwdHide">
                        <input type="text" placeholder="密码">
                        <img src="./images/show_pwd.png" alt="" @click="switchPwdShow">
                    </div>
                </div>
                <div class="pwdCode">
                    <input type="text" placeholder="验证码">
                    <img src="http://demo.itlike.com/web/xlmc/api/captcha">
                </div>
           </section>
       </section>
       <!--尾部部分-->
       <footer>
           <button @click="login">登录</button>
           <button @click="back">返回</button>
       </footer>
    </div>
</template>

<script>
    // 1.1 引入相关组件
    import Header from "../Sort/components/Header";
    // 1.2 引入请求数据的方法
    import {getPhoneCode,getPhoneLogin} from './../../server/index'
    // 1.3 引入vant相关
    import { Dialog,Toast} from 'vant';
    // 1.4 引入vuex相关
    import {mapActions} from 'vuex'
    export default {
        name: "Login",
        data(){
          return {
              // 控制登录方式文字的样式的显示
              methodStyle: true,
              // 控制密码的显示和隐藏
              pwdHide: true,
              // 定义一个属性与手机号码绑定
              phoneNumber: "",
              // 定义一个属性与手机验证码绑定
              phoneCode: "",
              // 定义一个属性与控制发送验证码的倒计时是否出现
              countDownHide: true,
              // 定义一个属性与控制发送验证码的倒计时的时间
              countDownTime: 0,
              // 定义一个属性保存发送过来的验证码
              savePhoneCode: "",
          }
        },
        computed: {
          // 控制发送短信验证码文本是否高亮
          checkHighlight(){
              let rule = /^1[3456789]\d{9}$/;
              if(rule.test(this.phoneNumber)){
                  return true;
              }else{
                  return false;
              }
          }
        },
        components: {
            Header
        },
        methods: {
            ...mapActions(['saveUserInfo']),
            // 切换登录方式
            switchMode(){
                this.methodStyle = !this.methodStyle;
            },
            // 切换密码是否明文显示
            switchPwdShow(){
                this.pwdHide = !this.pwdHide;
            },
            // 点击发送验证码
            async sendCode(){
                if(this.checkHighlight === true){
                    this.countDownHide = !this.countDownHide;
                    this.countDownTime = 60;
                    this.countDown();
                    let phoneCodeRes = await getPhoneCode(this.phoneNumber);
                    if(phoneCodeRes.status === 200){
                        let phoneCodeData = phoneCodeRes.data.code;
                        console.log(phoneCodeRes.data);
                        this.savePhoneCode = phoneCodeData;
                    }
                }
            },
            // 定义一个倒计时的方法
            countDown(){
                this.timer = setInterval(()=>{
                    this.countDownTime--;
                    if(this.countDownTime <= 0){
                        clearInterval(this.timer);
                        this.timer = null;
                        this.countDownHide = !this.countDownHide;
                        this.savePhoneCode = "";
                    }
                },1000);
            },
            // 登录
            async login(){
                if(this.phoneNumber){
                    if(this.checkHighlight){
                        if(this.phoneCode){
                            let rule = /^(?:([0-9])\1{5})$/;
                            if(rule.test(this.phoneCode)){
                                let phoneLoginRes = await getPhoneLogin(this.phoneNumber,this.phoneCode);
                                if(phoneLoginRes.status === 200){
                                    let phoneLoginData = phoneLoginRes.data;
                                    this.saveUserInfo(phoneLoginData.data);
                                    this.$router.back();
                                    Toast({
                                        message: "登录成功",
                                        duration: 500
                                    });
                                    this.$router.back();
                                }
                            }else {
                                Dialog({
                                    message: '手机验证码格式错误' ,
                                    confirmButtonColor: "#75a342"
                                });
                            }
                        }else {
                            Dialog({
                                message: '请输入手机验证码' ,
                                confirmButtonColor: "#75a342"
                            });
                        }
                    }else {
                        Dialog({
                            message: '手机号码格式错误' ,
                            confirmButtonColor: "#75a342"
                        });
                    }
                }else {
                    Dialog({
                        message: '请输入手机号码' ,
                        confirmButtonColor: "#75a342"
                    });
                }
            },
            // 返回上一级路由
            back(){
                this.$router.back();
            },

        }
    }
</script>

<style scoped lang="less">
    #login{
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
    }
    /*头部样式*/
    #login>header{
        width: 100%;
        margin-top: 60px;
        padding: 20px;
    }
    #login>header>img{
        width: 100%;
    }
    /*中间内容样式*/
    #login>.body{
        width: 85%;
    }
    #login>.body input{
        width: 100%;
        border: 1px solid #ddd;
        padding: 12px 8px;
        border-radius: 5px;
    }
    /*手机验证码登录样式*/
    #login>.body>.method{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 25px;
    }
    #login>.body>.method>.toPhone{
        margin-right: 30px;
    }
    #login>.body>.phoneLogin{
        /*border: 1px solid #000;*/
        display: flex;
        flex-direction: column;
    }
    #login>.body>.phoneLogin>.phone{
        position: relative;
        margin-bottom: 15px;
    }
    #login>.body>.phoneLogin>.phone>input:focus{
        border: 1px solid #75a342
    }
    #login>.body>.phoneLogin>.phone>button{
        width: 30%;
        height: 100%;
        position: absolute;
        right: 0;
        background-color: transparent;
        color: #ccc;
    }
    #login>.body>.phoneLogin>.phoneCode{
        position: relative;
        /*border: 1px solid #000;*/
        margin-bottom: 15px;
    }
    #login>.body>.phoneLogin>.phoneCode>input:focus{
        border: 1px solid #75a342
    }
    #login>.body>.phoneLogin>.tips{
        font-size: 12px;
        color: #999;
    }
    #login>.body>.phoneLogin>.tips>p{
        display: inline;
    }
    #login>.body>.phoneLogin>.tips>a{
        color: #75a342;
    }
    /*密码登录样式*/
    #login>.body>.pwdLogin{
        display: flex;
        flex-direction: column;
    }
    #login>.body>.pwdLogin>.userName{
        width: 100%;
        margin-bottom: 15px;
    }
    #login>.body>.pwdLogin>.userName>input:focus{
        border: 1px solid #75a342
    }
    #login>.body>.pwdLogin>.pwd{
        width: 100%;
        margin-bottom: 15px;
    }
    #login>.body>.pwdLogin>.pwd>div{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #login>.body>.pwdLogin>.pwd>div>input:focus{
        border: 1px solid #75a342
    }
    #login>.body>.pwdLogin>.pwd>div>img{
        position: absolute;
        right: 10px;
        height: 55%;
    }
    #login>.body>.pwdLogin>.pwd>input:focus{
        border: 1px solid #75a342
    }
    #login>.body>.pwdLogin>.pwdCode{
        position: relative;
    }
    #login>.body>.pwdLogin>.pwdCode>input:focus{
        border: 1px solid #75a342;
    }
    #login>.body>.pwdLogin>.pwdCode>img{
        position: absolute;
        right: 0;
        width: 40%;
        height: 90%;
    }
    /*尾部样式*/
    #login>footer{
        width: 85%;
        display: flex;
        flex-direction: column;
    }
    #login>footer button{
        margin-top: 15px;
        padding: 12px 0;
        border-radius: 5px;
    }
    #login>footer>button:nth-child(1){
        background: #75a342;
        color: #fff;
    }
    #login>footer>button:nth-child(2){
        background: transparent;
        color: #75a342;
        border: 1px solid #75a342;
    }
    /*特殊的样式*/
    .currentMethod{
        padding-bottom: 2px;
        color: #75a342;
        font-weight: bolder;
        border-bottom: 2px solid #75a342;
    }
    .passwordHide{
        display: none;
    }
    .highlight{
        color: #75a342 !important;

    }
</style>