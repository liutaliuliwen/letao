//单击切换导航菜单
$(function () {
    // 分类管理手风琴
    $(".nav .category").click(function () {
        $(".sub-category").stop().slideToggle();
        // $(this).addClass("active");
    });
    //
    // $(".nav .user").click(function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    // });
});





