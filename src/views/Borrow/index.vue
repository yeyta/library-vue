<template>
    <div class="borrow-wrap">
        <div class="borrow-content">
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
                    <el-form-item label="借书日期">
                        <el-date-picker
                            v-model="formState.addFormData.borrow_date"
                            type="date"
                            placeholder="选择借书日期"
                        />
                    </el-form-item>
                    <el-form-item label="还书日期">
                        <el-date-picker
                            v-model="formState.addFormData.back_date"
                            type="date"
                            placeholder="选择换书日期"
                        />
                    </el-form-item>
                    <el-form-item label="是否归还">
                        <el-radio-group v-model="formState.addFormData.isback" class="ml-4">
                            <el-radio label="true" size="large">已归还</el-radio>
                            <el-radio label="false" size="large">未归还</el-radio>
                        </el-radio-group>
                        <el-input v-model="formState.addFormData.isback" />
                    </el-form-item>
                    <el-form-item label="学生">
                        <el-select
                            v-model="formState.addFormData.student"
                            class="m-2"
                            placeholder="选择学生"
                        >
                            <el-option
                                v-for="item in studentState.studentData"
                                :key="item.id"
                                :label="item.stu_name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图书">
                        <el-select
                            v-model="formState.addFormData.book"
                            class="m-2"
                            placeholder="选择图书"
                        >
                            <el-option
                                v-for="item in bookState.bookData"
                                :key="item.id"
                                :label="item.book_name"
                                :value="item.id"
                            />
                        </el-select>
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
                    <el-form-item label="借书日期">
                        <el-date-picker
                            v-model="formState.editFormData.borrow_date"
                            type="date"
                            placeholder="选择借书日期"
                        />
                    </el-form-item>
                    <el-form-item label="还书日期">
                        <el-date-picker
                            v-model="formState.editFormData.back_date"
                            type="date"
                            placeholder="选择换书日期"
                        />
                    </el-form-item>
                    <el-form-item label="是否归还">
                        <el-radio-group v-model="formState.editFormData.isback" class="ml-4">
                            <el-radio label="true" size="large">已归还</el-radio>
                            <el-radio label="false" size="large">未归还</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="学生">
                        <el-input v-model="formState.editFormData.student" disabled />
                    </el-form-item>
                    <el-form-item label="图书">
                        <el-input v-model="formState.editFormData.book" disabled />
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
                    <div class="right"></div>
                </div>
                <div class="bottom">
                    <!-- 表格 -->
                    <el-table :data="tableState.tableData" style="width: 100%" height="725">
                        <el-table-column fixed prop="id" label="id" width="100" />
                        <el-table-column prop="borrow_date" label="借阅日期" />
                        <el-table-column prop="back_date" label="归还日期" />
                        <el-table-column prop="isback" label="是否归还" />
                        <el-table-column prop="student" label="学生" />
                        <el-table-column prop="book" label="图书" />
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
    borrowGet,
    borrowAdd,
    borrowEdit,
    borrowDel,
    studentGet,
    bookGet,
} from "@/utils/data";

const tableState = reactive({
    curItemId: "",
    tableData: [],
});

onMounted(() => {
    tableInit();
    studentInit();
    bookInit();
});

const studentState = reactive({
    studentData: [],
});
const bookState = reactive({
    bookData: [],
});

const studentInit = () => {
    studentGet().then(
        (response) => {
            const resTemp = response.data.data;
            studentState.studentData.splice(0, studentState.studentData.length);
            resTemp.forEach((item) => {
                const dataTemp = {
                    id: item.id,
                    stu_name: item.attributes.stu_name,
                };
                studentState.studentData.push(dataTemp);
            });
        },
        (error) => {
            console.log(error);
        }
    );
};

const bookInit = () => {
    bookGet().then(
        (response) => {
            const resTemp = response.data.data;
            bookState.bookData.splice(0, bookState.bookData.length);
            resTemp.forEach((item) => {
                const dataTemp = {
                    id: item.id,
                    book_name: item.attributes.book_name,
                };
                bookState.bookData.push(dataTemp);
            });
        },
        (error) => {
            console.log(error);
        }
    );
};

// 获取borrows
const tableInit = () => {
    borrowGet().then(
        (response) => {
            const resTemp = response.data.data;
            // 清空
            tableState.tableData.splice(0, tableState.tableData.length);
            resTemp.forEach((item) => {
                const tableTemp = {
                    id: item.id,
                    borrow_date: item.attributes.borrow_date,
                    back_date: item.attributes.back_date,
                    isback: item.attributes.isback,
                    student: item.attributes.student.data.attributes.stu_name,
                    book: item.attributes.book.data.attributes.book_name,
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
        borrow_date: "",
        back_date: "",
        isback: "",
        student: "",
        book: "",
    },
    editFormData: {
        borrow_date: "",
        back_date: "",
        isback: "",
        student: "",
        book: "",
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
        borrow_date: formState.addFormData.borrow_date,
        back_date: formState.addFormData.back_date,
        isback: formState.addFormData.isback,
        student: formState.addFormData.student,
        book: formState.addFormData.book,
    };
    borrowAdd(addDataTemp).then(
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
        borrow_date: formState.editFormData.borrow_date,
        back_date: formState.editFormData.back_date,
        isback: formState.editFormData.isback,
    };
    borrowEdit(tableState.curItemId, editDataTemp).then(
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

// 编辑
const handleEdit = (row) => {
    formState.editFormData = {
        borrow_date: row.borrow_date,
        back_date: row.back_date,
        isback: row.isback,
        student: row.student,
        book: row.book,
    };
    tableState.curItemId = row.id;
    dialogState.editDialogVisible = true;
};

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm(`确认删除${row.stu_name}吗?`)
        .then(() => {
            borrowDel(row.id).then(
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
.borrow-content {
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