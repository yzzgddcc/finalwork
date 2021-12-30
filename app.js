var express = require("express");
var mongoose = require("mongoose"); //加载数据库模块
var path = require("path");
var swig = require("swig"); //用来渲染html
var cookies = require("cookies"); //用来实现cookie的解析
var User = require("./models/User");
var app = express();
// 引擎设置
//mongoose.connect('mongodb://localhost：27017');
app.engine("html", swig.renderFile); //渲染html模板引擎
app.set("views", path.join(__dirname, "views")); //渲染的目录
app.set("view engine", "html"); //加载html
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.cookies = new cookies(req, res);
  // 解析用户的cookie信息
  req.userInfo = null;
  if (req.cookies.get("userInfo")) {
    try {
      req.userInfo = JSON.parse(req.cookies.get("userInfo"));
      // console.log(req.userInfo)
      // 获取当前用户，并判断是否为管理员
      User.findById(req.userInfo._id).then(function (userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      });
    } catch (e) { }
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//设置静态文件托管
app.use(express.static(path.join(__dirname, "public")));
//引用外置路由
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.use("/api", require("./routes/api"));
app.use("/", require("./routes/main"));

// 连接数据库
require('./models/connect');
app.listen(10401, () => {
  console.log("服务器启动成功，请访问：http://127.21.2.236:10401/");
});
// mongoose.connect(
//   "mongodb://localhost:27017/blog",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   function (err) {
//     if (err) {
//       console.log("数据库连接失败");
//     } else {
//       console.log("数据库连接成功");
//       app.listen(8080, function () {
//         console.log("服务器启动成功，请访问：http://127.0.0.1:8080/");
//       });
//     }
//   }
// );
