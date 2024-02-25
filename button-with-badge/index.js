
// 숫자 뱃지
let count = 0;

document.querySelector('.button').addEventListener('click', function() {

    count++;
    document.querySelector('.badge').innerHTML = count;
});

// Reset 버튼
document.querySelector('.btn').addEventListener('click', function() {

    count = 0;
    document.querySelector('.badge').innerHTML = count;
});