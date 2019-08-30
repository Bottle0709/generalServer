'use strict'
import express from 'express'
const router = express.Router()
import Service from '../src/api/service'

router.get('/service',Service.getService)
router.get('/questionlist/:id',Service.getQuestion)
router.get('/question/:id',Service.getQuestionDetail)

export default router