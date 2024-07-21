const express = require("express");
const router = express.Router();
const db = require("../config/database");

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
