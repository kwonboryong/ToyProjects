/*
1. 버튼 html, css 생성
2. 버튼 누르면 서브 메뉴 열리게 구현 (js)
반복문 시작 (버튼.length)
- 버튼 누르면 서브 메뉴 열고 닫히게 토글 생성
- 서브 메뉴가 열려있으면 (if(max-height)) 서브메뉴 닫기 (max-height == null)
- (else) 닫혀있으면 (max-height + "px")
- css - transition에 시간 설정
*/

let button = document.getElementsByClassName("btn"); // 버튼 변수 생성

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        this.classList.toggle("show");

        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
