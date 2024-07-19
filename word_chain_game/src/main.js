
document.addEventListener('DOMContentLoaded', function () {

  // GSAP 애니메이션
  gsap.from(".header", { duration: 6, opacity: 0 });

  let tl = gsap.timeline();
  tl.to(".header", { duration: 1, x: 900 })
  tl.to(".header", { duration: 1, x: -900 })
    .to(".header", { duration: 1, x: 0, y: 0});


  // DOM 요소 선택 함수
  function getElementById(id) {
    return document.getElementById(id);
  }

  // 가시성 토글 함수
  function toggleVisibility(show, hide) {
    show.classList.add('hidden');
    hide.classList.remove('hidden');
  }

  // 초기 변수 설정
  const elements = {
    buttonStartBox: document.getElementById('button-start-box'),
    buttonStart: document.getElementById('button-start'),
    gameReadyBox: document.getElementById('game-ready'),
    gameBox: document.getElementById('game-box'),
    buttonReady: document.getElementById('button-ready'),
    buttonReset: document.getElementById('button-reset'),
    buttonSubmit: document.getElementById('button-submit'),
    currentWordSpan: document.getElementById('current-word'),
    userInput: document.getElementById('user-input'),
    participantNumberInput: document.getElementById('participant-number'),
    orderNumberElement: getElementById('order')
  }

  // 초기 데이터 
  let state = {
    startingWord: '',
    userWord: '',
    orderNumber: 1,
    number: 0
  };

  // 이벤트 핸들러 등록
  function initEventListeners() {
    elements.buttonStart.addEventListener('click', onStartClick);
    elements.buttonReady.addEventListener('click', onReadyClick);
    elements.buttonSubmit.addEventListener('click', onSubmitClick);
    elements.buttonReset.addEventListener('click', reset);
    elements.userInput.addEventListener('input', onInput);
  }

  // 시작 버튼
  function onStartClick() {
    toggleVisibility(elements.buttonStartBox, elements.gameReadyBox);
  }

  // 참가 버튼
  function onReadyClick() {
    // 참가자 수 업데이트
    state.participantNumber = Number(elements.participantNumberInput.value);

    if (state.participantNumber > 0) {
      toggleVisibility(elements.gameReadyBox, elements.gameBox);
      elements.userInput.focus();

    } else {
      alert('참가자 수를 입력하세요!');
    }
  }

  
  // 입력값을 현재어에 저장
  function onInput(event) {
    state.userWord = event.target.value;
  }

  // 제출 함수
  function onSubmitClick() {
    if (!state.startingWord || isValidWord()) {
      updateStartingWord();

    } else {
      alert('틀린 단어입니다!');

      reset()
    }
  }

  // 제출 시 조건
  function isValidWord() {
    return state.startingWord.slice(-1) === state.userWord[0];
  }

  // 제시어 업데이트 
  function updateStartingWord() {
    state.startingWord = state.userWord;
    elements.currentWordSpan.textContent = state.startingWord;
    updateOrderNumber();
    clearUserInput();
  }

  // 순서 업데이트
  function updateOrderNumber() {
    state.orderNumber = (state.orderNumber % state.participantNumber) + 1;
    elements.orderNumberElement.textContent = state.orderNumber;
  }

  // 입력값 초기화
  function clearUserInput() {
    elements.userInput.value = '';
    elements.userInput.focus();
  }

  // 리셋 버튼
  function reset() {
    state.startingWord = '';
    elements.currentWordSpan.textContent = '';
    clearUserInput();

    // 초기 순서로 재설정
    state.orderNumber = 1;
    elements.orderNumberElement.textContent = state.orderNumber;
  }

  // 초기화 함수
  function initializeGame() {
    initEventListeners();
  }

  // 게임 초기화
  initializeGame();
});




