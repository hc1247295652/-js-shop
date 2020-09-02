<template>
    <div id="Flashitem" v-if="flashData.length > 0">
        <li class="shopItem" v-for="(flashItem,index) in flashData" :key="index">
            <ul>
                <li class="shopPic"><img :src="flashItem.small_image" alt=""></li>
                <li class="shopTitle"><span>{{flashItem.name}}</span></li>
                <div class="price">
                    <li class="priceRate"><span>{{flashItem.origin_price | moneyFormat}}</span></li>
                    <li class="footer">
                        <span class="currentPrice">{{flashItem.price | moneyFormat}}</span>
                        <svg viewBox="0 0 52 52" class="icon" @click="addCart(flashItem)">
                            <defs>
                                <radialGradient cx="27.0288363%" cy="10.3693483%" fx="27.0288363%" fy="10.3693483%" r="93.8427229%" id="radialGradient-1"><stop stop-color="#4ECA75" offset="0%"></stop><stop stop-color="#39B460" offset="100%"></stop></radialGradient>
                            </defs>
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-678.000000, -2742.000000)">
                                    <g transform="translate(678.000000, 2742.000000)">
                                        <rect fill="url(#radialGradient-1)" x="0" y="0" width="51.8699976" height="51.8699976" rx="25.9349988"></rect>
                                        <path fill="#FFFFFF" d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"></path>
                                        <path stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </li>
                </div>
            </ul>
        </li>
    </div>
</template>

<script>
    // 1.1 引入vuex相关
    import {mapState,mapMutations} from 'vuex'
    // 1.2 引入vant相关
    import { Toast } from 'vant';
    // 1.3 引入数据相关
    import {getAddCart} from './../../../../server/index'
    export default {
        name: "FlashItem",
        data(){
            return {

            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
        props: {
            flashData: Array
        },
        methods: {
            ...mapMutations(['ADD_CART']),
            // 添加到购物车
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
                }else{
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #Flashitem{
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }
    #Flashitem>.shopItem{
        margin-left: 20px;
    }
    #Flashitem>.shopItem>ul{
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    #Flashitem>.shopItem>ul>.shopPic{
        height: 150px;
        padding: 15px 0;
    }
    #Flashitem>.shopItem>ul>.shopPic img{
        width: 100%;
        height: 100%;
    }
    #Flashitem>.shopItem>ul>.shopTitle{
        font-size: 15px;
        width: 100px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    #Flashitem>.shopItem>ul>.price{
        width: 100%;
        position: absolute;
        bottom: 30px;
    }
    #Flashitem>.shopItem>ul>.price>.priceRate{
        color: #999999;
        text-decoration: line-through;
    }
    #Flashitem>.shopItem>ul>.price>.footer{
        width: 100%;
    }
    #Flashitem>.shopItem>ul>.price>.footer>span{
        color: #fe8687;
    }
    #Flashitem>.shopItem>ul>.price>.footer>svg{
        width: 30px;
        float: right;
        margin-top: -13px;
    }
</style>