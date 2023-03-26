# library-vue



## 一、项目运行

依赖安装

```
npm install
```

运行服务

```
npm run serve
```

项目打包

```
npm run build
```



## 二、包管理

### sass

css预处理器

```shell
npm install node-sass -D
npm install sass-loader -D
npm install sass -D
```

在`vue.config.js`

```js
module.exports ={
    pluginOptions:{
        'style-resources-loader':{
            preProcessor:'scss',
            patterns:[]
        }
    }
}
```



### element-plus

Element组件库

```shell
npm install element-plus --save
```

在`main.js`中

```
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```



### vue-router

vue路由

```
npm install vue-router
```



### moment

时间处理库

```
npm install moment
```



### echarts

基于 JavaScript 的开源可视化图表库

```text
npm install echarts --save
```



### vue-calendar-component

vue日历组件

```
npm i vue-calendar-component --save
```









## 三、页面结构

面向管理员

- 登录页
- 首页
- 学生管理
- 图书管理
- 借阅管理
- 公告管理



## 四、数据结构

notes：

1、所有表默认添加以下三个字段，不再赘述id（主键），createdAt（数据创建时间），updatedAt（数据更新时间）

> 所有表默认存在ID选项

### User

管理员（系统面向对象）

| 字段     | 类型  | 说明 | 约束 |
| -------- | ----- | ---- | ---- |
| username | txt   | 姓名 |      |
| password | txt   | 密码 |      |
| email    | email | 邮箱 |      |
| user_tel | txt   | 电话 |      |



### Student

学生表

| 字段     | 类型     | 说明                            | 约束 |
| -------- | -------- | ------------------------------- | ---- |
| stu_num  | num      | 学号                            |      |
| stu_name | txt      | 姓名                            |      |
| phone    | txt      | 电话号码                        |      |
| identity | txt      | 身份证号                        |      |
| class    | txt      | 班级                            |      |
| borrows  | relation | Student belongs to many Borrows |      |



### Book

图书表

| 字段      | 类型     | 说明                | 约束 |
| --------- | -------- | ------------------- | ---- |
| book_name | txt      | 图书名称            |      |
| bookshelf | num      | 书架号              |      |
| press     | txt      | 出版社              |      |
| author    | txt      | 作者                |      |
| price     | num      | 价格                |      |
| stock     | num      | 库存                |      |
| type      | relation | Type has many Books |      |



### type

图书类型表

| 字段      | 类型     | 说明                       | 约束 |
| --------- | -------- | -------------------------- | ---- |
| type_name | txt      | 类型名称                   |      |
| books     | relation | Type belongs to many Books |      |



### Borrow

借阅信息表

| 字段        | 类型     | 说明                     | 约束 |
| ----------- | -------- | ------------------------ | ---- |
| borrow_date | date     | 借书日期                 |      |
| back_date   | date     | 还书日期                 |      |
| isback      | boolen   | 是否归还                 |      |
| student     | relation | Student has many Borrows |      |
| book        | relation | Borrow has one Book      |      |



### Bulletin

公告表

| 字段      | 类型 | 说明     | 约束 |
| --------- | ---- | -------- | ---- |
| title     | txt  | 公告标题 |      |
| bull_date | date | 公告日期 |      |
| content   | txt  | 公告内容 |      |
| publisher | txt  | 发布者   |      |









































