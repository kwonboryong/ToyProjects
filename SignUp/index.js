// 탭 기능
const tab = document.querySelectorAll('.tab_menu .list li');

for (var i = 0; i < tab.length; i++) {
    
    tab[i].querySelector('.btn').addEventListener('click', function(e) {

        e.preventDefault();

        for (var j = 0; j < tab.length; j++) {
            tab[j].classList.remove('is_on');
        }

        this.parentNode.classList.add('is_on');
    });
}


// 유효성 검사
document.getElementById('form1').addEventListener('submit', function(e) {
    
    var name = document.getElementsByClassName('form')[0].value;
    var email = document.getElementsByClassName('form')[1].value;
    var id = document.getElementsByClassName('form')[2].value;
    var pw = document.getElementsByClassName('form')[3].value;

    // 공통 - 공백 검사

    // 이름 (2 ~ 5자, 한글)
    if (name == '') {
        alert('이름을 입력하세요.');
        e.preventDefault()
    } else if (/[a-zA-Zㄱ-ㅎ0-9]/.test(name)) {
        alert('이름은 한글 입력만 가능합니다.');
        e.preventDefault()
    } 

    // 이름 길이 2 ~ 5자 제한
    if (name.length < 2 || name.length > 5) {
        alert('이름 제한 길이를 넘었습니다.');
        e.preventDefault()
    }

    
    // 이메일 (이메일 형식)
    if (email == '') {
        alert('이메일을 입력하세요.');
        e.preventDefault()
    } else if (/[A-Z가-힣ㄱ-ㅎ]/.test(email)) {
        alert('이메일은 영소문자와 숫자만 가능합니다.');
        e.preventDefault()
    } else if (/\S+@\S+\.\S+/.test(email) == false) {
        alert('이메일 형식이 아닙니다.');
        e.preventDefault()
    } 

    // 아이디 (4 ~ 8자, 영소문자, 숫자)
    if (id == '') {
        alert('아이디를 입력하세요.');
        e.preventDefault()
    } else if (/[A-Z가-힣ㄱ-ㅎ]/.test(id)) {
        alert('아이디는 영소문자와 숫자만 가능합니다.');
        e.preventDefault()
    }

    // 아이디 길이 4 ~ 8자 제한
    if (id.length < 4 || id.length > 8) {
        alert('아이디 제한 길이를 넘었습니다.');
        e.preventDefault()
    }


    // 비밀번호 (6 ~ 12자, 영소문자, 숫자)
    if (pw == '') {
        alert('비밀번호를 입력하세요.');
        e.preventDefault()
    } else if (/[A-Z가-힣ㄱ-ㅎ]/.test(pw)) {
        alert('비밀번호는 영소문자와 숫자만 가능합니다.');
        e.preventDefault()
    }

    // 비밀번호 길이 6 ~ 12자 제한
    if (pw.length < 6 || pw.length > 12) {
        alert('비밀번호 제한 길이를 넘었습니다.');
        e.preventDefault()
    }
});
