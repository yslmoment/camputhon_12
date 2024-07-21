const express = require("express");
const router = express.Router();
const db = require("../config/database");

// 오늘의 질문 라우트
router.get("/today-question", (req, res) => {
  const userId = 1; // 로그인 기능 구현 후 변경 필요

  // 사용자 트랙 정보 조회
  const trackQuery =
    "SELECT last_question_id FROM user_question_track WHERE user_id = ?";
  db.query(trackQuery, [userId], (err, trackResults) => {
    if (err) throw err;

    let lastQuestionId = 0;
    if (trackResults.length > 0) {
      lastQuestionId = trackResults[0].last_question_id;
    }

    // 다음 질문 조회
    const nextQuestionId = lastQuestionId + 1;
    const nextQuestionQuery = "SELECT id, question FROM questions WHERE id = ?";
    db.query(nextQuestionQuery, [nextQuestionId], (err, questionResults) => {
      if (err) throw err;

      if (questionResults.length > 0) {
        const question = questionResults[0];
        // 트랙 정보 업데이트
        const updateTrackQuery = `
                    INSERT INTO user_question_track (user_id, last_question_id)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE last_question_id = VALUES(last_question_id)
                `;
        db.query(
          updateTrackQuery,
          [userId, nextQuestionId],
          (err, updateResults) => {
            if (err) throw err;
            res.json(question);
          }
        );
      } else {
        res.json({ id: null, question: "더 이상 질문이 없습니다." });
      }
    });
  });
});

// 답변 저장 라우트
router.post("/save-answer", (req, res) => {
  const userId = 1; // 로그인 기능 구현 후 변경 필요
  const { question_id, answer } = req.body;
  const answerDate = new Date().toISOString().slice(0, 10);
  const query =
    "INSERT INTO answers (user_id, question_id, answer, answer_date) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, question_id, answer, answerDate], (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// 나의 기록 라우트
router.get("/my-records", (req, res) => {
  const userId = 1; // 로그인 기능 구현 후 변경 필요
  const query =
    "SELECT a.answer, q.question FROM answers a JOIN questions q ON a.question_id = q.id WHERE a.user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json({ records: results });
  });
});

module.exports = router;
