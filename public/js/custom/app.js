
(function (Vue) {
    //使用vue.js框架，将response.data数据填充到itemsTemplate模板
    var items = []
     app = new Vue({
        el: '#itemsTemplate',
        data: {
            items: '',
            //添加临时数组对象
            newItems: '',
            //临时数组对象
            editItems: {
                id: '', //id自动+1
                name: '',
                machine_learning: '',
                nodejs: '',
                microservice: '',
                rstudio: '',
                system_safety: '',
            },
            index: -1,
            editIndex: -1,
            delIndex: -1,
            checkall: false, // 正在进行中的数据是否被选中
            pageSize: 5, //一页加载数据
            pageIndex: 0, //当前页面
            total: '', //总数据

        },
        // 生命周期钩子函数(获取后端数据)
        mounted: function () {
            axios.get('http://localhost:8080/msg')
                .then((res) => {
                    if (res.status == 200) {
                        this.editItems= res.data;
                        this.items = res.data;
                        this.total = this.items.length;
                        // this.checkall = this.items.every(items => items.stat);
                        console.log("数据接收成功:\n", res.data);
                        alert(this.items[1].id)
                    }
                });
        },
        // vue计算属性
        computed: {

            pageItems: function () {
                // `this` points to the vm instance
                var startIndex = this.pageIndex * this.pageSize; //当前页面起始index
                var endIndex = startIndex + this.pageSize - 1; //当前页面结束index

                return this.items.filter(function (value, index) {
                    // 显示一个数组的过滤或排序副本，而不实际改变或重置原始数据
                    return (
                        index >= startIndex &&
                        index <= endIndex
                    );
                });
            },
            pageCount: function () {
                // 计算总页数
                var pageCount = Math.ceil(this.items.length / this.pageSize);
                return pageCount;

            },
        },
        // 监听
        watch: {
            pageCount: function () {
                if (this.pageIndex == this.pageCount) {
                    this.pageIndex = this.pageIndex - 1;
                }
                if (items.length <= this.pageSize) {
                    this.pageIndex = 0;
                }
            }
        },
        // 方法
        methods: {
            //上一页
            PrePage: function () {
                if (this.pageIndex > 0) {
                    this.pageIndex -= 1;
                }
            },
            // 下一页
            NextPage: function () {
                if (this.pageIndex < this.pageCount - 1) {
                    this.pageIndex += 1;
                }
            },
            // 添加
            addBox: function () {
                var form = document.getElementsByClassName('validation')[
                    0];
                form.classList.remove('was-validated');
                $('#addModal').modal('show');
                var idd; //id自增
                if (items.length == 0) {
                    idd = 1;
                } else {
                    idd = items[items.length - 1].id + 1;
                }
                var nums; //学号自增
                if (items.length == 0) {
                    nums = 001;
                } else {
                    nums = items[items.length - 1].num + 1;
                }
                this.newItems = {
                    id: idd, //id自动+1
                    num: nums,
                    name: '',
                    sex: '男',
                    class: '软一',
                    course: 'Web',
                    status: '未到',
                    registerDate: '2017-09-01',
                };
            },
            //添加保存
            add: function () {
                var form = document.getElementsByClassName('validation')[
                    0];
                if (form.checkValidity() === true) {
                    //插入到items中
                    var user = {
                        id: app.newItems.id,
                        name: app.newItems.name,
                        sex: app.newItems.sex,
                        registerDate: app.newItems.registerDate,
                        status: app.newItems.status,
                        course: app.newItems.course,
                        class: app.newItems.class,
                    };
                    $.post("/users/create",
                        user,
                        function (data, status) {
                            alert("数据: \n" + data + "\n状态: " + status);
                        });
                    this.items.push(this.newItems);
                    // Vue.set(this.items, this.items.length, this.newItems);
                    $('#addModal').modal('hide');
                };
                form.classList.add('was-validated');
            },
            // 单选删除
            confirmDel: function (index) {
                $('#dangerModal').modal('show');
                // index = i;
                this.delIndex = this.pageIndex * 5 + index;
            },
            del: function () {
                // this.items.splice(this .delIndex, 1);
                $.get("/users/delete/" + this.items[this.delIndex].id,
                    function (data, status) {
                        var temp = data;
                        if (temp) {
                            // alert("数据: \n" + data + "\n状态: " + status);
                        }
                    });
                this.items.splice(this.delIndex, 1);
                $('#dangerModal').modal('hide');
                $('#successModal').modal('show');
            },
            //多项删除
            multipleDel: function () {
                // var editItems;
                $('#multipleModal').modal('hide');
                var flag = 0;
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].select === true) {
                        $.get("/users/delete/" + this.items[i].id, function (
                            data, status) {
                            var temp = data;
                            if (temp == true) {
                                // this.items.splice(i, 1);
                                // i--;
                                // flag = 1;
                                // alert("数据: \n" + data + "\n状态: " + status);
                            }
                        });
                        this.items.splice(i, 1);
                        i--;
                        flag = 1;
                        this.checkAll = false;
                    }
                }
                if (flag === 1) {
                    $('#successModal').modal('show');
                    flag = 0;
                } else {
                    $('#defeatedModal').modal('show');
                }
                this.pageIndex = 0;
            },
            //取消、关闭模态框
            off: function () {
                $('#addModal').modal('hide');
                $('#primaryModal').modal('hide');
                $('#dangerModal').modal('hide');
                $('#multipleDel').modal('hide');
                $('#multipleModal').modal('hide');
                $('#successModal').modal('hide');
                $('#successModal1').modal('hide');
                $('#defeatedModal').modal('hide');
                $('#QJModal').modal('hide');
                $('#GRModal').modal('hide');
                $('#KQModal').modal('hide');
                $('#editsuccess').modal('hide');
                $('#courseModal').modal('hide');
            },
            //编辑
            edit: function (index) {
                var form = document.getElementsByClassName('needs-validation')[
                    0];
                form.classList.remove('was-validated');
                var newIndex = this.pageIndex * 5 + index;
                this.editIndex = newIndex;
                this.editItems = JSON.parse(JSON.stringify(app.items[
                    newIndex]));
                $('#primaryModal').modal('show');
            },
            //编辑后保存
            editSubmit: function () {
                var form = document.getElementsByClassName('needs-validation')[
                    0];
                if (form.checkValidity() === true) {
                    var formData = new FormData();

                    formData.append("user", new Blob([JSON.stringify(this
                        .editItems)], {
                        type: "application/json"
                    }));

                    // var fileInput = document.getElementById("papers");
                    // var files = fileInput.files;
                    // for (var i = 0; i < files.length; i++) {
                    //     var file = files[i];
                    //     formData.append('files', file, file.name);
                    // }

                    $.ajax({
                        url: "/users/edit",
                        type: "POST",
                        data: formData,
                        async: true, //异步
                        processData: false, //很重要，告诉jquery不要对form进行处理
                        contentType: false, //很重要，指定为false才能形成正确的Content-Type
                        success: function (data) {
                            console.log(data);
                        }
                    });

                    Vue.set(this.items, this.editIndex, this.editItems);
                    $('#primaryModal').modal('hide');
                };
                form.classList.add('was-validated');
            },
            //考勤
            eaditAll: function () {
                var flag = 0;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].select == true) {
                        items[i].course = this.editItems.course;
                        items[i].status = this.editItems.status;
                        items[i].select = false;
                        this.checkall = false;
                        i--;
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    $('#KQModal').modal('hide');
                    // $('#editsuccess').modal('show');
                    flag = 0;
                    this.pagesum = Math.ceil(this.items.length / this.pagesize);
                    app.pageindex = 1;
                } else {
                    $('#KQModal').modal('hide');
                    $('#defeatedModal').modal('show');
                }

            },
            // 用户全选
            checkAll() {
                // alert(1)
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].select = this.checkall;
                }
            },
            //用户单选
            checkOne() {
                this.checkall = this.items.every(items => items.select);
            },

        },
    });
    // return;
});