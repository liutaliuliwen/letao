$(function () {
    var currentPage = 1;

    render();
    function render(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            method:"GET",
            data:{
                page:currentPage,
                pageSize:5,
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var dom = template("template",info);
                $("#category-info").html(dom);
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event,originalEvent,type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }

    $("#addCategory").click(function () {
        $('#myModal').modal('show');
    });

    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',     // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    },
                }
            },

        }
    });

    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();
        // var bootstrapValidator = $("#form").data('bootstrapValidator');
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:$("#form").serializeArray(),
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    //模态框隐藏
                    $('#myModal').modal('hide');
                    //返回到首页
                    currentPage = 1;
                    //重新渲染页面
                    render();
                    //输入框重置
                    var bootstrapValidator = $('#form').data('bootstrapValidator');
                    bootstrapValidator.resetForm(true);
                }

            }
        })
    });


});