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
}