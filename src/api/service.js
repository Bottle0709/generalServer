'use strict';

import ServiceModel from '../models/service'

class Service {
	constructor(){

	}
	async getService(req, res, next){
		try{
			const service = await ServiceModel.find();
			res.send(service)
		}catch(err){
			console.log('获取服务中心数据失败', err);
			res.send({
				status: 0,
				type: 'ERROR_GET_SERVER_DATA',
				message: '获取服务中心数据失败'
			})
		}
	}
	//获取问题列表
	async getQuestion(req, res, next){
		const questionlist_id = req.params.id;
		if (!questionlist_id || !Number(questionlist_id)) {
			console.log('获取参数ID错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: 'ID参数错误',
			})
			return
		}
		try{
			const questionlist = await ServiceModel.findOne({id: questionlist_id}, '-_id');
			res.send(questionlist)
		}catch(err){
			console.log('获取问题列表失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取问题列表失败'
			})
		}
	}
	//获取问题详情
	async getQuestionDetail(req, res, next){
		const question_id = req.params.id;
    const questionlist_id = req.query.questionlistid;
		console.log(question_id,questionlist_id)
		if (!question_id || !Number(question_id)) {
			console.log('获取参数ID错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: 'ID参数错误',
			})
			return
		}
		try{
			const questionlist = await ServiceModel.findOne({id: questionlist_id}, '-_id');
			const question = questionlist.question.filter(item=>{
				return item.id == question_id
			})
			res.send(question)
		}catch(err){
			console.log('获取问题列表失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取问题列表失败'
			})
		}
	}
}
export default new Service()