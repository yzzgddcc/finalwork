// 引入mongoose第三方模块
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/blog', { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect('mongodb://172.21.2.236:27017/190110910401', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () {
        console.log('连接数据库成功')
    }).catch(function (e) {
        console.log(e)
        console.log('连接数据库失败')
    })