webpackJsonp([5],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js____default.a); 

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//

exports.default = {
  beforeMount: function beforeMount() {
    this.$store.dispatch("initSocket");
  }
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CATEGORY_TYPE = exports.CATEGORY_TYPE = 'categorical';
var NUMERIC_TYPE = exports.NUMERIC_TYPE = 'numeric';

var categoryFields = exports.categoryFields = {
  elements: [{ name: '', order: 1 }]
};
var numericFields = exports.numericFields = {
  min: 0,
  max: 0,
  binOrder: 'desc',
  coarsened: false,
  numBins: 1,
  bins: [{
    order: 1,
    min: 0,
    max: 0
  }]
};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.downloadCSV = downloadCSV;
exports.transformCriteriaForPost = transformCriteriaForPost;
exports.transformCriteriaForDisplay = transformCriteriaForDisplay;
exports.removeIds = removeIds;

var _lodash = __webpack_require__(45);

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function downloadCSV(_ref) {
  var content = _ref.content,
      fileName = _ref.fileName;

  var a = document.createElement("a");
  var mimeType = "text/csv;encoding:utf-8";

  if (navigator.msSaveBlob) {
    // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName);
  } else if (URL && "download" in a) {
    // html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }));
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
  }
}

// function generateBins({ min, max }) {
//   const diff = max - min
//   const bins = []
//   for (let i = 0; i < diff; i++) {
//     bins.push({
//       order: i + 1,
//       min: min + i,
//       max: min + 1 + i,
//     })
//   }
//   return bins
// }

function transformCriteriaForPost(priority) {
  var _priorityMap;

  if (!priority) {
    return null;
  }
  var categoryCriteria = [];
  var numericCriteria = [];

  var priorityMap = (_priorityMap = {}, _defineProperty(_priorityMap, _constants.CATEGORY_TYPE, {
    bucket: categoryCriteria,
    fields: _constants.categoryFields
  }), _defineProperty(_priorityMap, _constants.NUMERIC_TYPE, {
    bucket: numericCriteria,
    fields: _constants.numericFields
  }), _priorityMap);
  var order = 1;
  priority.forEach(function (criteria) {
    var _priorityMap$criteria = priorityMap[criteria.criteriaType],
        bucket = _priorityMap$criteria.bucket,
        fields = _priorityMap$criteria.fields;

    if (criteria.name) {
      var filteredCriteria = _extends({
        order: order
      }, (0, _lodash2.default)(criteria, ["name"].concat(_toConsumableArray(Object.keys(fields)))));
      if (criteria.criteriaType === _constants.CATEGORY_TYPE) {
        filteredCriteria.elements = filteredCriteria.elements.filter(function (_ref2) {
          var name = _ref2.name;
          return !!name;
        });
      }
      bucket.push(filteredCriteria);
      order = order + 1;
    }
  });
  return {
    categoryCriteria: categoryCriteria,
    numericCriteria: numericCriteria
  };
}

function transformCriteriaForDisplay(priority) {
  if (!priority) {
    return null;
  }
  var criterias = [];
  priority.categoryCriteria.forEach(function (crit) {
    return criterias[crit.order - 1] = _extends({}, crit, {
      criteriaType: _constants.CATEGORY_TYPE
    });
  });
  priority.numericCriteria.forEach(function (crit) {
    return criterias[crit.order - 1] = _extends({}, crit, {
      criteriaType: _constants.NUMERIC_TYPE
    });
  });
  return criterias;
}

function removeIds(obj) {
  for (var prop in obj) {
    if (["id", "configurationId", "sourceFileId", "reserveCategoryId", "priorityId"].includes(prop)) delete obj[prop];else if (_typeof(obj[prop]) === "object") removeIds(obj[prop]);
  }
}

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(33);

__webpack_require__(34);

var _app = __webpack_require__(36);

// client-specific bootstrapping logic...
var _createApp = (0, _app.createApp)(),
    app = _createApp.app,
    router = _createApp.router,
    store = _createApp.store;

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(function () {
  app.$mount("#app");
});

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vuexRouterSync = __webpack_require__(38);

var _fontawesomeSvgCore = __webpack_require__(14);

var _freeSolidSvgIcons = __webpack_require__(39);

var _vueFontawesome = __webpack_require__(40);

var _App = __webpack_require__(41);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(43);

var _store = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faTrash, _freeSolidSvgIcons.faArrowUp, _freeSolidSvgIcons.faArrowDown, _freeSolidSvgIcons.faEdit, _freeSolidSvgIcons.faInfoCircle);

// export a factory function for creating fresh app, router and store
// instances
function createApp() {
  var router = (0, _router.createRouter)();
  var store = (0, _store.createStore)();
  (0, _vuexRouterSync.sync)(store, router);
  _vue2.default.component("font-awesome-icon", _vueFontawesome.FontAwesomeIcon);

  var app = new _vue2.default({
    router: router,
    store: store,
    render: function render(h) {
      return h(_App2.default);
    }
  });
  return { app: app, router: router, store: store };
}

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_47d8372b___ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue_vue_type_script_lang_js___ = __webpack_require__(15);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__App_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__App_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(28);





/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__App_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_47d8372b___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_47d8372b___["b" /* staticRenderFns */],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js?{"compilerOptions":{"preserveWhitespace":false}}!./node_modules/vue-loader/lib?{"compilerOptions":{"preserveWhitespace":false}}!./src/App.vue?vue&type=template&id=47d8372b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=47d8372b&
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = createRouter;

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(44);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

function createRouter() {
  return new _vueRouter2.default({
    mode: "history",
    routes: [{ path: "/", component: function component() {
        return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 73));
      } }, {
      path: "/reserve-instances",
      component: function component() {
        return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 74));
      }
    }, {
      path: "/unit-definition",
      component: function component() {
        return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 75));
      }
    }, {
      path: "/specify-reserve",
      component: function component() {
        return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 76));
      }
    }]
  });
}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createStore = createStore;

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(47);

var _vuex2 = _interopRequireDefault(_vuex);

var _arrayMove = __webpack_require__(30);

var _arrayMove2 = _interopRequireDefault(_arrayMove);

var _socketIo = __webpack_require__(48);

var _socketIo2 = _interopRequireDefault(_socketIo);

var _socketConstants = __webpack_require__(71);

var _helpers = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_vue2.default.use(_vuex2.default);

var _generateDefaultCategory = function _generateDefaultCategory(size) {
  return {
    name: "Unreserved (auto-populated)",
    description: "Default reserve category",
    size: size,
    order: 1,
    priority: [],
    isDefault: true
  };
};

var initialState = {
  isSocketConnected: false,
  reserveInstances: [],
  currentConfig: {
    unitType: "",
    supply: null,
    reserveCategories: [],
    requiredFields: []
  }
};

function getBaseUrl() {
  var url = process && process.env && process.env.BASE_URL && process.env.BASE_URL !== "undefined" && _typeof(process.env.BASE_URL) !== undefined ? process.env.BASE_URL : "";
  return url;
}

function createStore() {
  return new _vuex2.default.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: function state() {
      return initialState;
    },

    actions: {
      initSocket: function initSocket(_ref) {
        var commit = _ref.commit,
            state = _ref.state;

        if (!state.isSocketConnected) {
          commit("setSocketConnected");
          _socketIo2.default.on(_socketConstants.STATUS_UPDATE, function (reserveInstances) {
            commit("setReserveInstances", reserveInstances);
          });
        }
      },
      deleteCurrentConfig: function deleteCurrentConfig(_ref2) {
        var _this = this;

        var commit = _ref2.commit,
            state = _ref2.state;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!state.currentConfig.id) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return fetch(getBaseUrl() + "/configurations/" + state.currentConfig.id, {
                    method: "DELETE"
                  });

                case 3:
                  commit("deleteConfigIds");

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      },
      getReserveInstances: function getReserveInstances(_ref3) {
        var _this2 = this;

        var commit = _ref3.commit,
            state = _ref3.state;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var sourceFilesRes;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return fetch(getBaseUrl() + "/sourceFiles");

                case 2:
                  sourceFilesRes = _context2.sent;
                  _context2.t0 = commit;
                  _context2.next = 6;
                  return sourceFilesRes.json();

                case 6:
                  _context2.t1 = _context2.sent;
                  (0, _context2.t0)("setReserveInstances", _context2.t1);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      },
      processSourceFile: function processSourceFile(_ref4, sourceFileId) {
        var _this3 = this;

        var commit = _ref4.commit;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var sourceFilesRes;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return fetch(getBaseUrl() + "/sourceFiles/" + sourceFileId + "/process", {
                    method: "POST"
                  });

                case 2:
                  _context3.next = 4;
                  return fetch(getBaseUrl() + "/sourceFiles");

                case 4:
                  sourceFilesRes = _context3.sent;
                  _context3.t0 = commit;
                  _context3.next = 8;
                  return sourceFilesRes.json();

                case 8:
                  _context3.t1 = _context3.sent;
                  (0, _context3.t0)("setReserveInstances", _context3.t1);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }))();
      },
      postConfig: function postConfig(_ref5) {
        var _this4 = this;

        var commit = _ref5.commit,
            state = _ref5.state,
            props = _objectWithoutProperties(_ref5, ["commit", "state"]);

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var configPayload, configRes, config, requiredFieldsRes, requiredFields;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  configPayload = {
                    unitType: state.currentConfig.unitType,
                    supply: state.currentConfig.supply,
                    reserveCategories: state.currentConfig.reserveCategories.reduce(function (acc, category) {
                      var formattedCategory = _extends({}, category, {
                        priority: (0, _helpers.transformCriteriaForPost)(category.priority)
                      });
                      acc.push(formattedCategory);
                      return acc;
                    }, [])
                  };
                  _context4.next = 3;
                  return fetch(getBaseUrl() + "/configurations", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json"
                    },
                    body: JSON.stringify(configPayload)
                  });

                case 3:
                  configRes = _context4.sent;
                  _context4.next = 6;
                  return configRes.json();

                case 6:
                  config = _context4.sent;

                  commit("setConfig", _extends({}, config, {
                    reserveCategories: config.reserveCategories.reduce(function (acc, category) {
                      var formattedCategory = _extends({}, category, {
                        priority: (0, _helpers.transformCriteriaForDisplay)(category.priority)
                      });
                      acc.push(formattedCategory);
                      return acc;
                    }, [])
                  }));
                  _context4.next = 10;
                  return fetch(getBaseUrl() + "/configurations/" + config.id + "/fieldNames");

                case 10:
                  requiredFieldsRes = _context4.sent;
                  _context4.next = 13;
                  return requiredFieldsRes.json();

                case 13:
                  requiredFields = _context4.sent;

                  commit("setRequiredFields", requiredFields);
                  _this4.app.router.push("/finish");

                case 16:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, _this4);
        }))();
      }
    },

    mutations: {
      resetConfig: function resetConfig(state, list) {
        state = initialState;
      },
      setConfig: function setConfig(state, config) {
        state.currentConfig = config;
      },
      setRequiredFields: function setRequiredFields(state, requiredFields) {
        state.currentConfig.requiredFields = requiredFields;
      },
      updateUnitType: function updateUnitType(state, unitType) {
        state.currentConfig.unitType = unitType;
      },
      updateSupply: function updateSupply(state, supply) {
        state.currentConfig.supply = supply;
      },
      generateDefaultCategory: function generateDefaultCategory(state) {
        var defaultCategoryIndex = state.currentConfig.reserveCategories.findIndex(function (el) {
          return el.isDefault;
        });
        if (defaultCategoryIndex >= 0) {
          state.currentConfig.reserveCategories[defaultCategoryIndex] = _extends({}, _generateDefaultCategory(state.currentConfig.supply), {
            order: defaultCategoryIndex + 1
          });
        } else {
          state.currentConfig.reserveCategories = [_generateDefaultCategory(state.currentConfig.supply)].concat(_toConsumableArray(state.currentConfig.reserveCategories));
        }
      },
      saveCategory: function saveCategory(state, category) {
        if (category.name) {
          category.name = (category.name || "").toLowerCase().replace(/ /g, "_");
        }
        if (category.priority) {
          category.priority = category.priority.map(function (criteria) {
            return _extends({}, criteria, {
              name: (criteria.name || "").toLowerCase().replace(/ /g, "_") // Sofa Score -> sofa_score
            });
          });
        }
        if (category.order) {
          state.currentConfig.reserveCategories[category.order - 1] = category;
        } else {
          var order = state.currentConfig.reserveCategories.length + 1;
          state.currentConfig.reserveCategories.push(_extends({}, category, { order: order }));
        }
        var defaultCategory = state.currentConfig.reserveCategories.find(function (el) {
          return el.isDefault;
        });
        if (defaultCategory) {
          var nonDefaultCategoriesAllocation = state.currentConfig.reserveCategories.filter(function (cat) {
            return !cat.isDefault;
          }).reduce(function (acc, cat) {
            return acc + parseInt(cat.size);
          }, 0);
          defaultCategory.size = state.currentConfig.supply - nonDefaultCategoriesAllocation;
        }
      },
      moveCategory: function moveCategory(state, _ref6) {
        var category = _ref6.category,
            direction = _ref6.direction;

        var newIndex = void 0;
        if (direction === "down") {
          newIndex = category.order === state.currentConfig.reserveCategories.length ? 0 : category.order;
        } else if (direction === "up") {
          newIndex = category.order === 1 ? state.currentConfig.reserveCategories.length - 1 : category.order - 2;
        }
        var movedCategories = (0, _arrayMove2.default)(state.currentConfig.reserveCategories, category.order - 1, newIndex);
        movedCategories.forEach(function (category, index) {
          category.order = index + 1;
        });
        state.currentConfig.reserveCategories = movedCategories;
      },
      deleteCategory: function deleteCategory(state, category) {},
      addReserveInstance: function addReserveInstance(state, reserveInstance) {
        state.reserveInstances = [].concat(_toConsumableArray(state.reserveInstances || []), [reserveInstance]);
      },
      setReserveInstances: function setReserveInstances(state, reserveInstances) {
        state.reserveInstances = reserveInstances;
      },
      setSocketConnected: function setSocketConnected(state) {
        if (!state.isSocketConnected) {
          state.isSocketConnected = true;
        }
      },
      deleteConfigIds: function deleteConfigIds(state) {
        (0, _helpers.removeIds)(state);
      }
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = __webpack_require__(49);

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = (0, _socket2.default)("/connection/client");

exports.default = socket;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(72),
    EventEmitter = _require.EventEmitter;

var SocketEmitter = function (_EventEmitter) {
  _inherits(SocketEmitter, _EventEmitter);

  function SocketEmitter() {
    _classCallCheck(this, SocketEmitter);

    return _possibleConstructorReturn(this, (SocketEmitter.__proto__ || Object.getPrototypeOf(SocketEmitter)).apply(this, arguments));
  }

  return SocketEmitter;
}(EventEmitter);

var emitter = new SocketEmitter();
module.exports = {
  STATUS_UPDATE: "STATUS_UPDATE",
  emitter: emitter
};

/***/ })

},[32]);