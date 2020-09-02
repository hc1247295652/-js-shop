<template>
    <div id="Likeitem" v-if="likeData.length > 0">
        <li v-for="(likeItem,index) in likeData" :key="index">
            <ul>
                <li><img :src="likeItem.small_image" alt=""></li>
                <li><span>{{likeItem.product_name}}</span></li>
                <li class="footer">
                    <span>{{likeItem.origin_price | moneyFormat}}</span>
                    <span>{{likeItem.price | moneyFormat }}</span>
                    <svg viewBox="0 0 52 52" class="icon iconCart" @click="addCart(likeItem)">
                        <defs>
                            <radialGradient cx="27.0288363%" cy="10.3693483%" fx="27.0288363%" fy="10.3693483%" r="93.8427229%" id="radialGradient-1">
                                <stop stop-color="#4ECA75" offset="0%"></stop><stop stop-color="#39B460" offset="100%"></stop>
                            </radialGradient>
                        </defs>
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-678.000000, -2742.000000)"><g transform="translate(678.000000, 2742.000000)">
                                <rect fill="url(#radialGradient-1)" x="0" y="0" width="51.8699976" height="51.8699976" rx="25.9349988"></rect><path fill="#FFFFFF" d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"></path><path stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909">
                            </path>
                            </g>
                            </g>
                        </g>
                    </svg>
                </li>
            </ul>
        </li>
    </div>
</template>

<script>
    // 1.1 引入vuex相关
    import {mapState,mapMutations} from 'vuex'
    // 1.2 引入vant相关
    import {Toast} from "vant";
    // 1.3 引入数据相关
    import {getAddCart} from './../../../../server/index'
    export default {
        name: "LikeItem",
        data(){
            return {

            }
        },
        props: {
            likeData: Array
        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            // 展开vuex里面的方法
            ...mapMutations(['ADD_CART']),
            async addCart(shop){
                if(this.userInfo.token){
                    let addCartRes = await getAddCart(this.userInfo.token,shop.id, shop.name, shop.price, shop.small_image);
                    if(addCartRes.status === 200){
                        console.log(addCartRes.data);
                        this.ADD_CART({
                            shopId: shop.id,
                            shopImg: shop.small_image,
                            shopName: shop.name,
                            shopPrice: shop.price
                        });
                        Toast({
                            duration: 600,
                            message: '已加入购物车'
                        });
                    }
                }else {
                    this.$router.push("/login");
                }

            }
        }
    }
</script>

<style scoped lang="less">
    #Likeitem{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    #Likeitem>li{
        width: 48%;
        height: 280px;
        padding: 15px;
        margin: 10px 0 20px 5px;
        background-color: white;
        border-radius: 5px;
        position: relative;
    }

    #Likeitem>li>ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #Likeitem>li>ul img{
        width: 100%;
    }
    #Likeitem>li>ul li:nth-child(2){
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        font-size: 16px;
    }
    #Likeitem>li>ul>.footer{
        width: 100%;
        position: absolute;
        margin-bottom: 20px;
        bottom: 0;

    }
    #Likeitem>li>ul>.footer span{
        display: inline-block;
        height: 100%;
        line-height: 30px;


    }
    #Likeitem>li>ul>.footer span:nth-child(1){
        color: #fe6263;
    }
    #Likeitem>li>ul>.footer span:nth-child(2){
        margin-left: 10px;
        color: #c1c1c1;
        text-decoration: line-through;
    }
    #Likeitem>li>ul>.footer>svg{
        position: absolute;
        right: 20px;

        width: 35px;

        margin-top: -5px;


    }
</style>