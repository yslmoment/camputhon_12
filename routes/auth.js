const express = require("express");
const router = express.Router();
const db = require("../config/database");

// 회원가입 라우트
router.post("/signup", (req, res) => {
  const { username, nickname, password } = req.body;

  // 유효성 검사 및 데이터베이스 저장 로직 추가
  const query =
    "INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)";
  db.query(query, [username, nickname, password], (err, results) => {
    if (err) {
      console.error("SQL 쿼리 오류:", err);
      return res
        .status(500)
        .json({ success: false, message: "회원가입 중 오류가 발생했습니다." });
    }
    res.json({ success: true });
  });
});

// 로그인 라우트
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT id FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.userId = results[0].id;
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid username or password" });
    }
  });
});

// 로그아웃 라우트
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ success: false, message: "Failed to log out" });
    }
    res.json({ success: true });
  });
});

module.exports = router;
