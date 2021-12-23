const express=require('express');
const routes=express.Router();
const util=require('util');
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
        var sql=`select (education.edu_money+station.sta_money+pay.kbi+pay.perfor-350) as zong,pay.id,pay.per_id,permsg.uname,pay.kbi,pay.perfor,education.edu_money,station.sta_money from permsg LEFT JOIN education ON permsg.edu_id=education.id LEFT JOIN pay ON permsg.id=pay.per_id LEFT JOIN station ON station.id=pay.sta_id  where permsg.\`status\`=1 and pay.kbi=0 and pay.perfor=0`;
        // console.log(sql);
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sql,(errs,result)=>{
                connection.release();
                //    渲染视图
                    resp.render('acc_payadd',{
                        result:result,
                    })
                if(errs)throw errs;
            })
        })
})
    .post((req,resp)=>{
    //    获取未录入薪资的员工 id以及录入的薪资
        var pay_id=req.body.id;
        var kbi=req.body.kbi;
        var perfor=req.body.perfor;

        //   拼接sql语句
        var sql=`update pay set kbi=?,perfor=? where id=?`;
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            // 判断pary_id值是否为数组
            if(Array.isArray(pay_id)){
                for(var i=0;i<pay_id.length;i++){
                    var sqlparams=[kbi[i],perfor[i],pay_id[i]];
                    console.log(sqlparams);
                    //    执行sql语句
                    connection.query(sql,sqlparams,(errs,result)=>{
                        if(errs) throw errs;
                    })
                }
            }else{
                connection.query(sql,sqlparams,(errs,result)=>{
                    var sqlparams=[kbi,perfor,pay_id];
                    console.log(sqlparams);
                    connection.query(sql,sqlparams,(errs,result)=>{
                        if(errs) throw errs;
                    })
                })
            }
            
            connection.release();
        }) 
        resp.redirect('/acc_payadd')
    })




//允许访问路由实例
module.exports=routes;