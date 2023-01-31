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
  getMyPage
} = require('../controller/home.controller')

const {
    checkToken,
    postUpdateUsername
} = require('../controller/user.controller')


router.get('/', checkToken, getCompanyListPage)
router.put('/favupdate', checkToken, updateFavorite)

router.get('/mypage', checkToken, getMyPage)
router.post('/editUsername', checkToken, postUpdateUsername)

router.get('/newlist', checkToken, getNewListPage)
router.post('/createlist', checkToken, postNewList)

router.get("/:listId", checkToken, getDetailPage)

router.get('/:listId/edit', checkToken, getEditPage)
router.put('/:listId/update', checkToken, updateList)

router.delete('/:listId/delete', checkToken, deleteList)



module.exports = router


