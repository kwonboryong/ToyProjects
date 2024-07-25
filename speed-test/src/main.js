const screen = document.querySelector('#screen');
const result = document.querySelector('#result');
const text = document.querySelector('#screen__text');

let startTime;
let endTime;

// 평균 속도 변수
const records = [];

// 성급한 클릭 막기
let timeoutId;

screen.addEventListener('click', function () {

  // 대기 화면
  if (screen.classList.contains('waiting')) {
    // UI 변경
    screen.classList.replace('waiting', 'ready');
    text.textContent = '초록색이 되면 클릭하세요.'

    timeoutId = setTimeout(() => {
      screen.classList.replace('ready', 'now');
      text.textContent = '클릭하세요!'

      startTime = new Date();
    }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초


    // 준비 화면
  } else if (screen.classList.contains('ready')) {
    // 준비 상태에서 클릭하면 타이머 호출출 취소
    clearTimeout(timeoutId);

    screen.classList.replace('ready', 'waiting');
    text.textContent = '너무 성급합니다!'


    // 측정 화면
  } else if (screen.classList.contains('now')) {
    endTime = new Date();

    // 현재 속도
    if (startTime !== null) {
      const current = endTime - startTime;
      records.push(current);

      // 기록이 5개를 넘으면 가장 빠른 5개의 시도만 남기기
      if (records.length > 5) {
        // 오름차순 정렬
        records.sort((a, b) => a - b); 

        // 가장 빠른 5개의 시도만 남기기
        records.length = 5; 
      }

      
      // 평균 속도 계산
      const average = records.length > 0 ? records.reduce((a, c) => a + c, 0) / records.length : 0;
      // records 배열에 요소가 하나라도 있으면 평균을 계산해서(배열의 모든 요소를 더함 / 배열 길이) 저장

      // 화면에 표시
      result.innerHTML =
        `현재: ${current.toFixed(1)} 밀리초 <br>` +
        `평균: ${(average / 1000).toFixed(2)} 초 <br>` +
        `기록: ${records.map(time => (time / 1000).toFixed(2)).join(', ')} 초 <br>`;


    } else {
      result.textContent = '측정을 시작할 수 없습니다.';
    }

    // 속도 초기화
    startTime = null;
    endTime = null;

    // 처음 화면으로 돌리기
    screen.classList.replace('now', 'waiting');
    text.textContent = '클릭해서 테스트를 시작하세요.'
  }
})

