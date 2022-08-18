// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/basket.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemToBasket = addItemToBasket;
exports.showItemPreview = showItemPreview;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var basket = document.querySelector('#basketBtn');
var clearBasket = document.querySelector('#clearBasket');
var basketList = document.querySelector('.basket_list');
var basketBlock = document.querySelector('.basket');
var clearBtnBlock = document.querySelector('.basket_btn');
var basketTotal = document.querySelector('.basket_total span');
var popupOverlay = document.querySelector('.overlay');
var basketEmptyClass = 'basket_list__empty';
var basletCountClass = 'basket_list__item_count';
var products = getProduct();
document.addEventListener('click', function () {
  window.addEventListener('click', function (e) {
    var target = e.target;

    if (!target.closest('.goods-card__button_add-basket') && !target.closest('.header__basket')) {
      basketBlock.style.display = 'none';
    }
  });
});

if (products.length) {
  showBtnBlock(true);

  var _iterator = _createForOfIteratorHelper(products),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var product = _step.value;
      createBasketBlock(product);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  getTotalSum();
} else {
  showBtnBlock(false);
  createEmptyBasket();
}

popupOverlay.addEventListener('click', function (e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  showPopup(false);
});
clearBasket.addEventListener('click', function () {
  clearBasketItems();
  showBtnBlock(false);
  createEmptyBasket();
  products = [];
  setProduct();
});
basket.addEventListener('click', function () {
  basketBlock.classList.toggle('active');
  showBasket();
}); // basketBlock.addEventListener('click', e => {
//     e.stopPropagation();
//   });

function createEmptyBasket() {
  var text = 'В корзине пока ничего нет.';
  var listElement = createElement('li', basketEmptyClass, text);
  basketList.appendChild(listElement);
  basketTotal.innerText = '';
}

function clearBasketItems() {
  var deleteBasketAll = document.querySelectorAll('.basket_list__item');

  for (var i = 0; i < deleteBasketAll.length; i++) {
    deleteBasketAll[i].remove();
  }
}

function showBtnBlock(show) {
  show ? clearBtnBlock.style.display = '' : clearBtnBlock.style.display = 'none';
}

function createElement(tag) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var element = document.createElement(tag);

  if (classList.length) {
    element.classList.add(classList);
  }

  if (text.length) {
    element.innerText = text;
  }

  var _iterator2 = _createForOfIteratorHelper(attributes),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var attr = _step2.value;
      element.setAttribute(attr.name, attr.value);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return element;
}

function createBasketBlock(product) {
  var imgItem = createElement('img', 'basket_list__item_img', '', [{
    name: 'src',
    value: product.img
  }]);
  var nameItem = createElement('p', 'basket_list__item_name', product.name);
  var pricesBlock = createElement('div', 'basket_list__item_info');
  var currentPriceItem = createElement('span', 'basket_list__item_info_price', product.currentPrice);
  var oldPriceItem = createElement('del', '', product.oldPrice);
  var coutnItem = createElement('span', basletCountClass, "".concat(product.count, " \u0448\u0442."));
  var basketBlock = createElement('li', 'basket_list__item', '', [{
    name: 'id',
    value: "product_".concat(product.id)
  }]);
  pricesBlock.appendChild(currentPriceItem);
  pricesBlock.appendChild(oldPriceItem);
  basketBlock.appendChild(imgItem);
  basketBlock.appendChild(nameItem);
  basketBlock.appendChild(coutnItem);
  basketBlock.appendChild(pricesBlock);
  basketList.appendChild(basketBlock);
}

function addItemToBasket(id) {
  var product = setProductInfo(id);
  var emptyBlock = document.querySelector(".".concat(basketEmptyClass));
  var basketItem = document.querySelector("#product_".concat(product.id));

  if (emptyBlock !== null) {
    emptyBlock.remove();
    showBtnBlock(true);
  }

  if (basketItem === null) {
    createBasketBlock(product);
  } else {
    setProductCount(basketItem, product.count);
  }

  getTotalSum();
}

function getTotalSum() {
  var total = 0;

  var _iterator3 = _createForOfIteratorHelper(products),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _product = _step3.value;
      total += _product.count * _product.currentPrice.split(' ')[0];
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  basketTotal.innerText = "\u0418\u0442\u043E\u0433\u043E: ".concat(total.toFixed(2));
}

function setProductCount(basketElement, count) {
  var element = basketElement.querySelector(".".concat(basletCountClass));
  element.innerText = count + "\u0448\u0442.";
}

function setProductInfo(id) {
  var parent = document.querySelector("#cardProduct_".concat(id));
  var key;

  for (var i in products) {
    if (id === products[i].id) {
      key = i;
      break;
    }
  }

  if (key === undefined) {
    products.push({
      img: parent.querySelector('img').getAttribute('src'),
      currentPrice: parent.querySelector('.goods-info__price_now').innerText,
      oldPrice: parent.querySelector('.goods-info__price_last').innerText,
      name: parent.querySelector('.goods-info__description').innerText,
      id: id,
      count: 1
    });
    key = -1;
  } else {
    products[key].count++;
  }

  setProduct();
  return products.slice(key)[0];
}

function showBasket() {
  var display = basketBlock.style.display;
  display === 'block' ? basketBlock.style.display = 'none' : basketBlock.style.display = 'block';
}

function setProduct() {
  localStorage.setItem('products', JSON.stringify(products));
}

function getProduct() {
  var result = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  return result;
}

function showItemPreview(id) {
  var parent = document.querySelector("#cardProduct_".concat(id));
  var path = parent.querySelector('img').getAttribute('src');
  var img = document.querySelector('.overlay_popup__img');
  img.setAttribute('src', path);
  showPopup(true);
}

function showPopup(show) {
  show ? popupOverlay.style.display = 'block' : popupOverlay.style.display = 'none';
}
},{}],"scripts/webAPI.js":[function(require,module,exports) {
"use strict";

var _basket = require("./basket");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var requestURL = "https://62e03995fa8ed271c480af0e.mockapi.io/goods";
var goodsList = document.querySelector(".goods__list");
var showMoreButton = document.querySelector(".goods__show-button");
var page = new Page(1, 9);

function getGoodsCards(_x, _x2) {
  return _getGoodsCards.apply(this, arguments);
}

function _getGoodsCards() {
  _getGoodsCards = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, page) {
    var response, goodsData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url + "?page=".concat(page.number, "&limit=").concat(page.size));

          case 2:
            response = _context.sent;

            if (response.ok) {
              _context.next = 5;
              break;
            }

            throw new Error("Enable to fetch data from ".concat(url, ": error status ").concat(response.status));

          case 5:
            _context.next = 7;
            return response.json();

          case 7:
            goodsData = _context.sent;
            _context.next = 10;
            return goodsData.map(function (e) {
              return new GoodsCard(e.id, e.name, e.priceLast, e.discount, e.image);
            });

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getGoodsCards.apply(this, arguments);
}

function GoodsCard(id, name, priceLast, discount, imageUrl) {
  this.id = id;
  this.name = name;
  this.oldrice = priceLast;
  this.discount = discount;
  this.imageUrl = imageUrl;
  this.priceNow = (priceLast - priceLast / 100 * discount).toFixed(2);
}

function Page(number, size) {
  this.number = number;
  this.size = size;
}

function createElement(tagName, className, contentHTML) {
  var element = document.createElement(tagName);
  element.className = className;
  element.innerHTML = contentHTML;
  return element;
}

function createGoodsCards(page) {
  getGoodsCards(requestURL, page).then(function (goodsCards) {
    return goodsCards.map(function (e) {
      //Общий блок
      var goodsItem = createElement("div", "goods-item", ""); //Блок карточки (картинка, скидка, кнопки)

      var goodsCardBlock = createElement("div", "goods-card", "");
      var goodsImage = createElement("img", "image lazy-image", "");
      var goodsCardImage = createElement("div", "goods-card__image", "");
      var goodsCardPreview = createElement("div", "goods-card__preview", "");
      var goodsPreviewButton = createElement("button", "goods-card__preview_button", "Быстрый просмотр");
      var goodsDiscountValue = createElement("span", "discount", e.discount);
      var goodsDiscount = createElement("div", "goods-card__discount", "");
      var goodsCardAdd = createElement("div", "goods-card__button", "");
      var goodsAddButton = createElement("button", "goods-card__button_add-basket", "Добавить в корзину"); //Блок инфо о товаре (цены и описание)

      var goodsInfoBlock = createElement("div", "goods-info", "");
      var goodsPriceBlock = createElement("div", "goods-info__price", "");
      var goodsPriceNow = createElement("span", "goods-info__price_now", e.priceNow + " р.");
      var goodsPriceLast = createElement("del", "goods-info__price_last", e.priceLast + " р.");
      var goodsDescription = createElement("div", "goods-info__description", e.name); //Создание блока карточки

      goodsItem.setAttribute("id", "cardProduct_".concat(e.id));
      goodsAddButton.setAttribute("id", "addProduct_".concat(e.id));
      goodsImage.setAttribute("data-src", e.imageUrl + "?".concat(e.id));
      goodsPreviewButton.setAttribute("id", "preview_".concat(e.id));
      goodsCardImage.appendChild(goodsImage);
      goodsCardPreview.appendChild(goodsPreviewButton);
      goodsDiscount.innerHTML += "-" + goodsDiscountValue.outerHTML + "%";
      goodsCardAdd.appendChild(goodsAddButton);
      goodsCardBlock.innerHTML += goodsCardImage.outerHTML + goodsCardPreview.outerHTML + goodsDiscount.outerHTML + goodsCardAdd.outerHTML; //Создание блока инфо

      goodsPriceBlock.innerHTML += goodsPriceNow.outerHTML + goodsPriceLast.outerHTML;
      goodsInfoBlock.innerHTML += goodsPriceBlock.outerHTML + goodsDescription.outerHTML;
      goodsItem.innerHTML += goodsCardBlock.outerHTML + goodsInfoBlock.outerHTML;
      return goodsItem;
    });
  }).then(function (goods) {
    goods.forEach(function (e) {
      return goodsList.appendChild(e);
    });
    document.querySelectorAll("img.lazy-image").forEach(function (img) {
      img.src = img.dataset.src;
      img.classList.remove("lazy-image");
      img.removeAttribute("data-src");
    });
    document.querySelectorAll(".goods-card__button_add-basket").forEach(function (btn) {
      var id = btn.id.split('_')[1];
      btn.addEventListener('click', function () {
        return (0, _basket.addItemToBasket)(id);
      });
    });
    document.querySelectorAll(".goods-card__preview_button").forEach(function (btn) {
      var id = btn.id.split('_')[1];
      btn.addEventListener('click', function () {
        return (0, _basket.showItemPreview)(id);
      });
    });
  });
}

showMoreButton.addEventListener('click', function () {
  page.number += 1;
  createGoodsCards(page);
});
createGoodsCards(page);
},{"./basket":"scripts/basket.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52377" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/webAPI.js"], null)
//# sourceMappingURL=/webAPI.903d367d.js.map