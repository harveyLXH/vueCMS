<template>
    <!-- 问题2：我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的max值 -->
    <!-- 我们可以使用watch属性来监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，肯定是一个合法的max值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!-- 分析：子组件什么时候把 数据传递给父组件 -->
    <!--  -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted() {
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods :{
        countChanged() {
            //每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
            //console.log(this.$refs.numbox.value);
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:["max"],
    watch : {
        //属性监听
        'max' : function(newVal, oldVal) {
            //使用JS API 设置numbox 的最大值
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>