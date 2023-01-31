const router = require('express').Router()

const {
  getSignupPage,
  getLoginPage,
  postSignupInfo,
  postLoginInfo,
  postDeleteCookie,
} = require('../controller/user.controller')

router.get('/signup', getSignupPage)
router.post('/signup/create', postSignupInfo)

router.get('/login', getLoginPage)
router.post('/login/validate', postLoginInfo)

router.post('/deleteCookie', postDeleteCookie)


module.exports = router
