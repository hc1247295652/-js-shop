<template>
    <div id="Rotation">
        <swiper ref="mySwiper" v-if="carouselData.length > 0"  :options="swiperOption">
            <swiper-slide
                    v-for="(rotationItem,index) in carouselData" :key="index">
                <img :src="rotationItem.icon_url" alt="" style="width: 100%;height: 185px">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    // 1.1 引入vue-awesome-swiper
    import 'swiper/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "rotation",
        props: {
            carouselData: Array,
        },
        components: {
            swiper,
            swiperSlide
        },
        data(){
            return {
                swiperOption: {
                    notNextTick: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    autoplay: 1000,
                    loop: true
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper;
            }
        },

    }
</script>

<style scoped lang="less">
    #Rotation{
        margin-top: 50px;
    }
    .swiper-container{
        --swiper-pagination-color: #75a342;/* 两种都可以 */
    }
</style>