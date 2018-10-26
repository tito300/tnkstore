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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_scrollElementsFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/scrollElementsFunction.js */ \"./public/scripts/scrollElementsFunction.js\");\n/* harmony import */ var _scripts_scrollIconsFade_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/scrollIconsFade.js */ \"./public/scripts/scrollIconsFade.js\");\n\n\n/* *\r\n *\r\n * DOM elements quering\r\n *\r\n * * */\n\nvar img = document.querySelector('.img');\nvar imgH2 = document.querySelector('h2');\nvar imgP = document.querySelector('.part2__text-content__disc');\nvar scrollText = document.querySelector('.arrow');\nvar scrollIcon = document.querySelector('.scroll');\nvar discoverBtn = document.querySelector('.large-btn');\nvar sectionElem = document.querySelectorAll('.section');\nvar cU = document.querySelector('.contact-us');\nvar model = document.querySelector('.model');\nvar part3 = document.querySelector('.part3');\nvar blocks = document.querySelectorAll('.simple-product-card');\nvar block1 = document.querySelector('.block-1');\nvar contactElem = document.querySelector('.contact');\nvar modelElems = document.querySelectorAll('.model');\nvar currentSection = {\n  section: 0\n};\n/* *\r\n *\r\n * Event listeners\r\n *\r\n * * */\n\ndocument.querySelectorAll('.add-btn').forEach(function (c) {\n  c.addEventListener('click', addItem);\n});\ndocument.addEventListener('DOMContentLoaded', function () {\n  removeInitLoadingScreen();\n});\nObject(_scripts_scrollElementsFunction_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('arrow', 'section', currentSection);\nscrollIcon.addEventListener('click', hide);\nscrollText.addEventListener('click', hide);\nwindow.addEventListener('scroll', animateDomOnScroll);\ndiscoverBtn.addEventListener('click', openBoxModel);\ncontactElem.addEventListener('click', openBoxModel);\nmodelElems.forEach(function (c) {\n  c.addEventListener('click', closeModelBox);\n});\n/*\r\n*\r\n* All required functions\r\n*\r\n* * */\n\nfunction animateDomOnScroll(e) {\n  // console.log(currentSection);\n  var offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 6;\n  scrollText.style.display = 'none';\n  scrollIcon.style.display = 'none';\n  Object(_scripts_scrollIconsFade_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(sectionElem, scrollText, scrollIcon, currentSection);\n\n  if (imgH2.getBoundingClientRect().top - window.innerHeight <= -100) {\n    imgH2.classList.add('slidein');\n    imgP.classList.add('slidein');\n  } else if (imgH2.getBoundingClientRect().top - window.innerHeight >= 20) {\n    imgH2.classList.remove('slidein');\n    imgP.classList.remove('slidein');\n  }\n\n  if (block1.getBoundingClientRect().top - window.innerHeight <= -150) {\n    blocks.forEach(function (c) {\n      c.classList.add('block-animate');\n    });\n  } else if (part3.getBoundingClientRect().top - window.innerHeight >= 100) {\n    blocks.forEach(function (c) {\n      c.classList.remove('block-animate');\n    });\n  }\n\n  if (imgH2.getBoundingClientRect().top - window.innerHeight <= 0 && imgH2.getBoundingClientRect().top - window.innerHeight >= -1300) {\n    img.style.backgroundPositionY = \"\".concat(85 + offset, \"px\");\n  }\n}\n\nfunction openBoxModel(e) {\n  if (e.target.classList.contains('contact')) {\n    cU.style.display = 'flex';\n    cU.classList.remove('hideAfter');\n    cU.classList.add('show-flex');\n  } else {\n    model.style.display = 'flex';\n    model.classList.remove('hideAfter');\n    model.classList.add('show-flex');\n  }\n}\n\nfunction closeModelBox(e) {\n  if (e.target.classList.contains('x') || e.target.classList.contains('model')) {\n    document.querySelector('.model').style.display = 'none';\n    document.querySelector('.contact-us').style.display = 'none';\n  }\n}\n\nfunction removeInitLoadingScreen() {\n  setTimeout(function () {\n    window.scroll(0, 0);\n    document.querySelector('.loading').classList.add('hide-loader');\n    document.querySelector('.loading-img').classList.add('hide-loader');\n  }, 20);\n}\n\nfunction hide() {\n  scrollText.style.display = 'none';\n  scrollIcon.style.display = 'none';\n}\n/*\r\n*\r\n* Ajax calls async functions\r\n*\r\n* * */\n\n\nfunction addItem(e) {\n  var _this = this;\n\n  e.preventDefault();\n  var url = \"/cart/add/\".concat(this.dataset.id);\n  fetch(url, {\n    method: 'GET',\n    headers: {\n      'Content-type': 'application/json'\n    },\n    credentials: 'same-origin'\n  }).then(function (dataRes) {\n    return dataRes.json();\n  }).then(function (finaldata) {\n    document.querySelector('.fa-shopping-cart').textContent = finaldata.total;\n    var FlashContElement = _this.parentElement.parentElement;\n    FlashContElement.querySelector('.flash-success').classList.add('added');\n    setTimeout(function () {\n      FlashContElement.querySelector('.flash-success').classList.toggle('added');\n    }, 2000);\n  });\n}\n\n//# sourceURL=webpack:///./public/index.js?");

/***/ }),

/***/ "./public/scripts/scrollElementsFunction.js":
/*!**************************************************!*\
  !*** ./public/scripts/scrollElementsFunction.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scroller; });\nfunction scroller(controller, divsClass, oldCurrentSection) {\n  var sectionsArray = document.querySelectorAll(\".\".concat(divsClass));\n  var currentSection = oldCurrentSection.section;\n  document.querySelector(\".\".concat(controller)).addEventListener('click', move, true);\n\n  function move(e) {\n    // console.log(e);\n    if (e.target.classList.contains('next') && currentSection < sectionsArray.length) {\n      sectionsArray[++currentSection].scrollIntoView({\n        behavior: 'smooth',\n        block: 'start'\n      });\n    } else if (e.target.classList.contains('next') && currentSection === sectionsArray.length) {\n      currentSection = 0;\n    } // eslint-disable-line\n    // Same as above but for last section\n    else if (e.target.classList.contains('previous') && currentSection === sectionsArray.length) {\n        // debugger;\n        currentSection--;\n        sectionsArray[--currentSection].scrollIntoView({\n          behavior: 'smooth'\n        });\n      } else if (e.target.classList.contains('previous') && currentSection > 0) {\n        // debugger;\n        currentSection--;\n        sectionsArray[--currentSection].scrollIntoView({\n          behavior: 'smooth'\n        });\n      }\n  } // Event to to run a function while scrolling to check for each section position\n\n\n  window.addEventListener('scroll', updateCurrent);\n\n  function updateCurrent(e) {\n    // function that runs on each section while scrolling.\n    sectionsArray.forEach(function (c) {\n      // check if more than half of the section is in view then update the\n      // currentSection to reflect that\n      if (c.getBoundingClientRect().top < c.clientHeight / 10 && c.getBoundingClientRect().top > -c.clientHeight / 10) {\n        currentSection = parseInt(c.id);\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack:///./public/scripts/scrollElementsFunction.js?");

/***/ }),

/***/ "./public/scripts/scrollIconsFade.js":
/*!*******************************************!*\
  !*** ./public/scripts/scrollIconsFade.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scrollerAnimation; });\nfunction scrollerAnimation(sectionsArray, img, text, currentSection) {\n  setTimeout(function () {\n    // Timer to solve scroll problem and catch values after scroll is done\n    for (var x = 0; x < sectionsArray.length; x++) {\n      // forEach doesn't accept breaks\n      var bounding = sectionsArray[x].getBoundingClientRect();\n\n      if (bounding.top < 150 && bounding.top > -100 && sectionsArray[x + 1] || x === 0 && bounding.top >= 0) {\n        setTimeout(function () {\n          img.style.display = 'block';\n          text.style.display = 'block';\n        }, 20); //eslint-disable-line\n\n        currentSection.section = x;\n        break;\n      }\n    }\n  }, 1000);\n}\n\n//# sourceURL=webpack:///./public/scripts/scrollIconsFade.js?");

/***/ })

/******/ });