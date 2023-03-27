<template>
    <div class="homeaside-wrap">
        <div class="homeaside-content">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item
                    v-for="item in menuState.menu"
                    :key="item.id"
                    :index="item.id"
                    @click="handleClickMenu(item.name)"
                >
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{item.label}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script setup>
import { reactive, shallowRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
    House,
    User,
    Notebook,
    DocumentChecked,
    ChatLineSquare,
} from "@element-plus/icons-vue";

// 路由
const router = useRouter();

// 菜单项
// 响应组件中有数据是组件component
// 解决方法：使用shallowRef
const menuState = reactive({
    menu: [
        {
            id: "1",
            icon: shallowRef(House),
            label: "首页",
            name: "center",
        },
        {
            id: "2",
            icon: shallowRef(User),
            label: "学生管理",
            name: "student",
        },
        {
            id: "3",
            icon: shallowRef(Notebook),
            label: "图书管理",
            name: "book",
        },
        {
            id: "4",
            icon: shallowRef(DocumentChecked),
            label: "借阅管理",
            name: "borrow",
        },
        {
            id: "5",
            icon: shallowRef(ChatLineSquare),
            label: "公告管理",
            name: "notice",
        },
    ],
});

const handleClickMenu = (urlName) => {
    router.push({ name: `${urlName}` });
};

const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    // console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.homeaside-content {
    .el-menu {
        background-color: transparent;
        .el-menu-item {
            user-select: none;
            color: #606266;
            border-bottom: 1px solid rgba($color: #ffc7c7, $alpha: 0.8);
            &:hover {
                background-color: #ffc7c7;
            }
        }
    }
}
</style>