const db = require("../util/mysql");

module.exports = class Comment {
    constructor(comment, comment_post_id, comment_user_id, comment_date){
        this.comment_user_id = comment_user_id;
        this.comment_post_id = comment_post_id;
        this.comment = comment;
        this.comment_date = comment_date;
    }

    save(){
        const sql = `
            INSERT INTO comment (
            comment,
            comment_post_id,
            comment_user_id,
            comment_date
            ) VALUES (?, ?, ?, ?)
        `
        const params = [
            this.comment,
            this.comment_post_id,
            this.comment_user_id,
            this.comment_date
        ]

        return db.execute(sql, params)
    }

    static fetchAllComments(){
        const sql = `SELECT * FROM comment ORDER BY comment_date DESC`
        return db.query(sql)
    }
    
    static deleteComment(comment_id, comment_user_id){
        const sql = `DELETE FROM comment WHERE comment_id = ? AND comment_user_id = ?`
        return db.execute(sql, [comment_id, comment_user_id])
    }
}