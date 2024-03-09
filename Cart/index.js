
let products = [];
let cart = [];

$.get('store.json')
.then((data)=>{

  products = data.products; // 원본 데이터 다른데서 많이 쓰니까 변수에 보관

  // 페이지 로드 시 json 데이터 가져와서 메인페이지 내용 만들기
  data.products.forEach((a) => {

    let html = `
        <div class="container" draggable="true">
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


    // 검색어 기능
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
});



