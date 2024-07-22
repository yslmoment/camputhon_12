document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, nickname, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
          window.location.href = "index.html"; // 로그인 페이지로 리디렉션
        } else {
          alert("회원가입 실패: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
      });
  });
