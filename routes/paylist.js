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
routes.get('/',(req,resp)=>{
    //获取cookie中的用户名
    var numbers=req.cookies.numbers;
    var names=req.cookies.names;
    //拼接sql语句
    var sql=`select pay.id,permsg.uname,station.sta_name,pay.\`year\`,pay.\`month\`, education.edu_money, station.sta_money,pay.perfor,pay.kbi,(education.edu_money+station.sta_money+pay.kbi+pay.perfor-350) as zong,pay.status from station LEFT JOIN pay ON station.id=pay.sta_id LEFT JOIN permsg ON permsg.id=pay.per_id LEFT JOIN education ON permsg.edu_id=education.id LEFT JOIN login ON login.per_id=pay.per_id  where login.loginame='${names}'`;
    // console.log(sql);

    //执行sql语句
    pool.getConnection((error,connection)=>{
        if(error) throw error;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(result.length!=0){
                resp.render('paylist',{
                numbers: numbers,
                result:result
                });
            }else{
                resp.redirect('/index');
            }
            
            if(err) throw err;
        })
    })
})
routes.post("/",(req,resp)=>{
    // 获取id
    var id=req.query.id;
    // 拼接字符串
    var update=`update pay set \`status\`=1 where id=${id}`;
    // 执行修改语句
    pool.getConnection((error,connection)=>{
        connection.query(update,(err,res)=>{
            connection.release();
            // 渲染视图
            resp.redirect("/paylist")
            if(err)throw error;
        })
        if(error)throw error;
    })
})
//允许访问路由实例
module.exports=routes