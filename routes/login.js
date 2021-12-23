const express=require('express');
const routes=express.Router();
//调用md5-node插件
const md5=require('md5-node');
const mysql=require('mysql');
var pool=mysql.createPool({
//    最大链接数
    connectionLimit:10,
//    主机
    host:'localhost',
//    数据库登陆用户名
    user:'root',
//    登录密码
    password:'0826',
//    当前项目链接的数据库
    database:'personmessage'
})

//设置路由规则
routes.route('/')
    .get((req,resp)=>{
//    渲染视图
        resp.render('login',{
            msg:null
        });
    })
    .post((req,resp)=>{
        const number=req.body.number.trim();
        const username=req.body.username.trim();
        const password=md5(req.body.password.trim());

        var sql=`select * from login where port_id=${number} and loginame='${username}' and pwd='${password}'`;
        // console.log(sql)
        pool.getConnection(function (error,connection) {
            if (error) throw error;
            connection.query(sql,(err,result)=>{
                connection.release();
                if(result.length !=0){
                    resp.cookie('numbers',number,{maxAge:86400000,httpOnly:true})
                    resp.cookie('names',username,{maxAge:86400000,httpOnly:true})
                    resp.cookie('passwords',password,{maxAge:86400000,httpOnly:true})
                    resp.redirect('/index')
                }else{
                    //resp.redirect('/');
                    resp.render('login',{
                        msg:'账号或密码输入有误'
                    })
                }
            //    判断错误是否为真
                if (err) throw err;
            })
        })
    })
//允许访问路由实例
module.exports=routes;