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
routes.get('/',(req,resp)=>{
        var selectsta=`select * from station`;
        // console.log(selectsta);
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(selectsta,(errs,result)=>{
                var selectedu=`select * from education`;
                // console.log(selectedu);
                connection.query(selectedu,(err,res)=>{
                    connection.release();
                    //    渲染视图
                    resp.render('acc_rank',{
                        result:result,
                        res:res
                    })
                    if(err)throw err;
                })
                if(errs)throw errs;
            })
        })
    })
routes.post('/edu',(req,resp)=>{
        //获取要修改的底薪id和底薪金额
        var edu_id=req.query.id;
        // console.log(sta_id)
        var edu_money=req.body.edu_money;

        //拼接修改底薪sql语句
        var updateedu=`update education set edu_money=${edu_money} where id=${edu_id}`;
        // console.log(updateedu);
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(updateedu,(errs,result)=>{
                    connection.release();
                    //    渲染视图
                   resp.redirect('/acc_rank')

                if(errs)throw errs;
            })
        })
    })
routes.post('/sta',(req,resp)=>{
    // 获取要修改的津贴id和津贴金额
    var sta_id=req.query.id;
    // console.log(sta_id)
    var sta_money=req.body.sta_money;
    // 拼接修改津贴sql语句
    var updatesta=`update station set sta_money=${sta_money} where id=${sta_id}`;
    // console.log(updatesta);
    pool.getConnection((error,connection)=>{
        connection.query(updatesta,(err,res)=>{
            connection.release();
            // 渲染视图
            resp.redirect('/acc_rank')
            if(err)throw err;
        })
    })
})

module.exports=routes;