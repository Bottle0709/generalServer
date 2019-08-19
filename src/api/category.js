'use strict';

import CategoryModel from '../models/category'
import ActivityModel from '../models/activity'
import DeliveryModel from '../models/delivery'

class Category {
   //获取分类
   async getCategories(req,res,next){
      try{
         const categories = await CategoryModel.find({},'-_id')
         res.send(categories)
      }catch(err){
        console.log('获取categories失败')
        res.send({
          status:201,
          type:'ERROR_DATA',
          message:'获取categories失败'
        })
      }
   }
   //获取商家服务
   async getDelivery(req,res,next){
     try{
       const deliveries = await DeliveryModel.find({},'-_id')
       res.send(deliveries)
     }catch(err){
        console.log('获取deliveries失败')
        res.send({
          status:201,
          type:'ERRPR_DATA',
          message:'获取deliveries失败'
        })
     }
   }
   //获取活动列表
   async getActivity(req,res,next){
    try{
      const activity = await ActivityModel.find({},'-_id')
      res.send(activity)
    }catch(err){
       console.log('获取activity失败')
       res.send({
         status:201,
         type:'ERRPR_DATA',
         message:'获取activity失败'
       })
    }
  }
}

export default new Category()