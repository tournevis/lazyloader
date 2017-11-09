(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Library", [], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory();
	else
		root["Library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*

Forked From https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/helpers/lazy-load-images.js

*/



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LazyLoader = function () {
  _createClass(LazyLoader, null, [{
    key: 'init',
    value: function init(config, callback) {
      var that = this;
    }
  }, {
    key: 'init',
    value: function init(config, callback) {
      var _this = this;

      if (this._instance) {
        this._instance.forEach(function (instance) {
          if (instance.type == config.type) {
            instance._disconnect();
          }
        });
      } else {
        this._instance = [];
      }
      this._count = 0;
      if (document.readyState === "complete") {
        this._instance.push(new LazyLoader(config));
      } else {
        window.addEventListener("DOMContentLoaded", function () {
          _this._instance.push(new LazyLoader(config));
        });
      }
    }
  }, {
    key: 'SUPPORTS_INTERSECTION_OBSERVER',
    get: function get() {
      return 'IntersectionObserver' in window;
    }
  }, {
    key: 'HANDLED_CLASS',
    get: function get() {
      return 'js-lazy-loaded';
    }
  }, {
    key: 'DEFAULT_CLASS',
    get: function get() {
      return 'js-lazy-image';
    }
  }, {
    key: 'THRESHOLD',
    get: function get() {
      return 0.01;
    }
  }]);

  function LazyLoader(config) {
    _classCallCheck(this, LazyLoader);

    switch (config.type) {
      case 'images':
        this._initImages(config);
        break;
      case 'custom':
        this._initCustom(config);
        break;
      default:
        this._initImages();
    }
  }

  _createClass(LazyLoader, [{
    key: '_disconnect',
    value: function _disconnect() {
      if (!this._observer) {
        return;
      }

      this._observer.disconnect();
    }
  }, {
    key: '_onIntersection',
    value: function _onIntersection(entries, observer) {
      var _this2 = this;

      entries.forEach(function (entry) {
        if (entry.intersectionRatio < 0.05) {
          return;
        }
        _this2._count--;
        _this2._observer.unobserve(entry.target);
        _this2._config.type === 'images' && _this2._preloadImage(entry.target);
        if (_this2._config.type === 'custom' && typeof _this2._config.callback === 'function') _this2._config.callback(entry.target);else console.err('LazyLoader callback must be a function');
        entry.target.classList.add(LazyLoader.HANDLED_CLASS);
      });

      if (this._count > 0) {
        return;
      }
      this._observer.disconnect();
    }
  }, {
    key: '_importModule',
    value: function _importModule() {
      if (this.type === 'module') {/* import(  `${this.name}` ).then(module =>{ console.log('hello')})*/}
    }
  }, {
    key: '_initCustom',
    value: function _initCustom(config) {
      var _this3 = this;

      this._config = _extends({
        rootMargin: '0px 0px',
        threshold: LazyLoader.THRESHOLD
      }, config);

      var els = document.querySelectorAll('.' + this._config.class);

      if (!els) {
        console.warn('No Elements Founds');
        return;
      }

      if (!LazyLoader.SUPPORTS_INTERSECTION_OBSERVER) {
        typeof this._config.callback === 'function' && this._config.callback('Error: INTERSECTION_OBSERVER isn\'t supported by your navigator');
        return;
      }
      this._count = els.length;
      this._onIntersection = this._onIntersection.bind(this);
      this._observer = new IntersectionObserver(this._onIntersection, { root: null, rootMargin: this._config.rootMargin, threshold: this._config.threshold });
      els.forEach(function (el) {
        if (el.classList.contains(LazyLoader.HANDLED_CLASS)) {
          return;
        }
        _this3._observer.observe(el);
      });
    }
  }, {
    key: '_buildThresholdList',
    value: function _buildThresholdList() {
      var thresholds = [];
      var numSteps = 10;
      for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    }
  }, {
    key: '_initImages',
    value: function _initImages() {
      var _this4 = this;

      var images = document.querySelectorAll('.' + LazyLoader.DEFAULT_CLASS);
      this._config = {
        // If the image gets within 50px in the Y axis, start the download.
        rootMargin: '0px',
        threshold: LazyLoader.THRESHOLD
      };

      if (!LazyLoader.SUPPORTS_INTERSECTION_OBSERVER) {
        console.log('INTERSECTION_OBSERVER isn\'t supported by your navigator');
        this._loadImagesImmediately(images);
        return;
      }

      this._count = images.length;
      this._onIntersection = this._onIntersection.bind(this);
      this._observer = new IntersectionObserver(this._onIntersection, this._config);
      images.forEach(function (image) {
        if (image.classList.contains(LazyLoader.HANDLED_CLASS)) {
          return;
        }

        _this4._observer.observe(image);
      });
    }
  }, {
    key: '_preloadImage',
    value: function _preloadImage(image) {
      var _this5 = this;

      var src = image.dataset.src;
      if (!src) {
        return;
      }
      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = src;
        image.onload = resolve;
        image.onerror = reject;
      }).then(function (_) {
        return _this5._applyImage(image, src);
      });
    }
  }, {
    key: '_loadImagesImmediately',
    value: function _loadImagesImmediately(images) {
      var _this6 = this;

      Array.from(images).forEach(function (image) {
        return _this6._preloadImage(image);
      });
    }
  }, {
    key: '_applyImage',
    value: function _applyImage(img, src) {
      var el = img.querySelector('.js-lazy-image-content');
      if (!el) {
        return;
      }
      el.style.backgroundImage = 'url(' + src + ')';
      el.classList.add('fade-in');
    }
  }]);

  return LazyLoader;
}();

exports.default = LazyLoader;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Library.js.map