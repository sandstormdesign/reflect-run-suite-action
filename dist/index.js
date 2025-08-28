/******/ var __webpack_modules__ = ({

/***/ 491:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 280:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ }),

/***/ 361:
/***/ ((module) => {

module.exports = eval("require")("js-yaml");


/***/ }),

/***/ 973:
/***/ ((__webpack_module__, __unused_webpack___webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(280);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(491);
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(361);




try {
  // Get input values
  const apiKey = _actions_core__WEBPACK_IMPORTED_MODULE_1__.getInput("api-key", { required: true });
  const suiteId = _actions_core__WEBPACK_IMPORTED_MODULE_1__.getInput("suite-id", { required: true });
  const variables = js_yaml__WEBPACK_IMPORTED_MODULE_2__.load(_actions_core__WEBPACK_IMPORTED_MODULE_1__.getInput("variables")) || {};
  const waitForCompletion = _actions_core__WEBPACK_IMPORTED_MODULE_1__.getBooleanInput("wait-for-completion") || true;

  // Reflect API client
  const api = axios__WEBPACK_IMPORTED_MODULE_0__.create({
    baseURL: "https://api.reflect.run/v1",
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  _actions_core__WEBPACK_IMPORTED_MODULE_1__.info("Scheduling the test suite for immediate execution...");

  // Schedule the test
  const response = await api.post(`suites/${suiteId}/executions`, {
    variables,
  });

  _actions_core__WEBPACK_IMPORTED_MODULE_1__.info("Running the test suite...");

  // Get the execution ID
  const { executionId } = response.data;

  if (waitForCompletion) {
    _actions_core__WEBPACK_IMPORTED_MODULE_1__.info("Waiting for test suite completion...");
  }

  // Loop until the execution is complete
  while (true) {
    // Fetch the latest execution status
    const { data: execution } = await api.get(`suites/${suiteId}/executions/${executionId}`);

    // Check if we're skipping the wait
    if (!waitForCompletion) {
      _actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput("execution", execution);
      break;
    }

    // Check if every test has been run
    if (execution.isFinished) {
      // Check for a failed test
      const failed = execution.status === "failed";

      if (failed) {
        _actions_core__WEBPACK_IMPORTED_MODULE_1__.setFailed(
          `Test suite failed. Results: https://app.reflect.run/suites/${suiteId}/executions/${executionId}`
        );
      } else {
        _actions_core__WEBPACK_IMPORTED_MODULE_1__.info("Test suite completed successfully.");
        _actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput("execution", execution);
      }

      break;
    }

    // Wait for 10 seconds before checking again
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
} catch (error) {
  _actions_core__WEBPACK_IMPORTED_MODULE_1__.setFailed(error.message);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && queue.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__nccwpck_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && queue.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(973);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 
