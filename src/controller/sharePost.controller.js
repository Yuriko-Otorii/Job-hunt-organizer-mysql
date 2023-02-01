const StatusPost = require("../model/statusPost.model")
const LikePost = require("../model/likePost.model")

const jwt = require("jsonwebtoken");

exports.getAllSharePosts = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    StatusPost.fetchAllSharePost()
        .then(([allSharePosts]) => {
            LikePost.fetchAllLikePosts()
                .then(([likePosts]) => {
                    const usersLikedPosts = likePosts.filter(item => item.likePost_user_id === req.jwtPayload.user_id)
                    console.log(usersLikedPosts.length);
                    allSharePosts.map(item => {
                        usersLikedPosts.forEach(likedPost => {
                            if(item.post_id === likedPost.likePost_post_id){
                                return item.likeStatus = true
                            }
                        })
                        if (!(item.likeStatus)) {
                            return item.likeStatus = false;                            
                        }

                    })

                    res.render('sharePage', {allSharePosts, usersLikedPosts, loginUserId: req.jwtPayload.user_id})
                })
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to my page", url: "/home/mypage"})
        })
}

exports.postShareStatus = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const today = new Date()

    const reqObj = req.body
    reqObj.post_user_id = req.jwtPayload.user_id
    reqObj.post_create_date = today
    
    const newPost = new StatusPost(...Object.values(reqObj))

    newPost.save()
        .then(() => {
            return res.redirect('/sharepage')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to my page", url: "/home/mypage"})
        })
}


exports.updateShareStatus = (req, res, next) => {
    console.log("UPDATE");
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const updatedObj = req.body
    updatedObj.post_user_id = String(req.jwtPayload.user_id)
    updatedObj.post_id = req.params.postId
    console.log(updatedObj);

    StatusPost.updateSharePost(updatedObj)
        .then(() => {
            return res.redirect('/sharepage')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to my page", url: "/home/mypage"})
        })
}

exports.deleteSharePost = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    StatusPost.deleteSharePost(req.params.postId, req.jwtPayload.user_id)
        .then(() => {
            return res.redirect('/sharepage')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to share page", url: "/sharepage"})
        }) 
}



