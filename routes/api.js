var express = require("express");
var router = express.Router();
var User = require("../models/User"); //引入用户模型类
var Content = require("../models/Content"); //引入博文模型类
const crypto = require("crypto"); //引入crypto模块,用来数据加密操作
const { v4: uuidv4 } = require("uuid"); //引入UUID库
var fs = require("fs"); //文件管理操作模块
var multer = require("multer"); //文件上传操作模块
var upload = multer({ dest: "uploads/" }); //设置上传文件的路径
const { dateFormat } = require("../utils/dateFormat");
var responseData = {}; //设置返回数据
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: "",
    data: null,
  };
  next(); //中间件被一个接一个的执行
});
/*           
 用户注册：1、用户名不能为空；2、密码不能为空；3、两次密码输入必须一致
*/
router.post("/user/register", upload.any(), function (req, res, next) {
  // console.log(req.files);  // 上传的文件信息
  var username = req.body.username; //用户名
  var password = req.body.password; //密码
  var repassword = req.body.repassword; //二次密码
  var md5 = crypto.createHash("md5"); //引入md5模块
  var newPas = md5.update(password).digest("hex"); //用md5对密码进行加密
  var oname = req.files[0].originalname; //文件名
  var path1 = req.files[0].path; //原上传文件
  // 设置转移路径，以及重命名(真正放照片的目录)
  var image_path = "./public/img/image/" + oname;
  // 设置写入数据库的文件路径(数据库显示的目录)
  var img = "/img/image/" + oname;

  // 解决alert乱码
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  //用户名是否为空
  if (username === "") {
    responseData.code = 1;
    responseData.message = "注册失败，用户名不能为空";
    var backstr =
      "<script>alert('注册失败,用户名不能为空');window.location.href='/'</script>";
    res.end(backstr);
  }
  //密码不能为空
  if (password === "") {
    responseData.code = 1;
    responseData.message = "注册失败，密码不能为空";
    var backstr =
      "<script>alert('注册失败,密码不能为空');window.location.href='/'</script>";
    res.end(backstr);
  }
  //两次密码输入必须一致
  if (password != repassword) {
    responseData.code = 1;
    responseData.message = "注册失败，两次密码输入不一致";
    var backstr =
      "<script>alert('注册失败,两次密码输入不一致');window.location.href='/'</script>";
    res.end(backstr);
  }

  // //数据库查询用户是否被注册
  User.findOne({
    username: username,
  })
    .then(function (userInfo) {
      // console.log(userInfo);
      if (userInfo) {
        //存在该用户
        responseData.code = 1;
        responseData.message = "用户名已经被注册了";
        // res.json(responseData);
        var backstr =
          "<script>alert('注册失败,用户名已经被注册了');window.location.href='/'</script>";
        res.end(backstr);
      }
      if (responseData.code === 1) {
        console.log("注册失败");
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      }
      // 将上传后的文件移动到指定路径目录下
      fs.rename(path1, image_path, (err) => {
        // console.log(err);
      });
      var user = new User({
        username: username,
        password: newPas,
        img: img,
      });
      // console.log(user);
      return user.save();
    })
    .then(function (result) {
      // console.log(result);
      responseData.code = 0;
      // res.json(responseData);
      var backstr =
        "<script>alert('注册成功,点击跳转');window.location.href='/'</script>";
      res.end(backstr);
    });
});

// 用户登录
router.post("/user/login", function (req, res) {
  // console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var md5 = crypto.createHash("md5"); //引入md5模块
  var newPas = md5.update(password).digest("hex"); //用md5对密码进行加密
  //判断用户名和密码是否为空
  if (username === "" || password == "") {
    responseData.code = 1;
    responseData.message = "用户名和密码不能为空";
    res.json(responseData);
    return;
  }

  // 查询数据库中账号密码是否存在且一致
  User.findOne({
    username: username,
    password: newPas,
  }).then(function (userInfo) {
    // console.log(userInfo);
    if (!userInfo) {
      //用户名或密码错误
      responseData.code = 2;
      responseData.message = "用户名或密码错误";
      res.json(responseData);
      return;
    }
    responseData.message = "登录成功，1秒后跳转";
    responseData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username,
      img: userInfo.img,
    };
    req.cookies.set(
      "userInfo",
      JSON.stringify({
        _id: userInfo._id,
        username: userInfo.username,
        img: userInfo.img,
      })
    );
    res.json(responseData);
    return;
  });
});
// 退出登录
router.get("/user/logout", function (req, res) {
  req.cookies.set("userInfo", null); //释放cookie
  res.json(responseData);
});

// 获取指定文章的所有评论
router.get("/comment/:contentId", function (req, res) {
  console.log("测试:", req.params);
  let { contentId } = req.params;
  // var contentId = req.query.contentid || '';//当前博文的id
  // 查询数据库中的相关数据
  Content.findOne({
    _id: contentId,
  }).then(function (content) {
    // console.log('测试:', content.comments)
    if (content.comments.length > 0) {
      // 按评论最新时间排序
      content.comments.sort((a, b) => {
        return b.postTime - a.postTime;
      });
      // 格式化时间
      content.comments.forEach((element) => {
        element.postTime = dateFormat(element.postTime);
        if (element.replyArr.length > 0) {
          element.replyArr.sort((a, b) => {
            return b.postTime - a.postTime;
          });
        }
        element.replyArr.forEach((ele) => {
          ele.postTime = dateFormat(ele.postTime);
        });
      });
    }
    responseData.data = content.comments; //将查到的评论信息封装到responseData对象中
    responseData.message = "查询成功";
    res.json(responseData); //反馈信息给客户端
  });
});

// 评论提交
router.post("/comment/post", async (req, res) => {
  //当前博文的id
  let { contentId, content } = req.body;
  // console.log('测试:', req.body)
  let strUUID = uuidv4().replace(/-/g, "");
  // 把相关评论的数据
  let postData = {
    id: strUUID,
    username: req.userInfo.username, //当前用户
    postTime: new Date(), //评论时间
    content, //评论内容
    replyArr: [], //对该评论回复的对象
  };
  // console.log('测试:', postData)
  //查询当前这篇内容的信息
  let newContent = await Content.findOne({ _id: contentId });
  if (!newContent) {
    responseData.code = 1;
    responseData.message = "文章不存在!";
    responseData.data = null;
    return res.json(responseData); //
  }
  // console.log('测试:', newContent)
  newContent.comments.push(postData); //把相关评论的数据添加进数组中
  newContent.save(); //保存到数据库
  responseData.message = "评论成功";
  responseData.data = null;
  res.json(responseData); //反馈信息给客户端
});
// 回复评论
router.post("/comment/reply", async (req, res) => {
  console.log("测试:", req.body);
  let { contentId, content, comment } = req.body;
  content = `回复(${comment.username}):${content}`;
  if (req.userInfo.username == comment.username) {
    responseData.message = "不能回复自己";
    responseData.code = 1;
    responseData.data = null;
    return res.json(responseData);
  }
  let strUUID = uuidv4().replace(/-/g, "");
  // 回复对象
  let postData = {
    id: strUUID,
    username: req.userInfo.username, //当前用户
    postTime: new Date(), //评论时间
    content, //评论内容
    replyArr: [], //对该评论回复的对象
  };
  // //查询当前这篇内容的信息
  let newContent = await Content.findOne({ _id: contentId });
  // console.log('测试:', newContent)
  if (!newContent) {
    responseData.message = "文章不存在";
    responseData.code = 1;
    responseData.data = null;
    return res.json(responseData);
  }
  let flag = newContent.comments.some((element, index) => {
    if (element.id == comment.id) {
      console.log("测试1321:", postData);
      element.replyArr.push(postData);
      return true;
    }
    return false;
  });
  console.log("测试:", newContent.comments);
  if (!flag) {
    responseData.data = null;
    responseData.code = 1;
    responseData.message = "系统繁忙";
    return res.json(responseData);
  }
  await Content.updateOne({ _id: contentId }, newContent);
  responseData.message = "回复成功";
  responseData.data = null;
  res.json(responseData); //反馈信息给客户端
});

//文章点赞
router.get("/comment/thumbs/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(req.params, id);
  if (!req.userInfo) {
    responseData.data = null;
    responseData.code = 1;
    responseData.message = "你还没有登录，请先登录！";
    return res.json(responseData);
  }
  let content = await Content.findOne({ _id: id });
  if (content) {
    let flag = content.thumbsArr.some(
      (element) => element.username == req.userInfo.username
    );
    // console.log('测试:', flag)
    if (flag) {
      responseData.data = null;
      responseData.code = 1;
      responseData.message = "您已点过赞了";
      return res.json(responseData);
    }
    content.thumbs++; //点赞数加一
    content.thumbsArr.push(req.userInfo); //记录点赞人
    content.save();
    responseData.message = "点赞成功";
    responseData.data = null;
    res.json(responseData); //反馈信息给客户端
  } else {
    responseData.code = 1;
    responseData.message = "文章不存在";
    responseData.data = null;
    res.json(responseData); //反馈信息给客户端
  }
});
//文章转发
router.get("/comment/forward/:id", function (req, res) {
  let { id } = req.params;
  // console.log(req.params, id);
  if (!req.userInfo) {
    responseData.data = null;
    responseData.code = 1;
    responseData.message = "你还没有登录，请先登录！";
    return res.json(responseData);
  }
  //查询当前这篇内容的信息
  Content.findOne({
    _id: id,
  })
    .then(function (content) {
      if (req.userInfo._id == content.user) {
        responseData.data = null;
        responseData.code = 1;
        responseData.message = "不能转发自己的文章！";
        res.json(responseData);
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      }
      let newContent = new Content({
        category: content.category, //分类
        title: content.title, //标题
        user: req.userInfo._id.toString(), //作者
        description: content.description, //简介
        content: content.content, //内容
        addTime: new Date(), //发布时间
      });
      return newContent.save(); //保存到数据库
    })
    .then(function (result) {
      responseData.message = "转发成功";
      responseData.data = result;
      res.json(responseData); //反馈信息给客户端
    });
});

module.exports = router;
