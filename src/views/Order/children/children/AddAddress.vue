<template>
    <div id="Addaddress">
        <!--头部导航栏部分-->
        <van-nav-bar
                title="添加地址"
                left-arrow
                @click-left="onClickLeft"
        />
        <!--填写信息部分-->
        <van-address-edit
                :area-list="area"
                show-postal
                show-set-default
                show-search-result
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    // 1.1 引入地址列表
    import area from "../../../../config/area";
    // 1.2 引入数据相关
    import {getAddShippingAddress} from './../../../../server/index';
    // 1.3 引入vuex相关
    import {mapState} from 'vuex';
    // 1.4 引入vant相关
    import { Toast } from 'vant';
    // 1.5 引入订阅发布组件
    import Pubsub  from 'pubsub-js';
    export default {
        name: "AddAddress",
        data() {
            return {
                area,
                searchResult: [],
            };
        },
        computed: {
          ...mapState(['userInfo']),
        },
        methods: {
            onClickLeft(){
                this.$router.back();
            },
            async onSave(content) {
                if(this.userInfo.token){
                    console.log(content);
                    let res = await getAddShippingAddress(this.userInfo.token, content.name, content.tel, content.province + content.city + content.county,
                        content.addressDetail,content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
                    if(res.data.success_code === 200){
                        Toast({
                            message: "添加地址成功",
                            duration: 600
                        });
                        this.$router.back();
                        Pubsub.publish("initAddress");
                    }else {
                        Toast({
                            message: "修改地址失败",
                            duration: 600
                        });
                    }
                }else {
                    Toast({
                        message: "用户身份已过期",
                        duration: 600
                    });
                    this.$router.push("/login");
                }

            },
            onDelete() {

            },
            onChangeDetail(val) {

            },
        },
        beforeDestroy() {

        }
    }
</script>

<style scoped lang="less">
    #Addaddress{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #F5F5F5;
        z-index: 999;
    }
    #Addaddress>.van-address-edit{
        padding: 0;
        margin-top: 2px;
    }
    /deep/.van-address-edit__fields{
        border-radius: 0px;
    }
    /deep/.van-cell{
        border-radius: 0px;
        margin-top: 0;
    }
    /deep/.van-field__right-icon{
        display: none;
    }
    /deep/.van-button{
        width: 95%;
        border-radius: 0;
        margin: 0 auto;
    }

</style>