
document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector('#form');
  const result = document.querySelector('#result');
  const resultBox = document.querySelector('.result');
  const rankElement = document.querySelector('#rank');
  const priceElement = document.querySelector('.price');
  const date = document.querySelector('.date');
  const button = document.querySelector('button');


  // 엔터로 입력칸 넘어가기 =========================================

  // input-box 내부의 모든 입력칸 가져오기
  const inputs = document.querySelectorAll('.input-box input');

  inputs.forEach((input, index) => {
    // inputs의 각 input 요소(현재 입력칸)와 그 index(현재 입력칸의 인덱스)를 인자로 받음
    input.addEventListener('keydown', (event) => moveToNext(event, input, inputs[index + 1]));
  });

  // 다음 입력칸으로 넘어가는 함수
  function moveToNext(event, current, next) {
    if (event.key === 'Enter') {
      event.preventDefault();

      // 숫자 길이 제한
      if (current.value.length >= 1 && current.value.length <= 2) {
        // 다음 입력칸이 있으면
        if (next) {
          next.focus();

          // 다음 입력칸이 없으면(마지막 입력칸)
        } else if (!next) {
          // 추첨 버튼 클릭
          button.click();
        }
      }
    }
  }


  // 제출 이벤트 처리 =========================================
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // 입력 숫자 모으기
    const lottoNumbers = [];


    // 유효성 검사 변수, 에러 메세지 변수 
    let isValid = true;
    let message = '';

    //  숫자 유효성 검사 ---------------------------------
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`lotto${i}`);

      if (input) {
        // 값에서 앞뒤 공백 제거 -> 입력값에 공백이 포함되어 있으면 기능에 문제가 생길 수 있음
        const value = input.value.trim();

        // 공백 검사
        if (value === '') {
          isValid = false;
          message = '숫자 6개를 모두 입력하세요.';
          break;
        }


        // 문자열을 정수로 변환
        const num = parseInt(value, 10);

        // 숫자 범위 검사
        if (isNaN(num) || num < 1 || num > 45) {
          isValid = false;
          message = '1부터 45까지만 입력할 수 있습니다.';
          break;
        }

        // 숫자 중복 검사
        // - includes(): 배열에 지정한 값이 포함되어 있는지를 확인
        if (lottoNumbers.includes(num)) {
          isValid = false;
          message = '중복된 숫자를 입력했습니다.';
          break;
        }

        // 유효성 검사에 통과하면 배열 넣기
        lottoNumbers.push(num);
      }
    }


    // 유효성 검사 결과에 따른 처리 =========================================
    if (!isValid) {
      alert(message);

      // 유효성 검사에 걸린 경우 -> 입력값 초기화
      for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`lotto${i}`);
        if (input) {
          input.value = '';
        }
      }


    // 유효성 검사를 통과한 경우 -> 로또 진행
    } else {

      // 범위 내의 숫자 준비 ---------------------------------
      const candidate = Array(45).fill().map((v, i) => i + 1);
      // 1. Array(): 길이가 45인 배열 생성
      // 2. fill(): 모든 요소를 `undefined`로 채우기
      // 3. map(): 1부터 45까지의 숫자를 배열로 변환


      // 숫자 랜덤으로 섞기 ---------------------------------
      // - 피셔-예이츠 셔플 알고리즘(Fisher-Yates shuffle): 배열을 무작위로 섞는 알고리즘
      const suffle = [];

      while (candidate.length > 0) {
        // 1. 무작위 인덱스 뽑기
        const random = Math.floor(Math.random() * candidate.length);
        // (1) Math.random(): 0 이상 1 미만의 부동 소수점 난수 생성
        // (2) (Math.random() * candidate.length): 0 이상 45 미만의 난수 생성(10.52)
        // (3) Math.floor(): 값을 내림하여 정수로 변환(10.52 -> 10)

        // 2. 뽑은 값을 새로운 배열에 넣기
        // - 무작위 인덱스에서 1개의 요소를 제거
        const spliceArray = candidate.splice(random, 1);

        // 3. 제거된 요소를 가져와서 저장
        const value = spliceArray[0];

        // 4. 제거해서 저장한 값을 suffle 배열에 넣기
        suffle.push(value);
      }


      // 당첨 숫자 7개 선정 ---------------------------------

      // 당첨 숫자
      const winBalls = suffle.slice(0, 6).sort((a, b) => a - b);
      // 1. slice(): suffle 배열[]에서 값 6개를 자름
      // 2. sort(): 오름차순 정렬

      // 보너스 숫자 - 7번 째 숫자는 보너스 숫자가 됨
      const bonusNum = suffle[6];


      // 당첨 결과 ------------------------------------

      // 기존 결과 삭제
      result.innerHTML = '';

      // 당첨 공 생성
      winBalls.forEach(num => {
        const ball = document.createElement('span');
        ball.className = 'num ' + getColorClass(num);
        ball.textContent = num;

        result.appendChild(ball);
      })

      // 플러스(+), 보너스 공 생성
      const plus = document.createElement('span');
      plus.className = 'plus';
      plus.textContent = ' + ';
      result.appendChild(plus);

      const bonusBall = document.createElement('span');
      bonusBall.className = 'num ';
      bonusBall.textContent = bonusNum;
      result.appendChild(bonusBall);


      // 당첨 UI 변경
      form.classList.add('sr-only')
      resultBox.classList.remove('sr-only');


      // 당첨 결과 계산 -----------------------------------
      const matchedCount = winBalls.filter(num => lottoNumbers.includes(num).length);
      // (1) includes(): lottoNumbers 배열에서 num이 포함되어 있는 지 확인
      // (2) filter(): lottoNumbers.includes(num)이 true인 경우, winBalls의 해당 요소를 포함하는 새로운 배열 생성

      // 최종 등수 변수, 상금 변수
      let rank, prize;

      switch (matchedCount) {
        case 6:
          rank = '1등';
          prize = '400000000';
          break;

        case 5:
          rank = '2등';
          prize = '50000000';
          break;

        case 4:
          rank = '3등';
          prize = '1400000';
          break;

        default:
          rank = '미당첨';
          prize = '0';
      }

      // 결과 화면에 표시
      rankElement.textContent = rank;
      priceElement.textContent = prize.toLocaleString();
      // - toLocaleString(): 금액을 천 단위로 구분하여 표시


      // 실시간 날짜 표시 -----------------------------------

      // 날짜(Date) 객체 생성
      const today = new Date();

      const formattedDate = today.toISOString().split('T')[0];
      // (1) toISOString(): Date 객체를 ISO 8601 형식의 문자열로 변환
      // - ISO 8601 형식: 날짜와 시간을 표현하는 표준 형식
      // (2) split('T')[0]: YYYY-MM-DDTHH:mm:ss.sssZ에서 'T'를 기준으로 앞으로 자름
      date.textContent = `${formattedDate} 추첨`
    }
  });


  // 숫자 자릿수에 따라 공 색상 변경 함수 ---------------------------------
  // - class명을 넣어서 색상 변경
  function getColorClass(num) {
    if (num >= 1 && num <= 10) return 'yellow';
    if (num >= 11 && num <= 20) return 'blue';
    if (num >= 21 && num <= 30) return 'red';
    if (num >= 31 && num <= 40) return 'gray';
    if (num >= 41 && num <= 45) return 'purple';
    return '';
  }
});

