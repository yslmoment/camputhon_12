const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// MySQL 데이터베이스 설정
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username', // MySQL 사용자 이름
    password: 'your_password', // MySQL 비밀번호
    database: 'your_database' // 데이터베이스 이름
});

app.use(express.static('public')); // 정적 파일(HTML, CSS, JS) 제공을 위한 설정

// 질문 불러오기
app.get('/question', (req, res) => {
    pool.query('SELECT content FROM questions ORDER BY RAND() LIMIT 1', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send('Server Error');
            return;
        }
        if (results.length > 0) {
            res.send({ question: results[0].content });
        } else {
            res.status(404).send('No questions found');
        }
    });
});

// 답변 저장
app.post('/saveResponse', (req, res) => {
    const response = req.body.response;
    if (!response) {
        res.status(400).send('No response provided');
        return;
    }
    pool.query('INSERT INTO responses (content) VALUES (?)', [response], (err, results) => {
        if (err) {
            res.status(500).send('Failed to save response');
            return;
        }
        res.redirect('/main.html'); // 저장 후 main.html 페이지로 리다이렉트
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
