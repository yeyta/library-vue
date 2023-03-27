<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted } from "vue";

// PC适配
const bodyScal = () => {
    let devicewidth = document.documentElement.clientWidth; //获取当前分辨率下的可是区域宽度
    let widthScale = devicewidth / 1707; // 分母——设计稿的尺寸
    document.body.style.zoom = widthScale * 0.894; //放大缩小相应倍数
    let heightScale = document.documentElement.clientHeight;
    document.body.style.height = heightScale;
};

onMounted(() => {
    bodyScal();
});
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

html,
body {
    overflow-x: hidden;
}

body::-webkit-scrollbar {
    display: none;
}
a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}

// 消除滚动条
::-webkit-scrollbar {
    width: 0;
}

::-moz-scrollbar {
    width: 0;
}

::-o-scrollbar {
    width: 0;
}

::-ms-scrollbar {
    width: 0;
}

scrollbar {
    width: 0;
}
</style>
