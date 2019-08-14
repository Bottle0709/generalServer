/**
 * mongoDB数据库配置
 * Created by admin on 2017/8/31 0031.
 */
'use strict';

import mongoose from 'mongoose';
import config from 'config-lite'; //获取基本信息
import log from '../util/log4jsUtil'; //自定义日志文件，后面我们将会说明
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, '../models/', '**/*.js')).forEach(require)
  }

  let maxConnectTimes = 0
   //连接数据库
   mongoose.connect(config.url, {useMongoClient:true});

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  
  db.once('open' ,() => {
    console.log('mongooDB数据库连接成功.端口号：' + config.port);
    //log.info('mongooDB数据库连接成功.端口号：' + config.port); //自定义日志存储
  })
  
  db.on('error', function(error) {
    console.log('mongooDB数据库断开，请重新连接.')
    if (maxConnectTimes < 3) {
      maxConnectTimes++
      mongoose.connect(db)
    } else {
      console.error('数据库出现问题，程序无法搞定，请人为修理...' + error);
      log.debug('数据库出现问题，程序无法搞定，请人为修理' + error); //自定义日志存储
      mongoose.disconnect();
    }
  });
  
  db.on('close', function() {
      //进行重连
      console.log('mongooDB数据库断开，请重新连接.');
      log.trace('mongooDB数据库断开，请重新连接.');
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(config.url, {server:{auto_reconnect:true}});
      } else {
        reject()
      }
  });

export default db;