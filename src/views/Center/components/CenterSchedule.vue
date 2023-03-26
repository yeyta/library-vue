<template>
    <div class="centerschedule-wrap">
        <div class="centerschedule-content">
            <div class="calendar">
                <Calendar></Calendar>
            </div>
            <div class="notices">
                <div class="top">近日公告</div>
                <div class="item">
                    <div class="left">
                        <div class="avager">胡</div>
                        <div class="center">
                            <div class="title">图书馆调休通知</div>
                            <div class="person">翻斗花园胡图图</div>
                        </div>
                    </div>
                    <div class="publish">3月26日</div>
                </div>
                <div class="item">
                    <div class="left">
                        <div class="avager">胡</div>
                        <div class="center">
                            <div class="title">图书馆调休通知</div>
                            <div class="person">翻斗花园胡图图</div>
                        </div>
                    </div>
                    <div class="publish">3月26日</div>
                </div>

                <div class="item">
                    <div class="left">
                        <div class="avager">胡</div>
                        <div class="center">
                            <div class="title">图书馆调休通知</div>
                            <div class="person">翻斗花园胡图图</div>
                        </div>
                    </div>
                    <div class="publish">3月26日</div>
                </div>
                <div class="bottom">
                    <el-button color="#FFC7C7" plain>详情请点击10086</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Calendar from "@/components/Calendar.vue";
</script>

<style lang="scss" scoped>
.centerschedule-wrap {
    height: 790px;
    display: flex;
    align-items: center;
}
.centerschedule-content {
    width: 100%;
    height: 768px;
    background-color: #ffffff;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    .calendar {
        width: 100%;
        height: 340px;
        border-radius: 14px;
        margin-top: 10px;
        margin-bottom: 30px;
        box-shadow: 0px 0px 4px 0px rgba(#ffe2e2, 0.9);
    }

    .notices {
        width: 390px;
        padding: 10px;
        .top {
            font-size: 16px;
            font-weight: 900;
            color: #606266;
            opacity: 0.8;
            margin-bottom: 20px;
        }

        .item {
            border-radius: 10px;
			box-shadow: 0px 0px 2px 0px rgba(#8785a2, 0.4);
            margin-bottom: 20px;
            padding: 10px;
            display: flex;
			align-items: center;
            justify-content: space-between;
			cursor: pointer;

            .left {
                display: flex;
                align-items: center;
                .avager {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-color: #ffe2e2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #8785a2;
                    font-size: 16px;
                    font-weight: 400;
                    opacity: 0.8;
					margin-right: 10px;
                }
                .center {
                    .title {
						color: #606266;
						font-size: 16px;
						margin-bottom: 2px;
                    }

                    .person {
						color: #A8ABB2;
						font-size: 14px;
                    }
                }
            }

            .publish {
				color: #606266;
				font-size: 16px;
				opacity: 0.9;
            }
        }

        .bottom {
			width: 100%;
			display: flex;
			justify-content: center;
            .el-button {
				width: 360px;
				height: 45px;
				border-radius: 10px;
            }
        }
    }
}
</style>