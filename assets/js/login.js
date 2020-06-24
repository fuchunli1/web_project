$(function(){//入口函数
    // 点击去注册链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui 中获取 from
    var form = layui.form;
    // 从layui 中获取 layer 提示信息
    var layer = layui.layer;
    // 通过from.verify()函数自定义校验规则
    form.verify({
        // 自定义一个pwd 校验规则
        pass: [/^[\S]{6,12}$/  ,'密码必须6到12位，且不能出现空格' ] ,

        // 校验两次密码是否一致
       repwd:function(value,item){ //value 是输入的值 item 是dom对象
        // 通过形参拿到是否确认密码中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 去过判断失败,则return一个提示消息即返回即可
     var pwd =  $('#mima').val();
        if(pwd !== value){
            return '两次密码不一致'
        }
        }
   
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault();
        var data = {username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()} 
        // 发起Post 请求
        $.post('/api/reguser',data,function(res){
            
        if(res.status !== 0){
            // return console.log(res.message);
            // 用layui 提示
            return layer.msg(res.message)
            
        }
       // console.log('注册成功了');
       layer.msg('注册成功，请登录')
    //    模拟人的点击行为
    $('#link_login').click();
        

        });


    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(){
        // 阻止表单的默认提交行为
        $.ajax({
            method:'POST',
            url:'/api/login',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录失败')
                // 跳到后台主页
                location.href = ''
           

            }
           
        })
    })

})