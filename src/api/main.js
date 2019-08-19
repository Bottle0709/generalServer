var jwt = require('jsonwebtoken')
var {paramAll,encryPassword,createSign} = require('../components/common')
import config from 'config-lite';
const mongoose = require('mongoose')
import UserModel from '../models/user'
import EntryModel from '../models/foodentry'

class Main {

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
                  //设置token
                  let token =jwt.sign(param,config.TOKENSECRET,{
                       expiresIn:60*60*1, //1小时过期
                  })
                  //存入数据库

                  return res.status(200).send({'msg':'登陆成功','token':token,})
                  
                }else{
                  return res.status(201).send({msg:'密码不正确'});
                }
             }
             else{
              return res.status(201).json({msg:'用户不存在'});
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
   //首页商品分类
   async getEntry(req, res, next){
		try{
			const entries = await EntryModel.find({}, '-_id');
			res.send(entries);
		}catch(err){
			console.log('获取数据失败');
			res.send({
				status: 201,
				type: 'ERROR_DATA',
				message: '获取数据失败'
			})
			return
		}
	}
}

export default new Main()