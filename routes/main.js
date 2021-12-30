var express = require("express");
var Category = require("../models/Category"); //导入模型类
var Content = require("../models/Content"); //导入模型类
var router = express.Router();

var obj = {}; //用于存放数据的对象
// 通用返回数据
router.use(function (req, res, next) {
  obj = {
    userInfo: req.userInfo, //当前用户
    categories: [], //分类(导航栏)
  };
  // 读取数据库所以分类信息(导航栏)
  Category.find().then(function (categories) {
    obj.categories = categories; //所有分类(导航栏)
    next(); //进入下一个主函数
  });
});
/* 博客首页 */
router.get("/", function (req, res, next) {
  /* 从数据库中读取所有的用户数据
  limit(Number):限制获取的数据条数
  skip(2):忽略数据的条数
  1:1-5  忽略skip:0 ->（当前页-1）*limit
  2:6-10 忽略ship:5 */

  // 把所有前端所需数据的参数打包放进obj对象中
  obj.category = req.query.category || ""; //当前选中分类相关联的id
  obj.contents = []; //博文
  obj.page = Number(req.query.page || 1); //当前页
  obj.pages = 0; //总页数
  obj.limit = 4; //限制每次获取5条数据
  obj.count = 0; //总数据

  var where = {}; //临时存放前端get回来的分类id
  if (obj.category) {
    where.category = obj.category;
  }
  // console.log(where);

  Content.where(where)
    .countDocuments()
    .then(function (count) {
      obj.count = count; //总数
      obj.pages = Math.ceil(obj.count / obj.limit); //向上取整
      obj.page = Math.min(obj.page, obj.pages); //取值不能超过总页数
      obj.page = Math.max(obj.page, 1); //取值不能小于1
      var skip = (obj.page - 1) * obj.limit; //把已经获取的过滤掉

      return Content.where(where)
        .find()
        .limit(obj.limit)
        .skip(skip)
        .populate(["category", "user"])
        .sort({
          addTime: -1,
        });
    })
    .then(function (contents) {
      obj.contents = contents; //所有博文
      // console.log(contents);
      res.render("main/index", obj);
    });
});
//阅读全文
router.get("/view", async (req, res) => {
  let { id } = req.query;
  let content = await Content.findOne({ _id: id });
  if (content) {
    content.views++;
    content.save();
    obj.content = content;
    res.render("main/view", obj);
  }
});
module.exports = router;
