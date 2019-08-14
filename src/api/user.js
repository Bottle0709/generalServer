var jwt = require('jsonwebtoken')
var {paramAll,encryPassword,createSign} = require('../components/common')
var TOKENSECRET = 'jsonwebtoken20190613150331';
const mongoose = require('mongoose')
import UserModel from '../models/user'

class User {
  //生成token
  async create_token(req,res,next){
    var par = paramAll(req)
    var userInfo = {
     user_id:par.user_id,
     username:par.username,
     password:encryPassword(par.password)
    }

    var token =jwt.singn(userInfo,TOKENSECRET,{
        expiresIn:'48h',
        issuer:'niyueling'
    })

    return res.json(new PKG(token));
}
  //登录
   async login(req,res,next){
       var par = paramAll(req)

       //加密生成签名sign
       var param = createSign({
        user_id:par.user_id,
        username:par.username,
        password:encryPassword(par.password)
       }, 'niyueling111222333')

       if(param.singn == param.singn){
           //签名验证成功，数据库验证账号密码是否匹配
          const User = mongoose.model('User')
          await User.findOne({username:param.username}).exec().then(async(result)=>{
             if(result){
                if(result.password.toString() == param.password.toString()){
                  return res.status(200).json({msg:'登录成功'});
                }else{
                  return res.status(201).json({error:'密码不正确'});
                }
             }
             else{
              return res.status(201).json({error:'用户不存在'});
             }
          }).catch(err=>{
            return res.status(401).json({error:err});
          })
       }
   }
   //退出
   async signout(req,res,next){

  }
  //注册
  async register(req,res,next){
    var par = paramAll(req)
    const user = await UserModel.findOne({username:par.username})
    if(!user){
      var newUser = {
        username:par.username,
        password:encryPassword(par.password)
       }
       const createUser = new UserModel(newUser)
       await createUser.save().then(()=>{
        return res.status(200).json({msg:'注册成功'});
       }).catch(err=>{
        return res.status(201).json({error:err});
       })
    }else{
        return res.status(201).json({msg:'该用户已存在'});
    }
  }
  //改变密码
  async changepassword(req,res,next){
       
  }

}

export default new User()