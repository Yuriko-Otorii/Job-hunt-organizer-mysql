exports.getProcessListPage = (req, res, next) => {
    res.render('processList')
}

exports.getDetailPage = (req, res, next) => {
    res.render('detail')
}

exports.getNewListPage = (req, res, next) => {
    res.render('addNewList')
}