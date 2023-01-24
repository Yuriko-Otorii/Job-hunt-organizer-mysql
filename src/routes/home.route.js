const router = require('express').Router()
const {
  getProcessListPage,
  getDetailPage,
  getNewListPage,
  postNewList,
  getEditPage,
} = require('../controller/home.controller')

// const {
//     checkToken
// } = require('../controller/user.controller')

// router.get('/', checkToken)

router.get('/', getProcessListPage)

router.get('/detail', getDetailPage)
// router.get("/:id", getDetailPage)

router.get('/edit', getEditPage)

router.get('/newlist', getNewListPage)
router.post('/createlist', postNewList)



module.exports = router
