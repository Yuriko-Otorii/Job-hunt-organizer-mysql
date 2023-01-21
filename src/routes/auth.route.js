const router = require('express').Router()

const {
  getSignupPage,
  getLoginPage,
  postSignupInfo,
  postLoginInfo,
  checkToken
} = require('../controller/user.controller')

router.get("/", checkToken, (req, res) => {
  res.render('404error')
})

router.get('/signup', getSignupPage)
router.post('/signup/create', postSignupInfo)

router.get('/login', getLoginPage)
router.post('/login', postLoginInfo)


module.exports = router
