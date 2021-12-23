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
var numbers;
var uname;
routes.route('/')
    .get((req,resp)=>{
        numbers=req.cookies.numbers;
        uname=req.cookies.uname;
                //渲染视图
        resp.render('checkpwd',{
            numbers:numbers,
            uname:uname,
            msg:null
        })
})
    .post((req,resp)=>{
        //    1.将输入框的密码与cookie内的密码比较，如果一致才能继续执行程序
        var oldpwd=md5(req.body.oldpwd.trim());
        var cookiepwd=req.cookies.passwords;
        if(oldpwd!=cookiepwd) {
            //输入的原密码与cookie的密码不匹配，无法更改
            //resp.redirect('/checkpwd');  // 刷新自己
            resp.render('checkpwd',{
                numbers:numbers,
                uname:uname,
                msg:'原密码输入有误'
            })
            return false;
        }

        //    2.比较新密码与确认密码是否一致，如果一致才能继续执行
        var newpwd=req.body.newpwd.trim();
        var checkpwd=req.body.checkpwd.trim();
        if(newpwd!=checkpwd||newpwd==''||checkpwd==''){
           // resp.redirect('/checkpwd');// 刷新自己
           resp.render('checkpwd',{
            numbers:numbers,
            uname:uname,
            msg:'两次输入的新密码不一致'
        })
            return false;
        }
        //    3.拼接sql语句：update
        var names=req.cookies.names;
        var sql=`update login set pwd=md5('${newpwd}') where loginame='${names}'`;

        // console.log(sql);

        //    4.链接数据库+执行sql语句
        pool.getConnection((error,connection)=>{
            if(error)throw error;
            connection.query(sql,(err,result)=>{
                connection.release();

                if(result){
                    resp.clearCookie('names');
                    resp.clearCookie('passwords');
                    resp.redirect('/')
                }
                if(err) throw err;
            })
        })
    })

//允许访问路由实例
module.exports=routes