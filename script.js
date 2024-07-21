//로그인, 회원가입
function login(){

    if(id.value == "" || pw.value == ""){
        alert("로그인을 할 수 없습니다.");
    }
    else if (document.getElementById("id") == null && document.getElementById("pw") == null){
        alert("로그인을 할 수 없습니다.");
    }
    
    else {
        location.href = "main.html"
    }
}

function signup(){
        
      var name = document.getElementById("name");
      var id = document.getElementById("id");
      var pw = document.getElementById("pw");
      var r_pw = document.getElementById("r_pw");

      if (id.value == ""){
        alert("아이디를 입력하세요.");
        id.focus();
        return false;
      } else if (pw.value == "") {
        alert("비밀번호를 입력하세요.");
        pw.focus();
        return false;
      } else if (name.value == ""){
        alert("이름을 입력하세요.");
        name.focus();
        return false;
      } else if (r_pw.value == ""){
        alert("비밀번호가 일치하지 않습니다.");
        r_pw.focus();
        return false;
      } else {
        alert("회원가입을 축하드려용");
        location.href = "login.html"
        submit();
      }

    };



//질문 데이터베이스 연결
function fetchQuestion() {
    fetch('/question')
        .then(response => response.json())
        .then(data => {
            document.getElementById('questionText').textContent = `“${data.question}”`;
        })
        .catch(error => console.error('Error fetching question:', error));
}

function fetchQuestion() {
    fetch('/question')
        .then(response => response.json())
        .then(data => {
            document.getElementById('questionText').textContent = `“${data.question}”`;
        })
        .catch(error => console.error('Error fetching question:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', function() {
        const responseText = document.getElementById('response').value;
        fetch('/saveResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `response=${encodeURIComponent(responseText)}`
        }).then(response => {
            //if (!response.ok) throw new Error('Failed to save');
            Window.location.href = "/main.html"; // 성공 시 main.html로 이동
            
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});