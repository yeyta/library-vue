<template>
    <div class="centerperson-wrap">
        <div class="centerperson-content">
            <el-row :gutter="2">
                <el-col :span="8">
                    <div class="left">
                        <!-- 图书类别 -->
                        <div class="pie">
                            <span class="title">图书库存速览</span>
                            <div id="pieChart" class="pieChart"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right">
                        <div class="top">
                            <div class="item">
                                <div class="info">
                                    <div class="title">学生信息</div>
                                    <div class="number">127</div>
                                    <div class="detail">上月活跃用户新增</div>
                                </div>
                                <div class="chart">
                                    <el-progress
                                        type="dashboard"
                                        :percentage="35"
                                        :stroke-width="14"
                                        color="#FFC7C7"
                                    >
                                        <template #default="{ percentage }">
                                            <span class="percentage-value">{{ percentage }}%</span>
                                            <span class="percentage-label">新增 Inc</span>
                                        </template>
                                    </el-progress>
                                </div>
                            </div>
                            <div class="item">
                                <div class="info">
                                    <div class="title">图书信息</div>
                                    <div class="number">2500</div>
                                    <div class="detail">上月图书库存新增</div>
                                </div>
                                <div class="chart">
                                    <el-progress
                                        type="dashboard"
                                        :percentage="30"
                                        :stroke-width="14"
                                        color="#8785A2"
                                    >
                                        <template #default="{ percentage }">
                                            <span class="percentage-value">{{ percentage }}%</span>
                                            <span class="percentage-label">新增 Inc</span>
                                        </template>
                                    </el-progress>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="item">
                                <div class="info">
                                    <div class="title">借阅信息</div>
                                    <div class="number">2480</div>
                                    <div class="detail">上月借阅订单新增</div>
                                </div>
                                <div class="chart">
                                    <el-progress
                                        type="dashboard"
                                        :percentage="86"
                                        :stroke-width="14"
                                        color="#FFC7C7"
                                    >
                                        <template #default="{ percentage }">
                                            <span class="percentage-value">{{ percentage }}%</span>
                                            <span class="percentage-label">新增 Inc</span>
                                        </template>
                                    </el-progress>
                                </div>
                            </div>
                            <div class="item">
                                <div class="info">
                                    <div class="title">公告信息</div>
                                    <div class="number">32</div>
                                    <div class="detail">上月公告信息新增</div>
                                </div>
                                <div class="chart">
                                    <el-progress
                                        type="dashboard"
                                        :percentage="20"
                                        :stroke-width="14"
                                        color="#8785A2"
                                    >
                                        <template #default="{ percentage }">
                                            <span class="percentage-value">{{ percentage }}%</span>
                                            <span class="percentage-label">新增 Inc</span>
                                        </template>
                                    </el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";

const chartState = reactive({
    pieOption: {
        legend: {
            // Try 'horizontal'
            orient: "vertical",
            left: 30,
            top: "center",
        },
        series: [
            {
                name: "Nightingale Chart",
                type: "pie",
                radius: [40, 130],
                center: ["60%", "50%"],
                roseType: "area",
                itemStyle: {
                    borderRadius: 8,
                },
                // 去掉指示线和label
                label: {
                    normal: {
                        position: "inner",
                        show: false,
                    },
                },
                data: [
                    { value: 40, name: "校园" },
                    { value: 38, name: "小说" },
                    { value: 32, name: "艺术" },
                    { value: 30, name: "动漫" },
                    { value: 28, name: "娱乐" },
                    { value: 26, name: "同人" },
                    { value: 22, name: "Emotion" },
                    { value: 18, name: "Damage" },
                ],
            },
        ],
    },
});
const initeCharts = () => {
    let myChart = echarts.init(document.getElementById("pieChart"));
    myChart.setOption(chartState.pieOption);
};

onMounted(() => {
    initeCharts();
});
</script>

<style lang="scss" scoped>
.centerperson-wrap {
    width: 100%;
    height: 350px;
}
.centerperson-content {
    .left {
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        .pie {
            width: 96%;
            height: 300px;
            background-color: rgba($color: #ffe2e2, $alpha: 0.6);
            border-radius: 16px;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            span {
                margin: 10px 20px;
                font-size: 16px;
                font-weight: 900;
                color: #606266;
                opacity: 0.8;
            }
            // 饼状图
            .pieChart {
                width: 100%;
                height: 260px;
            }
        }
    }
    .right {
        height: 350px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .item {
            width: 48%;
            height: 144px;
            background-color: #ffffff;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            .info {
                .title {
                    color: #606266;
                    font-size: 16px;
                    font-weight: 900;
                    opacity: 0.8;
                    margin-bottom: 10px;
                }

                .number {
                    color: #303133;
                    font-size: 36px;
                    font-weight: 600;
                    opacity: 0.9;
                    margin-bottom: 10px;
                }

                .detail {
                    color: #909399;
                    font-size: 14px;
                    opacity: 0.8;
                }
            }
            .chart {
                width: 180px;
                height: 120px;
                .percentage-value {
                    display: block;
                    margin-top: 10px;
                    font-size: 28px;
                }
                .percentage-label {
                    display: block;
                    margin-top: 10px;
                    font-size: 12px;
                }
                .demo-progress .el-progress--line {
                    margin-bottom: 15px;
                    width: 350px;
                }
                .demo-progress .el-progress--circle {
                    margin-right: 15px;
                }
            }
        }
    }
}
</style>