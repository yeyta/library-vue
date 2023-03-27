<template>
    <div class="book-wrap">
        <div class="book-content">
            <!-- 添加数据表单 -->
            <el-dialog
                v-model="dialogState.addDialogVisible"
                title="添加数据"
                width="30%"
                :before-close="addHandleClose"
            >
                <span>This is a message</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addHandleCancel">取消</el-button>
                        <el-button type="primary" @click="addHandleConfirm">确认</el-button>
                    </span>
                </template>
            </el-dialog>

            <!-- 编辑数据表单 -->
            <el-dialog
                v-model="dialogState.editDialogVisible"
                title="编辑数据"
                width="30%"
                :before-close="editHandleClose"
            >
                <span>This is a message</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="editHandleCancel">取消</el-button>
                        <el-button type="primary" @click="editHandleConfirm">确认</el-button>
                    </span>
                </template>
            </el-dialog>

            <div class="info">
                <div class="top">
                    <div class="left">
                        <el-button plain @click="handleAdd">添加数据</el-button>
                    </div>
                    <div class="right">
                        <el-input v-model="inpState.searchWord" placeholder="请输入关键词" />
                        <el-button color="#FFC7C7" plain>搜索数据</el-button>
                    </div>
                </div>
                <div class="bottom">
                    <!-- 表格 -->
                    <el-table :data="tableState.tableData" style="width: 100%" height="725">
                        <el-table-column fixed prop="id" label="id" width="150" />
                        <el-table-column prop="name" label="姓名" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template v-slot="scope">
                                <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button link type="primary" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="chart">
                <div class="top">
                    <div class="chart1"></div>
                    <div class="chart2"></div>
                </div>
                <div class="bottom">
                    <div class="chart3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { ElMessageBox } from "element-plus";

const tableState = reactive({
    tableData: [
        {
            id: "1",
            name: "test1",
        },
        {
            id: "2",
            name: "test2",
        },
    ],
});

onMounted(() => {
    // axios拿取后台api
});

// 对话框
const dialogState = reactive({
    addDialogVisible: false,
    editDialogVisible: false,
});

// add 对话框
const addHandleCancel = () => {
    dialogState.addDialogVisible = false;
};
const addHandleConfirm = () => {
    dialogState.addDialogVisible = false;
};

// edit 对话框
const editHandleCancel = () => {
    dialogState.editDialogVisible = false;
};
const editHandleConfirm = () => {
    dialogState.editDialogVisible = false;
};

// 对话框意外关闭
const addHandleClose = (done) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
            done();
        })
        .catch(() => {});
};
const editHandleClose = (done) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
            done();
        })
        .catch(() => {});
};

// 添加
const handleAdd = () => {
    dialogState.addDialogVisible = true;
};

// 搜索
const inpState = reactive({
    searchWord: "",
});

// 编辑
const handleEdit = (row) => {
    console.log(row);
    dialogState.editDialogVisible = true;
};

// 删除
const handleDelete = (row) => {
    console.log(row);
};
</script>

<style lang="scss" scoped>
.book-wrap {
}

.book-content {
    height: 820px;
    padding: 10px;
    display: flex;
    .info {
        width: 1040px;
        height: 800px;
        margin-right: 20px;
        .top {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .el-button {
                width: 100px;
                height: 40px;
                border-radius: 6px;
            }
            .left {
            }
            .right {
                display: flex;
                .el-input {
                    margin-right: 10px;
                    border-radius: 6px;
                }
            }
            margin-bottom: 10px;
        }

        .bottom {
            width: 100%;
            display: flex;
            justify-content: center;
            .el-table {
                box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            }
        }
    }

    .chart {
        width: 600px;
        height: 800px;
        padding: 10px;
        .top {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            width: 580px;
            height: 380px;
            margin-bottom: 20px;
        }

        .bottom {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
            width: 580px;
            height: 385px;
        }
    }
}
</style>