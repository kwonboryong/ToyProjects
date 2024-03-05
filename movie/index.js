
window.addEventListener('scroll', function() {

    console.log(window.scrollY);

    if (window.scrollY < 1100) {
        document.getElementById("img").src = "xiang1.png";
    } else if (window.scrollY > 1200 && window.scrollY < 1800) {
        document.getElementById("img").src = "xiang2.png";
    } else if (window.scrollY > 1630 && window.scrollY < 2160) {
        document.getElementById("img").src = "xiang3.png";
    } else if (window.scrollY > 2160) {
        document.getElementById("img").src = "xiang4.png";
    }
});
