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
        //从地址栏上获取到点击的学生姓名
        var id=req.query.id;
        var sql=`select * from permsg where id='${id}'`;
        // console.log(sql);

        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sql,(errs,result)=>{
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
                //   渲染视图
                resp.render('hr_upd',{
                    result:result
                });
                if(errs) throw errs;
            })
        })


    })
    .post((req,resp)=>{
        //从表单中提取相关信息资料
        const id = req.body.id;
        var uname=req.body.uname;
        var gender=req.body.gender;

        //日期转换成时间戳
        // var birthday= new Date(req.body.birthday).getTime();
        //计算年龄 
        // var nowtmp=new Date(Date.now()).getFullYear();
        // var bits=new Date(birthday).getFullYear();
        var age=req.body.age;
        //入职时间转换成时间戳
        //var entryTime= new Date(req.body.entryTime).getTime();
        var personNum=req.body.personNum;
        var isMarry=req.body.isMarry;
        var address=req.body.address;
        var edu_id=req.body.edu_id;
        var entryTime=req.body.entryTime;
        var status=req.body.status;

        //    拼接sql语句
        var sql=`update permsg set uname='${uname}',gender=${gender},age=${age},entryTime='${entryTime}',isMarry=${isMarry},address='${address}',entryTime='${entryTime}',edu_id=${edu_id},\`status\`=${status} where id=${id}`;
        // console.log(sql);
        //    执行sql语句
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sql,(errs,result)=>{
                connection.release();

                if(result){
                    resp.redirect('/hr_select')
                }
                if(errs) throw errs;
            })
        })

    })


//允许访问路由实例
module.exports=routes;