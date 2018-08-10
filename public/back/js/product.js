$(function () {
    var currentPage = 1;
    render();
    function render(){
        $.ajax({
            url:"/product/queryProductDetailList",
            method:"GET",
            data:{
                page:currentPage,
                pageSize:2
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var domString = template("template",info);
                $("table tbody").html(domString);
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:1,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event,originalEvent,type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }




});