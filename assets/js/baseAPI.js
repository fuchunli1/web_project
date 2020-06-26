// 注意：每次调用$.get()或$.post()的时候
// 会先调用ajaxPrefilter 这个函数
// 这个函数中，可以拿搭配我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的AJax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url
 //   console.log(options.url);  //请求的地址/api/login

  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
    // 无论成功还是失败都会执行complete
    options.complete = function(res) {
      // console.log('执行了 complete 回调：')
      // console.log(res)
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '/login.html'
      }
    }
})