var prepage = 5;//一页加载数
var page = 1;//当前页
var pages = 0;//总页数
var comments = [];//评论信息

//提交评论
$('#messageBtn').on('click', function() {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),//当前博文id
            content: $('#messageContent').val(),//评论信息
        },
        success: function(responseData) {
            //console.log(responseData);
            $('#messageContent').val('');
            comments = responseData.data.comments.reverse();//将评论信息顺序按最新的排序
            renderComment();
        }
    })
});

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function(responseData) {
        comments =responseData.data.reverse();
        renderComment();//调用函数
    }
});

//对评论内容进行分页
$('.pager').delegate('a', 'click', function() {
    if ($(this).parent().hasClass('previous')) {
        page--;//上一页
    } else {
        page++;//下一页
    }
    renderComment();//调用函数
});

function renderComment() {

    $('#messageCount').html(comments.length);//显示评论数

    pages = Math.max(Math.ceil(comments.length / prepage), 1);//计算总页数
    var start = Math.max(0, (page-1) * prepage);//一页起始index
    var end = Math.min(start + prepage, comments.length);//一页结束index

    var $lis = $('.pager li');//抓取分页的div图层里的li标签
    $lis.eq(1).html( page + ' / ' +  pages);//插到第2个li标签中

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');//插到第1个li标签中
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');//插到第1个li标签中
    }
    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');//插到第3个li标签中
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');//插到第3个li标签中
    }

    if (comments.length == 0) {
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
    } else {
        var html = '';
        for (var i=start; i<end; i++) {
            html += '<div class="messageBox">'+
                '<p class="name clear"><span class="fl">'+comments[i].username+'</span><span class="fr">'+ formatDate(comments[i].postTime) +'</span></p><p>'+comments[i].content+'</p>'+
                '</div>';
        }
        $('.messageList').html(html);//插到评论栏中
    }

}
//获取系统当前时间
function formatDate(time) {
    var date1 = new Date(time);//获取当前时间
    // 以下面的时间格式返回
    return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate() + '日 ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}