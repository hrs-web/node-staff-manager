const express=require('express');
const routes=express.Router();

//设置路由规则
routes.get('/',(req,resp)=>{
    resp.clearCookie('numbers');
    resp.clearCookie('names');
    resp.clearCookie('passwords');

//    渲染视图
    resp.redirect('/');
})


//允许访问路由实例
module.exports=routes;