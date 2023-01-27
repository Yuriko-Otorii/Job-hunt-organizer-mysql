const db = require("../util/mysql");

module.exports = class List {
    constructor(status, company_name, location=null, company_email, company_phone=null, company_website=null, date_applied, job_type, position, next=null, notes=null, list_user_id, favorite=false){
        this.company_name = company_name;
        this.location = location;
        this.company_email = company_email;
        this.company_phone = company_phone;
        this.company_website = company_website;
        this.position = position;
        this.job_type = job_type;
        this.status = status;
        this.date_applied = date_applied;
        this.notes = notes;
        this.next = next;
        this.list_user_id = list_user_id;
        this.favorite = favorite;
    }

    save(){
        const sql = `
            INSERT INTO companyList (
            company_name,
            location,
            company_email,
            company_phone,
            company_website,
            position,
            job_type,
            status,
            date_applied,
            notes,
            next,
            favorite,
            list_user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

        const params = [
            this.company_name,
            this.location,
            this.company_email,
            this.company_phone,
            this.company_website,
            this.position,
            this.job_type,
            this.status,
            this.date_applied,
            {"notes": this.notes},
            {"next": this.next},
            this.favorite,
            this.list_user_id
        ]

        return db.execute(sql, params)
    }

    static fetchList = (id) => {
        const sql = `SELECT * FROM companyList WHERE list_user_id = ?`
        return db.execute(sql, [id])
    }

    static getDetailById = (list_id, list_user_id) => {
        const sql = `SELECT * FROM companyList WHERE list_id = ? AND list_user_id = ?`
        return db.execute(sql, [list_id, list_user_id])
    }

    static updateList = (data, id) => {
        const sql = `
            UPDATE companyList SET 
            status = ?,
            company_name = ?, 
            location = ?, 
            company_email = ?,
            company_phone = ?,
            company_website = ?,
            date_applied = ?,
            job_type = ?,
            position = ?,
            next = ?,
            notes = ?
            WHERE (list_id = ? AND list_user_id = ?)
        `
        const params = [
            data.status,
            data.companyName,
            data.location,
            data.companyEmail,
            data.companyPhone,
            data.companyWebsite,
            data.dateApplied,
            data.jobType,
            data.position,
            {next: data.next},
            {notes: data.notes},
            id,
            data.list_user_id
        ]
        
        return db.execute(sql, params)
    }

    static updateFavorite = (data, list_id, list_user_id) => {
        const sql = `UPDATE companyList SET favorite = ? WHERE list_id = ? AND list_user_id = ?`
        const params = [data, +list_id, +list_user_id]
        return db.execute(sql, params)
    }

    static deleteList = (list_id, list_user_id) => {
        const sql = `DELETE FROM companyList WHERE list_id = ? AND list_user_id = ?`
        return db.execute(sql, [list_id, list_user_id])
    }
}
