var mongoose = require('mongoose');
// var usersSchema = require('../routes/users');
// 用户的表结构对象
var usersSchema = new mongoose.Schema({
  // 用户名
  username: String,
  //密码
  password: String,
  //头像
  img: {
    type: String,
    default: ''
  },
  //是否为管理员
  isAdmin: {
    type: Boolean,
    default: false
  }
});
// 创建模型类并导出
module.exports = mongoose.model('User', usersSchema);
