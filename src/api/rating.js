'use strict';

import RatingModel from '../models/rating'

class Rating {
	constructor(){
		this.type = ['ratings', 'scores', 'tags'];
		this.getRatings = this.getRatings.bind(this);
		this.getScores = this.getScores.bind(this);
		this.getTags = this.getTags.bind(this);
	}
	async initData(shop_id){
		try{
			const status = await RatingModel.initData(shop_id);
			if (status) {
				console.log('初始化评论数据成功');
			}
		}catch(err){
			console.log('初始化评论数据失败');
			throw new Error(err);
		}
	} 
	async getRatings(req, res, next){
		const shop_id = req.params.shop_id;
		if (!shop_id || !Number(shop_id)) {
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: '餐馆ID参数错误'
			})
			return
		}
		try{
			const ratings = await RatingModel.getData(shop_id, this.type[0]);
			res.send(ratings)
		}catch(err){
			console.log('获取评论列表失败', err);
			res.send({
				status: 0,
				type: "ERROR_DATA",
				message: '未找到当前餐馆的评论数据'
			})
		}
	}
	async getScores(req, res, next){
		const shop_id = req.params.shop_id;
		if (!shop_id || !Number(shop_id)) {
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: '餐馆ID参数错误'
			})
			return
		}
		try{
			const scores = await RatingModel.getData(shop_id, this.type[1]);
			res.send(scores)
		}catch(err){
			console.log('获取评论列表失败', err);
			res.send({
				status: 0,
				type: "ERROR_DATA",
				message: '未找到当前餐馆的评论数据'
			})
		}
	}
	async getTags(req, res, next){
		const shop_id = req.params.shop_id;
		if (!shop_id || !Number(shop_id)) {
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: '餐馆ID参数错误'
			})
			return
		}
		try{
			const tags = await RatingModel.getData(shop_id, this.type[2]);
			res.send(tags)
		}catch(err){
			console.log('获取评论列表失败', err);
			res.send({
				status: 0,
				type: "ERROR_DATA",
				message: '未找到当前餐馆的评论数据'
			})
		}
	}
}

export default new Rating()