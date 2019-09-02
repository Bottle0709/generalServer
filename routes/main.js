'use strict'
import express from 'express'
const router = express.Router()
import Main from '../src/api/main'

router.post('/login',Main.login)
router.get('/captchap',Main.captcha)
router.get('/signout',Main.signout)
router.post('/register',Main.register)
router.get('/changepassword',Main.changepassword)
router.get('/index_entry',Main.getEntry)

export default router