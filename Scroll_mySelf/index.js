
// 스크롤 진행바
window.addEventListener('scroll', function() {
    
    var sHeight = document.querySelector('html').scrollHeight;
    var cHeight = document.querySelector('html').clientHeight;
    var sTop = document.querySelector('html').scrollTop;

    const prg = ((sTop + cHeight) / sHeight) * 100;
    // document.querySelector('.progress').style.width = progress + "%";

    console.log(prg);

    if (prg < 17) {
        this.document.querySelector('.progress').style.width = '0%';
    } else if (prg < 22) {
        this.document.querySelector('.progress').style.width = '20%';
    } else if (prg < 40) {
        this.document.querySelector('.progress').style.width = '30%';
    } else if (prg < 65) {
        this.document.querySelector('.progress').style.width = '40%';
    } else if (prg < 75) {
        this.document.querySelector('.progress').style.width = '60%';
    } else if (prg < 80) {
        this.document.querySelector('.progress').style.width = '80%';
    } else if (prg > 95) {
        this.document.querySelector('.progress').style.width = '100%';
    }
});

// 캐러셀 슬라이드
// 숫자 버튼
/* 2번 버튼 클릭 시 - 2번 사진 가져오기(1번 사진을 왼쪽으로 밀기) */
document.getElementsByClassName('slide-2')[0].addEventListener('click', function() {
    document.querySelector('.slide-container').style.transform = 'translateX(-100vw)'
    now = 2;
    // ***숫자 버튼에서도 현재 사진 변수(now)를 신경 써야 한다!
});

// 3번 버튼
document.getElementsByClassName('slide-3')[0].addEventListener('click', function() {
    document.querySelector('.slide-container').style.transform = 'translateX(-200vw)'
    now = 3;
});

// 1번 버튼
document.getElementsByClassName('slide-1')[0].addEventListener('click', function() {
    document.querySelector('.slide-container').style.transform = 'translateX(0vw)'
    now = 1;
});


// 다음 버튼
var now = 1; // 현재 사진 변수

document.querySelector('.next').addEventListener('click', function() {

    if (now == 3) { // 마지막 장에서 '다음'을 누르면 첫 번째 장이 나오도록
        document.querySelector('.slide-container').style.transform = 'translateX(0vw)'
        now = 1;
    } else {
        document.querySelector(".slide-container").style.transform = "translateX(-" + now + "00vw)";
        now++;
    }
});


// 이전 버튼
document.querySelector('.before').addEventListener('click', function() {

    if (now == 1) { // 첫 번째 장에서 '이전'을 누르면 마지막 장이 나오도록
        document.querySelector('.slide-container').style.transform = 'translateX(-200vw)'
        now = 3;
    } else {
        document.querySelector(".slide-container").style.transform = "translateX(-" + (now - 2) + "00vw)";
        now--;
    }
});




