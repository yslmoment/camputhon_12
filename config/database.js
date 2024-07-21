const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "your_database",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류:", err);
    throw err;
  }
  console.log("MySQL 연결 성공");
});

module.exports = db;
