const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT
})

const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Users'`;
pool.query(sql, (err, data) => {
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




module.exports = pool.promise();

