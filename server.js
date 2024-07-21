const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session Middleware
app.use(
  session({
    secret: "your_secret_key", // 비밀 키를 설정하세요
    resave: false,
    saveUninitialized: true,
  })
);

// Static Folder 설정
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoute = require("./routes/auth");
const mainRoute = require("./routes/main");
app.use("/api", authRoute);
app.use("/api", mainRoute);

// 기본 루트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// 추가된 경로 설정
app.get("/today-question.html", (req, res) => {
  if (req.session.userId) {
    res.sendFile(path.join(__dirname, "public", "today-question.html"));
  } else {
    res.redirect("/");
  }
});

app.get("/my-records.html", (req, res) => {
  if (req.session.userId) {
    res.sendFile(path.join(__dirname, "public", "my-records.html"));
  } else {
    res.redirect("/");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
