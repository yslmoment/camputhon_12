const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost", // 데이터베이스 호스트
  user: "root", // 데이터베이스 사용자
  password: "1234", // 데이터베이스 비밀번호
  database: "your_database", // 데이터베이스 이름
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

module.exports = db;
