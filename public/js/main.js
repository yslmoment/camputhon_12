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

  // "오늘의 추천 책"을 가져오는 로직
  fetch("/api/recommendations")
    .then((response) => response.json())
    .then((data) => {
      const recommendationSection = document.querySelector(".recommendation p");
      recommendationSection.innerText = data.recommendation;
    });
});
