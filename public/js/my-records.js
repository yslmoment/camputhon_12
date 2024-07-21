document.addEventListener("DOMContentLoaded", function () {
  // 모달 요소 가져오기
  const modal = document.getElementById("recordModal");
  const modalContent = document.getElementById("modalContent");
  const span = document.getElementsByClassName("close")[0];

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
        questionElement.innerHTML = `<strong>질문:</strong> ${record.question}`;
        recordElement.appendChild(questionElement);

        const answerElement = document.createElement("p");
        answerElement.innerHTML = `<strong>답변:</strong> ${record.answer}`;
        recordElement.appendChild(answerElement);

        recordElement.addEventListener("click", function () {
          modal.style.display = "block";
          modalContent.innerHTML = `
                      <h2>질문</h2>
                      <p>${record.question}</p>
                      <h2>답변</h2>
                      <p>${record.answer}</p>
                  `;
        });

        recordsList.appendChild(recordElement);
      });
    });

  // 모달 닫기
  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
