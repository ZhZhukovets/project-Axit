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
})({"js/script.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var basket = document.querySelector('#basketBtn');
var clearBasket = document.querySelector('#clearBasket');
var basketList = document.querySelector('.basket_list');
var basketBlock = document.querySelector('.basket');
var clearBtnBlock = document.querySelector('.basket_btn');
var addToBasket = document.querySelectorAll('.goods-card__button_add-basket');
var goodsItems = document.querySelectorAll('.goods-item');
var basketEmptyClass = 'basket_list__empty';
var basletCountClass = 'basket_list__item_count';
var products = getProduct();

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
} else {
  showBtnBlock(false);
  createEmptyBasket();
}

clearBasket.addEventListener('click', function () {
  basketDeleteBtn();
  clearBasketBtn();
});
basket.addEventListener('click', function () {
  return showBasket();
});

function createEmptyBasket() {
  var text = 'В корзине пока ничего нет.';
  var listElement = createElement('li', basketEmptyClass, text);
  basketList.appendChild(listElement);
}

function basketDeleteBtn() {
  var deleteBasketAll = document.querySelectorAll('.basket_list__item');

  for (var i = 0; i < deleteBasketAll.length; i++) {
    deleteBasketAll[i].remove();
  }
}

var _loop = function _loop(i) {
  addToBasket[i].addEventListener('click', function () {
    return addItemToBasket(i);
  });
};

for (var i = 0; i < addToBasket.length; i++) {
  _loop(i);
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

function addItemToBasket(index) {
  var product = setProductInfo(index);
  var emptyBlock = document.querySelector(".".concat(basketEmptyClass));
  var basketItem = document.querySelector("#product_".concat(product.id));

  if (emptyBlock !== null) {
    emptyBlock.remove();
    showBtnBlock();
  }

  if (basketItem === null) {
    createBasketBlock(product);
  } else {
    setProductCount(basketItem, product.count);
  }
}

function setProductCount(basketElement, count) {
  var element = basketElement.querySelector(".".concat(basletCountClass));
  element.innerText = count + "\u0448\u0442.";
}

function setProductInfo(index) {
  var parent = goodsItems[index];
  var key;

  for (var _i in products) {
    if (index === products[_i].id) {
      key = _i;
      break;
    }
  }

  if (key === undefined) {
    products.push({
      img: parent.querySelector('img').getAttribute('src'),
      currentPrice: parent.querySelector('.goods-info__price_now').innerText,
      oldPrice: parent.querySelector('.goods-info__price_last').innerText,
      name: parent.querySelector('.goods-info__description').innerText,
      id: index,
      count: 1
    });
    key = -1;
  } else {
    products[key].count++;
  }

  setProduct();
  return products.slice(key)[0];
}

function clearBasketBtn() {
  var clearBtn = clearBtnBlock.style.display;

  if (clearBtn.setAttribute === 'block') {
    clearBtnBlock.style.display = 'none';
  }
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
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64913" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map