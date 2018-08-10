$(function () {
    var currentPage = 1;//当前页
    var totalPages; //总页数

    render();
    function render(){
        $.ajax({
            url:"/user/queryUser",
            method:"GET",
            data:{
                page:currentPage,
                pageSize:10
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                totalPages = Math.ceil(info.total / info.size);
                var html = template('template', info);
                document.getElementById('user-info').innerHTML = html;
                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:totalPages,//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        });

    }


    //按钮 显示模态框
    var isdelete;
    var userId;
    $("table.table").on("click","button.btn",function(){
        $("#myModal").modal("show");
        isdelete = $(this).parent().data("isdelete");
        userId = $(this).parent().data("id");

    });


    //更新用户状态
    $("#updateUser").click(function () {
        $.ajax({
            url:"/user/updateUser",
            method:"POST",
            data:{
                id:userId,
                isDelete: 1 - isdelete
            },
            dataType:'json',
            success:function (info) {
                console.log(info);
                $("#myModal").modal("hide");
                currentPage = 1;
                render();
            }
        })
    });


/*    $.ajax({
        url:"/user/queryUser",
        method:"GET",
        data:{
            page:currentPage,
            pageSize:10
        },
        dataType:"json",
        success:function (info) {
            console.log(info);
            totalPages = Math.ceil(info.total / info.size);
            var html = template('template', info);
            document.getElementById('user-info').innerHTML = html;
            //分页
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:currentPage,//当前页
                totalPages:totalPages,//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    currentPage = page;

                }
            });
        }
    });*/






});