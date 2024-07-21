const express = require("express");
const router = express.Router();
const db = require("../config/database");

// 로그인 라우트
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// 회원가입 라우트
router.post("/signup", (req, res) => {
  const { username, nickname, password } = req.body;
  const query =
    "INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)";
  db.query(query, [username, nickname, password], (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
