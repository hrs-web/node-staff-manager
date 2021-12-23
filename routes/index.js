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
routes.get('/',(req,resp)=>{
    // 获取cookie中的用户名和岗位id
    const numbers=req.cookies.numbers;
    const names=req.cookies.names;

    //拼接sql语句
    var sql=`select permsg.uname,permsg.gender,permsg.age,permsg.birthday,permsg.isMarry,permsg.address,permsg.personNum,permsg.entryTime,education.education,permsg.\`status\` from education LEFT JOIN  permsg ON education.id=permsg.edu_id LEFT JOIN login ON login.per_id=permsg.id where login.loginame='${names}'`;
    // console.log(sql);
    //链接数据库
    pool.getConnection(function (error,connection) {
        if(error) throw error;
        //执行sql语句
        connection.query(sql,(err,result)=>{
            connection.release();
            var year=new Date(result[0].birthday).getFullYear();
            var mon=new Date(result[0].birthday).getMonth()+1;
            var date=new Date(result[0].birthday).getDate();
            if(mon<=9){
                mon='0'+mon;
            }
            if(date<=9){
                date='0'+date;
            }
            result[0].birthday=`${year}-${mon}-${date}`;

            var years=new Date(result[0].entryTime).getFullYear();
            var mons=new Date(result[0].entryTime).getMonth()+1;
            var dates=new Date(result[0].entryTime).getDate();
            if(mons<=9){
                mons='0'+mons;
            }
            if(dates<=9){
                dates='0'+dates;
            }
            result[0].entryTime=`${years}-${mons}-${dates}`;
            resp.cookie('uname',result[0].uname,{maxAge:86400000,httpOnly:true})
                //渲染视图
                resp.render('index',{
                    numbers:numbers,
                    names:names,
                    result:result
                })
            if(err) throw err;
        })
    })


    })

//允许访问路由实例
module.exports=routes;