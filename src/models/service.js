'use strict';

import mongoose from 'mongoose'
import serviceData from '../../initData/service'

const Schema = mongoose.Schema;

const explainSchema = new Schema({
	id: Number,
	category: String,
	icon_name:String,
  icon_code:String, 
	question: [{
		id: Number,
		title: String,
		description: String,
	}],
})

const Service = mongoose.model('Service', explainSchema);

Service.findOne((err, data) => {
	if(!data){
		for (let i = 0; i < serviceData.length; i++) {
			Service.create(serviceData[i]);
		}
	}
})

export default Service