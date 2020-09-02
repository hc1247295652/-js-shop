<template>
    <div id="Header">
        <ul>
            <li>
                <svg viewBox="0 0 32 32" class="icon iconSearch">
                    <path fill="#999" fill-rule="evenodd" d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z">
                    </path>
                </svg>
            </li>
            <li>
                <span>输入商品名称</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="less">
    #Header{
        width: 100%;
        padding: 10px 15px;
        background-color: white;
        border-bottom: 2px solid #E6E6E6;
    }
    #Header>ul{
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #f2f2f2;
        border-radius: 20px;
        padding: 0 10px;
    }
    #Header>ul>li:nth-child(1)>svg{
        width: 20px;
        margin-top: 3px;
    }
    #Header>ul>li:nth-child(2)>span{
        margin-left: 5px;
        color: #bbbbbb;
        font-size: 15px;
    }
</style>