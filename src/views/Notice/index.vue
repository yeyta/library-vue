<template>
    <div class="bulletin-wrap">
        <div class="bulletin-content">
            <!-- 添加数据表单 -->
            <el-dialog
                v-model="dialogState.addDialogVisible"
                title="添加数据"
                width="30%"
                :before-close="addHandleClose"
            >
                <el-form
                    label-position="left"
                    label-width="100px"
                    :model="formState.addFormData"
                    style="max-width: 500px"
                >
                    <el-form-item label="标题">
                        <el-input v-model="formState.addFormData.title" />
                    </el-form-item>
                    <el-form-item label="发布日期">
                        <el-date-picker
                            v-model="formState.addFormData.bull_date"
                            type="date"
                            placeholder="发布日期"
                        />
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="area" v-model="formState.addFormData.content" />
                    </el-form-item>
                    <el-form-item label="发布者">
                        <el-input v-model="formState.addFormData.publisher" />
                    </el-form-item>
                </el-form>
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
                <el-form
                    label-position="left"
                    label-width="100px"
                    :model="formState.editFormData"
                    style="max-width: 500px"
                >
                    <el-form-item label="标题">
                        <el-input v-model="formState.editFormData.title" />
                    </el-form-item>
                    <el-form-item label="发布日期">
                        <el-date-picker
                            v-model="formState.editFormData.bull_date"
                            type="date"
                            placeholder="发布日期"
                        />
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="area" v-model="formState.editFormData.content" />
                    </el-form-item>
                    <el-form-item label="发布者">
                        <el-input v-model="formState.editFormData.publisher" />
                    </el-form-item>
                </el-form>
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
                        <el-input v-model="inpState.searchWord" placeholder="请输入标题关键词" />
                        <el-button color="#FFC7C7" plain @click="handleSearch">搜索数据</el-button>
                        <el-button color="#FFC7C7" plain @click="handleSearchReset">重置</el-button>
                    </div>
                </div>
                <div class="bottom">
                    <!-- 表格 -->
                    <el-table :data="tableState.tableData" style="width: 100%" height="725">
                        <el-table-column fixed prop="id" label="id" width="100" />
                        <el-table-column prop="title" label="标题" />
                        <el-table-column prop="bull_date" label="发布日期" />
                        <el-table-column prop="content" label="内容" />
                        <el-table-column prop="publisher" label="发布者" />
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
import { ElMessageBox, ElMessage } from "element-plus";
import {
    bulletinGet,
    bulletinAdd,
    bulletinEdit,
    bulletinDel,
} from "@/utils/data";

const tableState = reactive({
    curItemId: "",
    tableData: [
        {
            id: "",
            title: "",
            bull_date: "",
            content: "",
            publisher: "",
        },
    ],
});

onMounted(() => {
    tableInit();
});

// 获取bulletins
const tableInit = () => {
    bulletinGet().then(
        (response) => {
            const resTemp = response.data.data;
            // 清空
            tableState.tableData.splice(0, tableState.tableData.length);
            resTemp.forEach((item) => {
                const tableTemp = {
                    id: item.id,

                    title: item.attributes.title,
                    bull_date: item.attributes.bull_date,
                    content: item.attributes.content,
                    publisher: item.attributes.publisher,
                };
                tableState.tableData.push(tableTemp);
            });
        },
        (error) => {}
    );
};

// 对话框
const dialogState = reactive({
    addDialogVisible: false,
    editDialogVisible: false,
});

// 表单
const formState = reactive({
    addFormData: {
        title: "",
        bull_date: "",
        content: "",
        publisher: "",
    },
    editFormData: {
        title: "",
        bull_date: "",
        content: "",
        publisher: "",
    },
});

// add 对话框确认取消
const addHandleCancel = () => {
    dialogState.addDialogVisible = false;
    // 清空表单
    Object.keys(formState.addFormData).forEach(
        (key) => (formState.addFormData[key] = "")
    );
};
const addHandleConfirm = () => {
    // 确认添加的数据
    const addDataTemp = {
        title: formState.addFormData.title,
        bull_date: formState.addFormData.bull_date,
        content: formState.addFormData.content,
        publisher: formState.addFormData.publisher,
    };
    bulletinAdd(addDataTemp).then(
        (response) => {
            ElMessage({
                message: "添加成功",
                type: "success",
            });
            tableInit();
        },
        (error) => {
            ElMessage.error("添加失败");
        }
    );

    dialogState.addDialogVisible = false;

    // 清空表单
    Object.keys(formState.addFormData).forEach(
        (key) => (formState.addFormData[key] = "")
    );
};

// edit 对话框确认取消
const editHandleCancel = () => {
    dialogState.editDialogVisible = false;
};
const editHandleConfirm = () => {
    // 确认修改的数据
    const editDataTemp = {
        title: formState.editFormData.title,
        bull_date: formState.editFormData.bull_date,
        content: formState.editFormData.content,
        publisher: formState.editFormData.publisher,
    };
    bulletinEdit(tableState.curItemId, editDataTemp).then(
        (response) => {
            ElMessage({
                message: "编辑成功",
                type: "success",
            });
            tableInit();
        },
        (error) => {
            ElMessage.error("编辑失败");
        }
    );

    dialogState.editDialogVisible = false;
};

// 对话框意外关闭
const addHandleClose = (done) => {
    ElMessageBox.confirm("确认关闭表单吗?")
        .then(() => {
            // 清空表单
            Object.keys(formState.addFormData).forEach(
                (key) => (formState.addFormData[key] = "")
            );
            done();
        })
        .catch(() => {});
};
const editHandleClose = (done) => {
    ElMessageBox.confirm("确认关闭表单吗?")
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

const handleSearch = () => {
    let tempData = [];
    tableState.tableData.forEach((item) => {
        if (item.title.indexOf(inpState.searchWord) != -1) {
            tempData.push(item);
        }
    });
    tableState.tableData = tempData;
};

const handleSearchReset = () => {
    inpState.searchWord = "";
    tableInit();
};

// 编辑
const handleEdit = (row) => {
    formState.editFormData = {
        title: row.title,
        bull_date: row.bull_date,
        content: row.content,
        publisher: row.publisher,
    };
    tableState.curItemId = row.id;
    dialogState.editDialogVisible = true;
};

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm(`确认删除${row.stu_name}吗?`)
        .then(() => {
            bulletinDel(row.id).then(
                (response) => {
                    ElMessage({
                        message: "删除成功",
                        type: "success",
                    });
                    tableInit();
                },
                (error) => {
                    ElMessage.error("删除失败");
                }
            );
            done();
        })
        .catch(() => {});
};
</script>

<style lang="scss" scoped>
.bulletin-content {
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