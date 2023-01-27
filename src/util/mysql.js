const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT
})


const userInfoTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='userInfo'`;
pool.query(userInfoTableSql, (err, data) => {
  if (err) {
    return console.error(err.message);
  }

  if (data.length === 0) {
    console.log("Table 'userInfo' does not exist");
    createUserInfoTable();
  } else {
    console.log("Table 'userInfo' exists");
    // createUserInfoTable()
  }
});

const createUserInfoTable = () => {
    pool.query(`DROP TABLE IF EXISTS userInfo`);  

    pool.query(
      `CREATE TABLE userInfo(
          user_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL
      ) ENGINE=InnoDB;`,

      (err) => {
          if (err) {
              return console.error(err.message);
          }
          console.log("Successful creation of the 'userInfo' table");
      }
    ); 
}


const companyListTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='companyList'`;
pool.query(companyListTableSql, (err, data) => {
  if (err) {
    return console.error(err.message);
  }

  if (data.length === 0) {
    console.log("Table 'companyList' does not exist");
    // createCompanyListTable()
  } else {
    console.log("Table 'companyList' exists");
    // createCompanyListTable()
  }
});

const createCompanyListTable = () => {
  pool.query(`DROP TABLE IF EXISTS companyList`);  

  pool.query(
    `CREATE TABLE companyList(
      list_id INT PRIMARY KEY AUTO_INCREMENT,
      list_user_id INT NOT NULL,
      company_name VARCHAR(50) NOT NULL,
      location VARCHAR(50),
      company_email VARCHAR(50) NOT NULL UNIQUE,
      company_phone VARCHAR(50),
      company_website VARCHAR(100),
      position VARCHAR(50) NOT NULL,
      job_type VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      date_applied VARCHAR(50) NOT NULL,
      next json,
      notes json,
      favorite BOOLEAN NOT NULL,
      FOREIGN KEY (list_user_id) REFERENCES userInfo (user_id)
    ) ENGINE=InnoDB;`,

    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of the 'companyList' table");
    }
  )
}




module.exports = pool.promise();

