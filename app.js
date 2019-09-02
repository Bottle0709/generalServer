import express from 'express';
import config from 'config-lite';
// import cookieParser from 'cookie-parser';
import session from 'express-session';
// import connectMongo from 'connect-mongo'; //该模块用于将session存入mongo中
import winston from 'winston'; //日志
import expressWinston from 'express-winston'; //日志中间插件
import path from 'path';
// import Statistic from './src/middlewares/statistic';
import router from './routes/index';
var bodyParser = require('body-parser')

const {db,initSchemas} = require('./src/database/db.js')

const app = express();

app.all('*',(req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials',true); //可以带Cookies
    res.header('X-Powered-By','3.2.1');
    if(req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// // app.use(Statistic.apiRecord);
// const MongoStore = connectMongo(session);
// app.use(cookieParser()); //cookie运用

// //session运用
// app.use(session({
//     name: config.session.name,
//     secret: config.session.secret,
//     resave: true,
//     saveUninitialized: false,
//     cookie: config.session.cookie,
//     store: new MongoStore({url: config.url})
// }));

//正确日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/' + (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1)  + '-' + (new Date().getDate()) + '-success.log' ////根据日前生成日志成功文件
        })
    ]
}));

//错误日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console ({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/' + (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1)  + '-' + (new Date().getDate()) + '-error.log' //根据日前生成日志错误文件
        })
    ]
}));

//路由
router(app);

app.use(express.static('./public'));
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        return res.status(403).send('token失效')
    }
    res.status(404).send('未找到当前路由');
});

//立即执行函数
;(async () => {
    initSchemas()
  })()

app.listen(config.port); //监听端口