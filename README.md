### 项目说名

- 项目名称：博客平台
- 开发时间：2020.04~2020.06
- 开发环境：Node、MongoDB、Bootstrap、vscode 开发工具
- 项目描述：打造个人博客系统，娴熟学习前台的：
  用户首页、分类页和详情页展示，后台的：注册用户管理、博 客分类管理、博客内容以及评论的管理功能。
  该项目分为三大部分，分别是 JavaScript 基础部 分，提高部分以及实战部分，实战部分，数据库主要使用 MongDB。
- 我的职责：利用 node 实现个人全栈开发

#### 三个模型类：

- User.js:用户信息模型类
- Category.js:分类信息模型类(导航栏信息)
- Content.js:博文信息模型类

#### 文件介绍

- app.js:入口文件
- main.js:博文首页操作文件
- api.js:用户操作接口文件
- admin.js:管理员后台管理操作文件
- user.js:用户操作后台管理文件

#### ★ 注意：如果不想操作数据库的可以把项目里 /db/blog.sql 文件导进你的电脑本地数据库进行测试

### 项目启动方式：

- 下载依赖：npm install
- 在本地mongo创建数据库：blog，将项目中的 /db/blog.sql 脚本文件导入数据库中（可以利用Navicat可视化软件简化操作）
- 启动项目: npm start 或者 nodemon 或者 node app.js
- 浏览器访问：http://localhost:8080
