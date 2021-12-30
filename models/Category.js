var mongoose =require('mongoose');
// 分类的表结构对象
var categorySchema=new mongoose.Schema({
    // 分类名称
    name:String,
    
});
// 创建模型类并导出(前者是写进数据库的集合名，会变成复数)
module.exports=mongoose.model('Category',categorySchema);
