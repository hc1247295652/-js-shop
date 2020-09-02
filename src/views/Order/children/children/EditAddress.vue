<template>
    <div id="Editaddress">
        <!--头部导航栏部分-->
        <van-nav-bar
                title="修改地址"
                left-arrow
                @click-left="onClickLeft"
        />
        <!--填写信息部分-->
        <van-address-edit
                :area-list="area"
                show-postal
                show-set-default
                show-search-result
                show-delete
                :address-info="AddressInfo"
                @save="onSave"
                @delete="onDelete"
        />
    </div>
</template>

<script>
    // 1.1 引入地址列表
    import area from "../../../../config/area";
    // 1.2 引入vuex相关
    import {mapState} from 'vuex';
    // 1.3 引入数据相关
    import {getModifyUserAddress,getModifiedUserInformation,getDeleteUserAddress} from './../../../../server/index';
    // 1.4 引入vant相关
    import { Toast } from 'vant';
    // 1.5 引入订阅组件相关
    import Pubsub from 'pubsub-js';
    export default {
        name: "EditAddress",
        data() {
           return {
               area,
               AddressInfo: {},
           }
        },
        mounted() {
            // 请求用户要修改的那条地址数据
            this.userAddress();
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            onClickLeft(){
                this.$router.back();
            },
            async userAddress(){
                if(this.userInfo.token){
                    let res = await getModifiedUserInformation(this.userInfo.token,this.$route.params.id);
                    if(res.data.success_code === 200){
                        let addressData = res.data.data;
                        this.AddressInfo = {
                            id: addressData._id,
                            name: addressData.address_name,
                            tel: addressData.address_phone,
                            province: addressData.province,
                            city: addressData.city,
                            county: addressData.county,
                            addressDetail: addressData.address_area_detail,
                            areaCode: addressData.areaCode,
                            postalCode: addressData.address_post_code,
                            isDefault: addressData.address_tag,
                        }
                    }
                }else {
                    Toast({
                        message: "用户身份已过期",
                        duration: 600
                    });
                    this.$router.push("/login");
                }
            },
            async onSave(content){
                if(this.userInfo.token){
                    let res = await getModifyUserAddress(this.AddressInfo.id,this.userInfo.token, content.name, content.tel, content.province + content.city + content.county,
                        content.addressDetail,content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
                    if(res.data.success_code === 200){
                        Toast({
                            message: "修改地址成功",
                            duration: 600
                        });
                        Pubsub.publish("initAddress");
                        this.$router.back();
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
            async onDelete(content){
                if(this.userInfo.token){
                    let res = await getDeleteUserAddress(content.id);
                    if(res.data.success_code === 200){
                        Toast({
                            message: "删除地址成功",
                            duration: 600
                        });
                        this.$router.back();
                        Pubsub.publish("initAddress");
                    }else {
                        Toast({
                            message: "删除地址失败",
                            duration: 600
                        });
                    }
                }else {
                    Toast({
                        message: "用户身份已过期",
                        duration: 600
                    });
                }
            },
        },
    }
</script>

<style scoped lang="less">
    #Editaddress{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: #F5F5F5;
        z-index: 999;
    }
    #Editaddress>.van-address-edit{
        padding: 0;
        margin-top: 2px;
    }

    /deep/.van-address-edit__fields{
        border-radius: 0px;
    }
    /deep/.van-field__value{
        margin-left: 10px;

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