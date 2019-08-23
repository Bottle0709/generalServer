'use strict'
import express from 'express'
const router = express.Router()
import Shop from '../src/api/shop'
import Food from '../src/api/food'
import Category from '../src/api/category'
import Rating from '../src/api/rating'

router.get('/category',Category.getCategories)
router.get('/delivery',Category.getDelivery)
router.get('/activity',Category.getActivity)
router.get('/shoplist',Shop.getRestaurants)
router.get('/shopdetait/:shop_id',Shop.getRestaurantDetail)
router.get('/searchshops', Shop.searchResaturant);
router.get('/food/menu', Food.getMenu);

router.get('/:shop_id/ratings', Rating.getRatings)
router.get('/:shop_id/ratings/scores', Rating.getScores)
router.get('/:shop_id/ratings/tags', Rating.getTags)

export default router 