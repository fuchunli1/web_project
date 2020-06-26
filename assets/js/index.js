$(function(){  //入口函数
   // 从layui 中获取 layer 提示信息
   var layer = layui.layer;
  getUserInfo()

   // 实现退出功能
   $('#btnLogout').on('click',function(){
    layer.confirm('你确定要退出吗？', {icon: 3, title:'提示'}, function(index){
         // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
       // 2. 重新跳转到登录页面
       location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index);
      });
})
   
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      // headers 就是请求头配置对象
      // headers:{
      //   Authorization:localStorage.getItem('token') ||''
      // },
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        // console.log(res);
      //  console.log(res.data);
        
        
 
        
      //  console.log(res);
        // 调用 renderAvatar 渲染用户的头像
     renderAvatar(res.data)
      },
      // 无论成功还是失败都会执行complete
      // complete:function(res){
      //   //console.log('执行打印 complete 回调');
      //   //console.log(res);
      //   // 服务器返回的数据
      //   if(res.responseJSON.status === 1 && res.res.responseJSON.message === '身份验证失败'){
      //     // 1.强制清空 token
      //     localStorage.removeItem('token')
      //     // 2.强制跳转到登录页面
      //     location.href = '/login.html'

      //   }
        
        
      // }
    })
  }

//   渲染用户头像
function renderAvatar(user){
    // 1.获取用户的昵称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#weclome').html('欢迎&nbsp;&nbsp' + name)
    // 3.按需要渲染用户的头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img')
        .attr('src',user.user_pic).show();
        $('.text-avater').hide()

    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show()


    }
}