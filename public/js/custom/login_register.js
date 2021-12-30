
$(function() {

    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function() {
        $registerBox.find('.colWarning').html();
        $registerBox.show();
        $loginBox.hide();
    });

    //切换到登录面板
    $registerBox.find('a.colMint').on('click', function() {
        $loginBox.show();
        $registerBox.hide();
    });

    //注册
    $registerBox.find('button').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword:  $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function(result) {
                $registerBox.find('.colWarning').html(result.message);

                if (result.code===0) {
                    //注册成功
                    setTimeout(function() {
                        // $loginBox.show();
                        // $registerBox.hide();
                        window.location.reload();//重载页面
                    }, 1000);
                }
                console.log(result);
            }
        });
    });

    //登录
    $loginBox.find('button').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {

                $loginBox.find('.colWarning').html(result.message);

                if (result.code===0) {
                    //登录成功
                    // window.location.reload();//重载页面
                    setTimeout(function(){
                        window.location.reload();//重载页面

                        // $loginBox.hide();
                        // $userInfo.show();

                        // //显示用户信息
                        // $userInfo.find('.username').html(result.userInfo.username);
                        // $userInfo.find('.info').html('您好，欢迎光临我的博客！');
                    },1000)
                }
            }
        })
    })

    //退出
    $('#logout').on('click', function() {
        $.ajax({
            url: '/api/user/logout',
            success: function(result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        });
    })

});