const router = require('express').Router()
const {
  getProcessListPage,
  getDetailPage,
  getNewListPage,
  postNewList,
  getEditPage,
  deleteList,
  updateList,
  updateFavorite
} = require('../controller/home.controller')

// const {
//     checkToken
// } = require('../controller/user.controller')

// router.get('/', checkToken)

router.get('/', getProcessListPage)
router.put('/favupdate', updateFavorite)

router.get('/newlist', getNewListPage)
router.post('/createlist', postNewList)

router.get("/:id", getDetailPage)

router.get('/:id/edit', getEditPage)
router.put('/:id/update', updateList)

router.delete('/:id/delete', deleteList)




module.exports = router


