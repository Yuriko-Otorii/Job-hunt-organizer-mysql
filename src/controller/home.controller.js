exports.getProcessListPage = (req, res, next) => {
    res.render('processList')
}

exports.getDetailPage = (req, res, next) => {
    res.render('detail')
}

exports.getEditPage = (req,res, next) => {
    res.render('edit')
}

exports.getNewListPage = (req, res, next) => {
    res.render('addNewList')
}

exports.postNewList = (req, res, next) => {

}

