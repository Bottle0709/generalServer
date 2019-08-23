'use strict'
import express from 'express'
const router = express.Router()
import CityHandle from '../src/api/cities'
import SearchPlace from '../src/api/search'
import Address from '../src/api/address'


router.get('/cities',CityHandle.getCity)
router.get('/cities/:id',CityHandle.getCityById)
router.get('/pois', SearchPlace.search);
router.get('/pois/:geohash', CityHandle.pois);

export default router 