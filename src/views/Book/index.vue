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
                <el-form
                    label-position="left"
                    label-width="100px"
                    :model="formState.addFormData"
                    style="max-width: 500px"
                >
                    <el-form-item label="图书名称">
                        <el-input v-model="formState.addFormData.book_name" />
                    </el-form-item>
                    <el-form-item label="书架号">
                        <el-input v-model="formState.addFormData.bookshelf" />
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="formState.addFormData.press" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="formState.addFormData.author" />
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="formState.addFormData.price" />
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="formState.addFormData.stock" />
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select
                            v-model="formState.addFormData.type"
                            class="m-2"
                            placeholder="选择类别"
                        >
                            <el-option
                                v-for="item in typeState.typeData"
                                :key="item.id"
                                :label="item.type_name"
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
                    <el-form-item label="图书名称">
                        <el-input v-model="formState.editFormData.book_name" />
                    </el-form-item>
                    <el-form-item label="书架号">
                        <el-input v-model="formState.editFormData.bookshelf" />
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="formState.editFormData.press" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="formState.editFormData.author" />
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="formState.editFormData.price" />
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="formState.editFormData.stock" />
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select
                            v-model="formState.editFormData.type"
                            class="m-2"
                            placeholder="选择类别"
                        >
                            <el-option
                                v-for="item in typeState.typeData"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.type_name"
                            />
                        </el-select>
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
                        <el-input v-model="inpState.searchWord" placeholder="请输入图书关键词" />
                        <el-button color="#FFC7C7" plain @click="handleSearch">搜索数据</el-button>
                        <el-button color="#FFC7C7" plain @click="handleSearchReset">重置</el-button>
                    </div>
                </div>
                <div class="bottom">
                    <!-- 表格 -->
                    <el-table :data="tableState.tableData" style="width: 100%" height="725">
                        <el-table-column fixed prop="id" label="id" width="100" />
                        <el-table-column prop="book_name" label="图书名称" width="200" />
                        <el-table-column prop="bookshelf" label="书架号" width="100" />
                        <el-table-column prop="press" label="出版社" width="150" />
                        <el-table-column prop="author" label="作者" width="120" />
                        <el-table-column prop="price" label="价格" width="100" />
                        <el-table-column prop="stock" label="库存" width="70" />
                        <el-table-column prop="type" label="类别" width="80" />
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
    bookGet,
    bookAdd,
    bookEdit,
    bookDel,
    typeGet,
    typeGetOne,
} from "@/utils/data";

onMounted(() => {
    tableInit();
    typeInit();
});

const tableState = reactive({
    curItemId: "",
    tableData: [
        {
            id: "1",
            book_name: "test",
            bookshelf: "1",
            press: "testpress",
            author: "testauthor",
            price: "122",
            stock: "12",
            type: "旅游",
        },
    ],
});

const typeState = reactive({
    typeData: [],
});

// 获取types
const typeInit = () => {
    typeGet().then(
        (response) => {
            const resTemp = response.data.data;
            typeState.typeData.splice(0, typeState.typeData.length);
            resTemp.forEach((item) => {
                const typeTemp = {
                    id: item.id,
                    type_name: item.attributes.type_name,
                };
                typeState.typeData.push(typeTemp);
            });
            // console.log(typeState.typeData)
        },
        (error) => {
            console.log(error);
        }
    );
};

// 获取books
const tableInit = () => {
    bookGet().then(
        (response) => {
            const resTemp = response.data.data;
            // 清空
            tableState.tableData.splice(0, tableState.tableData.length);
            resTemp.forEach((item) => {
                const tableTemp = {
                    id: item.id,
                    book_name: item.attributes.book_name,
                    bookshelf: item.attributes.bookshelf,
                    press: item.attributes.press,
                    author: item.attributes.author,
                    price: item.attributes.price,
                    stock: item.attributes.stock,
                    type: item.attributes.type.data.attributes.type_name,
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
        book_name: "",
        bookshelf: "",
        press: "",
        author: "",
        price: "",
        stock: "",
        type: "",
    },
    editFormData: {
        book_name: "",
        bookshelf: "",
        press: "",
        author: "",
        price: "",
        stock: "",
        type: "",
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
        book_name: formState.addFormData.book_name,
        bookshelf: formState.addFormData.bookshelf,
        press: formState.addFormData.press,
        author: formState.addFormData.author,
        price: formState.addFormData.price,
        stock: formState.addFormData.stock,
        type: formState.addFormData.type,
    };
    bookAdd(addDataTemp).then(
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
        book_name: formState.editFormData.book_name,
        bookshelf: formState.editFormData.bookshelf,
        press: formState.editFormData.press,
        author: formState.editFormData.author,
        price: formState.editFormData.price,
        stock: formState.editFormData.stock,
        type: formState.editFormData.type,
    };

    typeState.typeData.forEach((item) => {
        if (editDataTemp.type === item.type_name) {
            editDataTemp.type = item.id;
        }
    });


    bookEdit(tableState.curItemId, editDataTemp).then(
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
        if (item.book_name.indexOf(inpState.searchWord) != -1) {
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
        book_name: row.book_name,
        bookshelf: row.bookshelf,
        press: row.press,
        author: row.author,
        price: row.price,
        stock: row.stock,
        type: row.type,
    };
    tableState.curItemId = row.id;
    dialogState.editDialogVisible = true;
};

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm(`确认删除${row.book_name}吗?`)
        .then(() => {
            bookDel(row.id).then(
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