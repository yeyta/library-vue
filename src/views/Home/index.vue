<template>
    <div class="home-wrap">
        <div class="home-content">
            <el-container>
                <el-header>
                    <home-head />
                </el-header>
                <el-container>
                    <el-aside>
                        <home-aside />
                    </el-aside>
                    <el-main>
						<router-view></router-view>
					</el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import HomeHead from "./components/HomeHead.vue";
import HomeAside from "./components/HomeAside.vue";
</script>

<style lang="scss" scoped>
.home-content {
    .el-header {
        background-color: #8785A2;
        height: 60px;
    }

    .el-aside {
        background-color: #FFE2E2;
        width: 200px;
        height: 869px;
    }
    .el-main {
		padding: 20px;
        background-color: #F6F6F6;
    }
}
</style>
