const List = require("../model/list.model")

exports.getProcessListPage = (req, res, next) => {
    List.fetchList()
        .then(([data]) => {
            res.render('processList', { list: data })
        })
        .catch((err) => console.error(err.message))
}

exports.getDetailPage = (req, res, next) => {
    List.getDetailById(req.params.id)
        .then(([data]) => {
            console.log(data[0].notes);
            res.render("detail", {detailInfo: data[0]})
        })
        .catch((err) => console.error(err.message))
}

exports.getEditPage = (req,res, next) => {
    List.getDetailById(req.params.id)
        .then(([data]) => {
            console.log(data[0].notes);
            res.render("edit", {detailInfo: data[0]})
        })
        .catch((err) => console.error(err.message))
}

exports.getNewListPage = (req, res, next) => {
    res.render('addNewList')
}

exports.postNewList = (req, res, next) => {
    let listObj = req.body;

    if(!Array.isArray(listObj.next)){
        listObj.next = [listObj.next]
    }
    
    if(!Array.isArray(listObj.notes)){
        listObj.notes = [listObj.notes]
    }

    const newList = new List(...Object.values(listObj))
    newList.save()
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => console.error(err.message))
}

exports.updateList = (req, res, next) => {
    let updatedObj = req.body;

    if(!Array.isArray(updatedObj.next)){
        updatedObj.next = [updatedObj.next]
    }
    
    if(!Array.isArray(updatedObj.notes)){
        updatedObj.notes = [updatedObj.notes]
    }

    List.updateList(updatedObj, req.params.id)
        .then(() => {
            res.redirect('/home')
        })
        .catch((err) => console.error(err.message))
}

exports.deleteList = (req, res, next) => {
    List.deleteList(req.params.id)
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => console.error(err.message))   
}

exports.updateFavorite = (req, res, next) => {
    const { favorite, list_id } = req.body
    if(+favorite === 0){
        List.updateFavorite(true, list_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => console.error(err.message))
    }else{
        List.updateFavorite(false, list_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => console.error(err.message))
    }
}


