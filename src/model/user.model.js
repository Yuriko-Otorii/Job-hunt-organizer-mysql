const db = require("../util/mysql");

module.exports = class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    signup(){
        const sql = `INSERT INTO userInfo (username,  email, password) VALUES (?, ?, ?)`
        const values = [this.username, this.email, this.password]

        return db.execute(sql, values)
    }
    
    static login(email){
        const sql = `SELECT * FROM userInfo WHERE email = ?`
        return db.execute(sql, [email])
    }

    static updateUsername(data, user_id){
        const sql = `UPDATE userInfo SET username = ? WHERE user_id = ?`
        const params = [data, user_id]
        return db.execute(sql, params)
    }

    static fetchAllUserInfo(){
        const sql = `SELECT * FROM userInfo`
        return db.query(sql)
    }

}