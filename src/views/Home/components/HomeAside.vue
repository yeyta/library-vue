<template>
    <div class="homeaside-wrap">
        <div class="homeaside-content">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item index="1">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>

                <el-menu-item index="2">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>学生管理</span>
                </el-menu-item>

                <el-menu-item index="3">
                    <el-icon>
                        <Notebook />
                    </el-icon>
                    <span>图书管理</span>
                </el-menu-item>

                <el-menu-item index="4">
                    <el-icon>
                        <DocumentChecked />
                    </el-icon>
                    <span>借阅管理</span>
                </el-menu-item>

                <el-menu-item index="5">
                    <el-icon>
                        <ChatLineSquare />
                    </el-icon>
                    <span>公告管理</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script setup>
import {
    House,
    User,
    Notebook,
    DocumentChecked,
    ChatLineSquare,
} from "@element-plus/icons-vue";
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
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