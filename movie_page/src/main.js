
document.addEventListener("DOMContentLoaded", function () {

    const img = document.getElementById("img");

    function imgSize(src) {
        img.src = src;
    }

    // 스크롤 마다 사진이 달라지는 기능
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (scrollY < 1100) {
            imgSize("./style/xiang1.png");

        } else if (scrollY > 1200 && window.scrollY < 1800) {
            imgSize("./style/xiang2.png");

        } else if (scrollY > 1630 && window.scrollY < 2160) {
            imgSize("./style/xiang3.png");

        } else if (scrollY > 2160) {
            imgSize("./style/xiang4.png");

        }
    });


    // GSAP 애니메이션
    gsap.from(".card", {
        opacity: 0,
        y: 50, // 아래에서 위로 올라오는 애니메이션
        duration: 1,
        stagger: 0.5 // 올라오는 카드 간의 시간 간격
    });
});
