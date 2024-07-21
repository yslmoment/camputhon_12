document.addEventListener("DOMContentLoaded", function () {
  // 모달 요소 가져오기
  const modal = document.getElementById("recordModal");
  const modalContent = document.getElementById("modalContent");
  const span = document.getElementsByClassName("close")[0];

  // 나의 기록 불러오기
  fetch("/api/my-records")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // 디버그용 콘솔 출력
      const recordsList = document.getElementById("recordsList");
      recordsList.innerHTML = "";
      data.records.forEach((record) => {
        const recordElement = document.createElement("div");
        recordElement.classList.add("record-item");

        const dateElement = document.createElement("p");
        dateElement.classList.add("record-date");
        dateElement.innerText = `작성 날짜: ${record.answer_date}`;
        recordElement.appendChild(dateElement);

        const questionElement = document.createElement("p");
        questionElement.innerHTML = `<strong>질문:</strong> ${record.question}`;
        recordElement.appendChild(questionElement);

        const answerElement = document.createElement("p");
        answerElement.innerHTML = `<strong>답변:</strong> ${record.answer}`;
        recordElement.appendChild(answerElement);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "삭제";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function (event) {
          event.stopPropagation(); // 이벤트 버블링 방지
          fetch(`/api/delete-answer/${record.answer_id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("답변이 삭제되었습니다.");
                recordElement.remove();
              } else {
                alert("답변 삭제에 실패했습니다.");
              }
            })
            .catch((error) => {
              alert("답변 삭제 도중 오류가 발생했습니다: " + error.message);
            });
        });
        recordElement.appendChild(deleteButton);

        recordElement.addEventListener("click", function () {
          modal.style.display = "block";
          modalContent.innerHTML = `
                      <h2>질문</h2>
                      <p>${record.question}</p>
                      <h2>답변</h2>
                      <p>${record.answer}</p>
                      <p><strong>작성 날짜:</strong> ${record.answer_date}</p>
                  `;
        });

        recordsList.appendChild(recordElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching records:", error);
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
