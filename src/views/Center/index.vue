<template>
    <div class="center-wrap">
        <div class="center-content">
            <el-row :gutter="8">
                <el-col :span="18">
                    <div class="left">
                        <CenterGreet />
                        <CenterPerson />
                        <CenterCensus />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="right">
                        <CenterSchedule />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import CenterGreet from "./components/CenterGreet.vue";
import CenterPerson from "./components/CenterPerson.vue";
import CenterCensus from "./components/CenterCensus.vue";
import CenterSchedule from "./components/CenterSchedule.vue";
</script>

<style lang="scss" scoped>
.center-content {
	.left{
		height: 800px;
	}
	.right{
		height: 800px;
	}
}
</style>