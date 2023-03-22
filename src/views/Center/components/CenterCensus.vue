<template>
    <div class="centercensus-wrap">
        <div class="centercensus-content">
            <el-row :gutter="2">
                <el-col :span="8">
                    <div class="left">
                        <div class="list">
                            <div class="title">借阅信息速览</div>
                            <div class="info-list">
                                <div class="item">
                                    <div class="avatar">唐</div>
                                    <div class="detail">
                                        <div class="name">借阅消息：唐五衣 - 《男德经》</div>
                                        <div class="date">借阅时间：2023/01/29 ~ 2023/03/22</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="avatar">唐</div>
                                    <div class="detail">
                                        <div class="name">借阅消息：唐五衣 - 《男德经》</div>
                                        <div class="date">借阅时间：2023/01/29 ~ 2023/03/22</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="avatar">唐</div>
                                    <div class="detail">
                                        <div class="name">借阅消息：唐五衣 - 《男德经》</div>
                                        <div class="date">借阅时间：2023/01/29 ~ 2023/03/22</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="avatar">唐</div>
                                    <div class="detail">
                                        <div class="name">借阅消息：唐五衣 - 《男德经》</div>
                                        <div class="date">借阅时间：2023/01/29 ~ 2023/03/22</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="avatar">唐</div>
                                    <div class="detail">
                                        <div class="name">借阅消息：唐五衣 - 《男德经》</div>
                                        <div class="date">借阅时间：2023/01/29 ~ 2023/03/22</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right">
                        <div class="chart">
                            <div class="title">借阅订单数量</div>
                            <div id="barChart" class="barChart"></div>
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
    barOption: {
        xAxis: {
            type: "category",
            data: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一",
                "十二",
            ],
        },
        yAxis: {
            type: "value",
        },
        grid: {
            top: 20,
            x: 40,
            x2: 40,
            y2: 20,
        },

        series: [
            {
                itemStyle: {
                    borderRadius: 4,
                    color: "#8785A2",
                },
                data: [120, 200, 150, 80, 70, 110, 120, 200, 150, 80, 70, 110],
                type: "bar",
            },
        ],
    },
});
const initeCharts = () => {
    let myChart = echarts.init(document.getElementById("barChart"));
    myChart.setOption(chartState.barOption);
};

onMounted(() => {
    initeCharts();
});
</script>

<style lang="scss" scoped>
.centercensus-wrap {
    width: 100%;
    height: 360px;
}
.centercensus-content {
    height: 380px;
    .left {
        height: 380px;
        display: flex;
        justify-content: center;
        align-items: center;
        .list {
            width: 96%;
            height: 360px;
            background-color: rgba($color: #ffe2e2, $alpha: 0.6);
            border-radius: 16px;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            padding: 10px 20px;
            .title {
                font-size: 16px;
                font-weight: 900;
                color: #606266;
                opacity: 0.8;
                margin-bottom: 20px;
            }
            .info-list::-webkit-scrollbar {
                display: none;
            }
            .info-list {
                height: 300px;
                overflow: scroll;
                overflow-x: hidden;

                .item {
                    display: flex;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #f6f6f6;
                    .avatar {
                        background-color: #8785a2;
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 16px;

                        color: rgba($color: #ffe2e2, $alpha: 1);
                        font-size: 22px;
                        font-weight: 600;
                        opacity: 0.7;
                    }

                    .detail {
                        .name {
                            color: #303133;
                            font-size: 16px;
                            opacity: 0.8;
                            margin-bottom: 6px;
                        }
                        .date {
                            color: #606266;
                            font-size: 14px;
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }

    .right {
        height: 380px;
        display: flex;
        justify-content: center;
        align-items: center;
        .chart {
            width: 94%;
            height: 360px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            padding: 10px 20px;
            .title {
                font-size: 16px;
                font-weight: 900;
                color: #606266;
                opacity: 0.8;
                margin-bottom: 10px;
            }
            .barChart {
                width: 740px;
                height: 300px;
            }
        }
    }
}
</style>