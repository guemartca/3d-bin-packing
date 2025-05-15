/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BinPacking", [], factory);
	else if(typeof exports === 'object')
		exports["BinPacking"] = factory();
	else
		root["BinPacking"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./3D/Bin.ts":
/*!*******************!*\
  !*** ./3D/Bin.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar util_1 = __webpack_require__(/*! ./util */ \"./3D/util.ts\");\nvar log_1 = __webpack_require__(/*! ../lib/log */ \"./lib/log.ts\");\nvar log = (0, log_1.createLogger)(\"3D:\");\nvar Bin = /** @class */function () {\n  function Bin(name, w, h, d, mw) {\n    if (mw === void 0) {mw = 0;}\n    this.name = \"\";\n    this.width = 0;\n    this.height = 0;\n    this.depth = 0;\n    this.maxWeight = 0;\n    this.items = [];\n    this.name = name;\n    this.width = (0, util_1.factoredInteger)(w);\n    this.height = (0, util_1.factoredInteger)(h);\n    this.depth = (0, util_1.factoredInteger)(d);\n    this.maxWeight = (0, util_1.factoredInteger)(mw);\n  }\n  Bin.prototype.getName = function () {\n    return this.name;\n  };\n  Bin.prototype.getWidth = function () {\n    return (0, util_1.unfactorInteger)(this.width);\n  };\n  Bin.prototype.getHeight = function () {\n    return (0, util_1.unfactorInteger)(this.height);\n  };\n  Bin.prototype.getDepth = function () {\n    return (0, util_1.unfactorInteger)(this.depth);\n  };\n  Bin.prototype.getMaxWeight = function () {\n    return (0, util_1.unfactorInteger)(this.maxWeight);\n  };\n  Bin.prototype.getItems = function () {\n    return this.items;\n  };\n  Bin.prototype.getVolume = function () {\n    return this.getWidth() * this.getHeight() * this.getDepth();\n  };\n  Bin.prototype.getPackedWeight = function () {\n    var weight = this.items.reduce(function (total, item) {return total + item.weight;}, 0);\n    return (0, util_1.unfactorInteger)(weight);\n  };\n  Bin.prototype.getPackedVolume = function () {\n    var volume = 0;\n    for (var _i = 0, _a = this.items; _i < _a.length; _i++) {\n      var item = _a[_i];\n      volume += item.getVolume();\n    }\n    return volume;\n  };\n  Bin.prototype.weighItem = function (item) {\n    if (!this.maxWeight)\n    return true;\n    var currentWeight = this.items.reduce(function (total, item) {return total + item.weight;}, 0);\n    return currentWeight + item.weight <= this.maxWeight;\n  };\n  /**\n   * Calculate a score for a given item and rotation type.\n   *\n   * Scores are higher for rotations that closest match item dimensions to Bin dimensions.\n   * For example, rotating the item so the longest side is aligned with the longest Bin side.\n   *\n   * Example (Bin is 11 x 8.5 x 5.5, Item is 8.1 x 5.2 x 5.2):\n   *  Rotation 0:\n   *    8.1 / 11  = 0.736\n   *    5.2 / 8.5 = 0.612\n   *    5.2 / 5.5 = 0.945\n   *    -----------------\n   *    0.736 ** 2 + 0.612 ** 2 + 0.945 ** 2 = 1.809\n   *\n   *  Rotation 1:\n   *    8.1 / 8.5 = 0.953\n   *    5.2 / 11 = 0.473\n   *    5.2 / 5.5 = 0.945\n   *    -----------------\n   *    0.953 ** 2 + 0.473 ** 2 + 0.945 ** 2 = 2.025\n   *\n   * @param {Item} item\n   * @param {RotationType} rotationType\n   * @return {number} score\n   */\n  Bin.prototype.scoreRotation = function (item, rotationType) {\n    item.rotationType = rotationType;\n    var d = item.getDimension();\n    // If the item doesn't fit in the Bin\n    if (this.getWidth() < d[0] ||\n    this.getHeight() < d[1] ||\n    this.getDepth() < d[2]) {\n      return 0;\n    }\n    // Square the results to increase the impact of high values (e.g. > 0.8)\n    var widthScore = Math.pow(d[0] / this.getWidth(), 2);\n    var heightScore = Math.pow(d[1] / this.getHeight(), 2);\n    var depthScore = Math.pow(d[2] / this.getDepth(), 2);\n    return widthScore + heightScore + depthScore;\n  };\n  /**\n   * Calculate the best rotation order for a given Item based on scoreRotation().\n   *\n   * @param {Item} item\n   * @return {Array<RotationType>} Rotation types sorted by their score, DESC\n   */\n  Bin.prototype.getBestRotationOrder = function (item) {\n    var rotationScores = {};\n    // Score all rotation types\n    for (var i = 0; i < item.allowedRotation.length; i++) {\n      var r = item.allowedRotation[i];\n      rotationScores[r] = this.scoreRotation(item, r);\n    }\n    // Sort the rotation types (index of scores object) DESC\n    // and ensure Int values (Object.keys returns strings)\n    var sortedRotations = Object.keys(rotationScores).\n    sort(function (a, b) {\n      return rotationScores[Number(b)] - rotationScores[Number(a)];\n    }).\n    map(Number);\n    return sortedRotations;\n  };\n  Bin.prototype.putItem = function (item, p) {\n    var box = this;\n    var fit = false;\n    var rotations = this.getBestRotationOrder(item);\n    item.position = p;\n    for (var i = 0; i < rotations.length; i++) {\n      item.rotationType = rotations[i];\n      var d = item.getDimension();\n      if (box.getWidth() < p[0] + d[0] ||\n      box.getHeight() < p[1] + d[1] ||\n      box.getDepth() < p[2] + d[2]) {\n        fit = false;\n      } else\n      {\n        fit = true;\n        for (var j = 0; j < box.items.length; j++) {\n          var _j = box.items[j];\n          if (_j.intersect(item)) {\n            fit = false;\n            break;\n          }\n        }\n        if (fit) {\n          box.items.push(item);\n        }\n      }\n      log(\"try to putItem\", fit, \"item\", item.toString(), \"box\", box.toString());\n      if (fit) {\n        break;\n      }\n    }\n    return fit;\n  };\n  Bin.prototype.toString = function () {\n    return \"Bin:\".concat(this.name, \" (WxHxD = \").concat(this.getWidth(), \"x\").concat(this.getHeight(), \"x\").concat(this.getDepth(), \", MaxWg. = \").concat(this.getMaxWeight(), \")\");\n  };\n  return Bin;\n}();\nexports[\"default\"] = Bin;\n\n//# sourceURL=webpack://BinPacking/./3D/Bin.ts?");

/***/ }),

/***/ "./3D/Item.ts":
/*!********************!*\
  !*** ./3D/Item.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.rectIntersect = exports.RotationTypeStrings = exports.StartPosition = exports.DepthAxis = exports.HeightAxis = exports.WidthAxis = exports.RotationType_WDH = exports.RotationType_DWH = exports.RotationType_DHW = exports.RotationType_HDW = exports.RotationType_HWD = exports.RotationType_WHD = void 0;\nvar util_1 = __webpack_require__(/*! ./util */ \"./3D/util.ts\");\nexports.RotationType_WHD = 0;\nexports.RotationType_HWD = 1;\nexports.RotationType_HDW = 2;\nexports.RotationType_DHW = 3;\nexports.RotationType_DWH = 4;\nexports.RotationType_WDH = 5;\nexports.WidthAxis = 0;\nexports.HeightAxis = 1;\nexports.DepthAxis = 2;\nexports.StartPosition = [0, 0, 0];\nexports.RotationTypeStrings = (_a = {},\n_a[exports.RotationType_WHD] = \"RotationType_WHD (w,h,d)\",\n_a[exports.RotationType_HWD] = \"RotationType_HWD (h,w,d)\",\n_a[exports.RotationType_HDW] = \"RotationType_HDW (h,d,w)\",\n_a[exports.RotationType_DHW] = \"RotationType_DHW (d,h,w)\",\n_a[exports.RotationType_DWH] = \"RotationType_DWH (d,w,h)\",\n_a[exports.RotationType_WDH] = \"RotationType_WDH (w,d,h)\",\n_a);\nvar Item = /** @class */function () {\n  function Item(name, w, h, d, wg, allowedRotation) {\n    if (wg === void 0) {wg = 0;}\n    this.name = \"\";\n    this.width = 0;\n    this.height = 0;\n    this.depth = 0;\n    this.weight = 0;\n    this.allowedRotation = [0, 1, 2, 3, 4, 5];\n    this.rotationType = exports.RotationType_WHD;\n    this.position = [0, 0, 0];\n    this.name = name;\n    this.width = (0, util_1.factoredInteger)(w);\n    this.height = (0, util_1.factoredInteger)(h);\n    this.depth = (0, util_1.factoredInteger)(d);\n    this.weight = (0, util_1.factoredInteger)(wg);\n    this.allowedRotation = allowedRotation ?\n    allowedRotation :\n    this.allowedRotation;\n  }\n  Item.prototype.getWidth = function () {\n    return (0, util_1.unfactorInteger)(this.width);\n  };\n  Item.prototype.getHeight = function () {\n    return (0, util_1.unfactorInteger)(this.height);\n  };\n  Item.prototype.getDepth = function () {\n    return (0, util_1.unfactorInteger)(this.depth);\n  };\n  Item.prototype.getWeight = function () {\n    return (0, util_1.unfactorInteger)(this.weight);\n  };\n  Item.prototype.getRotationType = function () {\n    return this.rotationType;\n  };\n  Item.prototype.getAllowedRotation = function () {\n    return this.allowedRotation;\n  };\n  Item.prototype.getRotationTypeString = function () {\n    return exports.RotationTypeStrings[this.getRotationType()];\n  };\n  Item.prototype.getDimension = function () {\n    var d;\n    switch (this.rotationType) {\n      case exports.RotationType_WHD:\n        d = [this.getWidth(), this.getHeight(), this.getDepth()];\n        break;\n      case exports.RotationType_HWD:\n        d = [this.getHeight(), this.getWidth(), this.getDepth()];\n        break;\n      case exports.RotationType_HDW:\n        d = [this.getHeight(), this.getDepth(), this.getWidth()];\n        break;\n      case exports.RotationType_DHW:\n        d = [this.getDepth(), this.getHeight(), this.getWidth()];\n        break;\n      case exports.RotationType_DWH:\n        d = [this.getDepth(), this.getWidth(), this.getHeight()];\n        break;\n      case exports.RotationType_WDH:\n        d = [this.getWidth(), this.getDepth(), this.getHeight()];\n        break;\n    }\n    return d;\n  };\n  Item.prototype.getPosition = function () {\n    return [\n    (0, util_1.unfactorInteger)(this.position[0]),\n    (0, util_1.unfactorInteger)(this.position[1]),\n    (0, util_1.unfactorInteger)(this.position[2])];\n\n  };\n  Item.prototype.intersect = function (i2) {\n    return (0, exports.rectIntersect)(this, i2, exports.WidthAxis, exports.HeightAxis) &&\n    (0, exports.rectIntersect)(this, i2, exports.HeightAxis, exports.DepthAxis) &&\n    (0, exports.rectIntersect)(this, i2, exports.WidthAxis, exports.DepthAxis);\n  };\n  Item.prototype.getVolume = function () {\n    return this.getWidth() * this.getHeight() * this.getDepth();\n  };\n  Item.prototype.toString = function () {\n    return \"Item:\".concat(this.name, \" (\").concat(this.getRotationTypeString(), \" = \").concat(this.getDimension().join(\"x\"), \", Wg. = \").concat(this.getWeight(), \")\");\n  };\n  return Item;\n}();\nexports[\"default\"] = Item;\nvar rectIntersect = function (i1, i2, x, y) {\n  var d1, d2, cx1, cy1, cx2, cy2, ix, iy;\n  d1 = i1.getDimension();\n  d2 = i2.getDimension();\n  cx1 = i1.position[x] + d1[x] / 2;\n  cy1 = i1.position[y] + d1[y] / 2;\n  cx2 = i2.position[x] + d2[x] / 2;\n  cy2 = i2.position[y] + d2[y] / 2;\n  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);\n  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);\n  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;\n};\nexports.rectIntersect = rectIntersect;\n\n//# sourceURL=webpack://BinPacking/./3D/Item.ts?");

/***/ }),

/***/ "./3D/Packer.ts":
/*!**********************!*\
  !*** ./3D/Packer.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Item_1 = __webpack_require__(/*! ./Item */ \"./3D/Item.ts\");\nvar Packer = /** @class */function () {\n  function Packer() {\n    this.bins = [];\n    this.items = [];\n    this.unfitItems = [];\n  }\n  Packer.prototype.addBin = function (bin) {\n    this.bins.push(bin);\n  };\n  Packer.prototype.addItem = function (item) {\n    this.items.push(item);\n  };\n  Packer.prototype.findFittedBin = function (i) {\n    for (var _i = 0; _i < this.bins.length; _i++) {\n      var b = this.bins[_i];\n      if (!b.weighItem(i) || !b.putItem(i, Item_1.StartPosition)) {\n        continue;\n      }\n      if (b.items.length === 1 && b.items[0] === i) {\n        b.items = [];\n      }\n      return b;\n    }\n    return null;\n  };\n  Packer.prototype.getBiggerBinThan = function (b) {\n    var v = b.getVolume();\n    for (var _i = 0; _i < this.bins.length; _i++) {\n      var b2 = this.bins[_i];\n      if (b2.getVolume() > v) {\n        return b2;\n      }\n    }\n    return null;\n  };\n  Packer.prototype.unfitItem = function () {\n    if (this.items.length === 0) {\n      return;\n    }\n    this.unfitItems.push(this.items[0]);\n    this.items.splice(0, 1);\n  };\n  Packer.prototype.packToBin = function (b, items) {\n    var b2 = null;\n    var unpacked = [];\n    var fit = b.weighItem(items[0]) && b.putItem(items[0], Item_1.StartPosition);\n    if (!fit) {\n      var b2_1 = this.getBiggerBinThan(b);\n      if (b2_1) {\n        return this.packToBin(b2_1, items);\n      }\n      return this.items;\n    }\n    // Pack unpacked items.\n    for (var _i = 1; _i < this.items.length; _i++) {\n      var fitted = false;\n      var item = this.items[_i];\n      if (b.weighItem(item)) {\n        // Try available pivots in current bin that are not intersect with\n        // existing items in current bin.\n        lookup: for (var _pt = 0; _pt < 3; _pt++) {\n          for (var _j = 0; _j < b.items.length; _j++) {\n            var pv = void 0;\n            var ib = b.items[_j];\n            var d = ib.getDimension();\n            switch (_pt) {\n              case Item_1.WidthAxis:\n                pv = [ib.position[0] + d[0], ib.position[1], ib.position[2]];\n                break;\n              case Item_1.HeightAxis:\n                pv = [ib.position[0], ib.position[1] + d[1], ib.position[2]];\n                break;\n              case Item_1.DepthAxis:\n                pv = [ib.position[0], ib.position[1], ib.position[2] + d[2]];\n                break;\n            }\n            if (b.putItem(item, pv)) {\n              fitted = true;\n              break lookup;\n            }\n          }\n        }\n      }\n      if (!fitted) {\n        while (b2 !== null) {\n          b2 = this.getBiggerBinThan(b);\n          if (b2) {\n            b2.items.push(item);\n            var left = this.packToBin(b2, b2.items);\n            if (left.length === 0) {\n              b = b2;\n              fitted = true;\n              break;\n            }\n          }\n        }\n        if (!fitted) {\n          unpacked.push(item);\n        }\n      }\n    }\n    return unpacked;\n  };\n  Packer.prototype.pack = function () {\n    // Sort bins smallest to largest.\n    this.bins.sort(function (a, b) {\n      return a.getVolume() - b.getVolume();\n    });\n    // Sort items largest to smallest.\n    this.items.sort(function (a, b) {\n      return b.getVolume() - a.getVolume();\n    });\n    while (this.items.length > 0) {\n      var bin = this.findFittedBin(this.items[0]);\n      if (bin === null) {\n        this.unfitItem();\n        continue;\n      }\n      this.items = this.packToBin(bin, this.items);\n    }\n    return null;\n  };\n  return Packer;\n}();\nexports[\"default\"] = Packer;\n\n//# sourceURL=webpack://BinPacking/./3D/Packer.ts?");

/***/ }),

/***/ "./3D/index.ts":
/*!*********************!*\
  !*** ./3D/index.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Packer = exports.Item = exports.Bin = void 0;\nvar Bin_1 = __importDefault(__webpack_require__(/*! ./Bin */ \"./3D/Bin.ts\"));\nexports.Bin = Bin_1.default;\nvar Item_1 = __importDefault(__webpack_require__(/*! ./Item */ \"./3D/Item.ts\"));\nexports.Item = Item_1.default;\nvar Packer_1 = __importDefault(__webpack_require__(/*! ./Packer */ \"./3D/Packer.ts\"));\nexports.Packer = Packer_1.default;\n\n//# sourceURL=webpack://BinPacking/./3D/index.ts?");

/***/ }),

/***/ "./3D/util.ts":
/*!********************!*\
  !*** ./3D/util.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.unfactorInteger = exports.factoredInteger = void 0;\n/**\n * Precision to retain in factoredInteger()\n */\nvar FACTOR = 2;\n/**\n * Factor a number by FACTOR and round to the nearest whole number\n */\nvar factoredInteger = function (value) {\n  return Math.round(value * Math.pow(10, FACTOR));\n};\nexports.factoredInteger = factoredInteger;\n/**\n * Convert internal value back to original scale\n * Note: This function maintains the same unit as the input\n */\nvar unfactorInteger = function (value) {return value / Math.pow(10, FACTOR);};\nexports.unfactorInteger = unfactorInteger;\n\n//# sourceURL=webpack://BinPacking/./3D/util.ts?");

/***/ }),

/***/ "./lib/log.ts":
/*!********************!*\
  !*** ./lib/log.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.enableLog = enableLog;\nexports.createLogger = createLogger;\nexports.log = log;\nvar isLogEnabled = false;\nfunction enableLog(enable) {\n  if (enable === void 0) {enable = true;}\n  isLogEnabled = enable;\n}\nfunction createLogger(namespace) {\n  if (namespace === void 0) {namespace = \"binpackingjs\";}\n  return log.bind(undefined, namespace);\n}\nfunction log(namespace) {\n  var args = [];\n  for (var _i = 1; _i < arguments.length; _i++) {\n    args[_i - 1] = arguments[_i];\n  }\n  return isLogEnabled ?\n  console.debug.apply(console, [namespace].concat(args)) :\n  undefined;\n}\n\n//# sourceURL=webpack://BinPacking/./lib/log.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./3D/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});