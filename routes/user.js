var express = require('express');
var Category = require('../models/Category');//导入模型类
var Content = require('../models/Content');//导入模型类
const User = require('../models/User')
var router = express.Router();
const crypto = require('crypto'); //引入crypto模块,用来数据加密操作
var md5 = crypto.createHash("md5");//引入md5模块
var fs = require('fs');//文件管理操作模块
var multer = require('multer');//文件上传操作模块
var upload = multer({ dest: 'uploads/' });//设置上传文件的路径

//  后台管理首页
router.get('/', function (req, res, next) {
  // 读取views目录下的指定文件，解析并返回给客户端
  res.render('user/index', {
    userInfo: req.userInfo
  });
});

/* 
个人信息
 */
router.get('/info', function (req, res) {
  // console.log(req.userInfo);
  res.render('user/user_index', {
    userInfo: req.userInfo,//当前用户
  })
})


//个人信息修改
router.get('/edit', async (req, res) => {
  // 获取将要修改内容的信息
  let { id } = req.query || '';
  console.log('测试：', id)
  let userInfo = await User.findOne({ _id: id })
  // console.log(userInfo)
  if (!userInfo) return res.render('user/error', {
    message: '用户不存在'
  });
  res.render('user/user_edit', {
    userInfo: userInfo,
  });

})
// 修改保存
router.post('/edit', async (req, res) => {

  let { id } = req.query || '';
  console.log(req.body)
  let { password } = req.body
  if (req.body.password === '') {
    res.render('user/error', {
      message: '密码不能为空',
    });
    return;
  }
  let userInfo = await User.findOne({ _id: id })
  console.log(userInfo)
  if (!userInfo) return res.render('user/error', {
    message: '用户不存在'
  });
  if (password != userInfo.password) {
    password = md5.update(password).digest("hex");//用md5对密码进行加密
  }
  userInfo = await User.updateOne({ _id: id }, { password: password })
  console.log(userInfo)
  res.render('admin/success', {
    userInfo: userInfo,
    message: '修改成功',
    url: '/user/info'//返回内容首页地址
  });
})


// 博文首页
router.get('/content', function (req, res) {
  /* 从数据库中读取所有的用户数据
  limit(Number):限制获取的数据条数
  skip(2):忽略数据的条数
  1:1-5  忽略skip:0 ->（当前页-1）*limit
  2:6-10 忽略ship:5 */

  var page = Number(req.query.page || 1);//当前页
  var pages = 0;//总页数
  var limit = 5;//限制每次获取5条数据
  var count = '';//总数据

  Content.where({ user: req.userInfo._id }).countDocuments().then(function (data) {
    count = data;
    console.log("总数据：", count);

    //  计算总页数
    pages = Math.ceil(count / limit);//向上取整
    page = Math.min(page, pages);//取值不能超过总页数
    page = Math.max(page, 1);//取值不能小于1
    var skip = (page - 1) * limit;//把已经获取的过滤掉
    /* 
    sort({_id:1}):升序
    sort({id_:-1}):降序
    */
    Content.where({ user: req.userInfo._id }).find().limit(limit).skip(skip).populate(['category', 'user']).sort({ addTime: -1 }).then(function (data) {
      // console.log(data);
      res.render('user/content_index', {
        userInfo: req.userInfo,//当前用户
        contents: data,//所有博文
        limit: limit,//一页加载条数
        page: page,//当前页数
        pages: pages,//总页数
        count: count,//总数据
      });
    });
  });
})

// 博文发布
router.get('/content/add', function (req, res) {
  Category.find().then(function (data) {
    res.render('user/content_add', {
      userInfo: req.userInfo,
      categories: data,
    });
  });
})

// 添加博文的保存
router.post('/content/add', function (req, res) {
  // console.log(req.body);
  if (req.body.category === '') {
    res.render('user/error', {
      userInfo: req.userInfo,
      message: '分类名称不能为空',
    });
    return;
  }
  if (req.body.title === '') {
    res.render('user/error', {
      userInfo: req.userInfo,
      message: '博文标题不能为空',
    });
    return;
  }
  var newContent = new Content({
    category: req.body.category,//分类
    title: req.body.title,//标题
    user: req.userInfo._id.toString(),//作者
    description: req.body.description,//简介
    content: req.body.content,//内容
    addTime: new Date(),//发布时间
  });
  // console.log(newContent);
  newContent.save().then(function (result) {
    res.render('user/success', {
      userInfo: req.userInfo,
      message: '博文添加成功',
      url: '/user/content'//返回内容首页地址
    });
  });
})

//博文的修改
router.get('/content/edit', function (req, res) {
  // 获取将要修改内容的信息
  var id = req.query.id || '';
  var categories = [];//用于存放分类
  Category.find().then(function (data) {
    categories = data;
    // 返回所查询的与该分类相关联的文章数据
    return Content.findOne({ _id: id }).populate('category');
  }).then(function (data) {
    if (!data) {
      res.render('user/error', {
        userInfo: req.userInfo,//当前用户
        message: '博文信息不存在'
      });
      return Promise.reject();
    } else {
      res.render('user/content_edit', {
        userInfo: req.userInfo,//当前用户
        content: data,//内容数据
        categories: categories,//分类
      });
    }
  });
})


// 修改博文的保存
router.post('/content/edit', function (req, res) {
  // 获取将要修改分类的信息，并且用表单的形式展现出来
  var id = req.query.id || '';

  if (req.body.category === '') {
    res.render('user/error', {
      userInfo: req.userInfo,
      message: '分类名称不能为空',
    });
    return;
  }
  if (req.body.title === '') {
    res.render('user/error', {
      userInfo: req.userInfo,
      message: '博文标题不能为空',
    });
    return;
  }
  Content.updateOne({ _id: id }, {
    category: req.body.category,//分类
    title: req.body.title,//标题
    description: req.body.description,//简介
    content: req.body.content,//内容
  }).then(function () {
    res.render('admin/success', {
      userInfo: req.userInfo,
      message: '博文修改成功',
      url: '/user/content'//返回内容首页地址
    });
  });
})

// 博文删除
router.get('/content/delete', function (req, res) {
  // 获取将要删除分类的信息
  var id = req.query.id || '';
  Content.findOne({
    _id: id
  }).then(function (data) {
    if (!data) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '博文信息不存在'
      });
      return Promise.reject();
    } else {
      Content.deleteOne({ _id: id }).then(function () {
        res.render('user/success', {
          userInfo: req.userInfo,
          message: '博文删除成功',
          url: '/user/content',//博文首页地址
        });
      });
    }
  });
})

module.exports = router;
