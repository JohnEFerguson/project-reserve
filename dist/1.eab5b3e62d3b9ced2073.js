webpackJsonp([1],Array(74).concat([
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reserve_instances_vue_vue_type_template_id_a5c3b312_scoped_true___ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reserve_instances_vue_vue_type_script_lang_js___ = __webpack_require__(102);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__reserve_instances_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__reserve_instances_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reserve_instances_vue_vue_type_style_index_0_id_a5c3b312_scoped_true_lang_stylus___ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__reserve_instances_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__reserve_instances_vue_vue_type_template_id_a5c3b312_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__reserve_instances_vue_vue_type_template_id_a5c3b312_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "a5c3b312",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js___ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PriorityOrderPanel = __webpack_require__(85);

var _PriorityOrderPanel2 = _interopRequireDefault(_PriorityOrderPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { PriorityOrderPanel: _PriorityOrderPanel2.default },
  props: {
    reserveCategory: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortByLabel: function sortByLabel() {
      var sortOrders = (this.reserveCategory.priority || []).map(function (cat) {
        return "by <strong>" + cat.name + "</strong>";
      });
      sortOrders.push("by <strong>random lottery tiebreaker</strong>");
      return "Sort " + (sortOrders || []).join(", ");
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js___ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _arrayMove = __webpack_require__(30);

var _arrayMove2 = _interopRequireDefault(_arrayMove);

var _constants = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    criteria: {
      type: Object,
      required: true
    },
    criteriaIndex: {
      type: Number,
      required: true
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    CATEGORY_TYPE: function CATEGORY_TYPE() {
      return _constants.CATEGORY_TYPE;
    },
    NUMERIC_TYPE: function NUMERIC_TYPE() {
      return _constants.NUMERIC_TYPE;
    }
  },
  methods: {
    addNewElement: function addNewElement() {
      this.criteria.elements.push({
        name: "",
        order: this.criteria.elements.length + 1
      });
    },
    deleteElement: function deleteElement(order) {
      var elOrder = 1;
      this.criteria.elements = this.criteria.elements.reduce(function (acc, el) {
        if (el.order !== order) {
          acc.push(_extends({}, el, { order: elOrder }));
          elOrder = elOrder + 1;
        }
        return acc;
      }, []);
    },
    updateNumBins: function updateNumBins(numBins) {
      if (numBins < 0) {
        return;
      }
      var newBins = [];
      var currentBins = this.criteria.bins;
      for (var i = 0; i < numBins; i++) {
        if (currentBins[i]) {
          newBins.push(_extends({}, currentBins[i], { order: i + 1 }));
        } else {
          newBins.push({ min: 0, max: 0, order: i + 1 });
        }
      }
      this.criteria.bins = newBins;
    },
    moveElementDown: function moveElementDown(element) {
      var elements = this.criteria.elements;
      var newIndex = element.order === 1 ? elements.length - 1 : element.order - 2;

      var movedElements = (0, _arrayMove2.default)(elements, element.order - 1, newIndex);
      movedElements.forEach(function (element, index) {
        element.order = index + 1;
      });

      this.criteria.elements = movedElements;
    },
    moveElementUp: function moveElementUp(element) {
      var elements = this.criteria.elements;
      var newIndex = element.order === elements.length ? 0 : element.order;

      var movedElements = (0, _arrayMove2.default)(elements, element.order - 1, newIndex);
      movedElements.forEach(function (element, index) {
        element.order = index + 1;
      });

      this.criteria.elements = movedElements;
    }
  }
};

/***/ }),
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PriorityOrderPanel_vue_vue_type_template_id_100bbafc_scoped_true___ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PriorityOrderPanel_vue_vue_type_script_lang_js___ = __webpack_require__(81);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__PriorityOrderPanel_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__PriorityOrderPanel_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PriorityOrderPanel_vue_vue_type_style_index_0_id_100bbafc_scoped_true_lang_stylus___ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__PriorityOrderPanel_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__PriorityOrderPanel_vue_vue_type_template_id_100bbafc_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__PriorityOrderPanel_vue_vue_type_template_id_100bbafc_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "100bbafc",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PrioritySummary_vue_vue_type_template_id_ef996eac_scoped_true___ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PrioritySummary_vue_vue_type_script_lang_js___ = __webpack_require__(79);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__PrioritySummary_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__PrioritySummary_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PrioritySummary_vue_vue_type_style_index_0_id_ef996eac_scoped_true_lang_stylus___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__PrioritySummary_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__PrioritySummary_vue_vue_type_template_id_ef996eac_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__PrioritySummary_vue_vue_type_template_id_ef996eac_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "ef996eac",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/PrioritySummary.vue?vue&type=template&id=ef996eac&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"prioritySummaryWrapper"},[_c('h2',{staticClass:"viewPriorityHeader"},[_vm._v("\n    Priority Order of\n    "),_c('span',{staticClass:"categoryName"},[_vm._v(_vm._s(_vm.reserveCategory.name))]),_vm._v(" reserve\n    category\n  ")]),_c('div',{staticClass:"summaryBody"},[_c('h4',{staticClass:"w100 fw-n tac",domProps:{"innerHTML":_vm._s(_vm.sortByLabel)}}),_c('div',{staticClass:"criteriaPanels mt-27"},[_vm._l((_vm.reserveCategory.priority),function(criteria,criteriaIndex){return _c('div',{key:("criteria-panel-" + criteriaIndex),staticClass:"criteriaPanelWrapper w33 ml-9 mr-9"},[_c('PriorityOrderPanel',{attrs:{"criteria":criteria,"criteria-index":criteriaIndex,"is-read-only":true}})],1)}),_c('div',{staticClass:"criteriaPanelWrapper w33 tac flexrowcenter ml-9 mr-9"},[_vm._v("\n        All remaining ties will be broken by a random lottery tiebreaker\n      ")])],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/components/PrioritySummary.vue?vue&type=template&id=ef996eac&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/PriorityOrderPanel.vue?vue&type=template&id=100bbafc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flexcolumn mb-27 mt-18"},[_c('label',{staticClass:"ml-9 mb-9",attrs:{"for":"name"}},[_vm._v("Criteria Name")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.name),expression:"criteria.name"}],staticClass:"textInput",attrs:{"name":"name","placeholder":"e.g., sofa_score","disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria, "name", $event.target.value)}}}),_c('div',{staticClass:"ml-9 mt-9 fs-12"},[_vm._v("\n      Note: The criteria will not be saved unless you have entered a name.\n    ")])]),_c('div',{staticClass:"flexcolumn mb-27 mt-18"},[_c('label',{staticClass:"mb-9"},[_vm._v("Criteria Type")]),_c('div',{staticClass:"flexrow"},[_c('div',{staticClass:"flexrow"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.criteriaType),expression:"criteria.criteriaType"}],staticClass:"textInput",attrs:{"name":("criteriaTypeCategory" + _vm.criteriaIndex),"type":"radio","disabled":_vm.isReadOnly},domProps:{"value":_vm.CATEGORY_TYPE,"checked":_vm._q(_vm.criteria.criteriaType,_vm.CATEGORY_TYPE)},on:{"change":function($event){return _vm.$set(_vm.criteria, "criteriaType", _vm.CATEGORY_TYPE)}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaTypeCategory" + _vm.criteriaIndex)}},[_vm._v("Categorical")])]),_c('div',{staticClass:"flexrow ml-18"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.criteriaType),expression:"criteria.criteriaType"}],staticClass:"textInput",attrs:{"name":("criteriaTypeNumeric" + _vm.criteriaIndex),"type":"radio","disabled":_vm.isReadOnly},domProps:{"value":_vm.NUMERIC_TYPE,"checked":_vm._q(_vm.criteria.criteriaType,_vm.NUMERIC_TYPE)},on:{"change":function($event){return _vm.$set(_vm.criteria, "criteriaType", _vm.NUMERIC_TYPE)}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaTypeNumeric" + _vm.criteriaIndex)}},[_vm._v("Numeric")])])])]),(_vm.criteria.criteriaType === _vm.CATEGORY_TYPE)?_c('div',[_vm._l((_vm.criteria.elements),function(element,elementIndex){return _c('div',{key:("criteria" + _vm.criteriaIndex + "category" + elementIndex),staticClass:"flexrow mb-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.elements[elementIndex].name),expression:"criteria.elements[elementIndex].name"}],staticClass:"textInput",attrs:{"type":"text","name":("criteria" + _vm.criteriaIndex + "category" + elementIndex),"placeholder":"e.g. Suffolk County","disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.elements[elementIndex].name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria.elements[elementIndex], "name", $event.target.value)}}}),(!_vm.isReadOnly)?_c('div',{staticClass:"flexcolumn ml-9"},[_c('font-awesome-icon',{staticClass:"icon mb-9 cp fs-12",attrs:{"icon":"arrow-up"},on:{"click":function () { return _vm.moveElementDown(element); }}}),_c('font-awesome-icon',{staticClass:"icon cp fs-12",attrs:{"icon":"arrow-down"},on:{"click":function () { return _vm.moveElementUp(element); }}})],1):_vm._e(),(!_vm.isReadOnly && _vm.criteria.elements.length > 1)?_c('div',[_c('font-awesome-icon',{staticClass:"icon ml-9 cp fs-12",attrs:{"icon":"trash"},on:{"click":function () { return _vm.deleteElement(element.order); }}})],1):_vm._e()])}),(!_vm.isReadOnly)?_c('div',{staticClass:"flexrow ml-9 mt-9"},[_c('button',{staticClass:"mr-9",on:{"click":_vm.addNewElement}},[_vm._v("+")]),_vm._v("\n      Add new element\n    ")]):_vm._e()],2):_vm._e(),(_vm.criteria.criteriaType === _vm.NUMERIC_TYPE)?_c('div',[_c('div',{class:_vm.isReadOnly ? 'flexcolumn' : 'flexrow'},[_c('div',{staticClass:"flexcolumn"},[_c('label',{staticClass:"ml-9",attrs:{"for":("criteria" + _vm.criteriaIndex + "min")}},[_vm._v("Criteria Minimum")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.min),expression:"criteria.min"}],staticClass:"textInput",attrs:{"type":"number","name":("criteria" + _vm.criteriaIndex + "min"),"disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.min)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria, "min", $event.target.value)}}})]),_c('div',{class:("flexcolumn " + (_vm.isReadOnly ? 'mt-9' : 'ml-18'))},[_c('label',{staticClass:"ml-9",attrs:{"for":("criteria" + _vm.criteriaIndex + "max")}},[_vm._v("Criteria Maximum")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.max),expression:"criteria.max"}],staticClass:"textInput",attrs:{"type":"number","name":("criteria" + _vm.criteriaIndex + "max"),"disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.max)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria, "max", $event.target.value)}}})])]),_c('div',{staticClass:"flexcolumn mt-18"},[_c('label',{staticClass:"mb-9"},[_vm._v("Criteria Sorting Order")]),_c('div',{staticClass:"flexrow"},[_c('div',{staticClass:"flexrow"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.binOrder),expression:"criteria.binOrder"}],staticClass:"textInput",attrs:{"name":("criteriaBinOrderDesc" + _vm.criteriaIndex),"type":"radio","value":"desc","disabled":_vm.isReadOnly},domProps:{"checked":_vm._q(_vm.criteria.binOrder,"desc")},on:{"change":function($event){return _vm.$set(_vm.criteria, "binOrder", "desc")}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaBinOrderDesc" + _vm.criteriaIndex)}},[_vm._v("Lowest value prioritized")])]),_c('div',{staticClass:"flexrow ml-18"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.binOrder),expression:"criteria.binOrder"}],staticClass:"textInput",attrs:{"name":("criteriaBinOrderAsc" + _vm.criteriaIndex),"type":"radio","value":"asc","disabled":_vm.isReadOnly},domProps:{"checked":_vm._q(_vm.criteria.binOrder,"asc")},on:{"change":function($event){return _vm.$set(_vm.criteria, "binOrder", "asc")}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaBinOrderAsc" + _vm.criteriaIndex)}},[_vm._v("Highest value prioritized")])])])]),_c('div',{staticClass:"flexcolumn mt-18"},[_c('label',{staticClass:"mb-9"},[_vm._v("Coarsened Status")]),_c('div',{staticClass:"flexrow"},[_c('div',{staticClass:"flexrow"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.coarsened),expression:"criteria.coarsened"}],staticClass:"textInput",attrs:{"name":("criteriaCoarsenedYes" + _vm.criteriaIndex),"type":"radio","disabled":_vm.isReadOnly},domProps:{"value":true,"checked":_vm._q(_vm.criteria.coarsened,true)},on:{"change":function($event){return _vm.$set(_vm.criteria, "coarsened", true)}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaCoarsenedYes" + _vm.criteriaIndex)}},[_vm._v("Yes")])]),_c('div',{staticClass:"flexrow ml-18"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.coarsened),expression:"criteria.coarsened"}],staticClass:"textInput",attrs:{"name":("criteriaCoarsenedNo" + _vm.criteriaIndex),"type":"radio","disabled":_vm.isReadOnly},domProps:{"value":false,"checked":_vm._q(_vm.criteria.coarsened,false)},on:{"change":function($event){return _vm.$set(_vm.criteria, "coarsened", false)}}}),_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaCoarsenedNo" + _vm.criteriaIndex)}},[_vm._v("No")])])])]),(_vm.criteria.coarsened)?_c('div',{staticClass:"flexcolumn mt-18"},[_c('label',{staticClass:"ml-9",attrs:{"for":("criteriaNumBins" + _vm.criteriaIndex)}},[_vm._v("Number of bins")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.numBins),expression:"criteria.numBins"}],staticClass:"textInput w25",attrs:{"name":("criteriaNumBins" + _vm.criteriaIndex),"type":"number","disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.numBins)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria, "numBins", $event.target.value)},function (e) { return _vm.updateNumBins(e.target.value); }]}}),_c('div',{staticClass:"divider mt-18 mb-18"}),_vm._l((_vm.criteria.bins),function(bin,binIndex){return _c('div',{key:("criteria" + _vm.criteriaIndex + "bin" + binIndex),staticClass:"flexrow-sa mb-9"},[_c('label',{staticClass:"ml-9 mt-27 fw-b"},[_vm._v(_vm._s(("Bin " + (binIndex + 1))))]),_c('div',{staticClass:"flexcolumncenter mr-9 w25"},[_c('label',{staticClass:"mb-9",attrs:{"for":("criteria" + _vm.criteriaIndex + "bin" + binIndex + "min")}},[_vm._v("Min")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.bins[binIndex].min),expression:"criteria.bins[binIndex].min"}],staticClass:"textInput w100",attrs:{"type":"number","name":("criteria" + _vm.criteriaIndex + "bin" + binIndex + "min"),"disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.bins[binIndex].min)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria.bins[binIndex], "min", $event.target.value)}}})]),_c('div',{staticClass:"flexcolumncenter w25"},[_c('label',{staticClass:"mb-9",attrs:{"for":("criteria" + _vm.criteriaIndex + "bin" + binIndex + "max")}},[_vm._v("Max")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.criteria.bins[binIndex].max),expression:"criteria.bins[binIndex].max"}],staticClass:"textInput w100",attrs:{"type":"number","name":("criteria" + _vm.criteriaIndex + "bin" + binIndex + "max"),"disabled":_vm.isReadOnly},domProps:{"value":(_vm.criteria.bins[binIndex].max)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.criteria.bins[binIndex], "max", $event.target.value)}}})])])})],2):_vm._e()]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/components/PriorityOrderPanel.vue?vue&type=template&id=100bbafc&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_style_index_0_id_100bbafc_scoped_true_lang_stylus___ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_style_index_0_id_100bbafc_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PriorityOrderPanel_vue_vue_type_style_index_0_id_100bbafc_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("542b22a2", content, true, {});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".textInput[data-v-100bbafc]{cursor:pointer;resize:none;background-color:#fff;border:2px solid var(--dark-grey);font-size:20px;padding:9px 18px;border-radius:20px;outline:none}.textInput[data-v-100bbafc]::placeholder{color:#ddd}.textAreaInput[data-v-100bbafc]{height:200px}.divider[data-v-100bbafc]{height:2px;border-radius:18px;width:100%;background-color:var(--dark-blue)}", ""]);

// exports


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_style_index_0_id_ef996eac_scoped_true_lang_stylus___ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_style_index_0_id_ef996eac_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrioritySummary_vue_vue_type_style_index_0_id_ef996eac_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("243f7c20", content, true, {});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".prioritySummaryWrapper[data-v-ef996eac]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;z-index:1000}.summaryBody[data-v-ef996eac]{flex:1;width:100%;padding:45px;margin:27px;background:var(--light-grey);border-radius:18px}.criteriaPanels[data-v-ef996eac]{width:100%;display:grid;grid-template-columns:repeat(4,1fr);grid-gap:9px}.criteriaPanelWrapper[data-v-ef996eac]{padding:18px;border:2px solid var(--dark-blue);border-radius:18px;max-height:55vh;overflow:scroll;width:100%}.viewPriorityHeader[data-v-ef996eac]{color:var(--dark-grey)}.categoryName[data-v-ef996eac]{color:var(--dark-blue)}", ""]);

// exports


/***/ }),
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js___ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _pathBrowserify = __webpack_require__(121);

var _pathBrowserify2 = _interopRequireDefault(_pathBrowserify);

var _papaparse = __webpack_require__(122);

var _helpers = __webpack_require__(31);

var _ViewConfigModal = __webpack_require__(123);

var _ViewConfigModal2 = _interopRequireDefault(_ViewConfigModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  components: { ViewConfigModal: _ViewConfigModal2.default },
  data: function data() {
    return {
      viewConfigModalOpen: false,
      configToView: null
    };
  },

  computed: {
    reserveInstances: function reserveInstances() {
      return (this.$store.state.reserveInstances || []).map(function (instance) {
        var dateLoaded = new Date(instance.dateLoaded);
        return _extends({}, instance, {
          dateLoaded: dateLoaded.toLocaleDateString() + " " + dateLoaded.toLocaleTimeString()
        });
      });
    }
  },
  mounted: function mounted() {
    this.$store.dispatch("getReserveInstances");
  },
  serverPrefetch: function serverPrefetch() {
    this.$store.dispatch("getReserveInstances");
  },

  methods: {
    initConfig: function initConfig() {
      this.$store.commit("resetConfig");
    },
    closeViewConfigModal: function closeViewConfigModal() {
      this.viewConfigModalOpen = false;
      this.configToView = null;
    },
    toTitleCase: function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    fetchConfig: function fetchConfig(instance) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var configRes, config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("/configurations/" + instance.configurationId);

              case 2:
                configRes = _context.sent;
                _context.next = 5;
                return configRes.json();

              case 5:
                config = _context.sent;
                return _context.abrupt("return", _extends({}, config, {
                  reserveCategories: config.reserveCategories.reduce(function (acc, category) {
                    var formattedCategory = _extends({}, category, {
                      priority: (0, _helpers.transformCriteriaForDisplay)(category.priority)
                    });
                    acc.push(formattedCategory);
                    return acc;
                  }, [])
                }));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    startFromOldConfig: function startFromOldConfig(instance) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var config;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.fetchConfig(instance);

              case 2:
                config = _context2.sent;

                (0, _helpers.removeIds)(config);
                _this2.$store.commit("setConfig", config);
                _this2.$nextTick(function () {
                  _this2.$store.dispatch("postConfig");
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    viewConfig: function viewConfig(instance) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.fetchConfig(instance);

              case 2:
                _this3.configToView = _context3.sent;

                _this3.$nextTick(function () {
                  _this3.viewConfigModalOpen = true;
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    sortByLabel: function sortByLabel(priority) {
      var sortOrders = (priority || []).map(function (cat) {
        return "by " + cat.name;
      });
      if ((sortOrders || []).length < 3) {
        sortOrders.push("by random lottery tiebreaker");
      }
      return "Sort " + (sortOrders || []).join(", ");
    },
    export: function _export(_ref) {
      var _this4 = this;

      var instance = _ref.instance,
          patients = _ref.patients,
          suffix = _ref.suffix;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var configurationRes, configuration, parsedFileName, today;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return fetch("/configurations/" + instance.configurationId);

              case 2:
                configurationRes = _context4.sent;
                _context4.next = 5;
                return configurationRes.json();

              case 5:
                configuration = _context4.sent;
                parsedFileName = _pathBrowserify2.default.parse(instance.name).name;
                today = new Date();

                (0, _helpers.downloadCSV)({
                  content: (0, _papaparse.unparse)([[today.toLocaleDateString() + " " + today.toLocaleTimeString() + " Allocation of " + configuration.unitType + " using " + parsedFileName], [], ["Number Allocated: " + configuration.supply], ["Reserve Categories"]].concat(_toConsumableArray(configuration.reserveCategories.map(function (category) {
                    return ["", category.name + " (size = " + category.size + ", priority order: " + _this4.sortByLabel((0, _helpers.transformCriteriaForDisplay)(category.priority)) + ")"];
                  })), [[], [], [], patients.length ? Object.keys(patients[0]) : ["No patients to display"]], _toConsumableArray(patients.map(Object.values)))),
                  fileName: "" + parsedFileName + suffix
                });

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },
    exportAll: function exportAll(instance) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var patientsRes, patients;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return fetch("/sourceFiles/" + instance.id + "/patients");

              case 2:
                patientsRes = _context5.sent;
                _context5.next = 5;
                return patientsRes.json();

              case 5:
                patients = _context5.sent;

                _this5.export({ instance: instance, patients: patients, suffix: "_all_patients" });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },
    exportWinners: function exportWinners(instance) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var winnersRes, patients;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return fetch("/sourceFiles/" + instance.id + "/patients?givenUnit=true");

              case 2:
                winnersRes = _context6.sent;
                _context6.next = 5;
                return winnersRes.json();

              case 5:
                patients = _context6.sent;

                _this6.export({ instance: instance, patients: patients, suffix: "_recipients" });

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },
    exportLosers: function exportLosers(instance) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var losersRes, patients;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return fetch("/sourceFiles/" + instance.id + "/patients?givenUnit=false");

              case 2:
                losersRes = _context7.sent;
                _context7.next = 5;
                return losersRes.json();

              case 5:
                patients = _context7.sent;

                _this7.export({ instance: instance, patients: patients, suffix: "_non_recipients" });

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this7);
      }))();
    }
  }
};

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js___ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PrioritySummary = __webpack_require__(86);

var _PrioritySummary2 = _interopRequireDefault(_PrioritySummary);

var _ConfigSummary = __webpack_require__(125);

var _ConfigSummary2 = _interopRequireDefault(_ConfigSummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { PrioritySummary: _PrioritySummary2.default, ConfigSummary: _ConfigSummary2.default },
  props: {
    config: {
      type: Object,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      priorityToView: null
    };
  },

  computed: {
    reserveCategories: function reserveCategories() {
      return this.config.reserveCategories || [];
    },
    unitType: function unitType() {
      return this.config.unitType;
    },
    supply: function supply() {
      return this.config.supply;
    }
  },
  methods: {
    handleOnClose: function handleOnClose() {
      if (this.priorityToView) {
        this.priorityToView = null;
      } else {
        this.onClose();
      }
    },
    goToPrioritySummary: function goToPrioritySummary(category) {
      this.priorityToView = category;
    }
  }
};

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js___ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    onPriorityClick: {
      type: Function,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      descriptionIndexToShow: null
    };
  },

  computed: {
    reserveCategories: function reserveCategories() {
      return this.config.reserveCategories || [];
    },
    unitType: function unitType() {
      return this.config.unitType;
    },
    supply: function supply() {
      return this.config.supply;
    },
    requiredFields: function requiredFields() {
      return this.config.requiredFields || [];
    }
  },
  methods: {
    setDescriptionIndexToShow: function setDescriptionIndexToShow(index) {
      this.descriptionIndexToShow = index;
    }
  }
};

/***/ }),
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/pages/reserve-instances.vue?vue&type=template&id=a5c3b312&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"reserveContainer"},[_c('h1',{staticClass:"header"},[_vm._v("Project Reserve")]),(_vm.viewConfigModalOpen)?_c('ViewConfigModal',{attrs:{"on-close":_vm.closeViewConfigModal,"config":_vm.configToView}}):_vm._e(),_c('h2',{staticClass:"tableLabel mb-9 fs-16 fw-n"},[_vm._v("Database of reserve instances")]),_c('div',{staticClass:"reserveTableContainer"},[_vm._m(0),(_vm.reserveInstances)?_c('div',{staticClass:"reserveTableRows"},[_vm._l((_vm.reserveInstances),function(instance){return _c('div',{key:("" + (instance.id)),staticClass:"reserveTableRow"},[_c('span',{staticClass:"rowCell fw-b"},[_vm._v(_vm._s(instance.dateLoaded))]),_c('span',{staticClass:"rowCell fw-b"},[_vm._v(_vm._s(instance.name))]),_c('span',{staticClass:"rowCell status"},[_c('span',{class:[
              'statusText',
              {
                inProgress: instance.status === 'IN_PROGRESS',
                finished: instance.status === 'FINISHED',
                error: instance.status === 'ERROR',
              } ]},[_vm._v(_vm._s(_vm.toTitleCase(instance.status)))])]),_c('div',{staticClass:"actionButtons"},[_c('button',{on:{"click":function () { return _vm.startFromOldConfig(instance); }}},[_vm._v("\n            Start New Batch from Config\n          ")]),_c('button',{on:{"click":function () { return _vm.viewConfig(instance); }}},[_vm._v("\n            View Configuration\n          ")]),_c('button',{staticClass:"exportResultsBtn"},[_vm._v("\n            Export Results ▼\n            "),_c('span',{staticClass:"resultsOptions"},[_c('button',{on:{"click":function () { return _vm.exportAll(instance); }}},[_vm._v("\n                Export all participants as CSV\n              ")]),_c('button',{on:{"click":function () { return _vm.exportWinners(instance); }}},[_vm._v("\n                Export list of allocation recipients as CSV\n              ")]),_c('button',{on:{"click":function () { return _vm.exportLosers(instance); }}},[_vm._v("\n                Export list of allocation non-recipients as CSV\n              ")])])])])])}),_c('div',{staticClass:"buttonWrapper"},[_c('router-link',{staticClass:"addButton p-18 fs-12",attrs:{"to":"/unit-definition"},nativeOn:{"click":function($event){return _vm.initConfig($event)}}},[_vm._v("\n          Add New Reserve Instance\n        ")])],1)],2):_vm._e()]),_c('div',{staticClass:"navButtons"},[_c('router-link',{staticClass:"navButton",attrs:{"to":"/load-data"}},[_vm._v("Back")])],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"reserveTableLabels"},[_c('label',{staticClass:"label"},[_vm._v("Date Created")]),_c('label',{staticClass:"label"},[_vm._v("Name")]),_c('label',{staticClass:"label status"},[_vm._v("Status")]),_c('label',{staticClass:"actionLabel"},[_vm._v("Action")])])}]


// CONCATENATED MODULE: ./src/public/pages/reserve-instances.vue?vue&type=template&id=a5c3b312&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.3.0
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,b={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var r=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(i=f.URL||f.webkitURL||null,r=s.toString(),b.BLOB_URL||(b.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var i,r;return t.onmessage=m,t.id=h++,a[t.id]=t}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,void r.postMessage({input:e,config:t,workerId:r.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&U(e.read)&&U(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,m=!0,_=",",v="\r\n",s='"',a=s+s,i=!1,r=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(_=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines);"string"==typeof t.newline&&(v=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(m=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s);"boolean"==typeof t.escapeFormulae&&(o=t.escapeFormulae)}();var h=new RegExp(q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return f(null,e,i);if("object"==typeof e[0])return f(r||u(e[0]),e,i)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:u(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e){if("object"!=typeof e)return[];var t=[];for(var i in e)t.push(i);return t}function f(e,t,i){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&m){for(var a=0;a<e.length;a++)0<a&&(r+=_),r+=y(e[a],a);0<t.length&&(r+=v)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(r+=_);var g=n&&s?e[p]:p;r+=y(t[o][g],p)}o<t.length-1&&(!i||0<h&&!f)&&(r+=v)}}return r}function y(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===o&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var i=e.toString().replace(h,a),r="boolean"==typeof n&&n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(_)||" "===i.charAt(0)||" "===i.charAt(i.length-1);return r?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=w,b.ParserHandle=i,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)})}),e(),this;function e(){if(0!==h.length){var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u()},b.parse(n.file,n.instanceConfig)}else U(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&U(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e;this._partialLine="";var n=this._handle.parse(r,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=r.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(U(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!U(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){U(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var r;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),n||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{r.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}n&&0===r.status&&this._chunkError()}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:r.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)))},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t))}}function c(e){var r,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((r=new FileReader).onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)):r=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var i=r.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(r.error)}}function p(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=i.substring(0,t),i=i.substring(t)):(e=i,i=""),this._finished=!i,this.parseChunk(e)}}}function g(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function i(_){var a,o,h,r=Math.pow(2,53),n=-r,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,u=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,i=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(U(_.step)){var p=_.step;_.step=function(e){if(c=e,m())g();else{if(g(),0===c.data.length)return;i+=e.data.length,_.preview&&i>_.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function v(e){return"greedy"===_.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(c&&h&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),h=!1),_.skipEmptyLines)for(var e=0;e<c.data.length;e++)v(c.data[e])&&c.data.splice(e--,1);return m()&&function(){if(!c)return;function e(e,t){U(_.transformHeader)&&(e=_.transformHeader(e,t)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;m()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!_.header&&!_.dynamicTyping&&!_.transform)return c;function e(e,t){var i,r=_.header?{}:[];for(i=0;i<e.length;i++){var n=i,s=e[i];_.header&&(n=i>=l.length?"__parsed_extra":l[i]),_.transform&&(s=_.transform(s,n)),s=y(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}return _.header&&(i>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,f+t):i<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,f+t)),r}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);_.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function m(){return _.header&&0===l.length}function y(e,t){return i=e,_.dynamicTypingFunction&&void 0===_.dynamicTyping[i]&&(_.dynamicTyping[i]=_.dynamicTypingFunction(i)),!0===(_.dynamicTyping[i]||_.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<r)return!0}return!1}(t)?parseFloat(t):u.test(t)?new Date(t):""===t?null:t):t;var i}function k(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),c.errors.push(n)}this.parse=function(e,t,i){var r=_.quoteChar||'"';if(_.newline||(_.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(q(t)+"([^]*?)"+q(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<r[0].length;if(1===r.length||s)return"\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(e,r)),h=!1,_.delimiter)U(_.delimiter)&&(_.delimiter=_.delimiter(e),c.meta.delimiter=_.delimiter);else{var n=function(e,t,i,r,n){var s,a,o,h;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var u=0;u<n.length;u++){var f=n[u],d=0,l=0,c=0;o=void 0;for(var p=new w({comments:r,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(i&&v(p.data[g]))c++;else{var m=p.data[g].length;l+=m,void 0!==o?0<m&&(d+=Math.abs(m-o),o=m):o=m}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===h||h<l)&&1.99<l&&(a=d,s=f,h=l)}return{successful:!!(_.delimiter=s),bestDelimiter:s}}(e,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess);n.successful?_.delimiter=n.bestDelimiter:(h=!0,_.delimiter=b.DefaultDelimiter),c.meta.delimiter=_.delimiter}var s=E(_);return _.preview&&_.header&&s.preview++,a=e,o=new w(s),c=o.parse(a,t,i),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=U(_.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,U(_.complete)&&_.complete(c),a=""}}function q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function w(e){var O,D=(e=e||{}).delimiter,I=e.newline,T=e.comments,A=e.step,L=e.preview,F=e.fastMode,z=O=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(z=e.escapeChar),("string"!=typeof D||-1<b.BAD_DELIMITERS.indexOf(D))&&(D=","),T===D)throw new Error("Comment character same as delimiter");!0===T?T="#":("string"!=typeof T||-1<b.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==I&&"\r"!==I&&"\r\n"!==I&&(I="\n");var M=0,j=!1;this.parse=function(a,t,i){if("string"!=typeof a)throw new Error("Input must be a string");var r=a.length,e=D.length,n=I.length,s=T.length,o=U(A),h=[],u=[],f=[],d=M=0;if(!a)return R();if(F||!1!==F&&-1===a.indexOf(O)){for(var l=a.split(I),c=0;c<l.length;c++){if(f=l[c],M+=f.length,c!==l.length-1)M+=I.length;else if(i)return R();if(!T||f.substring(0,s)!==T){if(o){if(h=[],b(f.split(D)),S(),j)return R()}else b(f.split(D));if(L&&L<=c)return h=h.slice(0,L),R(!0)}}return R()}for(var p=a.indexOf(D,M),g=a.indexOf(I,M),m=new RegExp(q(z)+q(O),"g"),_=a.indexOf(O,M);;)if(a[M]!==O)if(T&&0===f.length&&a.substring(M,M+s)===T){if(-1===g)return R();M=g+n,g=a.indexOf(I,M),p=a.indexOf(D,M)}else{if(-1!==p&&(p<g||-1===g)){if(!(p<_)){f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}var v=x(p,_,g);if(v&&void 0!==v.nextDelim){p=v.nextDelim,_=v.quoteSearch,f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}}if(-1===g)break;if(f.push(a.substring(M,g)),C(g+n),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0)}else for(_=M,M++;;){if(-1===(_=a.indexOf(O,_+1)))return i||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:M}),E();if(_===r-1)return E(a.substring(M,_).replace(m,O));if(O!==z||a[_+1]!==z){if(O===z||0===_||a[_-1]!==z){-1!==p&&p<_+1&&(p=a.indexOf(D,_+1)),-1!==g&&g<_+1&&(g=a.indexOf(I,_+1));var y=w(-1===g?p:Math.min(p,g));if(a[_+1+y]===D){f.push(a.substring(M,_).replace(m,O)),a[M=_+1+y+e]!==O&&(_=a.indexOf(O,M)),p=a.indexOf(D,M),g=a.indexOf(I,M);break}var k=w(g);if(a.substring(_+1+k,_+1+k+n)===I){if(f.push(a.substring(M,_).replace(m,O)),C(_+1+k+n),p=a.indexOf(D,M),_=a.indexOf(O,M),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:M}),_++}}else _++}return E();function b(e){h.push(e),d=M}function w(e){var t=0;if(-1!==e){var i=a.substring(_+1,e);i&&""===i.trim()&&(t=i.length)}return t}function E(e){return i||(void 0===e&&(e=a.substring(M)),f.push(e),M=r,b(f),o&&S()),R()}function C(e){M=e,b(f),f=[],g=a.indexOf(I,M)}function R(e){return{data:h,errors:u,meta:{delimiter:D,linebreak:I,aborted:j,truncated:!!e,cursor:d+(t||0)}}}function S(){A(R()),h=[],u=[]}function x(e,t,i){var r={nextDelim:void 0,quoteSearch:void 0},n=a.indexOf(O,t+1);if(t<e&&e<n&&(n<i||-1===i)){var s=a.indexOf(D,n);if(-1===s)return r;n<s&&(n=a.indexOf(O,n+1)),r=x(s,n,i)}else r={nextDelim:e,quoteSearch:t};return r}},this.abort=function(){j=!0},this.getCharIndex=function(){return M}}function m(e){var t=e.data,i=a[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var i=a[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=E(e[i]);return t}function y(e,t){return function(){e.apply(t,arguments)}}function U(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var i=b.parse(t.input,t.config);i&&f.postMessage({workerId:b.WORKER_ID,results:i,finished:!0})}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(u.prototype)).constructor=g,b});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ViewConfigModal_vue_vue_type_template_id_4ffb5aa3_scoped_true___ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ViewConfigModal_vue_vue_type_script_lang_js___ = __webpack_require__(104);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__ViewConfigModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__ViewConfigModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewConfigModal_vue_vue_type_style_index_0_id_4ffb5aa3_scoped_true_lang_stylus___ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ViewConfigModal_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__ViewConfigModal_vue_vue_type_template_id_4ffb5aa3_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ViewConfigModal_vue_vue_type_template_id_4ffb5aa3_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "4ffb5aa3",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/ViewConfigModal.vue?vue&type=template&id=4ffb5aa3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modalWrapper"},[_c('div',{staticClass:"modalInnerWrapper"},[(_vm.priorityToView)?_c('PrioritySummary',{attrs:{"reserve-category":_vm.priorityToView}}):_vm._e(),(!_vm.priorityToView)?_c('ConfigSummary',{attrs:{"config":_vm.config,"on-priority-click":_vm.goToPrioritySummary}}):_vm._e(),_c('div',{staticClass:"modalButtons"},[_c('button',{staticClass:"navButton",on:{"click":_vm.handleOnClose}},[_vm._v("Back")])])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/components/ViewConfigModal.vue?vue&type=template&id=4ffb5aa3&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfigSummary_vue_vue_type_template_id_0513b2ce___ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfigSummary_vue_vue_type_script_lang_js___ = __webpack_require__(106);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__ConfigSummary_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__ConfigSummary_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConfigSummary_vue_vue_type_style_index_0_lang_stylus___ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ConfigSummary_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__ConfigSummary_vue_vue_type_template_id_0513b2ce___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ConfigSummary_vue_vue_type_template_id_0513b2ce___["b" /* staticRenderFns */],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/ConfigSummary.vue?vue&type=template&id=0513b2ce&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"finishContainer"},[_c('div',{staticClass:"finishConfirmationData"},[_c('div',{staticClass:"flexrow mb-18"},[_c('strong',{staticClass:"fw-b mr-9"},[_vm._v("Unit allocated: ")]),_c('span',[_vm._v(_vm._s(_vm.unitType))])]),_c('div',{staticClass:"flexrow mb-18"},[_c('strong',{staticClass:"fw-b mr-9"},[_vm._v("Number of units allocated: ")]),_c('span',[_vm._v(_vm._s(_vm.supply))])]),_c('div',{staticClass:"reserveTableContainer"},[_vm._m(0),_c('div',{staticClass:"reserveTableRows"},_vm._l((_vm.reserveCategories),function(category,index){return _c('div',{key:("" + (category.name) + (category.order)),staticClass:"reserveTableRow"},[_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.order))]),_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.name)),(category.description)?_c('span',{staticClass:"iconWrapper"},[_c('font-awesome-icon',{staticClass:"icon ml-9",attrs:{"icon":"info-circle"},on:{"mouseenter":function () { return _vm.setDescriptionIndexToShow(index); },"mouseleave":function () { return _vm.setDescriptionIndexToShow(null); }}}),_c('div',{class:[
                  'descriptionWrapper',
                  { isVisible: _vm.descriptionIndexToShow === index } ]},[_vm._v("\n                "+_vm._s(category.description)+"\n              ")])],1):_vm._e()]),_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.size))]),_c('button',{staticClass:"p9",on:{"click":function () { return _vm.onPriorityClick(category); }}},[_vm._v("\n            "+_vm._s("Priority")+"\n          ")])])}),0)])]),(_vm.requiredFields.length)?_c('div',{staticClass:"requiredFieldsWrapper"},[_vm._m(1),_c('p',{staticClass:"mb-27"},[_vm._v("\n      A user can optionally include their own random number for a patient by\n      including a field exactly named random_number. If a patient has a blank\n      random number or random number not in the range 0 to 1000, the system\n      will generate and report its own random number for the patient.\n    ")]),_c('div',{staticClass:"mb-18 fw-b"},[_vm._v("Required fields:")]),_vm._l((_vm.requiredFields),function(field){return _c('p',{key:field.name,staticClass:"mb-9 requiredField"},[_vm._v("\n      "+_vm._s(field.name)),(!field.required)?_c('span',[_vm._v("*")]):_vm._e()])}),_c('div',{staticClass:"mt-18"},[_vm._v("*Not required for all recipients inputted")])],2):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"reserveTableLabels"},[_c('span',[_vm._v("Processing Order")]),_c('span',[_vm._v("Reserve Category Name")]),_c('span',[_vm._v("Size")]),_c('span',[_vm._v("Priority Order")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"mb-18"},[_vm._v("\n      This configuration will\n      "),_c('strong',[_vm._v("require the following data fields")]),_vm._v(" for every potential\n      recipient. Please ensure that this data is readily available before\n      continuing.\n    ")])}]


// CONCATENATED MODULE: ./src/public/components/ConfigSummary.vue?vue&type=template&id=0513b2ce&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_style_index_0_lang_stylus___ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_style_index_0_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfigSummary_vue_vue_type_style_index_0_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("10cca9f2", content, true, {});

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".finishContainer{margin:auto;width:100%;position:relative;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:min-content min-content min-content;grid-gap:27px}.finishConfirmationData{grid-column:span 2}.finishConfirmationData:last-child{grid-column:span 3}.reserveTableContainer{width:100%;border:2px solid var(--dark-blue);border-radius:18px}.reserveTableLabels{display:grid;grid-template-columns:1fr 1.5fr 1fr 1fr;grid-gap:18px;padding:18px;border-bottom:2px solid var(--dark-blue);text-align:center}.reserveTableRows{background:var(--light-grey);border-radius:0 0 18px 18px}.reserveTableRow{display:grid;padding:18px;grid-template-columns:1fr 1.5fr 1fr 1fr;grid-gap:18px;border-radius:18px;text-align:center}.rowCell{display:flex;justify-content:center;align-items:center;position:relative}.requiredFieldsWrapper{padding:18px;border:2px solid var(--dark-blue);border-radius:18px}.requiredField{border-radius:18px;background-color:var(--light-grey);padding:9px 18px}.iconWrapper{position:relative}.icon{cursor:pointer}.descriptionWrapper{z-index:1000;display:none;position:absolute;top:50%;width:200px;transform:translateY(-50%);left:calc(100% + 9px);background-color:#fff;border:2px solid var(--dark-blue);padding:9px;border-radius:9px}.descriptionWrapper.isVisible{display:block}", ""]);

// exports


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_style_index_0_id_4ffb5aa3_scoped_true_lang_stylus___ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_style_index_0_id_4ffb5aa3_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewConfigModal_vue_vue_type_style_index_0_id_4ffb5aa3_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(132);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("700eb88e", content, true, {});

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".modalWrapper[data-v-4ffb5aa3]{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(5px);z-index:100}.modalInnerWrapper[data-v-4ffb5aa3]{height:fit-content;max-height:90%;width:90%;border:2px solid var(--dark-blue);background:#fff;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:27px}.modalButtons[data-v-4ffb5aa3]{width:100%;margin-top:auto;display:flex}", ""]);

// exports


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_style_index_0_id_a5c3b312_scoped_true_lang_stylus___ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_style_index_0_id_a5c3b312_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_reserve_instances_vue_vue_type_style_index_0_id_a5c3b312_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("dc3370d8", content, true, {});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".header[data-v-a5c3b312]{padding:18px 45px;color:var(--dark-blue);background-color:var(--light-grey);border-radius:36px;margin-bottom:36px}.reserveContainer[data-v-a5c3b312]{height:100vh;width:100vw;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}.reserveTableContainer[data-v-a5c3b312]{width:90%;border:2px solid var(--dark-blue);border-radius:18px}.reserveTableLabels[data-v-a5c3b312]{display:grid;grid-template-columns:repeat(12,1fr);grid-gap:18px;padding:18px;border-bottom:2px solid var(--dark-blue);text-align:center}.reserveTableRows[data-v-a5c3b312]{background:var(--light-grey);border-radius:0 0 18px 18px}.reserveTableRow[data-v-a5c3b312]{display:grid;padding:18px;grid-template-columns:repeat(12,1fr);grid-gap:18px;border-radius:18px;text-align:center}.rowCell[data-v-a5c3b312]{grid-column:span 3;display:flex;justify-content:center;align-items:center}.rowCell.status[data-v-a5c3b312]{grid-column:span 2}.statusText[data-v-a5c3b312]{padding:9px 18px;border-radius:9px;text-transform:capitalize}.statusText.finished[data-v-a5c3b312]{background-color:#00b456;color:#fff}.statusText.error[data-v-a5c3b312]{background-color:#ff4242;color:#fff}.statusText.inProgress[data-v-a5c3b312]{background-color:#ffa947}.label[data-v-a5c3b312]{grid-column:span 3}.label.status[data-v-a5c3b312]{grid-column:span 2}.actionLabel[data-v-a5c3b312]{grid-column:span 4}.actionButtons[data-v-a5c3b312]{grid-column:span 4;display:grid;grid-template-columns:repeat(3,1fr);grid-gap:9px}.actionButtons button[data-v-a5c3b312]{padding:9px 4.5px;font-size:12px}.buttonWrapper[data-v-a5c3b312]{width:100%;display:flex;justify-content:center;align-items:center;padding:18px 0}.navButtons[data-v-a5c3b312]{margin-top:18px;width:90%;display:flex;justify-content:space-between;align-items:center}.tableFooter[data-v-a5c3b312]{color:var(--dark-grey)}.allocationText[data-v-a5c3b312]{color:var(--dark-blue)}.icon[data-v-a5c3b312]{cursor:pointer}.resultsOptions[data-v-a5c3b312]{z-index:1000;position:absolute;top:100%;left:0;width:100%;padding-top:9px;background-color:hsla(0,0%,100%,.75);display:none}.resultsOptions button[data-v-a5c3b312]{margin-bottom:4.5px}.exportResultsBtn[data-v-a5c3b312]{position:relative}.exportResultsBtn:hover>.resultsOptions[data-v-a5c3b312]{display:block}.addButton[data-v-a5c3b312]{border:1px solid #000;background-color:var(--light-grey);text-decoration:none;color:#000;border-radius:2px}.addButton[data-v-a5c3b312]:hover{background-color:var(--dark-grey)}", ""]);

// exports


/***/ })
]));