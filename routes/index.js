'user strict'
import config from 'config-lite';
var expressJwt = require('express-jwt');
import Main from './main'
import Map from './map'
import Shop from './shop'
import Profile from './profile'

export default app =>{
   
   //验证token是否过期并规定哪些路由不用验证
   // app.use(expressJwt({
	//     secret: config.TOKENSECRET
   //    }).unless({
	//      path: ['/main/login','/map/cities','/map/cities/:id','/map/pois',]//除了这个地址，其他的URL都需要验证
   // }));
   app.use('/main',Main)
   app.use('/map',Map)
   app.use('/shop',Shop)
   app.use('/profile',Profile)
   //app.use('/personalcenter',personalcenter)
   
}