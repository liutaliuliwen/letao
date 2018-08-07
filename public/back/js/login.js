$(function () {
    $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',     // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 1.用户名不能为空
        //
        // 2.密码不能为空
        //
        // 3.密码在6-18个字符内

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是2-6位"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: "用户名长度必须是6-18位"
                    }
                }
            }
        }
    })

});