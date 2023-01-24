const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT
})

const usersTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Users'`;
pool.query(usersTableSql, (err, data) => {
  if (err) {
    return console.error(err.message);
  }

  if (data.length === 0) {
    console.log("Table 'Users' does not exist");
    // createUsersTable();
  } else {
    console.log("Table 'Users' exists");
    // createUsersTable()
  }
});

const createUsersTable = () => {
    pool.query(`DROP TABLE IF EXISTS Users`);  

    pool.query(
      `CREATE TABLE Users(
          user_id INT PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL
      )`,

      (err) => {
          if (err) {
              return console.error(err.message);
          }
          console.log("Successful creation of the 'Users' table");
      }
    ); 
}



// const processListTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='ProcessList'`;
// pool.query(processListTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'ProcessList' does not exist");
//     // createprocessListTable()
//   } else {
//     console.log("Table 'ProcessList' exists");
//     // createprocessListTable()
//   }
// });

const createprocessListTable = () => {
  pool.query(`DROP TABLE IF EXISTS ProcessList`);  

  pool.query(
    `CREATE TABLE ProcessList(
      list_id INT PRIMARY KEY AUTO_INCREMENT,
      company VARCHAR(50) NOT NULL,
      location VARCHAR(50),
      company_email VARCHAR(50) NOT NULL UNIQUE,
      company_phone INT,
      company_website VARCHAR(100),
      position VARCHAR(50) NOT NULL,
      job_type VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      date_applied VARCHAR(50) NOT NULL,
      notes json,
      next_step VARCHAR(50),
      job_post VARCHAR(100)
    )`,

    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of the 'ProcessList' table");
    }
  )
}




module.exports = pool.promise();

