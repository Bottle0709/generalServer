'use strict';

import mongoose from 'mongoose'
import activityData from '../../InitData/activity'

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
	color: String,
	id: Number,
	is_solid: Boolean,
	text: String
})

ActivitySchema.index({id: 1});

const Activity = mongoose.model('Activity', ActivitySchema);

Activity.findOne((err, data) => {
	if (!data) {
		Activity.create(activityData);
	}
}) 

export default Activity
