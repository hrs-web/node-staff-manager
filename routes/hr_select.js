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
    database:'personmessage',
})

routes.get('/',(req,resp)=>{
//    拼接sql语句
        var sql=`select permsg.*,pay.kbi,pay.perfor,education.education,education.edu_money,station.sta_name,station.sta_money from permsg LEFT JOIN education ON permsg.edu_id=education.id LEFT JOIN login ON login.per_id=permsg.id LEFT JOIN station ON station.id=login.port_id LEFT JOIN pay ON permsg.id=pay.per_id`;
        // console.log(sql);
//        执行sql语句
        pool.getConnection((error,connection)=>{
            if(error) throw error;
            connection.query(sql,(errs,result)=>{
                    connection.release();
                    for(var i=0;i<result.length;i++){
                        var year=new Date(result[i].entryTime).getFullYear();
                        var mon=new Date(result[i].entryTime).getMonth()+1;
                        var date=new Date(result[i].entryTime).getDate();
                        if(mon<=9){
                            mon='0'+mon;
                        }
                        if(date<=9){
                            date='0'+date;
                        }
                        result[i].entryTime=`${year}-${mon}-${date}`;

                        var years=new Date(result[i].birthday).getFullYear();
                        var mons=new Date(result[i].birthday).getMonth()+1;
                        var dates=new Date(result[i].birthday).getDate();
                        if(mon<=9){
                            mons='0'+mons;
                        }
                        if(date<=9){
                            dates='0'+dates;
                        }
                        result[i].birthday=`${years}-${mons}-${dates}`;
                    }
                    
                    //    渲染视图
                    resp.render('hr_select',{
                        result:result,
                    });
                if(errs)throw errs;
            })
        })
    })

//删除数据
routes.post('/del',(req,resp)=>{
var perid=req.query.id;
//拼接sql语句
    var sqlpay=`delete from pay where per_id=${perid}`;
    // console.log(sqlpay);
//    执行sql语句
    pool.getConnection((error,connection)=>{
        if(error) throw error;
        //执行删除的sql语句
        connection.query(sqlpay,(errs,result)=>{
            //    判断第一个删除是否成功
            if(result){
                var sqlmsg=`delete from login where per_id=${perid}`;
                connection.query(sqlmsg,(err,res)=>{
                    if(res){
                        var sqlupdate=`update permsg set status=0 where id=${perid}`;
                        connection.query(sqlupdate,(err,res)=>{
                            connection.release();
                            if(res){
                                //    如果删除成功，返回ajax的结果为1
                                resp.send({code:1});
                            }else{
                                //    如果删除失败，返回ajax的结果为0
                                resp.send({code:0});
                            }
                            if(err) throw  err;
                        })
                    }

                    if(err) throw  err;
                })
            }
            if(errs) throw errs;
        })
    })
})

//允许访问路由实例
module.exports=routes;