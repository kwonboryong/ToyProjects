
let products = [];
let cart = [];

// -----------------데이터 가져오기-----------------
$.get('store.json')
.then((data)=>{

  products = data.products; // 원본 데이터 변수에 보관

  // json 데이터 가져와서 메인페이지 내용 만들기
  data.products.forEach((a) => {

    let html = `
        <div class="container" id="dragMe" draggable="true" ondragstart="drag(event)">
            <div class="item" data-id="${a.id}">
            <div class="image">
                <img src="${a.photo}" alt="" style="width: 200px; height: 150px;">
            </div>
            <div class="top">
                <div class="title">${a.title}</div>
                <div class="company">${a.brand}</div>
            </div>
            <div class="price">가격: ${a.price}</div>
                <button data-id="${a.id}" class="cartBtn">Add to Cart</button>
            </div>
        </div> `;

        $('.card').append(html)
    });


    // -----------------검색어 기능-----------------
    document.getElementById('search').addEventListener('input', function() {
    
        let search = document.getElementById('search').value;

        for (let i = 0; i < products.length; i++) {
            if (products[i]['title'].includes(search) || products[i]['brand'].includes(search)) {
                document.getElementsByClassName('container')[i].classList.remove('hide')
                

                // 검색어 하이라이트 기능
                // let highlightedTitle = products[i]['title'].replace(new RegExp(search, 'gi'), match => `<span class="highlight">${match}</span>`);
                // document.getElementsByClassName('title')[i].innerHTML = highlightedTitle;

                // let highlightedBrand = products[i]['brand'].replace(new RegExp(search, 'gi'), match => `<span class="highlight">${match}</span>`);
                // document.getElementsByClassName('company')[i].innerHTML = highlightedBrand;

            } else {
                document.getElementsByClassName('container')[i].classList.add('hide');
            }
        }
    });


    // -----------------장바구니 기능-----------------
    // 담기 버튼 누르면 장바구니에 담기
    $(document).on('click', '.cartBtn', function(e) {
        // 클릭된 버튼이 .cartBtn 클래스를 가지고 있는지 확인
        if ($(e.target).hasClass('cartBtn')) {
            // 지금 누른 버튼의 번호 
            let productId = e.target.dataset.id;

            // 담기버튼 누를 때 let cart = [] 에 상품을 {} 형태로 보관부터하고 
            
            //let cart에 상품이 이미있는지 찾고 없으면 let cart에 {}추가, 있으면 수량만 ++;
            let 몇번째 = cart.findIndex((a)=>{ return a.id == productId })

            if (몇번째 == -1) {
                let 현재상품 = products.find((a)=> { return a.id == productId });
                현재상품.count = 1;
                cart.push(현재상품);
            } else {
                cart[몇번째].count++;
            }
            console.log(cart);

            
            // 담기 버튼 누를 때 마다 장바구니에 html 생성
            $('.dropBox').html('');
            cart.forEach((a, i)=>{
                $('.dropBox').append(`
                        <div class="container" id="dragMe" draggable="true" ondragstart="drag(event)">
                            <div class="item" data-id="${a.id}">
                            <div class="image">
                                <img src="${a.photo}" alt="" style="width: 200px; height: 150px;">
                            </div>
                            <div class="top">
                                <div class="title">${a.title}</div>
                                <div class="company">${a.brand}</div>
                            </div>
                            <div class="price">가격: ${a.price}</div>
                                <button data-id="${a.id}" class="cartBtn">Add to Cart</button>
                            </div>
                            <input type="number" value="${a.count}" class="item-count">
                        </div>
                `);
            });

        // 총 가격 계산 메서드
        priceCalc();

        //input값 조작 시 총 가격 업데이트
        $('.item-count').on('input', function(){
            priceCalc();
        });
  
        }
    });

    
    // -----------------가격순 정렬-----------------
    document.getElementById('priceDown').addEventListener('click', function() {
    
        // 1. 가격순 정렬
        products.sort(function(a, b) {
            return b.price - a.price
        });
    
        // 2. 카드 div의 내용을 삭제하기
        document.querySelector('.card').innerHTML = '';
        
        // 3. 새로 정렬한 데이터 갯수만큼 카드 생성하기
        products.forEach((a, i) => {
            var a = `
            <div class="container" id="dragMe" draggable="true" ondragstart="drag(event)">
                <div class="item" data-id="${a.id}">
                <div class="image">
                    <img src="${a.photo}" alt="" style="width: 200px; height: 150px;">
                </div>
                <div class="top">
                    <div class="title">${a.title}</div>
                    <div class="company">${a.brand}</div>
                </div>
                <div class="price">가격: ${a.price}</div>
                    <button data-id="${a.id}" class="cartBtn">Add to Cart</button>
                </div>
            </div> `;
        
            document.querySelector('.card').insertAdjacentHTML('beforeend', a);
        });
    });

    // -----------------3만원 이하 정렬-----------------
    document.getElementById('down-2').addEventListener('click', function() {

        // 1. 가격이 3만원 이하 필터링
        var newProduct = products.filter(function(a) {
            return a.price <= 20000;
        })
    
        // 2. 카드 div의 내용을 삭제하기
        document.querySelector('.card').innerHTML = '';
    
        // 3. 새로 정렬한 데이터 갯수만큼 카드 생성하기
        newProduct.forEach((a, i) => {
            var a = `
            <div class="container" id="dragMe" draggable="true" ondragstart="drag(event)">
                <div class="item" data-id="${a.id}">
                <div class="image">
                    <img src="${a.photo}" alt="" style="width: 200px; height: 150px;">
                </div>
                <div class="top">
                    <div class="title">${a.title}</div>
                    <div class="company">${a.brand}</div>
                </div>
                <div class="price">가격: ${a.price}</div>
                    <button data-id="${a.id}" class="cartBtn">Add to Cart</button>
                </div>
            </div> `;
        
            document.querySelector('.card').insertAdjacentHTML('beforeend', a);
        });
    });


    //-----------------드래그 이벤트-----------------
    $('.item').on('dragstart', function(e){
        e.originalEvent.dataTransfer.setData('id', e.target.dataset.id)
    });

    $('.dropBox').on('dragover', function(e){
        e.preventDefault();
    });

    $('.dropBox').on('drop', function(e){

        let productId = e.originalEvent.dataTransfer.getData('id');

        $('.cartBtn').eq(productId).click();

    });
});


//-----------------최종 가격-----------------
function priceCalc(){
    
    let finalPrice = 0;
    
     // 각 상품에 대해 가격과 수량을 곱하여 합산
    $('.item-count').each(function() {
        var priceText = $(this).parent().find('.price').text();
        // "가격: " 부분을 제거하고 숫자만 추출하여 가격으로 사용
        var price = parseFloat(priceText.split(' ')[1]); // "가격: " 뒤의 숫자만 추출하여 변환
        var count = parseInt($(this).val()); // 입력된 수량을 정수로 변환하여 사용
        finalPrice += price * count;
    });

    let formattedPrice = finalPrice.toLocaleString();

    $('.final-price').html('합계: ' + formattedPrice + '원');
}

//-----------------결제창-----------------
// 모달 기능
document.getElementById("buyBtn").addEventListener("click", function () {
    document.querySelector('.modal1').classList.add('show-modal');
});

document.getElementById("close").addEventListener("click", function () {
    document.querySelector('.modal1').classList.remove('show-modal');
});


//-----------------영수증-----------------
document.getElementById('send').addEventListener('click', function () {

    // 기존 모달 닫기
    document.querySelector('.modal1').classList.remove('show-modal');

    let name = document.querySelectorAll('.m-input')[0].value;
    let phone = document.querySelectorAll('.m-input')[1].value;
    
    // 개인 정보 유효성 검사
    // 이름
    if (name == '') {
        alert('이름을 입력하세요.');
        e.preventDefault()
    } else if (/[a-zA-Zㄱ-ㅎ0-9]/.test(name)) {
        alert('이름은 한글 입력만 가능합니다.');
        e.preventDefault()
    } 

    if (name.length < 2 || name.length > 5) {
        alert('이름 제한 길이를 넘었습니다.');
        e.preventDefault()
    }

    // 전화번호
    if (phone == '') {
        alert('전화번호를 입력하세요.');
        e.preventDefault()
    } else if ((!/^(01[016789]{1})-[0-9]{4}-[0-9]{4}$/.test(phone)) && (!/^(01[016789]{1})[0-9]{4}[0-9]{4}$/.test(phone))) {
        alert('전화번호 형식이 틀렸습니다.');
        e.preventDefault()
    }


    // 영수증 모달 열기
    document.getElementById('receiptModal').style.display = 'block';
    
    // 영수증 캔버스 생성 및 내용 그리기
    var canvas = document.createElement('canvas');
    canvas.id = 'receiptCanvas';
    canvas.width = 500;
    canvas.height = 800;
    var c = canvas.getContext('2d');

    c.font = '18px dotum'; 
    c.fillText('이름: ' + name, 170, 30);
    c.fillText('전화번호: ' + phone, 170, 60);

    // 구매 시간!!!!!!!!!!!!!!!!!!!!!!!

    // 장바구니에 저장된 각 상품 정보 출력
    let yPosition = 120; // 출력할 상품 정보의 시작 위치
    cart.forEach((product) => {
        c.fillText('상품명: ' + product.title, 170, yPosition);
        c.fillText('가격: ' + product.price, 170, yPosition + 30);
        c.fillText('수량: ' + product.count, 170, yPosition + 60);
        c.fillText('합계: ' + (product.price * product.count), 170, yPosition + 90);
        yPosition += 135; // 다음 상품 정보의 출력 위치 조정
    });

    // 총 합계 계산
    let totalPrice = cart.reduce((total, product) => total + (product.price * product.count), 0);
    c.fillText('총 합계: ' + totalPrice, 170, yPosition + 10);

    // 생성된 캔버스를 영수증 모달에 추가
    var modalContent = document.querySelector('#receiptModal .modal-content');
    modalContent.appendChild(canvas);
});

// 영수증 닫기 버튼
document.getElementById('closeReceipt').addEventListener('click', function () {
    document.getElementById('receiptModal').style.display = 'none';
});

