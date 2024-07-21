document.addEventListener("DOMContentLoaded", function () {
  let questionId;

  // 오늘의 질문을 불러오기
  fetch("/api/today-question")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.id) {
        questionId = data.id;
        const questionText = document.getElementById("questionText");
        questionText.innerText = data.question;
      } else {
        alert(
          "질문을 가져올 수 없습니다: " + (data.message || "알 수 없는 오류")
        );
        const questionText = document.getElementById("questionText");
        questionText.innerText = "질문을 가져올 수 없습니다.";
        document.getElementById("submitAnswer").disabled = true;
      }
    })
    .catch((error) => {
      alert("질문을 가져오는 도중 오류가 발생했습니다: " + error.message);
      const questionText = document.getElementById("questionText");
      questionText.innerText = "질문을 가져올 수 없습니다.";
      document.getElementById("submitAnswer").disabled = true;
    });

  // 답변 제출
  document
    .getElementById("submitAnswer")
    .addEventListener("click", function () {
      if (document.getElementById("submitAnswer").disabled) {
        alert("더이상 제출할 수 없습니다.");
        return;
      }

      const answer = document.getElementById("todayAnswer").value;
      if (answer) {
        fetch("/api/save-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question_id: questionId, answer }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("답변이 제출되었습니다.");
              document.getElementById("todayAnswer").value = "";
              // 메인 화면으로 리디렉션
              window.location.href = "main.html";
            } else {
              alert("답변 제출에 실패했습니다.");
            }
          })
          .catch((error) => {
            alert("답변 제출 도중 오류가 발생했습니다: " + error.message);
          });
      } else {
        alert("답변을 입력해주세요.");
      }
    });
});
