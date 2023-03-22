<template>
    <div class="homehead-wrap">
        <div class="homehead-content">
            <div class="left">
                <div class="logo">图书管理系统</div>
            </div>

            <div class="right">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        个人中心
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>首页</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.homehead-wrap {
}

.homehead-content {
    height: 60px;
    display: flex;
    align-items: center;
	justify-content: space-between;
    padding: 10px;

    .left {
        .logo {
            font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
            color: #ffffff;
            font-size: 22px;
            font-weight: 600;
			user-select:none;
        }
    }

    .right {
		display: flex;
		align-items: center;
		.el-dropdown{
			color: #ffffff;
			user-select:none;
		}
        .example-showcase .el-dropdown-link {
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }
}
</style>