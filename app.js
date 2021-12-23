//入口文件
//1. 导入相关的模块
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

//2.创建应用实例
const app=express();

//3.设置模板引擎
app.set('views',path.join(__dirname,'template'));
app.set('view engine','ejs');

//4.应用中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

//5.加载静态目录public
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

//8.导入moment插件
const moment=require('moment');
app.locals.moment=moment;

//7.调用业务模块
const login=require('./routes/login');
const loginout=require('./routes/loginout');
const index=require('./routes/index');
const checkpwd=require('./routes/checkpwd');
const paylist=require('./routes/paylist');
const hrselect=require('./routes/hr_select');
const hrupd=require('./routes/hr_upd');
const hradd=require('./routes/hr_add');
const accpaylist=require('./routes/acc_paylist');
const accpayadd=require('./routes/acc_payadd');
const accrank=require('./routes/acc_rank');

//设置访问地址
app.use('/',login);
app.use('/loginout',loginout);
app.use('/index',index);
app.use('/checkpwd',checkpwd);
app.use('/paylist',paylist);
app.use('/hr_select',hrselect);
app.use('/hr_upd',hrupd);
app.use('/hr_add',hradd);
app.use('/acc_paylist',accpaylist);
app.use('/acc_payadd',accpayadd);
app.use('/acc_rank',accrank);

//6.开启监听
app.listen(3031,()=>{
    console.log('开启监听');
})