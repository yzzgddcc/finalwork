var mongoose = require('mongoose');
// 博文的表结构对象
var contentSchema = new mongoose.Schema({
    // 关联字段--博文分类
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category',//关联Category模型类
    },
    // 关联字段--用户
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User',//关联User模型类
    },
    // 发布时间
    addTime: Date,
    //阅读量
    views: {
        type: Number,
        default: 0,//默认值为0
    },
    //点赞量
    thumbs: {
        type: Number,
        default: 0,//默认值为0
    },
    // 点赞对象
    thumbsArr: {
        type: Array,
        default: [],//默认值为空数组
    },
    // 评论信息
    comments: {
        type: Array,
        default: [],
    },
    // 博文标题 
    title: String,
    //博文简介
    description: {
        type: String,//数据类型
        default: '',//默认值
    },
    // 博文内容
    content: {
        type: String,//数据类型
        default: '',//默认值
    },
});
// 创建模型类并导出(前者是写进数据库的集合名，会变成复数)
module.exports = mongoose.model('Content', contentSchema);
