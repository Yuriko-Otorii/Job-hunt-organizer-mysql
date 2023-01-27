const router = require('express').Router()

const {
  getSignupPage,
  getLoginPage,
  postSignupInfo,
  postLoginInfo,
} = require('../controller/user.controller')

router.get('/signup', getSignupPage)
router.post('/signup/create', postSignupInfo)

router.get('/login', getLoginPage)
router.post('/login/validate', postLoginInfo)


module.exports = router
