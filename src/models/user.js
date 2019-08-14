'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId //声明Object类型

const userSchema = new Schema({
  user_id:{type:ObjectId},
  username:{unique:true,type:String},
  password:String,
  createAt:{type:Date, default:Date.now()},
  lastLoginAt:{type:Date, default:Date.now()}
},{
  collection:'user'
})

const User = mongoose.model('User',userSchema)

export default User