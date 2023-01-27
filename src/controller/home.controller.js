const List = require("../model/list.model")

const jwt = require("jsonwebtoken");

exports.getCompanyListPage = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.fetchList(req.jwtPayload.user_id)
        .then(([data]) => {
            res.render('processList', { list: data })
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getDetailPage = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.getDetailById(req.params.id, req.jwtPayload.user_id)
        .then(([data]) => {
            console.log(data[0].next.next[0]);
            res.render("detail", {detailInfo: data[0]})
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getEditPage = (req,res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.getDetailById(req.params.id, req.jwtPayload.user_id)
        .then(([data]) => {
            res.render("edit", {detailInfo: data[0]})
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getNewListPage = (req, res, next) => {
    res.render('addNewList')
}

exports.postNewList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)

    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    let listObj = req.body;
    listObj.list_user_id = req.jwtPayload.user_id

    if(!Array.isArray(listObj.next)){
        listObj.next = [listObj.next]
    }
    if(listObj.next[0] === undefined){
        listObj.next[0] = ""
    }
    
    if(!Array.isArray(listObj.notes)){
        listObj.notes = [listObj.notes]
    }
    if(listObj.notes[0] === undefined){
        listObj.notes[0] = ""
    }

    const newList = new List(...Object.values(listObj))
    newList.save()
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.updateList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)

    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;
    let updatedObj = req.body;
    updatedObj.list_user_id = req.jwtPayload.user_id

    if(!Array.isArray(updatedObj.next)){
        updatedObj.next = [updatedObj.next]
    }
    if(updatedObj.next[0] === undefined){
        updatedObj.next[0] = ""
    }
    
    if(!Array.isArray(updatedObj.notes)){
        updatedObj.notes = [updatedObj.notes]
    }
    if(updatedObj.notes[0] === undefined){
        updatedObj.notes[0] = ""
    }


    List.updateList(updatedObj, req.params.id)
        .then(() => {
            res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.deleteList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.deleteList(req.params.id, req.jwtPayload.user_id)
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })   
}

exports.updateFavorite = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const { favorite, list_id } = req.body
    if(+favorite === 0){
        List.updateFavorite(true, list_id, req.jwtPayload.user_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => console.error(err.message))
    }else{
        List.updateFavorite(false, list_id, req.jwtPayload.user_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => {
                console.error(err.message)
                res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
            })
    }
}


