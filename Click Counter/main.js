
let main = 0; // 초기 숫자 & 초기화

function reset() { // 초기 숫자 & 초기화
    main = 0;
    console.log(main);
    num();
}

function decrease() { // 감소
    let dec = main -= 1;
    console.log(dec);
    num();
}

function increase() { // 증가
    let inc = main += 1;
    console.log(inc);
    num();
}

function num () { // 출력
    document.getElementById('print').innerHTML = main;
}
