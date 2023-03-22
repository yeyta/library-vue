<template>
    <div class="centergreet-wrap">
        <div class="centergreet-content">
            <div class="left">
                <div class="title">{{ timeData.period }}，叶小姐</div>
                <div class="second">欢迎来到图书管理系统</div>
            </div>
            <div class="right">
                <el-button plain>
                    <el-icon>
                        <PieChart />
                    </el-icon>
                </el-button>
                <el-button plain>
                    <el-icon>
                        <Bell />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { PieChart, Bell } from "@element-plus/icons-vue";
import moment from "moment";

// 判断上午下午还是晚上
const timeData = reactive({ period: "" });
function checkPeriod() {
    let nowHour = moment().hours();
    if (nowHour < 6) {
        return "凌晨好";
    } else if (nowHour < 9) {
        return "早上好";
    } else if (nowHour < 12) {
        return "上午好";
    } else if (nowHour < 14) {
        return "中午好";
    } else if (nowHour < 17) {
        return "下午好";
    } else {
        return "晚上好";
    }
    return "error";
}
timeData.period = checkPeriod();
</script>

<style lang="scss" scoped>
.centergreet-wrap {
    width: 100%;
    height: 60px;
}

.centergreet-content {
    width: 100%;
    height: 60px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        .title {
            color: #303133;
            font-size: 22px;
            font-weight: 600;
            opacity: 0.8;
            margin-bottom: 4px;
        }
        .second {
            font: 400 "PingFang SC", "Microsoft YaHei", "Microsoft JhengHei",
                "黑体", arial, "STHeiti", "宋体";
            font-size: 14px;
            letter-spacing: 1.4px;
            color: #606266;
            opacity: 0.8;
        }
    }
    .right {
        .el-button {
            width: 45px;
            height: 45px;
            border-radius: 15px;
            color: #ffc7c7;
            font-size: 20px;
            border: none;
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
            &:hover {
                background-color: #ffe2e2;
                color: #ffffff;
            }
        }
    }
}
</style>