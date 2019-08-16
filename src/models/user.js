'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId //声明Object类型

const userSchema = new Schema({
  user_id:{type:ObjectId},
  username:{unique:true,type:String},
  password:String,
  createAt:{type:Date, default:Date.now()},
  lastLoginAt:{type:Date, default:Date.now()},
  city: String,
  avatar: {type: String, default: 'default.jpg'},
  mobile: {type: String, default: ''},
  email: {type: String, default: ''},
  is_active: {type: Number, default: 1},
	is_email_valid: {type: Boolean, default: false},
  is_mobile_valid: {type: Boolean, default: true},
  current_address_id: {type: Number, default: 0},
},{
  collection:'user'
})

const User = mongoose.model('User',userSchema)

export default User