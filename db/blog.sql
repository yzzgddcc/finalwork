/*
 Navicat Premium Data Transfer

 Source Server         : MongoDB
 Source Server Type    : MongoDB
 Source Server Version : 30404
 Source Host           : localhost:27017
 Source Schema         : blog

 Target Server Type    : MongoDB
 Target Server Version : 30404
 File Encoding         : 65001

 Date: 12/04/2021 17:28:48
*/


// ----------------------------
// Collection structure for categories
// ----------------------------
db.getCollection("categories").drop();
db.createCollection("categories");

// ----------------------------
// Documents of categories
// ----------------------------
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd3af143bac116b0165758"),
    name: "后端学习",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd3afc43bac116b0165759"),
    name: "数据库",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd547d2815292a645bcbcf"),
    name: "nodejs",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd5ba64ec6dd2ac45494e5"),
    name: "C语言",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd8abe9a41c332645b40c2"),
    name: "Python",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ebd8ad39a41c332645b40c3"),
    name: "Java",
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("5ecbbaced55dc71724005a65"),
    name: "sdhj",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for contents
// ----------------------------
db.getCollection("contents").drop();
db.createCollection("contents");

// ----------------------------
// Documents of contents
// ----------------------------
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebd8625046fa345c4cad1eb"),
    addTime: ISODate("2020-05-14T17:55:34.896Z"),
    views: NumberInt("0"),
    description: "afdassd",
    content: "adsafc",
    category: ObjectId("5ebd5ba64ec6dd2ac45494e5"),
    title: "C语言入门基础",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebd88b3ad278b188002a614"),
    addTime: ISODate("2020-05-14T18:01:22.554Z"),
    views: NumberInt("0"),
    description: "MySQL",
    content: "啊打发公司做过方式L加了",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "数据库",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebd8b039a41c332645b40c4"),
    addTime: ISODate("2020-05-14T18:14:40.695Z"),
    views: NumberInt("0"),
    description: "Python基础学习",
    content: "一篇关于Python的基础学习教材",
    category: ObjectId("5ebd8abe9a41c332645b40c2"),
    title: "Python",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebd8b209a41c332645b40c5"),
    addTime: ISODate("2020-05-14T18:14:40.695Z"),
    views: NumberInt("0"),
    description: "大学生C语言教程",
    content: "vzd是设置是看就看六角恐龙重大疾病v vskk;skkf ；德拉克斯勒电饭锅上岛咖啡老师看的",
    category: ObjectId("5ebd5ba64ec6dd2ac45494e5"),
    title: "C语言教学",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebd8b369a41c332645b40c6"),
    addTime: ISODate("2020-05-14T18:14:40.695Z"),
    views: NumberInt("0"),
    description: "关于初级Nodejs教学分享",
    content: "开会了扣奖励是广东省高党支部副队长都找不到打工的",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "大前端学习",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe61c93457ef076ce0044a"),
    addTime: ISODate("2020-05-15T09:28:36.589Z"),
    views: NumberInt("0"),
    description: "dfblk",
    content: "llllvdsnklvkljkSGSD",
    category: ObjectId("5ebd8ad39a41c332645b40c3"),
    title: "java",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe61ed3457ef076ce0044b"),
    addTime: ISODate("2020-05-15T09:28:36.589Z"),
    views: NumberInt("0"),
    description: "·的进口量水晶猎龙塑料颗粒吧",
    content: "u；是lz选择V三个KLJG路径",
    category: ObjectId("5ebd8abe9a41c332645b40c2"),
    title: "Python学习",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe61fb3457ef076ce0044c"),
    addTime: ISODate("2020-05-15T09:28:36.589Z"),
    views: NumberInt("0"),
    description: "分割线减肥洗干净",
    content: "小飞机大战",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "java后端",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe62163457ef076ce0044d"),
    addTime: ISODate("2020-05-15T09:28:36.589Z"),
    views: NumberInt("0"),
    description: "sD▍▆；!!!∑(ﾟДﾟノ)ノლ(´ڡ`ლ)好吃的.(•́へ•́╬)",
    content: "szhfdzn六角恐龙的数组机率机率",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "node后端",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe622f3457ef076ce0044e"),
    addTime: ISODate("2020-05-15T09:28:36.589Z"),
    views: NumberInt("0"),
    description: "低脂肪的健康",
    content: "在电话中大立科技",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "后端入门",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebe9ff494e95e3b90742075"),
    addTime: ISODate("2020-05-15T13:52:55.808Z"),
    views: NumberInt("32"),
    description: "；离开了送快递了",
    content: "；可随时",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "mysql",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("18")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebea00894e95e3b90742076"),
    addTime: ISODate("2020-05-15T13:52:55.808Z"),
    views: NumberInt("6"),
    description: "大V激活深V点击看看",
    content: "发到空间和vjks",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "mongoose模块",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("3")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebea01d94e95e3b90742077"),
    addTime: ISODate("2020-05-15T13:52:55.808Z"),
    views: NumberInt("0"),
    description: "ashjckhakjdl",
    content: "考虑四大皆空工具打开",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "MongoDB",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebea03b94e95e3b90742078"),
    addTime: ISODate("2020-05-15T13:52:55.808Z"),
    views: NumberInt("0"),
    description: "案发时即可",
    content: "看到就开始的",
    category: ObjectId("5ebd5ba64ec6dd2ac45494e5"),
    title: "大学必学C语言",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebea06694e95e3b90742079"),
    addTime: ISODate("2020-05-15T13:52:55.808Z"),
    views: NumberInt("0"),
    description: "afkljlk",
    content: "jkjkfdk肯德基副科级",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "sql server",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ebedc4bb4c2f1435c853849"),
    addTime: ISODate("2020-05-15T18:11:48.439Z"),
    views: NumberInt("8"),
    description: "大法师",
    content: "阿十方三世",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "后端",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("2")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec220d254a2f147b8dd7199"),
    addTime: ISODate("2020-05-18T05:34:13.22Z"),
    views: NumberInt("0"),
    description: "node开发",
    content: "javascript相关知识\r\n\r\nhttps://www.runoob.com/js/js-tutorial.html\r\n\r\nNode.js 创建第一个应用\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-http-server.html\r\n\r\nNPM 使用介绍\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-npm.html\r\n\r\nNode.js REPL\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-repl.html\r\n\r\nNode.js 回调函数\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-callback.html\r\n\r\nNode.js 事件循环\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-event-loop.html\r\n\r\nNode.js EventEmitter\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-event.html\r\n\r\nNode.js Buffer\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-buffer.html\r\n\r\nNode.js Stream\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-stream.html",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "nodejs开发基础",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec221ef54a2f147b8dd719a"),
    addTime: ISODate("2020-05-18T05:34:13.22Z"),
    views: NumberInt("1"),
    description: "稍等",
    content: "是大V",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "后端开发",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec223932b47ce21e00f6088"),
    views: NumberInt("0"),
    description: "部署nodejs的开发环境",
    content: "2.部署nodejs的开发环境\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-install-setup.html",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "部署nodejs的开发环境",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-05-18T05:56:35.892Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec223b12b47ce21e00f6089"),
    views: NumberInt("0"),
    description: "nodejs开发",
    content: "javascript相关知识\r\n\r\nhttps://www.runoob.com/js/js-tutorial.html\r\n\r\nNode.js 创建第一个应用\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-http-server.html\r\n\r\nNPM 使用介绍\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-npm.html\r\n\r\nNode.js REPL\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-repl.html\r\n\r\nNode.js 回调函数\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-callback.html\r\n\r\nNode.js 事件循环\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-event-loop.html\r\n\r\nNode.js EventEmitter\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-event.html\r\n\r\nNode.js Buffer\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-buffer.html\r\n\r\nNode.js Stream\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-stream.html\r\n\r\n",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "3.nodejs开发基础（4课时）",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-05-18T05:57:05.127Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec223f12b47ce21e00f608a"),
    views: NumberInt("2"),
    description: "模块管理",
    content: "4.1 Node.js 函数\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-function.html\r\n\r\n4.2 Node.js 路由\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-router.html\r\n\r\n4.3 nodejs的模块管理\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-module-system.html\r\n\r\n4.4 Node.js 工具模块\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-utitlity-module.html\r\n\r\n4.5 Node.js Web 模块\r\n\r\nhttps://www.runoob.com/nodejs/nodejs-web-module.html",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "4.nodejs的模块管理（8课时）",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-05-18T05:58:09.142Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ec224332b47ce21e00f608b"),
    views: NumberInt("29"),
    description: "node+express+mongodb",
    content: "1\r\n使用Express框架开发个人博客系统（数据库建议采用mongodb）\r\n\r\n1 能带头像注册（密码请加密存放），能登录 \r\n\r\n2 登录过程需要记载用户信息，登录成功后，在博客页面显示用户信息（用户名，头像）\r\n\r\n3 登录后可发表博客，可修改博客，可删除博客，可回复博客\r\n\r\n4 可显示博客浏览量\r\n\r\n5 未登录只能浏览博客",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "个人博客开发",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-05-18T05:59:15.491Z"),
    __v: NumberInt("4")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ed7a26575bf083254e27486"),
    views: NumberInt("1"),
    description: "dskdnlk",
    content: "lkj;ldjs;l",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "java后端",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-06-03T13:15:17.73Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("5ef0ad917ac1ec203c6c2eab"),
    views: NumberInt("1"),
    description: "关于28号提交的实验报告，跟大作业提交时间是一致的。",
    content: "有五个实验报告要写",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "实验报告",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2020-06-22T13:09:37.892Z"),
    __v: NumberInt("2")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("601957f437fac134b8872a95"),
    views: NumberInt("1"),
    description: "四川省·",
    content: "是是是",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "1111",
    user: ObjectId("60194f4219230c385842df1c"),
    addTime: ISODate("2021-02-02T13:47:32.083Z"),
    __v: NumberInt("2")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("60475ecef6e43079f8dd9377"),
    views: NumberInt("3"),
    description: "三个大使馆",
    content: "1111111",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "博客园",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2021-03-09T11:41:02.816Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("6047856507b930166c747544"),
    views: NumberInt("0"),
    description: "四川省·",
    content: "是是是",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "1111",
    user: ObjectId("5ebac6ab7f59af18be34ff95"),
    addTime: ISODate("2021-03-09T14:25:41.494Z"),
    __v: NumberInt("1"),
    thumbs: NumberInt("1"),
    thumbsArr: [
        {
            _id: "5ebac6ab7f59af18be34ff95",
            username: "admin",
            img: "/img/image/Qins.jpg",
            isAdmin: true
        }
    ]
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("604785e9ad8f39417c87086a"),
    views: NumberInt("36"),
    description: "asfasfsa",
    content: "sfzvs",
    category: ObjectId("5ebd3af143bac116b0165758"),
    title: "1212",
    user: ObjectId("5ec22df448282a1c289921cb"),
    addTime: ISODate("2021-03-09T14:27:53.752Z"),
    __v: NumberInt("4"),
    thumbs: NumberInt("1"),
    thumbsArr: [
        {
            _id: "5ebac6ab7f59af18be34ff95",
            username: "admin",
            img: "/img/image/Qins.jpg",
            isAdmin: true
        }
    ]
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("60478602ad8f39417c87086b"),
    views: NumberInt("106"),
    description: "vds,mvkn",
    content: "不是的苦恼",
    category: ObjectId("5ebd3afc43bac116b0165759"),
    title: "明白了",
    user: ObjectId("5ec22df448282a1c289921cb"),
    addTime: ISODate("2021-03-09T14:28:18.423Z"),
    __v: NumberInt("10"),
    thumbs: NumberInt("1"),
    thumbsArr: [
        {
            _id: "5ebac6ab7f59af18be34ff95",
            username: "admin",
            img: "/img/image/Qins.jpg",
            isAdmin: true
        }
    ],
    comments: [ ]
} ]);
db.getCollection("contents").insert([ {
    _id: ObjectId("60478614ad8f39417c87086c"),
    views: NumberInt("539"),
    description: "导致南方",
    content: "反对者负责",
    category: ObjectId("5ebd547d2815292a645bcbcf"),
    title: "大四快你看了",
    user: ObjectId("5ec22df448282a1c289921cb"),
    addTime: ISODate("2021-03-09T14:28:36.954Z"),
    __v: NumberInt("25"),
    thumbs: NumberInt("1"),
    thumbsArr: [
        {
            _id: "5ebac6ab7f59af18be34ff95",
            username: "admin",
            img: "/img/image/Qins.jpg",
            isAdmin: true
        }
    ],
    comments: [
        {
            id: "b5c88671450e4dcf8c09baa2b560fc87",
            username: "admin",
            postTime: ISODate("2021-04-10T09:52:42.895Z"),
            content: "设备接口",
            replyArr: [
                {
                    id: "e7cbc270f823492d9c066fbd61ebd746",
                    username: "2222",
                    postTime: ISODate("2021-04-10T11:09:36.826Z"),
                    content: "回复(admin):什么接口",
                    replyArr: [ ]
                }
            ]
        },
        {
            id: "2a24182cca414eb7b94812140cd590f6",
            username: "admin",
            postTime: ISODate("2021-04-10T11:36:07.501Z"),
            content: "555",
            replyArr: [
                {
                    id: "347ca65c17e642ec9df15c025322e9bf",
                    username: "2222",
                    postTime: ISODate("2021-04-10T11:36:23.63Z"),
                    content: "回复(admin):酷酷酷",
                    replyArr: [ ]
                }
            ]
        },
        {
            id: "abc209fb846a43679acfcd48598b1345",
            username: "admin",
            postTime: ISODate("2021-04-10T11:42:21.25Z"),
            content: "op",
            replyArr: [
                {
                    id: "871cbebd31b34561bdd87e4c64270708",
                    username: "2222",
                    postTime: ISODate("2021-04-10T11:42:42.476Z"),
                    content: "回复(admin):po",
                    replyArr: [ ]
                }
            ]
        },
        {
            id: "6ef91c88cd8a42c7b72ad7300ddff3fa",
            username: "admin",
            postTime: ISODate("2021-04-10T15:55:04.842Z"),
            content: "666",
            replyArr: [ ]
        },
        {
            id: "c7edf1a3910e4dabbe1d52c76a28b08a",
            username: "2222",
            postTime: ISODate("2021-04-10T15:57:51.948Z"),
            content: "优化回复评论完成",
            replyArr: [
                {
                    id: "b06f4963c1ac493fbf573a47fcb80160",
                    username: "admin",
                    postTime: ISODate("2021-04-10T16:00:44.137Z"),
                    content: "回复(2222):辛苦了",
                    replyArr: [ ]
                },
                {
                    id: "447eb8fd351a4b6487344e8a7311d387",
                    username: "root",
                    postTime: ISODate("2021-04-12T06:00:15.617Z"),
                    content: "回复(2222):这样的回复评论还不行吗？",
                    replyArr: [ ]
                }
            ]
        },
        {
            id: "a94e2ddd29bc45ba935b21f4c41c391b",
            username: "root",
            postTime: ISODate("2021-04-12T08:22:34.19Z"),
            content: "11",
            replyArr: [
                {
                    id: "c5aed7da021a4317bf6266a597a755de",
                    username: "admin",
                    postTime: ISODate("2021-04-12T09:12:59.35Z"),
                    content: "回复(root):root111",
                    replyArr: [ ]
                },
                {
                    id: "6cb0d2e76b134a5ba86506eca88d0255",
                    username: "admin",
                    postTime: ISODate("2021-04-12T09:13:16.367Z"),
                    content: "回复(root):888",
                    replyArr: [ ]
                },
                {
                    id: "5ee740ce9b7b4a90b0cb1a59da3a8f83",
                    username: "admin",
                    postTime: ISODate("2021-04-12T09:28:08.14Z"),
                    content: "回复(root):最新回复",
                    replyArr: [ ]
                }
            ]
        }
    ]
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("5ebac6ab7f59af18be34ff95"),
    username: "admin",
    password: "21232f297a57a5a743894a0e4a801fc3",
    isAdmin: true,
    img: "/img/image/Qins.jpg",
    __v: 0
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5ec22d9c48282a1c289921c8"),
    img: "/img/image/1.jpg",
    isAdmin: false,
    username: "root",
    password: "21232f297a57a5a743894a0e4a801fc3",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5ec22db348282a1c289921c9"),
    img: "/img/image/2.jpg",
    isAdmin: false,
    username: "lucy",
    password: "698d51a19d8a121ce581499d7b701668",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5ec22dd148282a1c289921ca"),
    img: "/img/image/3.jpg",
    isAdmin: false,
    username: "KIKI",
    password: "e10adc3949ba59abbe56e057f20f883e",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5ec22df448282a1c289921cb"),
    img: "/img/image/7.jpg",
    isAdmin: false,
    username: "czf",
    password: "00b7691d86d96aebd21dd9e138f90840",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5ec22e8248282a1c289921cc"),
    img: "/img/image/6.jpg",
    isAdmin: false,
    username: "1011",
    password: "e3ceb5881a0a1fdaad01296d7554868d",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60194f4219230c385842df1c"),
    img: "/img/image/015.jpg",
    isAdmin: false,
    username: "1234",
    password: "e3ceb5881a0a1fdaad01296d7554868d",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6070d31c9102382f8ca97a3e"),
    img: "/img/image/15.jpg",
    isAdmin: false,
    username: "2222",
    password: "e3ceb5881a0a1fdaad01296d7554868d",
    __v: NumberInt("0")
} ]);
