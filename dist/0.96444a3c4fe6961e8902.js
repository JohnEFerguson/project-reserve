webpackJsonp([0],Array(76).concat([
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__specify_reserve_vue_vue_type_template_id_7aed37a2_scoped_true___ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specify_reserve_vue_vue_type_script_lang_js___ = __webpack_require__(110);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__specify_reserve_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__specify_reserve_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specify_reserve_vue_vue_type_style_index_0_id_7aed37a2_scoped_true_lang_stylus___ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__specify_reserve_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__specify_reserve_vue_vue_type_template_id_7aed37a2_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__specify_reserve_vue_vue_type_template_id_7aed37a2_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "7aed37a2",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
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
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js___ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 84 */
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

exports.default = {
  computed: {
    pageUrl: function pageUrl() {
      return this.$route.path;
    }
  }
};

/***/ }),
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
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configuration_screen_vue_vue_type_template_id_2f303e21_scoped_true___ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configuration_screen_vue_vue_type_script_lang_js___ = __webpack_require__(83);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__configuration_screen_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__configuration_screen_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration_screen_vue_vue_type_style_index_0_id_2f303e21_scoped_true_lang_stylus___ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__configuration_screen_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__configuration_screen_vue_vue_type_template_id_2f303e21_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__configuration_screen_vue_vue_type_template_id_2f303e21_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "2f303e21",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/layouts/configuration-screen.vue?vue&type=template&id=2f303e21&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"config-container"},[_c('div',{staticClass:"pageTabs"},[_c('div',{class:['pageTab', { isActive: _vm.pageUrl === '/unit-definition' }]},[_vm._v("\n      Unit Definition\n    ")]),_c('div',{class:['pageTab', { isActive: _vm.pageUrl === '/specify-reserve' }]},[_vm._v("\n      Specify Reserve\n    ")]),_c('div',{class:['pageTab', { isActive: _vm.pageUrl === '/finish' }]},[_vm._v("\n      Finish & Confirm\n    ")])]),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/layouts/configuration-screen.vue?vue&type=template&id=2f303e21&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_style_index_0_id_2f303e21_scoped_true_lang_stylus___ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_style_index_0_id_2f303e21_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_configuration_screen_vue_vue_type_style_index_0_id_2f303e21_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("481f9bf1", content, true, {});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".config-container[data-v-2f303e21]{height:100vh;display:flex;flex-direction:column;align-items:center}.pageTabs[data-v-2f303e21]{display:flex;width:700px;padding:54px 0;justify-content:space-between}.pageTab[data-v-2f303e21]{display:flex;justify-content:center;align-items:center;background-color:var(--light-grey);color:var(--dark-grey);padding:18px 36px;border-radius:18px}.pageTab.isActive[data-v-2f303e21]{background-color:var(--dark-blue);color:#fff}", ""]);

// exports


/***/ }),
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js___ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditReserveCategoryModal = __webpack_require__(141);

var _EditReserveCategoryModal2 = _interopRequireDefault(_EditReserveCategoryModal);

var _ViewPriorityOrderModal = __webpack_require__(146);

var _ViewPriorityOrderModal2 = _interopRequireDefault(_ViewPriorityOrderModal);

var _configurationScreen = __webpack_require__(95);

var _configurationScreen2 = _interopRequireDefault(_configurationScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  middleware: "has-category",
  components: {
    EditReserveCategoryModal: _EditReserveCategoryModal2.default,
    ViewPriorityOrderModal: _ViewPriorityOrderModal2.default,
    ConfigLayout: _configurationScreen2.default
  },
  data: function data() {
    return {
      editReserveCategoryModalOpen: false,
      editReserveCategoryModalMode: "",
      categoryToEdit: null,
      viewPriorityOrderModalOpen: false,
      reserveCategoryToView: null
    };
  },

  computed: {
    totalSupply: function totalSupply() {
      return this.$store.state.currentConfig.supply;
    },
    allocationText: function allocationText() {
      return this.$store.state.currentConfig.supply + " " + this.$store.state.currentConfig.unitType;
    },
    reserveCategories: function reserveCategories() {
      return this.$store.state.currentConfig.reserveCategories;
    }
  },
  methods: {
    openAddReserveCategoryModal: function openAddReserveCategoryModal() {
      this.editReserveCategoryModalMode = "add";
      this.editReserveCategoryModalOpen = true;
    },
    closeEditReserveCategoryModal: function closeEditReserveCategoryModal() {
      this.editReserveCategoryModalOpen = false;
      this.categoryToEdit = null;
    },
    closeViewPriorityOrderModal: function closeViewPriorityOrderModal() {
      this.viewPriorityOrderModalOpen = false;
      this.reserveCategoryToView = null;
    },
    viewPriorityOrder: function viewPriorityOrder(category) {
      var _this = this;

      this.reserveCategoryToView = category;
      this.$nextTick(function () {
        _this.viewPriorityOrderModalOpen = true;
      });
    },
    editCategory: function editCategory(category) {
      var _this2 = this;

      this.editReserveCategoryModalMode = "edit";
      this.categoryToEdit = deepClone(category);
      this.$nextTick(function () {
        _this2.editReserveCategoryModalOpen = true;
      });
    },
    moveCategoryUp: function moveCategoryUp(category) {
      this.$store.commit("moveCategory", { category: category, direction: "up" });
    },
    moveCategoryDown: function moveCategoryDown(category) {
      this.$store.commit("moveCategory", { category: category, direction: "down" });
    },
    postConfig: function postConfig() {
      this.$store.dispatch("postConfig");
    },
    calcSupplyPercent: function calcSupplyPercent(size) {
      var percent = size / this.totalSupply * 100;
      return percent % 1 > 0.5 ? Math.ceil(percent) + "%" : Math.floor(percent) + "%";
    }
  }
};

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js___ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 113 */
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

var _PriorityOrderPanel = __webpack_require__(85);

var _PriorityOrderPanel2 = _interopRequireDefault(_PriorityOrderPanel);

var _constants = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var defaultCriteria = _extends({
  name: "",
  criteriaType: _constants.CATEGORY_TYPE,
  order: null
}, deepClone(_constants.categoryFields), deepClone(_constants.numericFields));
exports.default = {
  components: { PriorityOrderPanel: _PriorityOrderPanel2.default },
  props: {
    onClose: { type: Function, required: true },
    mode: { type: String, required: true },
    categoryToEdit: {
      type: Object,
      required: false,
      default: function defaultCategory() {
        return {
          name: "",
          description: "",
          size: 0,
          priority: [_extends({}, deepClone(defaultCriteria))]
        };
      }
    }
  },
  data: function data() {
    return {
      reserveCategory: deepClone(this.categoryToEdit),
      currentCriteria: 0,
      hasNameError: false,
      initialSize: this.categoryToEdit.size
    };
  },

  computed: {
    availableSupply: function availableSupply() {
      var defaultCategory = this.$store.state.currentConfig.reserveCategories.find(function (cat) {
        return !!cat.isDefault;
      });
      if (defaultCategory) {
        return parseInt(this.initialSize) + parseInt(defaultCategory.size);
      }
      return this.$store.state.currentConfig.supply;
    },
    CATEGORY_TYPE: function CATEGORY_TYPE() {
      return _constants.CATEGORY_TYPE;
    },
    NUMERIC_TYPE: function NUMERIC_TYPE() {
      return _constants.NUMERIC_TYPE;
    },
    hasSizeError: function hasSizeError() {
      return parseInt(this.reserveCategory.size) > parseInt(this.availableSupply) || this.reserveCategory.size < 0;
    }
  },
  mounted: function mounted() {
    if (!this.reserveCategory.priority.length) {
      this.reserveCategory.priority = [_extends({}, deepClone(defaultCriteria))];
    }
  },

  methods: {
    saveCategory: function saveCategory() {
      if (!this.hasSizeError && this.reserveCategory.name) {
        var filteredPriorities = this.reserveCategory.priority.filter(function (criteria) {
          return criteria.name;
        });
        this.$store.commit("saveCategory", _extends({}, this.reserveCategory, {
          priority: filteredPriorities
        }));
        this.onClose();
      } else {
        this.validateCategoryName();
      }
    },
    updateCriteriaTab: function updateCriteriaTab(newIndex) {
      this.currentCriteria = newIndex;
    },
    addNewCriteria: function addNewCriteria() {
      if (this.reserveCategory.priority.length < 3) {
        this.reserveCategory.priority.push(_extends({}, deepClone(defaultCriteria)));
        this.updateCriteriaTab(this.reserveCategory.priority.length - 1);
      }
    },
    validateCategoryName: function validateCategoryName() {
      this.hasNameError = !this.reserveCategory.name;
    }
  }
};

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js___ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PrioritySummary = __webpack_require__(86);

var _PrioritySummary2 = _interopRequireDefault(_PrioritySummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { PrioritySummary: _PrioritySummary2.default },
  props: {
    reserveCategory: {
      type: Object,
      required: true
    },
    onClose: {
      type: Function,
      required: true
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

/***/ }),
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/pages/specify-reserve.vue?vue&type=template&id=7aed37a2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ConfigLayout',[_c('div',{staticClass:"reserveContainer"},[(_vm.editReserveCategoryModalOpen)?_c('EditReserveCategoryModal',{attrs:{"on-close":_vm.closeEditReserveCategoryModal,"mode":_vm.editReserveCategoryModalMode,"category-to-edit":_vm.categoryToEdit || undefined}}):_vm._e(),(_vm.viewPriorityOrderModalOpen)?_c('ViewPriorityOrderModal',{attrs:{"on-close":_vm.closeViewPriorityOrderModal,"reserve-category":_vm.reserveCategoryToView}}):_vm._e(),_c('div',{staticClass:"reserveTableContainer"},[_c('div',{staticClass:"reserveTableLabels"},[_c('span',[_vm._v("Processing Order")]),_c('span',[_vm._v("Reserve Category Name")]),_c('span',[_vm._v("Size")]),_c('span',[_vm._v("% of Supply")]),_c('span',[_vm._v("Priority Order")])]),_c('div',{staticClass:"reserveTableRows"},[_vm._l((_vm.reserveCategories),function(category){return _c('div',{key:("" + (category.name) + (category.order)),staticClass:"reserveTableRow"},[_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.order))]),_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.name))]),_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(category.size))]),_c('span',{staticClass:"rowCell"},[_vm._v(_vm._s(_vm.calcSupplyPercent(category.size)))]),_c('button',{staticClass:"p9",on:{"click":function () { return _vm.viewPriorityOrder(category); }}},[_vm._v("\n            "+_vm._s("Priority")+"\n          ")]),_c('span',{staticClass:"actionButtons"},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":"trash"}}),_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":"edit"},on:{"click":function () { return _vm.editCategory(category); }}}),_c('div',{staticClass:"flexcolumn"},[_c('font-awesome-icon',{staticClass:"icon mb-9",attrs:{"icon":"arrow-up"},on:{"click":function () { return _vm.moveCategoryUp(category); }}}),_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":"arrow-down"},on:{"click":function () { return _vm.moveCategoryDown(category); }}})],1)],1)])}),_c('div',{staticClass:"buttonWrapper"},[_c('button',{staticClass:"p-18",on:{"click":_vm.openAddReserveCategoryModal}},[_vm._v("\n            Add New Reserve Category\n          ")])])],2)]),_c('div',{staticClass:"navButtons"},[_c('router-link',{staticClass:"navButton",attrs:{"to":"/unit-definition"}},[_vm._v("Back")]),_c('h3',{staticClass:"tableFooter"},[_vm._v("\n        Project Reserve | Allocation of\n        "),_c('span',{staticClass:"allocationText"},[_vm._v(_vm._s(_vm.allocationText))]),_vm._v(" units\n      ")]),_c('button',{staticClass:"navButton",on:{"click":_vm.postConfig}},[_vm._v("Next")])],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/pages/specify-reserve.vue?vue&type=template&id=7aed37a2&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EditReserveCategoryModal_vue_vue_type_template_id_f203dc2e_scoped_true___ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditReserveCategoryModal_vue_vue_type_script_lang_js___ = __webpack_require__(112);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__EditReserveCategoryModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__EditReserveCategoryModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditReserveCategoryModal_vue_vue_type_style_index_0_id_f203dc2e_scoped_true_lang_stylus___ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__EditReserveCategoryModal_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__EditReserveCategoryModal_vue_vue_type_template_id_f203dc2e_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__EditReserveCategoryModal_vue_vue_type_template_id_f203dc2e_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "f203dc2e",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/EditReserveCategoryModal.vue?vue&type=template&id=f203dc2e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modalWrapper"},[_c('div',{staticClass:"modalInnerWrapper"},[_c('h2',[_vm._v(_vm._s(((_vm.mode === "add" ? "Add" : "Edit") + " Reserve Category")))]),_c('div',{staticClass:"modalBody"},[_c('div',{staticClass:"flexcolumn"},[_c('div',{staticClass:"flexcolumn mb-27"},[_c('label',{staticClass:"ml-9 mb-9",attrs:{"for":"categoryName"}},[_vm._v("Reserve category abbreviated name")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.reserveCategory.name),expression:"reserveCategory.name"}],staticClass:"textInput",attrs:{"name":"categoryName","placeholder":"e.g., clinical trial participant"},domProps:{"value":(_vm.reserveCategory.name)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.reserveCategory, "name", $event.target.value)},_vm.validateCategoryName]}}),(_vm.hasNameError)?_c('span',{staticClass:"fs-12 mt-9 ml-18 col-error"},[_vm._v(_vm._s("Please enter a name for the reserve category."))]):_vm._e()]),_c('div',{staticClass:"flexcolumn mb-27"},[_c('label',{staticClass:"ml-9 mb-9",attrs:{"for":"categoryDescription"}},[_vm._v("Description")]),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.reserveCategory.description),expression:"reserveCategory.description"}],staticClass:"textInput textAreaInput",attrs:{"name":"categoryDescription","placeholder":"e.g., A clinical trial participant is defined as anyone who has enrolled in a COVID-19 Moderna clinical trial in the past 90 days."},domProps:{"value":(_vm.reserveCategory.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.reserveCategory, "description", $event.target.value)}}})]),_c('div',{staticClass:"flexcolumn mb-27"},[_c('label',{staticClass:"ml-9 mb-9",attrs:{"for":"categoryDescription"}},[_vm._v("Reserve size")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.reserveCategory.size),expression:"reserveCategory.size"}],staticClass:"textInput",attrs:{"name":"categoryDescription","type":"number","placeholder":"e.g., 60","min":0},domProps:{"value":(_vm.reserveCategory.size)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.reserveCategory, "size", $event.target.value)}}}),(_vm.hasSizeError)?_c('span',{staticClass:"fs-12 mt-9 ml-18 col-error"},[_vm._v(_vm._s(("There are only " + _vm.availableSupply + " units available. Please re-allocate from other reserve categories, then enter a non-zero size.")))]):_vm._e()])]),_c('div',{staticClass:"modalCriteriaWrapper"},[_c('h4',{staticClass:"mb-9 fw-n"},[_vm._v("Specification of priority order")]),_c('div',{staticClass:"modalCriteriaTabs flexrow"},[_vm._l((_vm.reserveCategory.priority),function(criteria,criteriaIndex){return _c('span',{key:("criteria-tab-" + criteriaIndex),class:[
              'modalCriteriaTab',
              { isActive: criteriaIndex === _vm.currentCriteria } ],on:{"click":function () { return _vm.updateCriteriaTab(criteriaIndex); }}},[_vm._v(_vm._s(("Criteria " + (criteriaIndex + 1))))])}),(_vm.reserveCategory.priority.length < 3)?_c('button',{staticClass:"ml-9",on:{"click":_vm.addNewCriteria}},[_vm._v("\n            +\n          ")]):_vm._e()],2),_c('div',{staticClass:"modalCriteriaPanels"},_vm._l((_vm.reserveCategory.priority),function(criteria,criteriaIndex){return _c('div',{key:("criteria-panel-" + criteriaIndex)},[(criteriaIndex === _vm.currentCriteria)?_c('PriorityOrderPanel',{attrs:{"criteria":criteria,"criteria-index":criteriaIndex}}):_vm._e()],1)}),0)])]),_c('div',{staticClass:"modalButtons"},[_c('button',{staticClass:"navButton",on:{"click":_vm.onClose}},[_vm._v("Cancel")]),_c('button',{class:[
          'navButton',
          { isDisabled: _vm.hasSizeError || !_vm.reserveCategory.name } ],on:{"click":_vm.saveCategory}},[_vm._v("\n        "+_vm._s(("" + (_vm.mode === "add" ? "Add" : "Edit")))+"\n      ")])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/components/EditReserveCategoryModal.vue?vue&type=template&id=f203dc2e&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_style_index_0_id_f203dc2e_scoped_true_lang_stylus___ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_style_index_0_id_f203dc2e_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditReserveCategoryModal_vue_vue_type_style_index_0_id_f203dc2e_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("76de59c3", content, true, {});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".modalWrapper[data-v-f203dc2e]{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(5px);z-index:1000}.modalInnerWrapper[data-v-f203dc2e]{height:calc(100% - 18px);width:90%;border:2px solid var(--dark-blue);background:#fff;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:27px}.modalBody[data-v-f203dc2e]{flex:1;width:100%;display:grid;grid-template-columns:1fr 1fr;grid-gap:27px;padding:45px;margin:27px;background:var(--light-grey);border-radius:18px;max-height:75%;overflow:auto}.modalButtons[data-v-f203dc2e]{width:100%;margin-top:auto;display:flex;justify-content:space-between}.modalCriteriaTab[data-v-f203dc2e]{cursor:pointer;padding:9px;background-color:var(--light-grey);color:var(--dark-blue);border-radius:9px 9px 0 0;border:2px solid var(--dark-blue);border-bottom:0}.modalCriteriaTab.isActive[data-v-f203dc2e]{background-color:var(--dark-blue);color:var(--light-grey)}.modalCriteriaPanels[data-v-f203dc2e]{padding:18px;border:2px solid var(--dark-blue);border-radius:0 0 18px 18px;max-height:50vh;overflow:scroll}.textInput[data-v-f203dc2e]{cursor:pointer;resize:none;background-color:#fff;border:2px solid var(--dark-grey);font-size:20px;padding:9px 18px;border-radius:20px;outline:none}.textInput[data-v-f203dc2e]::placeholder{color:#ddd}.textAreaInput[data-v-f203dc2e]{height:200px;font-family:courier}", ""]);

// exports


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ViewPriorityOrderModal_vue_vue_type_template_id_90cf29ca_scoped_true___ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ViewPriorityOrderModal_vue_vue_type_script_lang_js___ = __webpack_require__(114);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__ViewPriorityOrderModal_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__ViewPriorityOrderModal_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ViewPriorityOrderModal_vue_vue_type_style_index_0_id_90cf29ca_scoped_true_lang_stylus___ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ViewPriorityOrderModal_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__ViewPriorityOrderModal_vue_vue_type_template_id_90cf29ca_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ViewPriorityOrderModal_vue_vue_type_template_id_90cf29ca_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "90cf29ca",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/public/components/ViewPriorityOrderModal.vue?vue&type=template&id=90cf29ca&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modalWrapper"},[_c('div',{staticClass:"modalInnerWrapper"},[_c('PrioritySummary',{attrs:{"reserve-category":_vm.reserveCategory}}),_c('div',{staticClass:"modalButtons"},[_c('button',{staticClass:"navButton ml-a",on:{"click":_vm.onClose}},[_vm._v("Close")])])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/public/components/ViewPriorityOrderModal.vue?vue&type=template&id=90cf29ca&scoped=true&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_style_index_0_id_90cf29ca_scoped_true_lang_stylus___ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_style_index_0_id_90cf29ca_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewPriorityOrderModal_vue_vue_type_style_index_0_id_90cf29ca_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(150);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("8bfb047e", content, true, {});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".modalWrapper[data-v-90cf29ca]{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(5px);z-index:1000}.modalInnerWrapper[data-v-90cf29ca]{height:90%;width:90%;border:2px solid var(--dark-blue);background:#fff;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:27px}.modalButtons[data-v-90cf29ca]{width:100%;margin-top:auto;display:flex;justify-content:space-between}", ""]);

// exports


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_style_index_0_id_7aed37a2_scoped_true_lang_stylus___ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_style_index_0_id_7aed37a2_scoped_true_lang_stylus____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_specify_reserve_vue_vue_type_style_index_0_id_7aed37a2_scoped_true_lang_stylus___);
/* unused harmony reexport namespace */


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(78).default
var update = add("3ec4de48", content, true, {});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, ".reserveContainer[data-v-7aed37a2]{flex:1;display:flex;flex-direction:column;align-items:center;width:90vw;position:relative}.reserveTableContainer[data-v-7aed37a2]{width:100%;border:2px solid var(--dark-blue);border-radius:18px}.reserveTableLabels[data-v-7aed37a2]{display:grid;grid-template-columns:1fr 1.5fr 1fr 1fr 1fr 1fr;grid-gap:18px;padding:18px;border-bottom:2px solid var(--dark-blue);text-align:center}.reserveTableRows[data-v-7aed37a2]{background:var(--light-grey);border-radius:0 0 18px 18px}.reserveTableRow[data-v-7aed37a2]{display:grid;padding:18px;grid-template-columns:1fr 1.5fr 1fr 1fr 1fr 1fr;grid-gap:18px;border-radius:18px;text-align:center}.rowCell[data-v-7aed37a2]{display:flex;justify-content:center;align-items:center}.actionButtons[data-v-7aed37a2]{width:75%;margin-left:auto;display:flex;justify-content:space-between;align-items:center}.buttonWrapper[data-v-7aed37a2]{width:100%;display:flex;justify-content:center;align-items:center;padding:18px 0}.navButtons[data-v-7aed37a2]{margin-top:18px;width:100%;display:flex;justify-content:space-between;align-items:center}.tableFooter[data-v-7aed37a2]{color:var(--dark-grey)}.allocationText[data-v-7aed37a2]{color:var(--dark-blue)}.icon[data-v-7aed37a2]{cursor:pointer}", ""]);

// exports


/***/ })
]));