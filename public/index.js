import init from './scripts/initializer.js';
import activateScroller from './scripts/scrollElementsFunction.js';
import scrollerAnimation from './scripts/scrollIconsFade.js';
import { getLocalStorage, updateCart } from './scripts/localStorageMethods.js';

/* *
 *
 * DOM elements quering
 *
 * * */
const img = document.querySelector('.img');
const imgH2 = document.querySelector('h2');
const imgP = document.querySelector('.part2__text-content__disc');
const scrollText = document.querySelector('.arrow');
const scrollIcon = document.querySelector('.scroll');
const discoverBtn = document.querySelector('.large-btn');
const sectionElem = document.querySelectorAll('.section');
const cU = document.querySelector('.contact-us');
const model = document.querySelector('.model');
const part3 = document.querySelector('.part3');
const blocks = document.querySelectorAll('.simple-product-card');
const block1 = document.querySelector('.block-1');
const contactElem = document.querySelector('.contact');
const modelElems = document.querySelectorAll('.model');

/*
 * Check if user is signedin and set local state in storage
 *
 * */
init();
const signedin = (localStorage.getItem('signedin') === 'true');
const sync = signedin;


/* *
 *
 * Event listeners
 *
 * * */
document.querySelectorAll('.add-btn').forEach((c) => {
  c.addEventListener('click', addItem);
});

modelElems.forEach((c) => { c.addEventListener('click', closeModelBox); });
contactElem.addEventListener('click', openBoxModel);

/*
 * Those are events that only occure on the home page
 *
 * */
if (window.location.pathname === '/') {
  window.addEventListener('scroll', animateDomOnScroll);
  scrollIcon.addEventListener('click', hide);
  scrollText.addEventListener('click', hide);
  discoverBtn.addEventListener('click', openBoxModel);
  document.addEventListener('DOMContentLoaded', () => {
    removeInitLoadingScreen();
    activateScroller('body', 'section');
  });
}

/*
*
* axios defaults and token handling
*
* * */
axios.defaults.headers.post['Content-Type'] = 'application/json';
const token = localStorage.getItem('x-token');
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}

/*
*
* All required functions
*
* * */
function animateDomOnScroll(e) {
  const offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 6;

  scrollText.style.display = 'none'; scrollIcon.style.display = 'none';

  scrollerAnimation(sectionElem, scrollText, scrollIcon);

  if (imgH2.getBoundingClientRect().top - window.innerHeight <= -100) {
    imgH2.classList.add('slidein');
    imgP.classList.add('slidein');
  } else if (imgH2.getBoundingClientRect().top - window.innerHeight >= 20) {
    imgH2.classList.remove('slidein');
    imgP.classList.remove('slidein');
  }

  if (block1.getBoundingClientRect().top - window.innerHeight <= -150) {
    blocks.forEach((c) => {
      c.classList.add('block-animate');
    });
  } else if (part3.getBoundingClientRect().top - window.innerHeight >= 100) {
    blocks.forEach((c) => {
      c.classList.remove('block-animate');
    });
  }

  if (imgH2.getBoundingClientRect().top - window.innerHeight <= 0
    && imgH2.getBoundingClientRect().top - window.innerHeight >= -1300) {
    img.style.backgroundPositionY = `${85 + offset}px`;
  }
}


function openBoxModel(e) {
  if (e.target.classList.contains('contact')) {
    cU.style.display = 'flex';
  } else {
    model.style.display = 'flex';
  }
}


function closeModelBox(e) {
  if (e.target.classList.contains('x') || e.target.classList.contains('model')) {
    document.querySelector('.model').style.display = 'none';
    document.querySelector('.contact-us').style.display = 'none';
  }
}


function removeInitLoadingScreen() {
  setTimeout(() => {
    window.scroll(0, 0);
    document.querySelector('.loading').classList.add('hide-loader');
    document.querySelector('.loading-img').classList.add('hide-loader');
  }, 500);
}

function hide() {
  scrollText.style.display = 'none'; scrollIcon.style.display = 'none';
}

/*
*
* Ajax calls async functions
*
* * */
async function addItem(e) {
  e.preventDefault();
  const FlashContElement = this.parentElement.parentElement;
  FlashContElement.querySelector('.flash-success').classList.add('added');

  const newCartItems = getLocalStorage('cartItems');

  /* checks whether to add new item or increment existing one */
  let exists = null;
  for (let i = 0; i < newCartItems.length; i++) {
    if (newCartItems[i].id === this.dataset.id) {
      exists = i;
    }
  }
  if (exists || exists === 0) {
    newCartItems[exists].count++;
  } else {
    const item = await axios.get(`/products/${this.dataset.id}?cartItem=true`);
    if (!item.data || typeof item.data !== 'object') { return console.warn('data recieved is not an object'); }
    newCartItems.push(item.data);
  }

  updateCart(newCartItems, { sync });
  setTimeout(() => { FlashContElement.querySelector('.flash-success').classList.toggle('added'); }, 2000);
}
