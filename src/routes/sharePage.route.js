const router = require('express').Router()

const { getCreatePostPage, getEditShareStatusPage } = require('../controller/home.controller')
const { postShareStatus, getAllSharePosts, updateShareStatus, deleteSharePost, postComment } = require('../controller/sharePost.controller') 
const { handleLikeAction } = require('../controller/likePost.controller') 
const { checkToken } = require('../controller/user.controller')


router.get('/', checkToken, getAllSharePosts)
router.get('/create', checkToken, getCreatePostPage)
router.post('/post', checkToken, postShareStatus)
router.post('/likepost', checkToken, handleLikeAction)
router.post('/postcomment', postComment)
router.get('/:postId/edit', checkToken, getEditShareStatusPage)
router.put('/:postId/update', checkToken, updateShareStatus)
router.delete('/:postId/delete', checkToken, deleteSharePost)

module.exports = router
