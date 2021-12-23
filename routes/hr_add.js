const express=require('express');
const routes=express.Router();
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
    .get((req,resp)=> {
        resp.render('hr_add')
    })
    .post((req,resp)=>{
        //var per_id=req.body.per_id; //用户id
        var loginame=req.body.loginame; //登录账号
        var pwd=req.body.pwd; //密码
        var uname=req.body.uname;  //姓名
        var gender=req.body.gender; //性别
        var age=req.body.age;  //年龄
        var birthday=req.body.birthday;    //出生年月
        var isMarry=req.body.isMarry  //婚否
        var address=req.body.address;  //现居住地
        var personNum=req.body.personNum; //身份证号码
        var edu_id=req.body.edu_id;  //学历
        var port_id=req.body.port_id; //岗位
        var status=req.body.status;     //在职状态
        var entryTime=req.body.entryTime;  //入职时间
        
        //拼接sql语句
       var sqlpermsg=`INSERT INTO permsg(uname,gender,age,birthday,isMarry,address,personNum,entryTime,edu_id,status) VALUE ('${uname}',${gender},${age},'${birthday}',${isMarry},'${address}',${personNum},'${entryTime}',${edu_id},${status})`;
        console.log(sqlpermsg);
    //    执行sql语句
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sqlpermsg,(errs,result)=>{
                    var per_id=result.insertId;
                    console.log(per_id);
                    var sqllogin=`INSERT INTO login(per_id,loginame,pwd,port_id) VALUE (${per_id},'${loginame}',MD5('${pwd}'),${port_id})`;
                    console.log(sqllogin)
                    connection.query(sqllogin,(err,resps)=>{
                        var sqlpay=`INSERT INTO pay(per_id,edu_id,sta_id,status) VALUE(${per_id},${edu_id},${port_id},0)`;
                        connection.query(sqlpay,(error,respo)=>{
                            connection.release();
                            if (result) {
                                resp.redirect('/hr_select');
                            }
                            if(error) throw error;
                        })
                        if(err) throw err;
                    })
                if(errs) throw errs;
            })
        })
    })


//允许访问路由实例
module.exports=routes;