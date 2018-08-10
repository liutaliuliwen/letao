$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            method: "get",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var domString = template("template", info);
                $("#category-info").html(domString);
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
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
        var validator = $("#form").data('bootstrapValidator');
        validator.resetForm(true);
        $(".img-box img").prop("src", "images/none.png");
        //按钮重置
        $(".select-category").text("请选择一级分类");
        //发送ajax获取分类
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            method: "GET",
            data: {
                page: 1,
                pageSize: 1000
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var domString = template("menu", info);
                $(".dropdown-menu").html(domString);
            }
        });
    });

    //更新下拉列表

    $(".dropdown-menu").on("click", "li", function () {
        //1. 更新下拉列表
        $(".select-category").text($(this).text());
        //2. 更新隐藏域的值
        $('[name="categoryId"]').val($(this).data("id"));
    });

    //文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data.result);
            //更新图片地址
            $('[name="brandLogo"]').val(data.result.picAddr);
            //修改 图片url

            $(".img-box img").prop("src", data.result.picAddr);
        }
    });

    //点击上传图片）
    $("#uploadPic").click(function (e) {
        e.preventDefault();
        $("#fileupload").click();
    });


    //表单校验
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择品牌图片'
                    }
                }
            },
        }
    });


    //添加2级分类
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:"/category/addSecondCategory",
            method:"POST",
            data:$("#form").serializeArray(),
            dataType:"json",
            success: function (info) {
                console.log(info);
                if(info.success){
                    //隐藏模态框
                    $('#myModal').modal('hide');
                    //局部刷新页面
                    currentPage = 1;
                    render();
                    //
                    // //重置验证状态
                    // var validator = $("#form").data('bootstrapValidator');
                    // validator.resetForm(true);
                    // $(".img-box img").prop("src", "images/none.png");
                }
            }
        })
    });



});