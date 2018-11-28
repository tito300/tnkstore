/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_scrollElementsFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/scrollElementsFunction.js */ \"./public/scripts/scrollElementsFunction.js\");\n/* harmony import */ var _scripts_scrollIconsFade_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/scrollIconsFade.js */ \"./public/scripts/scrollIconsFade.js\");\n\n\n/* *\r\n *\r\n * DOM elements quering\r\n *\r\n * * */\n\nconst img = document.querySelector('.img');\nconst imgH2 = document.querySelector('h2');\nconst imgP = document.querySelector('.part2__text-content__disc');\nconst scrollText = document.querySelector('.arrow');\nconst scrollIcon = document.querySelector('.scroll');\nconst discoverBtn = document.querySelector('.large-btn');\nconst sectionElem = document.querySelectorAll('.section');\nconst cU = document.querySelector('.contact-us');\nconst model = document.querySelector('.model');\nconst part3 = document.querySelector('.part3');\nconst blocks = document.querySelectorAll('.simple-product-card');\nconst block1 = document.querySelector('.block-1');\nconst contactElem = document.querySelector('.contact');\nconst modelElems = document.querySelectorAll('.model');\n/* *\r\n *\r\n * Event listeners\r\n *\r\n * * */\n\ndocument.querySelectorAll('.add-btn').forEach(c => {\n  c.addEventListener('click', addItem);\n});\ndocument.addEventListener('DOMContentLoaded', () => {\n  removeInitLoadingScreen();\n  Object(_scripts_scrollElementsFunction_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('body', 'section');\n});\nscrollIcon.addEventListener('click', hide);\nscrollText.addEventListener('click', hide);\nwindow.addEventListener('scroll', animateDomOnScroll);\ndiscoverBtn.addEventListener('click', openBoxModel);\ncontactElem.addEventListener('click', openBoxModel);\nmodelElems.forEach(c => {\n  c.addEventListener('click', closeModelBox);\n});\n/*\r\n*\r\n* axios defaults and token handling\r\n*\r\n* * */\n\nlocalStorage.setItem('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8eB-nE8QgzM29MdEFIMjyWCaoocjy1S_i3CbBkIfCiY');\naxios.defaults.headers.post['Content-Type'] = 'application/json';\nconst token = localStorage.getItem('x-token');\n\nif (token) {\n  axios.defaults.headers.common['x-auth-token'] = token;\n}\n/*\r\n*\r\n* All required functions\r\n*\r\n* * */\n\n\nfunction animateDomOnScroll(e) {\n  const offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 6;\n  scrollText.style.display = 'none';\n  scrollIcon.style.display = 'none';\n  Object(_scripts_scrollIconsFade_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(sectionElem, scrollText, scrollIcon);\n\n  if (imgH2.getBoundingClientRect().top - window.innerHeight <= -100) {\n    imgH2.classList.add('slidein');\n    imgP.classList.add('slidein');\n  } else if (imgH2.getBoundingClientRect().top - window.innerHeight >= 20) {\n    imgH2.classList.remove('slidein');\n    imgP.classList.remove('slidein');\n  }\n\n  if (block1.getBoundingClientRect().top - window.innerHeight <= -150) {\n    blocks.forEach(c => {\n      c.classList.add('block-animate');\n    });\n  } else if (part3.getBoundingClientRect().top - window.innerHeight >= 100) {\n    blocks.forEach(c => {\n      c.classList.remove('block-animate');\n    });\n  }\n\n  if (imgH2.getBoundingClientRect().top - window.innerHeight <= 0 && imgH2.getBoundingClientRect().top - window.innerHeight >= -1300) {\n    img.style.backgroundPositionY = `${85 + offset}px`;\n  }\n}\n\nfunction openBoxModel(e) {\n  if (e.target.classList.contains('contact')) {\n    cU.style.display = 'flex';\n  } else {\n    model.style.display = 'flex';\n  }\n}\n\nfunction closeModelBox(e) {\n  if (e.target.classList.contains('x') || e.target.classList.contains('model')) {\n    document.querySelector('.model').style.display = 'none';\n    document.querySelector('.contact-us').style.display = 'none';\n  }\n}\n\nfunction removeInitLoadingScreen() {\n  setTimeout(() => {\n    window.scroll(0, 0);\n    document.querySelector('.loading').classList.add('hide-loader');\n    document.querySelector('.loading-img').classList.add('hide-loader');\n  }, 20);\n}\n\nfunction hide() {\n  scrollText.style.display = 'none';\n  scrollIcon.style.display = 'none';\n}\n/*\r\n*\r\n* Ajax calls async functions\r\n*\r\n* * */\n\n\nasync function addItem(e) {\n  e.preventDefault();\n  const url = `/cart/add/${this.dataset.id}`;\n  const dataRes = await fetch(url, {\n    method: 'GET',\n    headers: {\n      'Content-type': 'application/json'\n    },\n    credentials: 'same-origin'\n  });\n  const finaldata = await dataRes.json();\n  document.querySelector('.fa-shopping-cart').textContent = finaldata.total;\n  const FlashContElement = this.parentElement.parentElement;\n  FlashContElement.querySelector('.flash-success').classList.add('added');\n  setTimeout(() => {\n    FlashContElement.querySelector('.flash-success').classList.toggle('added');\n  }, 2000);\n}\n\n//# sourceURL=webpack:///./public/index.js?");

/***/ }),

/***/ "./public/scripts/scrollElementsFunction.js":
/*!**************************************************!*\
  !*** ./public/scripts/scrollElementsFunction.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scroller; });\nfunction scroller(controller, divsClass) {\n  const sectionsArray = document.querySelectorAll(`.${divsClass}`);\n  let currentSection = 0;\n  document.querySelector(controller).addEventListener('click', move, true);\n\n  function move(e) {\n    if (e.target.classList.contains('next') && currentSection < sectionsArray.length) {\n      sectionsArray[++currentSection].scrollIntoView({\n        behavior: 'smooth',\n        block: 'start'\n      });\n    } else if (e.target.classList.contains('next') && currentSection === sectionsArray.length) {\n      currentSection = 0;\n    } // eslint-disable-line\n    // Same as above but for last section\n    else if (e.target.classList.contains('previous') && currentSection === sectionsArray.length) {\n        // debugger;\n        currentSection--;\n        sectionsArray[--currentSection].scrollIntoView({\n          behavior: 'smooth'\n        });\n      } else if (e.target.classList.contains('previous') && currentSection > 0) {\n        // debugger;\n        currentSection--;\n        sectionsArray[--currentSection].scrollIntoView({\n          behavior: 'smooth'\n        });\n      }\n  } // Event to to run a function while scrolling to check for each section position\n\n\n  window.addEventListener('scroll', updateCurrent);\n\n  function updateCurrent(e) {\n    // function that runs on each section while scrolling.\n    sectionsArray.forEach(c => {\n      // check if more than half of the section is in view then update the\n      // currentSection to reflect that\n      if (c.getBoundingClientRect().top < c.clientHeight / 10 && c.getBoundingClientRect().top > -c.clientHeight / 10) {\n        currentSection = parseInt(c.id);\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack:///./public/scripts/scrollElementsFunction.js?");

/***/ }),

/***/ "./public/scripts/scrollIconsFade.js":
/*!*******************************************!*\
  !*** ./public/scripts/scrollIconsFade.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scrollerAnimation; });\nfunction scrollerAnimation(sectionsArray, img, text) {\n  setTimeout(() => {\n    // Timer to solve scroll problem and catch values after scroll is done\n    for (let x = 0; x < sectionsArray.length; x++) {\n      // forEach doesn't accept breaks\n      if (sectionsArray[x].getBoundingClientRect().top < 150 && sectionsArray[x].getBoundingClientRect().top > -100 && sectionsArray[x + 1]) {\n        setTimeout(() => {\n          img.style.display = 'block';\n          text.style.display = 'block';\n        }, 20); //eslint-disable-line\n\n        break;\n      }\n    }\n  }, 1000);\n}\n\n//# sourceURL=webpack:///./public/scripts/scrollIconsFade.js?");

/***/ })

/******/ });