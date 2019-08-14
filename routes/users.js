'use strict'
import express from 'express'
const router = express.Router()
import User from '../src/api/user'

router.post('/login',User.login)
router.get('/signout',User.signout)
router.post('/register',User.register)
router.get('/changepassword',User.changepassword)

export default router