'use strict';

import mongoose from 'mongoose'
import deliveryData from '../../InitData/delivery'

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
	description: String,
	icon_color: String,
	icon_name: String,
	id: Number,
	name: String,
	ranking_weight: Number
})

deliverySchema.index({index: 1});

const Delivery = mongoose.model('Delivery', deliverySchema);

Delivery.findOne((err, data) => {
	if (!data) {
		deliveryData.forEach(item => {
			Delivery.create(item);
		})
	}
}) 

export default Delivery