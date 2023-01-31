const db = require("../util/mysql");

module.exports = class StatusPost {
    constructor(post_message, total_applied, total_onprocess, total_noresponse, total_offered, total_declined, today_applied, today_onprocess, today_noresponse, today_offered, today_declined, post_user_id, post_create_date){
        this.post_message = post_message;
        this.total_applied = total_applied;
        this.total_onprocess = total_onprocess;
        this.total_noresponse = total_noresponse;
        this.total_offered = total_offered;
        this.total_declined = total_declined;
        this.today_applied = today_applied;
        this.today_onprocess = today_onprocess;
        this.today_noresponse = today_noresponse;
        this.today_offered = today_offered;
        this.today_declined = today_declined;
        this.post_user_id = post_user_id;
        this.post_create_date = post_create_date;
    }

    save(){
        const sql = `
            INSERT INTO shareStatus (
                post_message,
                total_applied,
                total_onprocess,
                total_noresponse,
                total_offered,
                total_declined,
                today_applied,
                today_onprocess,
                today_noresponse,
                today_offered,
                today_declined,
                post_user_id,
                post_create_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

        const params = [
            this.post_message,
            this.total_applied,
            this.total_onprocess,
            this.total_noresponse,
            this.total_offered,
            this.total_declined,
            this.today_applied,
            this.today_onprocess,
            this.today_noresponse,
            this.today_offered,
            this.today_declined,
            this.post_user_id,
            this.post_create_date,
        ]

        return db.execute(sql, params)
    }

    static fetchAllSharePost(){
        const sql = `SELECT * FROM shareStatus INNER JOIN userInfo ON shareStatus.post_user_id = user_id ORDER BY post_create_date DESC`
        return db.query(sql)
    }

    static fetchSharePostById(id){
        const sql = `SELECT * FROM shareStatus where post_id = ?`
        return db.execute(sql, [id])
    }

    static updateSharePost(data, post_id, post_create_date){
        const sql = `
            UPDATE shareStatus SET 
                post_user_id = ?,
                post_message = ?,
                total_applied = ?,
                total_onprocess = ?,
                total_noresponse = ?,
                total_offered = ?,
                total_declined = ?,
                today_applied = ?,
                today_onprocess = ?,
                today_noresponse = ?,
                today_offered = ?,
                today_declined = ?,
                post_create_date = ?,
            WHERE (post_id = ? AND post_user_id = ?)
        `
        const params = [
            data.post_id,
            data.post_message,
            data.total_applied,
            data.total_onprocess,
            data.total_noresponse,
            data.total_offered,
            data.total_declined,
            data.today_applied,
            data.today_onprocess,
            data.today_noresponse,
            data.today_offered,
            data.today_declined,
            data.post_user_id,
            data.post_create_date
        ]
        return db.execute(sql, params)
    }

    
}