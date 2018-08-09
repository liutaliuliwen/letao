//ajax 进度条
$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    NProgress.done();
});

//判断是否是登陆页面 是 不要拦截 不是 发生ajax 验证用户是否已经登陆
// 没有登陆 返回登陆页面

if(location.href.indexOf("login.html")<0){
    $.ajax({
        url:" /employee/checkRootLogin",
        method:"get",
        data:"json",
        success:function (info) {
            if(info.error === 400){
                location.href = "login.html";
            }
        }
    })
}

//注销
$(function () {
    $(".logout").click(function () {
        $('.modal').modal('show');
    });

    $("#logout").click(function () {
        $.ajax({
            url:"/employee/employeeLogout",
            method:"get",
            data:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href = "index.html";
                }
            }
        })
    });
});

//点击菜单切换 切换全屏
$(function () {
    $(".lt-top-bar .menu").click(function () {
        $(".lt-aside").toggleClass("animate");
        $(".lt-top-bar").toggleClass("animate");
        $(".lt-content").toggleClass("animate");
    });

    //类别菜单
    $(".nav .category").click(function () {
        $(".sub-category").stop().slideToggle();
        // $(this).addClass("active");

    });

    //判断分类管理是否要折叠
    if($(".nav .user-manage").hasClass("active")||$(".nav .product").hasClass("active")){
        $(".sub-category").stop().slideUp();
    }else{
        $(".sub-category").stop().slideDown();
    }
});