'user strict'
import config from 'config-lite';
var expressJwt = require('express-jwt');
import personalcenter from './users'

export default app =>{
   
   //验证token是否过期并规定哪些路由不用验证
   app.use(expressJwt({
	    secret: config.TOKENSECRET
      }).unless({
	     path: ['/personalcenter/login']//除了这个地址，其他的URL都需要验证
   }));
   
   app.use('/personalcenter',personalcenter)

}