<template>
    <div id="Header">
        <div class="headerContent">
            <!-- 左边位置部分 -->
            <div class="left">
                    <svg viewBox="0 0 32 32" class="icon">
                        <path fill="#81838E" fill-rule="evenodd"
                              d="M14.521 30.445c.817.738 2.142.75 2.958 0 0 0 11.521-9.82 11.521-17.158C29 5.95 23.18 0 16 0S3 5.949 3 13.287c0 7.339 11.521 17.158 11.521 17.158zM16 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path>
                    </svg>
                    <span class="address">黄冈市</span>
                    <svg viewBox="0 0 32 32" class="icon subscript">
                        <path fill="#81838E" fill-rule="evenodd"
                              d="M14.724 19.17c.783.784 2.05.788 2.837 0l5.047-5.047c1.173-1.172.776-2.123-.869-2.123H10.545c-1.652 0-2.04.952-.869 2.123l5.048 5.048z"></path>
                    </svg>
                </div>
            <!-- 右边搜索部分 -->
            <div class="right">
                    <div class="content">
                        <svg viewBox="0 0 32 32" class="icon iconSearch">
                            <path fill="#999" fill-rule="evenodd"
                                  d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z"></path>
                        </svg>
                        <span>输入商品名称</span>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style scoped lang="less">
    #Header{
        position: fixed;
        top: 0;
        width: 100%;
        font-size: 14px;
        z-index: 999;
    }
    #Header>.headerContent{
        width: 100%;
        height: 50px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
    }
    #Header>.headerContent>.left{
        padding: 8px;
        width: 45%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #Header>.headerContent>.left>.icon{
        margin-right: 5px;
    }
    #Header>.headerContent>.left>.subscript{
        margin-left: 40px;

    }
    #Header>.headerContent>.left svg{
        width: 20px;
    }
    #Header>.headerContent>.right{
        width: 55%;
        height: 65%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #f2f2f2;
        border-radius: 20px;
        margin-right: 10px;
       
        color: #a1a1a1;
    }
    #Header>.headerContent>.right>.content{
        display: flex;
        align-items: center;


    }
    #Header>.headerContent>.right>.content svg{
        width: 20px;
        margin-top: 1px;
        margin-right: 3px;
    }
</style>