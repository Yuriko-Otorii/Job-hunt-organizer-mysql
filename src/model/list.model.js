const db = require("../util/mysql");

const arg = {
    company_name: "",
    location: null,
    company_email: "",
    company_phone: null,
    company_website: null,
    position: "",
    job_type: "",
    status: "",
    date_applied: "",
    notes: null,
    next: null,
}

module.exports = class List {
    constructor(status, company_name, location=null, company_email, company_phone=null, company_website=null, date_applied, job_type, position, next=null, notes=null, favorite=false ){
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
        this.favorite = favorite;
    }

    save(){
        const sql = `INSERT INTO ProcessList (
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
            favorite
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

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
            this.favorite
        ]

        return db.execute(sql, params)
    }

    static fetchList = () => {
        const sql = `SELECT * FROM ProcessList`
        return db.query(sql)
    }

    static getDetailById = (id) => {
        const sql = `SELECT * FROM ProcessList WHERE list_id = ?`
        return db.execute(sql, [id])
    }

    static updateList = (data, id) => {
        const sql = `
            UPDATE ProcessList SET 
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
            WHERE (list_id = ?)
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
            id
        ]
        
        return db.execute(sql, params)
    }

    static updateFavorite = (data, id) => {
        const sql = `UPDATE ProcessList SET favorite = ? WHERE list_id = ?`
        const params = [data, id]
        return db.execute(sql, params)
    }

    static deleteList = (id) => {
        const sql = `DELETE FROM ProcessList WHERE list_id = ?`
        return db.execute(sql, [id])
    }


}
