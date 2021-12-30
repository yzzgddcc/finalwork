var express = require("express");
var User = require("../models/User"); //导入模型类
var Category = require("../models/Category"); //导入模型类
var Content = require("../models/Content"); //导入模型类
var router = express.Router();

// 拦截非管理员进入后台管理界面
router.use(function (req, res, next) {
  if (!req.userInfo.isAdmin) {
    res.send("对不起，只有管理员才可以进入后台管理");
  }
  next();
});

//  后台管理首页
router.get("/", function (req, res, next) {
  // res.send('admin界面');
  // 读取views目录下的指定文件，解析并返回给客户端
  res.render("admin/index", {
    userInfo: req.userInfo,
  });
});

/* 
用户管理
 */
router.get("/user", function (req, res) {
  /* 从数据库中读取所有的用户数据
     limit(Number):限制获取的数据条数
     skip(2):忽略数据的条数
     1:1-5  忽略skip:0 ->（当前页-1）*limit
     2:6-10 忽略ship:5 */

  var page = Number(req.query.page || 1); //当前页
  var pages = 0; //总页数
  var limit = 5; //限制每次获取5条数据
  var count = ""; //总数

  User.countDocuments().then(function (data) {
    count = data;
    console.log("总数据：", count);

    //  计算总页数
    pages = Math.ceil(count / limit); //向上取整
    page = Math.min(page, pages); //取值不能超过总页数
    page = Math.max(page, 1); //取值不能小于1
    var skip = (page - 1) * limit; //把已经获取的过滤掉
    User.find()
      .limit(limit)
      .skip(skip)
      .then(function (data) {
        // console.log(data);
        res.render("admin/user_index", {
          userInfo: req.userInfo, //当前用户
          users: data, //所有用户
          limit: limit, //一页加载条数
          page: page, //当前页数
          pages: pages, //总页数
          count: count, //总数据
        });
      });
  });
});

// 分类首页
router.get("/category", function (req, res) {
  /* 从数据库中读取所有的用户数据
   limit(Number):限制获取的数据条数
   skip(2):忽略数据的条数
   1:1-5  忽略skip:0 ->（当前页-1）*limit
   2:6-10 忽略ship:5 */

  var page = Number(req.query.page || 1); //当前页
  var pages = 0; //总页数
  var limit = 5; //限制每次获取5条数据
  var count = ""; //总数

  Category.countDocuments().then(function (data) {
    count = data;
    console.log("总数据：", count);

    //  计算总页数
    pages = Math.ceil(count / limit); //向上取整
    page = Math.min(page, pages); //取值不能超过总页数
    page = Math.max(page, 1); //取值不能小于1
    var skip = (page - 1) * limit; //把已经获取的过滤掉
    /* 
    sort({_id:1}):升序
    sort({id_:-1}):降序
    */
    Category.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then(function (data) {
        // console.log(data);
        res.render("admin/category_index", {
          userInfo: req.userInfo, //当前用户
          categories: data, //所有分类
          limit: limit, //一页加载条数
          page: page, //当前页数
          pages: pages, //总页数
          count: count, //总数据
        });
      });
  });
});

// 分类的添加
router.get("/category/add", function (req, res) {
  res.render("admin/category_add", {
    userInfo: req.userInfo,
  });
});

// 添加分类的保存
router.post("/category/add", function (req, res) {
  // console.log(req.body);
  var name = req.body.name || "";
  if (name === "") {
    res.render("admin/error", {
      userInfo: req.userInfo,
      message: "类名称不能为空",
    });
    return;
  }
  // 判断数据库中是否存在
  Category.findOne({
    name: name,
  })
    .then(function (data) {
      if (data) {
        //数据库存在该分类
        res.render("admin/error", {
          userInfo: req.userInfo, //当前用户
          message: "分类名已经存在了",
          url: "/admin/category/add",
        });
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      } else {
        //数据不存在，可进行添加保存操作
        var category = new Category({
          name: name,
        });
        return category.save();
      }
    })
    .then(function (data) {
      // console.log(data);
      res.render("admin/success", {
        userInfo: req.userInfo,
        message: "分类名添加成功",
        url: "/admin/category", //返回分类首页地址
      });
    });
});

// 分类的修改
router.get("/category/edit", function (req, res) {
  // 获取将要修改分类的信息，并且用表单的形式展现出来
  var id = req.query.id || "";
  Category.findOne({
    _id: id,
  }).then(function (data) {
    if (!data) {
      res.render("admin/error", {
        userInfo: req.userInfo,
        message: "分类信息不存在",
      });
      return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
    } else {
      res.render("admin/category_edit", {
        userInfo: req.userInfo,
        category: data,
      });
    }
  });
});

// 修改分类的保存
router.post("/category/edit", function (req, res) {
  // 获取将要修改分类的信息，并且用表单的形式展现出来
  var id = req.query.id || "";
  var name = req.body.name || "";
  Category.findOne({
    _id: id,
  })
    .then(function (category) {
      if (!category) {
        res.render("admin/error", {
          userInfo: req.userInfo,
          message: "分类信息不存在",
        });
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      } else {
        //数据没有发生任何修改
        if (name === category.name) {
          res.render("admin/success", {
            userInfo: req.userInfo,
            message: "修改成功，数据没有发生变化",
            url: "/admin/category",
          });
          return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
        } else {
          //将要修改的分类名称是否存在数据库中
          return Category.findOne({
            _id: { $ne: id }, //_id不等于当前_id
            name: name,
          });
        }
      }
    })
    .then(function (data) {
      // console.log(data);
      // 数据库已存在该分类
      if (data) {
        res.render("admin/error", {
          userInfo: req.userInfo,
          message: "数据库已存在该分类名称",
          url: "/admin/category",
        });
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      } else {
        return Category.updateOne(
          {
            _id: id,
          },
          { name: name }
        );
      }
    })
    .then(function () {
      res.render("admin/success", {
        userInfo: req.userInfo,
        message: "分类修改成功",
        url: "/admin/category",
      });
    });
});

// 分类的删除
router.get("/category/delete", function (req, res) {
  // 获取将要删除分类的信息
  var id = req.query.id || "";
  Category.findOne({
    _id: id,
  }).then(function (data) {
    if (!data) {
      res.render("admin/error", {
        userInfo: req.userInfo,
        message: "分类信息不存在",
      });
      return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
    } else {
      Category.deleteOne({ _id: id }).then(function () {
        res.render("admin/success", {
          userInfo: req.userInfo,
          message: "分类删除成功",
          url: "/admin/category",
        });
      });
    }
  });
});

// 内容首页
router.get("/content", function (req, res) {
  /* 从数据库中读取所有的用户数据
  limit(Number):限制获取的数据条数
  skip(2):忽略数据的条数
  1:1-5  忽略skip:0 ->（当前页-1）*limit
  2:6-10 忽略ship:5 */

  var page = Number(req.query.page || 1); //当前页
  var pages = 0; //总页数
  var limit = 5; //限制每次获取5条数据
  var count = ""; //总数据

  Content.countDocuments().then(function (data) {
    count = data;
    console.log("总数据：", count);

    //  计算总页数
    pages = Math.ceil(count / limit); //向上取整
    page = Math.min(page, pages); //取值不能超过总页数
    page = Math.max(page, 1); //取值不能小于1
    var skip = (page - 1) * limit; //把已经获取的过滤掉
    /* 
    sort({_id:1}):升序
    sort({id_:-1}):降序
    */
    Content.find()
      .limit(limit)
      .skip(skip)
      .populate(["category", "user"])
      .sort({ addTime: -1 })
      .then(function (data) {
        console.log(data);
        res.render("admin/content_index", {
          userInfo: req.userInfo, //当前用户
          contents: data, //所有博文
          limit: limit, //一页加载条数
          page: page, //当前页数
          pages: pages, //总页数
          count: count, //总数据
        });
      });
  });
});

// 内容添加
router.get("/content/add", function (req, res) {
  Category.find().then(function (data) {
    res.render("admin/content_add", {
      userInfo: req.userInfo,
      categories: data,
    });
  });
});

// 添加内容的保存
router.post("/content/add", function (req, res) {
  console.log(req.body);

  if (req.body.category === "") {
    res.render("admin/error", {
      userInfo: req.userInfo,
      message: "分类名称不能为空",
    });
    return;
  }
  if (req.body.title === "") {
    res.render("admin/error", {
      userInfo: req.userInfo,
      message: "博文标题不能为空",
    });
    return;
  }
  var newContent = new Content({
    category: req.body.category, //分类
    title: req.body.title, //标题
    user: req.userInfo._id.toString(), //作者
    description: req.body.description, //简介
    content: req.body.content, //内容
    addTime: new Date(), //发布时间
  });
  // console.log(newContent);
  newContent.save().then(function (result) {
    res.render("admin/success", {
      userInfo: req.userInfo,
      message: "博文添加成功",
      url: "/admin/content", //返回内容首页地址
    });
  });
});

//内容的修改
router.get("/content/edit", function (req, res) {
  // 获取将要修改内容的信息
  var id = req.query.id || "";
  var categories = []; //用于存放分类
  Category.find()
    .then(function (data) {
      categories = data;
      // 返回所查询的与该分类相关联的文章数据
      return Content.findOne({ _id: id }).populate("category");
    })
    .then(function (data) {
      if (!data) {
        res.render("admin/error", {
          userInfo: req.userInfo, //当前用户
          message: "博文信息不存在",
        });
        return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
      } else {
        res.render("admin/content_edit", {
          userInfo: req.userInfo, //当前用户
          content: data, //内容数据
          categories: categories, //分类
        });
      }
    });
});

// 修改内容的保存
router.post("/content/edit", function (req, res) {
  // 获取将要修改分类的信息，并且用表单的形式展现出来
  var id = req.query.id || "";

  if (req.body.category === "") {
    res.render("admin/error", {
      userInfo: req.userInfo,
      message: "分类名称不能为空",
    });
    return;
  }
  if (req.body.title === "") {
    res.render("admin/error", {
      userInfo: req.userInfo,
      message: "博文标题不能为空",
    });
    return;
  }
  Content.updateOne(
    { _id: id },
    {
      category: req.body.category, //分类
      title: req.body.title, //标题
      description: req.body.description, //简介
      content: req.body.content, //内容
    }
  ).then(function () {
    res.render("admin/success", {
      userInfo: req.userInfo,
      message: "博文修改成功",
      url: "/admin/content", //返回内容首页地址
    });
  });
});

// 博文的删除
router.get("/content/delete", function (req, res) {
  // 获取将要删除分类的信息
  var id = req.query.id || "";
  Content.findOne({
    _id: id,
  }).then(function (data) {
    if (!data) {
      res.render("admin/error", {
        userInfo: req.userInfo,
        message: "博文信息不存在",
      });
      return new Promise(function (resolve, reject) {}); //终止函数不在继续执行
    } else {
      Content.deleteOne({ _id: id }).then(function () {
        res.render("admin/success", {
          userInfo: req.userInfo,
          message: "博文删除成功",
          url: "/admin/content", //博文首页地址
        });
      });
    }
  });
});

module.exports = router;
