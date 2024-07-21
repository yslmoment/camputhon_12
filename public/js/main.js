document.addEventListener("DOMContentLoaded", function () {
  // "오늘의 질문" 버튼 클릭 이벤트
  document
    .getElementById("todayQuestionButton")
    .addEventListener("click", function () {
      window.location.href = "today-question.html";
    });

  // "나의 기록" 버튼 클릭 이벤트
  document
    .getElementById("myRecordsButton")
    .addEventListener("click", function () {
      window.location.href = "my-records.html";
    });
});
