const router = require('express').Router()
const {
  getDetailPage,
  getNewListPage,
  postNewList,
  getEditPage,
  deleteList,
  updateList,
  updateFavorite,
  getCompanyListPage,
} = require('../controller/home.controller')

const {
    checkToken
} = require('../controller/user.controller')


router.get('/', checkToken, getCompanyListPage)
router.put('/favupdate', checkToken, updateFavorite)

router.get('/newlist', checkToken, getNewListPage)
router.post('/createlist', checkToken, postNewList)

router.get("/:id", checkToken, getDetailPage)

router.get('/:id/edit', checkToken, getEditPage)
router.put('/:id/update', checkToken, updateList)

router.delete('/:id/delete', checkToken, deleteList)




module.exports = router


