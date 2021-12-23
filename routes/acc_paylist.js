const express=require('express');
const routes=express.Router();
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
        //    拼接sql语句
        var sql=`select (education.edu_money+station.sta_money+pay.kbi+pay.perfor-350) as zong, permsg.uname,pay.kbi,pay.perfor,pay.status,education.edu_money,station.sta_money from permsg LEFT JOIN education ON permsg.edu_id=education.id LEFT JOIN pay ON permsg.id=pay.per_id LEFT JOIN station ON station.id=pay.sta_id WHERE permsg.\`status\`=1`;
        // console.log(sql);
//        执行sql语句
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sql,(errs,result)=>{
                connection.release();
                //    渲染视图
                resp.render('acc_paylist',{
                    result:result,
                });
                if(errs)throw errs;
            })
        })
    })

//允许访问路由实例
module.exports=routes;