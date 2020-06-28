$(function(){  //入口函数
    var form = layui.form
    // 自定义校验规则
    form.verify({ 
        pwd:[/^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格' ],
        // 校验两次密码是否一致
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }

        },
        // 校验重置密码是否与新密码相同
        resPwd:function(value){
            if(value !== $('[name = newPwd]').val()){
                return '重置密码密码不一致'
            }

        }
    })


    // 发起表单提交
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认行为
        e.preventDefault()
      
        
        $.ajax({
          method: 'POST',
          url: '/my/updatepwd',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
          }
        })
      })


})