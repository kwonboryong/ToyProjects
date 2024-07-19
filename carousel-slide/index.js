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

    // if (now == 1) { // 현재 사진이 1번이면 -> 2번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(-100vw)'
    //     now++;
    // } else if (now == 2) { // 현재 사진이 2번이면 -> 3번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(-200vw)'
    //     now++;
    // } else if (now == 3) { // 현재 사진이 3번이면 -> 다시 1번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(0vw)'
    // }

    // JS 확장 버전
    if (now == 3) { // 마지막 장에서 '다음'을 누르면 첫 번째 장이 나오도록
        document.querySelector('.slide-container').style.transform = 'translateX(0vw)'
        now = 1;
    } else {
        document.querySelector(".slide-container").style.transform = "translateX(-" + now + "00vw)";
        now++;
    }
});

// jQuery 확장 버전
// $('.next').on('click', function(){
//     $('.slide-container').css('transform', 'translateX(-' + 지금사진 + '00vw)');
//     지금사진 += 1;
// })


// 이전 버튼
document.querySelector('.before').addEventListener('click', function() {

    // if (now == 1) { // 현재 사진이 1번이면 -> 3번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(-200vw)'
    //     now = 3;
    // } else if (now == 2) { // 현재 사진이 2번이면 -> 1번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(0vw)'
    //     now--;
    // } else if (now == 3) { // 현재 사진이 3번이면 -> 2번 보여주기
    //     document.querySelector('.slide-container').style.transform = 'translateX(-100vw)'
    //     now--;
    // }

    // JS 확장 버전
    if (now == 1) { // 첫 번째 장에서 '이전'을 누르면 마지막 장이 나오도록
        document.querySelector('.slide-container').style.transform = 'translateX(-200vw)'
        now = 3;
    } else {
        document.querySelector(".slide-container").style.transform = "translateX(-" + (now - 2) + "00vw)";
        now--;
    }

});
