// 注意：每次调用$.get()或$.post()的时候
// 会先调用ajaxPrefilter 这个函数
// 这个函数中，可以拿搭配我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的AJax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    console.log(options.url);  //请求的地址/api/login
    
})