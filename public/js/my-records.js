document.addEventListener("DOMContentLoaded", function () {
  // 나의 기록 불러오기
  fetch("/api/my-records")
    .then((response) => response.json())
    .then((data) => {
      const recordsList = document.getElementById("recordsList");
      recordsList.innerHTML = "";
      data.records.forEach((record) => {
        const recordElement = document.createElement("div");
        recordElement.classList.add("record-item");

        const questionElement = document.createElement("p");
        questionElement.innerText = `질문: ${record.question}`;
        recordElement.appendChild(questionElement);

        const answerElement = document.createElement("p");
        answerElement.innerText = `답변: ${record.answer}`;
        recordElement.appendChild(answerElement);

        recordsList.appendChild(recordElement);
      });
    });
});
