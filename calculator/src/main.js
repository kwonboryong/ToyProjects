document.addEventListener('DOMContentLoaded', function () {

  // 첫 번째 수
  let numFirst = '';

  // 연산자
  let operator = '';

  // 두 번째 수
  let numSecond = '';

  // 화면
  const displayResult = document.querySelector('#result');


  // 숫자 버튼 함수
  const onClickNumber = (e) => {
    const number = e.target.textContent;

    // 연산자가 없으면(첫 번째 숫자 차례)
    if (!operator) {
      // 첫 번째 숫자에 더함
      numFirst += number;
      displayResult.value += number;

    // 연산자가 있으면(두 번째 숫자 차례)
    } else {
      // 두 번째 숫자에 더함
      numSecond += number;
      displayResult.value += number;

      // 두 번째 숫자가 없으면(화면 비우기)
      if (!numSecond) {
        displayResult.value = '';
      }
    }
  };

  // id 속성이 'num-'로 시작하는 button 요소를 선택(Regex)
  document.querySelectorAll('button[id^="num-"]').forEach(button => {
    button.addEventListener('click', onClickNumber);
  });



  // 연산자 버튼 함수
  const onClickOperator = (op) => {
    return () => {
      // 첫 번째 숫자가 있고
      if (numFirst) {
        // 두 번째 숫자가 있으면
        if (numSecond) {
          // 계산 수행
          calculate();
        }

        // 첫 번째 숫자만 있을 때는 연산자 저장
        operator = op;

        // 다음 입력을 위해 입력 필드를 비우기
        displayResult.value = '';

      } else {
        alert('숫자를 입력하세요.');
      }
    }
  }

  document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
  document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
  document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
  document.querySelector('#divide').addEventListener('click', onClickOperator('/'));



  // 계산 함수
  const calculate = () => {

    // 두 숫자가 모두 있는 경우
    if (numFirst && numSecond) {
      let calculation = 0; // 합계 선언
      const num1 = parseFloat(numFirst);
      const num2 = parseFloat(numSecond);

      switch (operator) {
        case '+':
          calculation = num1 + num2;
          break;

        case '-':
          calculation = num1 - num2;
          break;

        case '*':
          calculation = num1 * num2;
          break;

        case '/':
          calculation = num1 / num2;
          break;

        default:
          alert('올바른 연산자를 선택하세요.');
          return;
      }

      displayResult.value = calculation;
      numFirst = calculation.toString();
      // 합계 출력 후에도 추가 연산이 가능하도록 첫 번째 숫자를 문자열로 변환
      numSecond = '';
      operator = '';

    } else {
      alert('숫자를 먼저 입력하세요.');
    }
  }

  document.querySelector('#calculate').addEventListener('click', calculate);



  // 초기화 함수
  const clear = () => {
    numFirst = '';
    numSecond = '';
    operator = '';
    displayResult.value = '';
  };

  document.querySelector('#clear').addEventListener('click', clear);
});
