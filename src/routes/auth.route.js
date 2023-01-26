const router = require('express').Router()

const {
  getSignupPage,
  getLoginPage,
  postSignupInfo,
  postLoginInfo,
  checkToken
} = require('../controller/user.controller')

// router.get("/", checkToken, (req, res) => {
//   res.send(`<h1>Hello world!</h1>`)
// })

router.get('/signup', getSignupPage)
router.post('/signup/create', postSignupInfo)

router.get('/login', getLoginPage)
router.post('/login/validate', postLoginInfo)


module.exports = router
