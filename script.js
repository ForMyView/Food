// let user = {
//   name: 'John',
//   surname: 'Smith',
//   get fullName(){
//     return `${this.name}-${this.surname}`
//   },
//   set fullName(val){
//     let arr = val.split(' ');
//     this.name = arr[0];
//     this.surname = arr[1];
//   }

// }

// user.fullName = 'Вася Пупкин';

// console.log(user);


const product = {
  plainBurger: {
    name: 'Гамбургер простой',
    cost: 10000,
    kcall: 400,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumKcall() {
      return this.amount * this.kcall;
    },
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    cost: 20500,
    kcall: 500,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumKcall() {
      return this.amount * this.kcall;
    },
  },
  freshCombo: {
    name: 'FRESH COMBO',
    cost: 31900,
    kcall: 600,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumKcall() {
      return this.amount * this.kcall;
    },
  },
}

const extraProduct = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    cost: 1000,
    kcall: 60
  },
  lettuce: {
    name: 'Салатный лист',
    cost: 500,
    kcall: 20
  },
  cheese: {
    name: 'Сыр',
    cost: 1200,
    kcall: 100
  },
}

const productBtn = document.querySelectorAll('.main__product-btn');

productBtn.forEach(btn => {

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    add(this);
  });

});

function add(btn) {
  // btn.getAttribute('name') - Вернет значение атрибута
  // btn.setAttribute('name', value) - Добавит атрибут и значение для него
  // btn.hasAttribute('name') - Проверяет наличие атрибута
  // btn.removeAttribute('name') - Удалит атрибута

  let simbol = btn.getAttribute('data-symbol');
  let parent = btn.closest('.main__product');
  let parentId = parent.getAttribute('id');

  if (simbol == '+') {
    product[parentId].amount++;
  } else if (simbol == '-' && product[parentId].amount > 0) {
    product[parentId].amount--;
  }

  let productNum = parent.querySelector('.main__product-num');
  let productPrice = parent.querySelector('.main__product-price span');
  let productKcall = parent.querySelector('.main__product-kcall span');

  productNum.innerHTML = product[parentId].amount;
  productPrice.innerHTML = product[parentId].summ;
  productKcall.innerHTML = product[parentId].sumKcall;

}


const timerExtra = document.querySelector('.header__timer-extra');
time();
function time(speed) {

  setTimeout(() => {
    if (timerExtra.innerHTML >= 0 && timerExtra.innerHTML < 50) {
      timerExtra.innerHTML++;
      time(10);
    }
    else if (timerExtra.innerHTML >= 50 && timerExtra.innerHTML < 70) {
      timerExtra.innerHTML++;
      time(50);
    }
    else if (timerExtra.innerHTML >= 70 && timerExtra.innerHTML < 90) {
      timerExtra.innerHTML++;
      time(80);
    }
    else if (timerExtra.innerHTML >= 90 && timerExtra.innerHTML < 97) {
      timerExtra.innerHTML++;
      time(140);
    }
    else if (timerExtra.innerHTML >= 97 && timerExtra.innerHTML < 100) {
      timerExtra.innerHTML++;
      time(250);
    }
  }, speed);

}


const productCheckbox = document.querySelectorAll('.main__product-checkbox');

productCheckbox.forEach(item => {
  item.addEventListener('click', function () {
    addExtra(this);
  });
})

function addExtra(check) {
  let parent = check.closest('.main__product');
  let parentId = parent.getAttribute('id');
  let checkId = check.getAttribute('data-extra');
  let checked = check.checked;

  product[parentId][checkId] = checked;

  if (product[parentId][checkId] === true) {
    product[parentId].cost += extraProduct[checkId].cost;
    product[parentId].kcall += extraProduct[checkId].kcall;
  }
  else {
    product[parentId].cost -= extraProduct[checkId].cost;
    product[parentId].kcall -= extraProduct[checkId].kcall;
  }

  const productPrice = parent.querySelector('.main__product-price span');
  const productKcall = parent.querySelector('.main__product-kcall span');

  productPrice.innerHTML = product[parentId].summ;
  productKcall.innerHTML = product[parentId].sumKcall;
}

const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const windowOut = document.querySelector('.receipt__window-out');
const windowBtn = document.querySelector('.receipt__window-btn');

let arrProduct = [];
let totalname = '';
let totalPrice = 9000;
let totalKcall = null;

addCart.addEventListener('click', () => {

  setTimeout(() => {
    time2();
  }, 2000);

  for (const key in product) {
    let el = product[key];
    if (el.amount > 0) {
      arrProduct.push(el);
      for (const key2 in el) {

        if (el[key2] === true) {
          el.name += '\n' + extraProduct[key2].name;
        }
      }
      // console.log(el);
    }
  }

  arrProduct.forEach(el => {
    totalname += '\n' + el.name + `\nВ количестве: ${el.amount} шт. \n`;
    totalPrice += el.summ;
    totalKcall += el.sumKcall;
  })

  windowOut.innerHTML = `Вы заказали: \n${totalname}\nОбщая калорийность: ${totalKcall}\nОбщая стоимость с доставкой 9000т: ${totalPrice}`

  if (arrProduct.length > 0) {
    receipt.style.display = 'flex';
    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = '50%';
      receiptWindow.style.transform = 'translateY(-50%)';
    }, 100);
    document.body.style.overflow = 'hidden';
  }

  const productNum = document.querySelectorAll('.main__product-num');
  const productPrice = document.querySelectorAll('.main__product-price span');
  const productKcall = document.querySelectorAll('.main__product-kcall span');

  productNum.forEach((el, i) => {
    el.innerHTML = 0;
    productPrice[i].innerHTML = 0;
    productKcall[i].innerHTML = 0;
  })
});


windowBtn.addEventListener('click', () => {
  window.location.reload();
})


const productInfo = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewImg = document.querySelector('.view img');
const viewClose = document.querySelector('.view__close');

productInfo.forEach(item => {
  item.addEventListener('dblclick', function () {  
    openImg(this);
  })
})

function openImg(info){  
  view.classList.add('active');
  let img = info.querySelector('.main__product-info img');
  let imgSrc = img.getAttribute('src');
  viewImg.setAttribute('src', imgSrc);
}

viewClose.addEventListener('click', ()=> {
  view.classList.remove('active');
})



let check = document.querySelector('.checkTime');

check.innerHTML = 0;

function time2(speed) {

  setTimeout(() => {
    if (check.innerHTML >= 0 && check.innerHTML < 50) {
      check.innerHTML++;
      time2(10);
    }
    else if (check.innerHTML >= 50 && check.innerHTML < 70) {
      check.innerHTML++;
      time2(50);
    }
    else if (check.innerHTML >= 70 && check.innerHTML < 90) {
      check.innerHTML++;
      time2(80);
    }
    else if (check.innerHTML >= 90 && check.innerHTML < 97) {
      check.innerHTML++;
      time2(140);
    }
    else if (check.innerHTML >= 97 && check.innerHTML < 100) {
      check.innerHTML++;
      time2(250);
    }
  }, speed);

}