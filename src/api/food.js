'use strict';

import {Food as FoodModel, Menu as MenuModel} from '../models/food'
import ShopModel from '../models/shop'
import BaseComponent from '../components/baseComponent'

class Food extends BaseComponent{
	constructor(){
		super();
		this.defaultData = [{
			name: '热销榜',
			description: '大家喜欢吃，才叫真好吃。', 
			icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
			is_selected: true,
			type: 1,
			foods: [],
		}, {
			name: '优惠',
			description: '美味又实惠, 大家快来抢!', 
			icon_url: "4735c4342691749b8e1a531149a46117jpeg",
			type: 1,
			foods: [],
		}]
		this.initData = this.initData.bind(this);
		this.getCategory = this.getCategory.bind(this);
		this.getSpecfoods = this.getSpecfoods.bind(this);
	}
	async initData(restaurant_id){
		for (let i = 0; i < this.defaultData.length; i++) {
			let category_id;
			try{
				category_id = await this.getId('category_id');
			}catch(err){
				console.log('获取category_id失败');
				throw new Error(err);
			}
			const defaultData = this.defaultData[i];
			const Category = {...defaultData, id: category_id, restaurant_id};
			const newFood = new MenuModel(Category);
			try{
				await newFood.save();
				console.log('初始化食品数据成功');
			}catch(err){
				console.log('初始化食品数据失败');
				throw new Error(err);
			}
		}
	}
	async getCategory(req, res, next){
		const restaurant_id = req.params.restaurant_id;
		try{
			const category_list = await MenuModel.find({restaurant_id});
			res.send({
				status: 1,
				category_list,
			})
		}catch(err){
			console.log('获取餐馆食品种类失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
	}
	async getSpecfoods(fields, item_id){
		let specfoods = [], specifications = [];
		if (fields.specs.length < 2) {
			let food_id, sku_id;
			try{
				sku_id = await this.getId('sku_id');
				food_id = await this.getId('food_id');
			}catch(err){
				throw new Error('获取sku_id、food_id失败')
			}
			specfoods.push({
				packing_fee: fields.specs[0].packing_fee,
				price: fields.specs[0].price,
				specs: [],
				specs_name: fields.specs[0].specs,
				name: fields.name,
				item_id,
				sku_id,
				food_id,
				restaurant_id: fields.restaurant_id,
				recent_rating: (Math.random()*5).toFixed(1),
				recent_popularity: Math.ceil(Math.random()*1000),
			})
		}else{
			specifications.push({
				values: [],
				name: "规格"
			})
			for (let i = 0; i < fields.specs.length; i++) {
				let food_id, sku_id;
				try{
					sku_id = await this.getId('sku_id');
					food_id = await this.getId('food_id');
				}catch(err){
					throw new Error('获取sku_id、food_id失败')
				}
				specfoods.push({
					packing_fee: fields.specs[i].packing_fee,
					price: fields.specs[i].price,
					specs: [{
						name: "规格",
						value: fields.specs[i].specs
					}],
					specs_name: fields.specs[i].specs,
					name: fields.name,
					item_id,
					sku_id,
					food_id,
					restaurant_id: fields.restaurant_id,
					recent_rating: (Math.random()*5).toFixed(1),
					recent_popularity: Math.ceil(Math.random()*1000),
				})
				specifications[0].values.push(fields.specs[i].specs);
			}
		}
		return [specfoods, specifications]
	}
	async getMenu(req, res, next){
		const restaurant_id = req.query.restaurant_id;
		const allMenu = req.query.allMenu;
		if (!restaurant_id || !Number(restaurant_id)) {
			console.log('获取餐馆参数ID错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: '餐馆ID参数错误',
			})
			return
		}
		let filter;
		if (allMenu) {
			filter = {restaurant_id}
		}else{
			filter = {restaurant_id, $where: function(){return this.foods.length}};
		}
		try{
			const menu = await MenuModel.find(filter, '-_id');
			res.send(menu);
		}catch(err){
			console.log('获取食品数据失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取食品数据失败'
			})
		}
	}
	async getMenuDetail(req, res, next){
		const category_id = req.params.category_id;
		if (!category_id || !Number(category_id)) {
			console.log('获取Menu详情参数ID错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: 'Menu ID参数错误',
			})
			return
		}
		try{
			const menu = await MenuModel.findOne({id: category_id}, '-_id');
			res.send(menu)
		}catch(err){
			console.log('获取Menu详情失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取Menu详情失败'
			})
		}
	}
	async getFoods(req, res, next){
		const {restaurant_id, limit = 20, offset = 0} = req.query;
		try{
			let filter = {};
			if (restaurant_id && Number(restaurant_id)) {
				filter = {restaurant_id}
			}

			const foods = await FoodModel.find(filter, '-_id').sort({item_id: -1}).limit(Number(limit)).skip(Number(offset));
			res.send(foods);
		}catch(err){
			console.log('获取食品数据失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取食品数据失败'
			})
		}
	}
	async getFoodsCount(req, res, next){
		const restaurant_id = req.query.restaurant_id;
		try{
			let filter = {};
			if (restaurant_id && Number(restaurant_id)) {
				filter = {restaurant_id}
			}

			const count = await FoodModel.find(filter).count();
			res.send({
				status: 1,
				count,
			})
		}catch(err){
			console.log('获取食品数量失败', err);
			res.send({
				status: 0,
				type: 'ERROR_TO_GET_COUNT',
				message: '获取食品数量失败'
			})
		}
	}
}

export default new Food()