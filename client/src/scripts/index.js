import activateScroller from './scrollElementsFunction.js';
import scrollerAnimation from './scrollIconsFade.js';


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
const modelElems = document.querySelectorAll('.model');

const currentSection = {
  section: 0,
};
let isScrolling;

/* *
 *
 * Event listeners
 *
 * * */
document.querySelectorAll('.add-btn').forEach((c) => {
  c.addEventListener('click', addItem);
});
document.addEventListener('DOMContentLoaded', () => {
  removeInitLoadingScreen();
});
activateScroller('arrow', 'section', currentSection);

scrollIcon.addEventListener('click', hide);
scrollText.addEventListener('click', hide);
window.addEventListener('scroll', animateDomOnScroll);
// discoverBtn.addEventListener('click', openBoxModel);
modelElems.forEach((c) => { c.addEventListener('click', closeModelBox); });

/*
*
* All required functions
*
* * */
function animateDomOnScroll(e) {
  const offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 6;

  /* removes scroll arrows immidiatly when scrolling */
  scrollText.style.display = 'none'; scrollIcon.style.display = 'none';

  /* Timer to prevent scrollfade from running until scrolling is done */
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    scrollerAnimation(sectionElem, scrollText, scrollIcon, currentSection);
  }, 50);


  if (imgH2.getBoundingClientRect().top - window.innerHeight <= -100) {
    imgH2.classList.add('slidein');
    imgP.classList.add('slidein');
  } else if (imgH2.getBoundingClientRect().top - window.innerHeight >= 20) {
    imgH2.classList.remove('slidein');
    imgP.classList.remove('slidein');
  }
  if(window.screen.width > 620) {
    if (block1.getBoundingClientRect().top - window.innerHeight <= -150) {
      blocks.forEach((c) => {
        c.classList.add('block-animate');
      });
    } else if (part3.getBoundingClientRect().top - window.innerHeight >= 100) {
      blocks.forEach((c) => {
        c.classList.remove('block-animate');
      });
    }
  } 
  // debugger;
  if (imgH2.getBoundingClientRect().top - window.innerHeight <= 0
    && imgH2.getBoundingClientRect().top - window.innerHeight >= -1300) {
      if(window.screen.width <= 620) {
        return
      } else {
        img.style.backgroundPositionY = `${85 + offset}px`;
      }
  }
}


function openBoxModel(e) {
  if (e.target.classList.contains('contact')) {
    cU.style.display = 'flex';
    cU.classList.remove('hideAfter');
    cU.classList.add('show-flex');
  } else {
    model.style.display = 'flex';
    model.classList.remove('hideAfter');
    model.classList.add('show-flex');
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
    let loading = document.querySelector('.loading');
    if (loading) {
      document.querySelector('.loading').classList.add('hide-loader');
      document.querySelector('.loading-img').classList.add('hide-loader');
    }
  }, 1000);
}

function hide() {
  scrollText.style.display = 'none'; scrollIcon.style.display = 'none';
}

/*
*
* Ajax calls async functions
*
* * */
function addItem(e) {
  e.preventDefault();

  const url = `/cart/add/${this.dataset.id}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(dataRes => dataRes.json())
    .then((finaldata) => {
      document.querySelector('.fa-shopping-cart').textContent = finaldata.total;
      const FlashContElement = this.parentElement.parentElement;
      FlashContElement.querySelector('.flash-success').classList.add('added');
      setTimeout(() => { FlashContElement.querySelector('.flash-success').classList.toggle('added'); }, 2000);
    });
}
