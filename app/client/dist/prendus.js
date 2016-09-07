
            window.addEventListener('WebComponentsReady', function() {
                !function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register('29', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, CodeEditorComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            CodeEditorComponent = function () {
                function CodeEditorComponent() {
                    _classCallCheck(this, CodeEditorComponent);
                }

                _createClass(CodeEditorComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'solutia-maxima-code-editor';
                        this.properties = {
                            originalCode: {
                                type: String,
                                observer: 'setText'
                            },
                            placeholder: {
                                type: String,
                                observer: 'placeholderSet'
                            }
                        };
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.initEditor();
                    }
                }, {
                    key: 'initEditor',
                    value: function initEditor() {
                        var _this = this;

                        var codeMirrorTextarea = this.$.smCodeMirrorTextarea;
                        this.codeMirrorInstance = CodeMirror.fromTextArea(codeMirrorTextarea, {
                            mode: 'javascript',
                            lineNumbers: true,
                            gutters: ['CodeMirror-lint-markers'],
                            lint: true,
                            indentUnit: 4,
                            tabSize: 4,
                            indentWithTabs: true
                        });
                        this.codeMirrorInstance.setSize('auto', '400px');
                        setTimeout(function () {
                            _this.codeMirrorInstance.refresh();
                        });
                    }
                }, {
                    key: 'placeholderSet',
                    value: function placeholderSet(newValue, oldValue) {
                        this.codeMirrorInstance.setOption('placeholder', newValue);
                    }
                }, {
                    key: 'setText',
                    value: function setText(newValue, oldValue) {
                        var _this2 = this;

                        this.codeMirrorInstance.setValue(newValue);
                        setTimeout(function () {
                            _this2.codeMirrorInstance.refresh();
                        });
                    }
                }, {
                    key: 'getText',
                    value: function getText() {
                        return this.codeMirrorInstance.getValue();
                    }
                }]);

                return CodeEditorComponent;
            }();

            Polymer(CodeEditorComponent);
        }
    };
});
$__System.register('2c', ['2d', '2e', '2f'], function (_export, _context12) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, save, update, removeById, getById, getAllIdsBy, getAllIdsByUid, getAllIdsByVisibility, resolveQuestionIds, QuestionModel;

    return {
        setters: [function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'questions';

            save = function save(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                    var user, dataWithUid, path, timestampEnabledData, _path;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return FirebaseService.getLoggedInUser();

                                case 3:
                                    user = _context.sent;
                                    dataWithUid = Object.assign({}, data, {
                                        uid: user.uid
                                    });

                                    if (!id) {
                                        _context.next = 12;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 9;
                                    return FirebaseService.set(path, dataWithUid);

                                case 9:
                                    return _context.abrupt('return', id);

                                case 12:
                                    timestampEnabledData = Object.assign({}, dataWithUid, {
                                        timestamp: window.firebase.database.ServerValue.TIMESTAMP
                                    });
                                    _path = dataPath;
                                    _context.next = 16;
                                    return FirebaseService.push(_path, timestampEnabledData);

                                case 16:
                                    return _context.abrupt('return', _context.sent);

                                case 17:
                                    _context.next = 22;
                                    break;

                                case 19:
                                    _context.prev = 19;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 22:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 19]]);
                }));
            };

            update = function update(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context2.next = 4;
                                    return FirebaseService.update(path, data);

                                case 4:
                                    _context2.next = 9;
                                    break;

                                case 6:
                                    _context2.prev = 6;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 9:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 6]]);
                }));
            };

            removeById = function removeById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return FirebaseService.remove(dataPath + '/' + id);

                                case 3:
                                    _context3.next = 8;
                                    break;

                                case 5:
                                    _context3.prev = 5;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 8:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 5]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
                    var path, question;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context4.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    question = _context4.sent;

                                    question.id = id;
                                    return _context4.abrupt('return', question);

                                case 9:
                                    _context4.prev = 9;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 12:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 9]]);
                }));
            };

            getAllIdsBy = function getAllIdsBy(fieldName, fieldValue) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    return _context6.delegateYield(_regeneratorRuntime.mark(function _callee5() {
                                        var path, questionsObject, questionsArray, noPreviewQuestionsArray, noPreviewsQuestionsKeys;
                                        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        path = '' + dataPath;
                                                        _context5.next = 3;
                                                        return FirebaseService.getAllBy(path, fieldName, fieldValue);

                                                    case 3:
                                                        questionsObject = _context5.sent;
                                                        questionsArray = Object.keys(questionsObject || {}).map(function (key) {
                                                            return Object.assign({}, questionsObject[key], {
                                                                id: key
                                                            });
                                                        });
                                                        noPreviewQuestionsArray = questionsArray.filter(function (element) {
                                                            return element.previewQuestionId;
                                                        });
                                                        noPreviewsQuestionsKeys = noPreviewQuestionsArray.map(function (element) {
                                                            return element.id;
                                                        });
                                                        return _context5.abrupt('return', {
                                                            v: noPreviewsQuestionsKeys
                                                        });

                                                    case 8:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context6.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context6.next = 5;
                                        break;
                                    }

                                    return _context6.abrupt('return', _ret.v);

                                case 5:
                                    _context6.next = 10;
                                    break;

                                case 7:
                                    _context6.prev = 7;
                                    _context6.t1 = _context6['catch'](0);
                                    throw _context6.t1;

                                case 10:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 7]]);
                }));
            };

            getAllIdsByUid = function getAllIdsByUid(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    _context7.next = 3;
                                    return getAllIdsBy('uid', uid);

                                case 3:
                                    return _context7.abrupt('return', _context7.sent);

                                case 6:
                                    _context7.prev = 6;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 9:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 6]]);
                }));
            };

            getAllIdsByVisibility = function getAllIdsByVisibility(visibility) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return getAllIdsBy('visibility', visibility);

                                case 3:
                                    return _context8.abrupt('return', _context8.sent);

                                case 6:
                                    _context8.prev = 6;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 9:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 6]]);
                }));
            };

            resolveQuestionIds = function resolveQuestionIds(questionIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var _this3 = this;

                    var _ret2;

                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    return _context11.delegateYield(_regeneratorRuntime.mark(function _callee10() {
                                        var asyncReduce = function asyncReduce(questionIds, questions) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                                                var questionId, question;
                                                return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                                    while (1) {
                                                        switch (_context9.prev = _context9.next) {
                                                            case 0:
                                                                if (!(questionIds.length === 0)) {
                                                                    _context9.next = 2;
                                                                    break;
                                                                }

                                                                return _context9.abrupt('return', questions);

                                                            case 2:
                                                                questionId = questionIds[0];
                                                                _context9.next = 5;
                                                                return getById(questionId);

                                                            case 5:
                                                                question = _context9.sent;

                                                                question.id = questionId;
                                                                return _context9.abrupt('return', asyncReduce(questionIds.slice(1), [].concat(_toConsumableArray(questions), [question])));

                                                            case 8:
                                                            case 'end':
                                                                return _context9.stop();
                                                        }
                                                    }
                                                }, _callee9, this);
                                            }));
                                        };

                                        var questions;
                                        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                                            while (1) {
                                                switch (_context10.prev = _context10.next) {
                                                    case 0:
                                                        _context10.next = 2;
                                                        return asyncReduce(questionIds, []);

                                                    case 2:
                                                        questions = _context10.sent;
                                                        return _context10.abrupt('return', {
                                                            v: questions
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context10.stop();
                                                }
                                            }
                                        }, _callee10, _this3);
                                    })(), 't0', 2);

                                case 2:
                                    _ret2 = _context11.t0;

                                    if (!(typeof _ret2 === "object")) {
                                        _context11.next = 5;
                                        break;
                                    }

                                    return _context11.abrupt('return', _ret2.v);

                                case 5:
                                    _context11.next = 10;
                                    break;

                                case 7:
                                    _context11.prev = 7;
                                    _context11.t1 = _context11['catch'](0);
                                    throw _context11.t1;

                                case 10:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 7]]);
                }));
            };

            _export('QuestionModel', QuestionModel = {
                save: save,
                getById: getById,
                removeById: removeById,
                update: update,
                getAllIdsByUid: getAllIdsByUid,
                getAllIdsByVisibility: getAllIdsByVisibility,
                resolveQuestionIds: resolveQuestionIds
            });

            _export('QuestionModel', QuestionModel);
        }
    };
});
$__System.register('30', ['2e', '2c'], function (_export, _context5) {
    "use strict";

    var _regeneratorRuntime, QuestionModel, _this, __awaiter, reset, initialLoadQuestion, saveQuestion, savePreviewQuestion, Actions;

    function getQuestionInfo(context) {
        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
            var request, questionInfo;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            request = context.$.getQuestionAjax.generateRequest();
                            _context4.next = 4;
                            return request.completes;

                        case 4:
                            questionInfo = request.response.questionInfo;
                            return _context4.abrupt('return', questionInfo);

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4['catch'](0);
                            throw _context4.t0;

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[0, 8]]);
        }));
    }
    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_c) {
            QuestionModel = _c.QuestionModel;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            reset = function reset(context) {
                context.action = {
                    type: 'RESET'
                };
            };

            initialLoadQuestion = function initialLoadQuestion(context, questionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var questionInfo, text, code, previewQuestionId;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    context.action = {
                                        type: 'SET_QUESTION_ID',
                                        questionId: questionId
                                    };
                                    _context.next = 4;
                                    return getQuestionInfo(context);

                                case 4:
                                    questionInfo = _context.sent;
                                    text = questionInfo.text;
                                    code = questionInfo.code;
                                    previewQuestionId = questionInfo.previewQuestionId;

                                    context.originalText = text;
                                    context.originalCode = code;
                                    context.action = {
                                        type: 'INITIAL_LOAD_QUESTION',
                                        previewQuestionId: previewQuestionId,
                                        visibility: questionInfo.visibility
                                    };
                                    _context.next = 16;
                                    break;

                                case 13:
                                    _context.prev = 13;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 16:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 13]]);
                }));
            };

            saveQuestion = function saveQuestion(context, questionId, question) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var id;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return QuestionModel.save(questionId, question);

                                case 3:
                                    id = _context2.sent;

                                    context.action = {
                                        type: 'SET_QUESTION_ID',
                                        questionId: id
                                    };
                                    _context2.next = 10;
                                    break;

                                case 7:
                                    _context2.prev = 7;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 7]]);
                }));
            };

            savePreviewQuestion = function savePreviewQuestion(context, questionId, question) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                    var id;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return QuestionModel.save(questionId, question);

                                case 3:
                                    id = _context3.sent;

                                    context.action = {
                                        type: 'SET_PREVIEW_QUESTION_ID',
                                        previewQuestionId: id
                                    };
                                    _context3.next = 10;
                                    break;

                                case 7:
                                    _context3.prev = 7;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 10:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 7]]);
                }));
            };

            _export('Actions', Actions = {
                initialLoadQuestion: initialLoadQuestion,
                saveQuestion: saveQuestion,
                savePreviewQuestion: savePreviewQuestion,
                reset: reset
            });

            _export('Actions', Actions);
        }
    };
});
$__System.register('31', [], function (_export, _context) {
    "use strict";

    var InitialState;
    return {
        setters: [],
        execute: function () {
            _export('InitialState', InitialState = {
                visibility: 'public',
                questionId: '',
                previewQuestionId: '',
                initialLoad: false
            });

            _export('InitialState', InitialState);
        }
    };
});
$__System.register('32', ['31'], function (_export, _context) {
    "use strict";

    var InitialState, RootReducer;
    return {
        setters: [function (_) {
            InitialState = _.InitialState;
        }],
        execute: function () {
            _export('RootReducer', RootReducer = function RootReducer() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? InitialState : arguments[0];
                var action = arguments[1];

                switch (action.type) {
                    case 'INITIAL_LOAD_QUESTION':
                        {
                            var newState = Object.assign({}, state);
                            newState.visibility = action.visibility;
                            newState.previewQuestionId = action.previewQuestionId;
                            newState.initialLoad = true;
                            return newState;
                        }
                    case 'SET_QUESTION_ID':
                        {
                            var _newState = Object.assign({}, state);
                            _newState.questionId = action.questionId;
                            _newState.initialLoad = true;
                            return _newState;
                        }
                    case 'SET_PREVIEW_QUESTION_ID':
                        {
                            var _newState2 = Object.assign({}, state);
                            _newState2.previewQuestionId = action.previewQuestionId;
                            _newState2.initialLoad = true;
                            return _newState2;
                        }
                    case 'RESET':
                        {
                            return InitialState;
                        }
                    default:
                        {
                            return state;
                        }
                }
            });

            _export('RootReducer', RootReducer);
        }
    };
});
$__System.register('28', ['30', '32', '33', '2e', '2a', '2b'], function (_export, _context6) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, RootReducer, UtilitiesService, __awaiter, EditProblemComponent;

    return {
        setters: [function (_) {
            Actions = _.Actions;
        }, function (_2) {
            RootReducer = _2.RootReducer;
        }, function (_3) {
            UtilitiesService = _3.UtilitiesService;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            _export('EditProblemComponent', EditProblemComponent = function () {
                function EditProblemComponent() {
                    _classCallCheck(this, EditProblemComponent);
                }

                _createClass(EditProblemComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'solutia-maxima-edit-problem';
                        this.properties = {
                            questionId: {
                                type: String
                            },
                            jwt: {
                                type: String
                            }
                        };
                        this.observers = ['init(questionId, jwt)'];
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.$.toast.fitInto = this;
                                            this.rootReducer = RootReducer;
                                            this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                            this.textPlaceholderText = 'Write the text of your question here. If you need help, click the help button in the top right corner.';
                                            this.codePlaceholderText = 'Code the answer to your question here. If you need help, click the help button in the top right corner.';

                                        case 5:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (!(this.questionId && this.jwt)) {
                                                _context2.next = 14;
                                                break;
                                            }

                                            if (this.initialLoad) {
                                                _context2.next = 12;
                                                break;
                                            }

                                            _context2.prev = 2;
                                            _context2.next = 5;
                                            return Actions.initialLoadQuestion(this, this.questionId);

                                        case 5:
                                            this.fire('loaded', {}, {
                                                bubbles: false
                                            });
                                            _context2.next = 12;
                                            break;

                                        case 8:
                                            _context2.prev = 8;
                                            _context2.t0 = _context2['catch'](2);

                                            this.toastMessage = _context2.t0.errorMessage || _context2.t0.toString();
                                            this.$.toast.open();

                                        case 12:
                                            _context2.next = 25;
                                            break;

                                        case 14:
                                            if (!(!this.questionId && this.jwt)) {
                                                _context2.next = 25;
                                                break;
                                            }

                                            _context2.prev = 15;
                                            _context2.next = 18;
                                            return Actions.reset(this);

                                        case 18:
                                            this.fire('loaded', {}, {
                                                bubbles: false
                                            });
                                            _context2.next = 25;
                                            break;

                                        case 21:
                                            _context2.prev = 21;
                                            _context2.t1 = _context2['catch'](15);

                                            this.toastMessage = _context2.t1.errorMessage || _context2.t1.toString();
                                            this.$.toast.open();

                                        case 25:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[2, 8], [15, 21]]);
                        }));
                    }
                }, {
                    key: 'saveQuestion',
                    value: function saveQuestion() {
                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                            var text, code;
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;
                                            text = this.$.textEditor.getText();
                                            code = this.$.codeEditor.getText();
                                            _context3.next = 5;
                                            return Actions.savePreviewQuestion(this, this.previewQuestionId, {
                                                id: this.previewQuestionId || null,
                                                uid: null,
                                                previewQuestionId: null,
                                                text: text,
                                                code: code,
                                                visibility: this.visibility || 'public'
                                            });

                                        case 5:
                                            _context3.next = 7;
                                            return Actions.saveQuestion(this, this.questionId, {
                                                id: this.questionId || null,
                                                uid: null,
                                                text: text,
                                                code: code,
                                                previewQuestionId: this.previewQuestionId || null,
                                                visibility: this.visibility || 'public'
                                            });

                                        case 7:
                                            this.fire('savequestion', {}, {
                                                bubbles: false
                                            });
                                            _context3.next = 14;
                                            break;

                                        case 10:
                                            _context3.prev = 10;
                                            _context3.t0 = _context3['catch'](0);

                                            this.toastMessage = _context3.t0.errorMessage || _context3.t0.toString();
                                            this.$.toast.open();

                                        case 14:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this, [[0, 10]]);
                        }));
                    }
                }, {
                    key: 'helpTapped',
                    value: function helpTapped() {
                        this.querySelector('#helpModal').open();
                    }
                }, {
                    key: 'previewQuestion',
                    value: function previewQuestion() {
                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee5() {
                            var text, code, hideQuestionText, openModal, saveQuestionIfNotSaved, showQuestionText, positionModalCorrectly;
                            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            positionModalCorrectly = function positionModalCorrectly(context) {
                                                context.$.previewModal.refit();
                                            };

                                            showQuestionText = function showQuestionText(context) {
                                                context.$.viewPreviewQuestion.hideRenderMath = false;
                                            };

                                            saveQuestionIfNotSaved = function saveQuestionIfNotSaved(context, questionId, question) {
                                                return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                                                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                        while (1) {
                                                            switch (_context4.prev = _context4.next) {
                                                                case 0:
                                                                    if (questionId) {
                                                                        _context4.next = 9;
                                                                        break;
                                                                    }

                                                                    _context4.prev = 1;
                                                                    _context4.next = 4;
                                                                    return Actions.saveQuestion(context, questionId, question);

                                                                case 4:
                                                                    _context4.next = 9;
                                                                    break;

                                                                case 6:
                                                                    _context4.prev = 6;
                                                                    _context4.t0 = _context4['catch'](1);
                                                                    throw _context4.t0;

                                                                case 9:
                                                                case 'end':
                                                                    return _context4.stop();
                                                            }
                                                        }
                                                    }, _callee4, this, [[1, 6]]);
                                                }));
                                            };

                                            openModal = function openModal(context) {
                                                context.$.previewModal.open();
                                            };

                                            hideQuestionText = function hideQuestionText(context) {
                                                context.$.viewPreviewQuestion.hideRenderMath = true;
                                            };

                                            _context5.prev = 5;

                                            hideQuestionText(this);
                                            openModal(this);
                                            text = this.$.textEditor.getText();
                                            code = this.$.codeEditor.getText();
                                            _context5.next = 12;
                                            return saveQuestionIfNotSaved(this, this.questionId, {
                                                id: this.questionId || null,
                                                uid: null,
                                                text: text,
                                                code: code,
                                                previewQuestionId: this.previewQuestionId || null,
                                                visibility: this.visibility || 'public'
                                            });

                                        case 12:
                                            _context5.next = 14;
                                            return Actions.savePreviewQuestion(this, this.previewQuestionId, {
                                                id: this.previewQuestionId || null,
                                                uid: null,
                                                previewQuestionId: null,
                                                text: text,
                                                code: code,
                                                visibility: this.visibility || 'public'
                                            });

                                        case 14:
                                            _context5.next = 16;
                                            return this.$.viewPreviewQuestion.loadNextProblem();

                                        case 16:
                                            showQuestionText(this);
                                            positionModalCorrectly(this);
                                            _context5.next = 24;
                                            break;

                                        case 20:
                                            _context5.prev = 20;
                                            _context5.t0 = _context5['catch'](5);

                                            this.toastMessage = _context5.t0.errorMessage || _context5.t0.toString();
                                            this.$.toast.open();

                                        case 24:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, this, [[5, 20]]);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.initialLoad = state.initialLoad;
                        this.visibility = state.visibility;
                        this.questionId = state.questionId;
                        this.previewQuestionId = state.previewQuestionId;
                    }
                }]);

                return EditProblemComponent;
            }());

            _export('EditProblemComponent', EditProblemComponent);

            Polymer(EditProblemComponent);
        }
    };
});
$__System.register('27', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, HelpComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            HelpComponent = function () {
                function HelpComponent() {
                    _classCallCheck(this, HelpComponent);
                }

                _createClass(HelpComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'solutia-maxima-help';
                    }
                }]);

                return HelpComponent;
            }();

            Polymer(HelpComponent);
        }
    };
});
$__System.register('26', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, RenderMathComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            RenderMathComponent = function () {
                function RenderMathComponent() {
                    _classCallCheck(this, RenderMathComponent);
                }

                _createClass(RenderMathComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'solutia-maxima-render-math';
                        this.properties = {
                            text: {
                                type: String,
                                observer: 'textSet'
                            }
                        };
                    }
                }, {
                    key: 'ready',
                    value: function ready() {}
                }, {
                    key: 'attached',
                    value: function attached() {}
                }, {
                    key: 'detached',
                    value: function detached() {}
                }, {
                    key: 'attributeChanged',
                    value: function attributeChanged() {}
                }, {
                    key: 'textSet',
                    value: function textSet(newValue, oldValue) {
                        var _this = this;

                        this.fireRenderingBegun();
                        this.$.mathDiv.innerHTML = newValue;
                        MathJax.Hub.Queue(function () {
                            MathJax.Hub.Typeset(null, function () {
                                _this.fireRenderingComplete();
                            });
                        });
                    }
                }, {
                    key: 'fireRenderingBegun',
                    value: function fireRenderingBegun() {
                        this.fire('renderingbegun', {}, {
                            bubbles: false
                        });
                    }
                }, {
                    key: 'fireRenderingComplete',
                    value: function fireRenderingComplete() {
                        this.fire('renderingcomplete', {}, {
                            bubbles: false
                        });
                    }
                }]);

                return RenderMathComponent;
            }();

            Polymer(RenderMathComponent);
        }
    };
});
$__System.register('25', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, TextEditorComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            TextEditorComponent = function () {
                function TextEditorComponent() {
                    _classCallCheck(this, TextEditorComponent);
                }

                _createClass(TextEditorComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'solutia-maxima-text-editor';
                        this.properties = {
                            originalText: {
                                type: String,
                                observer: 'setText'
                            },
                            placeholder: {
                                type: String,
                                observer: 'placeholderSet'
                            }
                        };
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.initEditor();
                    }
                }, {
                    key: 'initEditor',
                    value: function initEditor() {
                        this.editor = new Quill(this.querySelector('#editor'), {
                            modules: {
                                toolbar: this.querySelector('#toolbar')
                            },
                            theme: 'snow'
                        });
                    }
                }, {
                    key: 'placeholderSet',
                    value: function placeholderSet(newValue, oldValue) {
                        this.editor.root.dataset.placeholder = newValue;
                    }
                }, {
                    key: 'setText',
                    value: function setText(newValue, oldValue) {
                        this.editor.pasteHTML(newValue);
                    }
                }, {
                    key: 'getText',
                    value: function getText() {
                        return this.querySelector('.ql-editor').innerHTML;
                    }
                }]);

                return TextEditorComponent;
            }();

            Polymer(TextEditorComponent);
        }
    };
});
$__System.register('24', ['33', '2e', '2a', '2b'], function (_export, _context6) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, UtilitiesService, __awaiter;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            (function () {
                var ViewProblemComponent = function () {
                    function ViewProblemComponent() {
                        _classCallCheck(this, ViewProblemComponent);

                        this.confidenceLevel = '';
                    }

                    _createClass(ViewProblemComponent, [{
                        key: 'beforeRegister',
                        value: function beforeRegister() {
                            this.is = 'solutia-maxima-view-problem';
                            this.properties = {
                                questionId: {
                                    type: String
                                },
                                quizSessionId: {
                                    type: String
                                },
                                jwt: {
                                    type: String
                                },
                                concise: {
                                    type: Boolean,
                                    value: false
                                },
                                userFullName: {
                                    type: String,
                                    value: ''
                                },
                                userEmail: {
                                    type: String,
                                    value: ''
                                },
                                courseId: {
                                    type: String,
                                    value: ''
                                }
                            };
                            this.observers = ['loadNextProblem(questionId, quizSessionId, jwt)'];
                        }
                    }, {
                        key: 'ready',
                        value: function ready() {
                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                this.$.toast.fitInto = this;

                                            case 1:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this);
                            }));
                        }
                    }, {
                        key: 'checkAnswer',
                        value: function checkAnswer() {
                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                                var answerInputValue, userInputsAnswers, userCheckboxesAnswers, userRadiosAnswers, userAnswerInfo, checkAnswerXAPIInfo, checkAnswerAjax;
                                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                answerInputValue = this.$$('#answerInput').value || '';
                                                userInputsAnswers = getUserInputsAnswers(this, this.userInputs);
                                                userCheckboxesAnswers = getUserCheckboxesAnswers(this, this.userCheckboxes);
                                                userRadiosAnswers = getUserRadiosAnswers(this, this.userRadios);
                                                userAnswerInfo = {
                                                    answerInputValue: answerInputValue,
                                                    userInputsAnswers: userInputsAnswers,
                                                    userCheckboxesAnswers: userCheckboxesAnswers,
                                                    userRadiosAnswers: userRadiosAnswers,
                                                    confidenceLevel: this.confidenceLevel
                                                };
                                                checkAnswerXAPIInfo = {
                                                    transformedText: this.problemText,
                                                    userFullName: this.userFullName,
                                                    userEmail: this.userEmail,
                                                    courseId: this.courseId,
                                                    baseUri: window.location.origin,
                                                    fullUrl: window.location.origin + window.location.pathname
                                                };
                                                checkAnswerAjax = prepareForRequest(this.$.checkAnswerAjax, this.questionSessionId, this.quizSessionId, this.jwt, userAnswerInfo, checkAnswerXAPIInfo);
                                                _context2.next = 9;
                                                return makeRequest(this, checkAnswerAjax);

                                            case 9:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this);
                            }));
                        }
                    }, {
                        key: 'loadNextProblem',
                        value: function loadNextProblem() {
                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
                                var answerInput, questionInfo, setQuestionInfo, getQuestionInfo, clearAnswerInput, attachMultipleInputEventListeners, attachRadioEventListeners, attachCheckboxEventListeners;
                                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                attachCheckboxEventListeners = function attachCheckboxEventListeners(context, userCheckboxes, questionSessionId) {
                                                    userCheckboxes.forEach(function (element) {
                                                        var checkboxElement = document.getElementById(element + questionSessionId);
                                                        checkboxElement.addEventListener('change', function (e) {
                                                            context.fire('checkboxchanged', {
                                                                questionId: context.questionId,
                                                                checkboxName: element,
                                                                checked: checkboxElement.checked
                                                            }, {
                                                                bubbles: false
                                                            });
                                                        });
                                                    });
                                                };

                                                attachRadioEventListeners = function attachRadioEventListeners(context, userRadios, questionSessionId) {
                                                    userRadios.forEach(function (element) {
                                                        var radioElement = document.getElementById(element + questionSessionId);
                                                        radioElement.addEventListener('change', function (e) {
                                                            context.fire('radioselected', {
                                                                questionId: context.questionId,
                                                                radioName: element
                                                            }, {
                                                                bubbles: false
                                                            });
                                                        });
                                                    });
                                                };

                                                attachMultipleInputEventListeners = function attachMultipleInputEventListeners(context, userInputs, questionSessionId) {
                                                    userInputs.forEach(function (element) {
                                                        var inputElement = document.getElementById(element + questionSessionId);
                                                        inputElement.addEventListener('input', function (e) {
                                                            context.debounce('multipleinputtyped', function () {
                                                                context.fire('multipleinputtyped', {
                                                                    questionId: context.questionId,
                                                                    inputName: element,
                                                                    inputTyped: inputElement.innerHTML
                                                                }, {
                                                                    bubbles: false
                                                                });
                                                            }, 2000);
                                                        });
                                                    });
                                                };

                                                clearAnswerInput = function clearAnswerInput(answerInput) {
                                                    answerInput && (answerInput.value = '');
                                                };

                                                getQuestionInfo = function getQuestionInfo(context) {
                                                    return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                                                        var request, _questionInfo;

                                                        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                            while (1) {
                                                                switch (_context3.prev = _context3.next) {
                                                                    case 0:
                                                                        request = context.$.getProblemAjax.generateRequest();
                                                                        _context3.prev = 1;
                                                                        _context3.next = 4;
                                                                        return request.completes;

                                                                    case 4:
                                                                        _questionInfo = request.response.questionInfo;
                                                                        return _context3.abrupt('return', _questionInfo);

                                                                    case 8:
                                                                        _context3.prev = 8;
                                                                        _context3.t0 = _context3['catch'](1);

                                                                        if (request.parseResponse()) {
                                                                            context.toastMessage = request.parseResponse().errorMessage;
                                                                        } else {
                                                                            context.toastMessage = _context3.t0.errorMessage || _context3.t0.toString();
                                                                        }
                                                                        context.$.toast.open();

                                                                    case 12:
                                                                    case 'end':
                                                                        return _context3.stop();
                                                                }
                                                            }
                                                        }, _callee3, this, [[1, 8]]);
                                                    }));
                                                };

                                                setQuestionInfo = function setQuestionInfo(context, questionInfo) {
                                                    context.questionSessionId = questionInfo.questionSessionId;
                                                    context.problemText = questionInfo.transformedText;
                                                    context.problemUid = questionInfo.uid;
                                                    context.userInputs = questionInfo.userInputs;
                                                    context.userCheckboxes = questionInfo.userCheckboxes;
                                                    context.userRadios = questionInfo.userRadios;
                                                    context.hint = questionInfo.hint;
                                                    context.answer = questionInfo.answer;
                                                    context.showConfidenceLevel = questionInfo.showConfidenceLevel;
                                                    context.showCheckAnswer = questionInfo.showCheckAnswer;
                                                    context.showQuestionGenerationButtons = questionInfo.showQuestionGenerationButtons;
                                                };

                                                if (!this.endpointDomain) {
                                                    this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                                }

                                                if (!(this.questionId && this.quizSessionId && this.jwt)) {
                                                    _context4.next = 18;
                                                    break;
                                                }

                                                answerInput = this.$$('#answerInput');

                                                clearAnswerInput(answerInput);
                                                this.confidenceLevel = '';
                                                _context4.next = 13;
                                                return getQuestionInfo(this);

                                            case 13:
                                                questionInfo = _context4.sent;

                                                setQuestionInfo(this, questionInfo);
                                                attachCheckboxEventListeners(this, this.userCheckboxes, this.questionSessionId);
                                                attachRadioEventListeners(this, this.userRadios, this.questionSessionId);
                                                attachMultipleInputEventListeners(this, this.userInputs, this.questionSessionId);

                                            case 18:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, this);
                            }));
                        }
                    }, {
                        key: 'checkboxChanged',
                        value: function checkboxChanged(e) {
                            console.log(e);
                        }
                    }, {
                        key: 'answerTyped',
                        value: function answerTyped() {
                            var _this = this;

                            this.debounce('answertyped', function () {
                                _this.fire('answertyped', {
                                    questionId: _this.questionId,
                                    answerTyped: _this.querySelector('#answerInput').value
                                }, {
                                    bubbles: false
                                });
                            }, 2000);
                        }
                    }, {
                        key: 'showHint',
                        value: function showHint() {
                            this.fire('showhint', {
                                questionId: this.questionId,
                                hint: this.hint
                            }, {
                                bubbles: false
                            });
                            this.toastMessage = this.hint;
                            this.$.toast.open();
                        }
                    }, {
                        key: 'showAnswer',
                        value: function showAnswer() {
                            this.fire('showanswer', {
                                questionId: this.questionId
                            }, {
                                bubbles: false
                            });
                            this.toastMessage = UtilitiesService.getAnswerString(this.answer, this.userInputs, this.userCheckboxes, this.userRadios, this.questionSessionId);
                            this.$.toast.open();
                        }
                    }, {
                        key: 'showWorkedSolution',
                        value: function showWorkedSolution() {
                            this.fire('showworkedsolution', {
                                questionId: this.questionId
                            }, {
                                bubbles: false
                            });
                            //this.toastMessage = this.workedSolution;
                            this.toastMessage = 'This will be the worked solution.';
                            this.$.toast.open();
                        }
                    }, {
                        key: 'mathRenderingBegun',
                        value: function mathRenderingBegun() {
                            this.hideRenderMath = true;
                        }
                    }, {
                        key: 'mathRenderingComplete',
                        value: function mathRenderingComplete() {
                            this.hideRenderMath = false;
                        }
                    }, {
                        key: 'computeAnswerInputHidden',
                        value: function computeAnswerInputHidden(userInputs, userCheckboxes, userRadios) {
                            return !userInputs || userInputs.length > 0 || !userCheckboxes || userCheckboxes.length > 0 || !userRadios || userRadios.length > 0;
                        }
                    }, {
                        key: 'verySureSelected',
                        value: function verySureSelected() {
                            this.confidenceLevel = 'very sure';
                        }
                    }, {
                        key: 'prettySureSelected',
                        value: function prettySureSelected() {
                            this.confidenceLevel = 'pretty sure';
                        }
                    }, {
                        key: 'justGuessingSelected',
                        value: function justGuessingSelected() {
                            this.confidenceLevel = 'just guessing';
                        }
                    }]);

                    return ViewProblemComponent;
                }();

                Polymer(ViewProblemComponent);
                function getUserInputsAnswers(context, userInputs) {
                    return userInputs.reduce(function (prev, curr) {
                        var userInputElement = document.getElementById(curr + context.questionSessionId);
                        var userAnswer = userInputElement.textContent;
                        prev[curr] = userAnswer;
                        return prev;
                    }, {});
                }
                function getUserCheckboxesAnswers(context, userCheckboxes) {
                    return userCheckboxes.reduce(function (prev, curr) {
                        var userCheckboxElement = document.getElementById(curr + context.questionSessionId);
                        var userAnswer = userCheckboxElement.checked;
                        prev[curr] = userAnswer;
                        return prev;
                    }, {});
                }
                function getUserRadiosAnswers(context, userRadios) {
                    return userRadios.reduce(function (prev, curr) {
                        var userRadioElement = document.getElementById(curr + context.questionSessionId);
                        var userAnswer = userRadioElement.checked;
                        prev[curr] = userAnswer;
                        return prev;
                    }, {});
                }
                function prepareForRequest(checkAnswerAjax, questionSessionId, quizSessionId, jwt, userAnswerInfo, checkAnswerXAPIInfo) {
                    checkAnswerAjax.body = {
                        questionSessionId: questionSessionId,
                        quizSessionId: quizSessionId,
                        jwt: jwt,
                        userAnswerInfo: userAnswerInfo,
                        checkAnswerXAPIInfo: checkAnswerXAPIInfo
                    };
                    return checkAnswerAjax;
                }
                function makeRequest(context, checkAnswerAjax) {
                    return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee5() {
                        var request;
                        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        request = checkAnswerAjax.generateRequest();
                                        _context5.prev = 1;
                                        _context5.next = 4;
                                        return request.completes;

                                    case 4:
                                        if (request.response.answerReturnInfo === 'Maximum number of attempts reached') {
                                            context.$.toast.open();
                                        }
                                        if (request.response.answerReturnInfo !== 'No answer feedback allowed') {
                                            context.toastMessage = request.response.answerReturnInfo;
                                            context.$.toast.open();
                                        }
                                        _context5.next = 12;
                                        break;

                                    case 8:
                                        _context5.prev = 8;
                                        _context5.t0 = _context5['catch'](1);

                                        if (request.parseResponse()) {
                                            context.toastMessage = request.parseResponse().errorMessage;
                                        } else {
                                            context.toastMessage = _context5.t0.errorMessage || _context5.t0.toString();
                                        }
                                        context.$.toast.open();

                                    case 12:
                                    case 'end':
                                        return _context5.stop();
                                }
                            }
                        }, _callee5, this, [[1, 8]]);
                    }));
                }
            })();
        }
    };
});
$__System.register("34", [], function (_export, _context) {
    "use strict";

    var fixSVGRefs, SVGFixer;
    return {
        setters: [],
        execute: function () {
            fixSVGRefs = function fixSVGRefs() {
                /**
                 * Current URL, without the hash
                 */
                var baseUrl = window.location.href.replace(window.location.hash, "");
                /**
                *  Find all `use` elements with a namespaced `href` attribute, e.g.
                *  <use xlink:href="#some-id"></use>
                *
                *  See: http://stackoverflow.com/a/23047888/796152
                */
                [].slice.call(document.querySelectorAll("use[*|href]")).filter(function (element) {
                    return element.getAttribute("xlink:href").indexOf("#") === 0;
                }).forEach(function (element) {
                    element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
                });
            };

            _export("SVGFixer", SVGFixer = {
                fixSVGRefs: fixSVGRefs
            });

            _export("SVGFixer", SVGFixer);
        }
    };
});
$__System.register('23', ['33', '34', '35', '36', '37', '2e', '2a', '2b'], function (_export, _context3) {
    "use strict";

    var _defineProperty, _regeneratorRuntime, _classCallCheck, _createClass, VideoModel, UtilitiesService, XAPIService, SVGFixer, __awaiter;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_2) {
            SVGFixer = _2.SVGFixer;
        }, function (_3) {
            _defineProperty = _3.default;
        }, function (_4) {
            VideoModel = _4.VideoModel;
        }, function (_5) {
            XAPIService = _5.XAPIService;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            (function () {
                var PrendusVideoComponent = function () {
                    function PrendusVideoComponent() {
                        _classCallCheck(this, PrendusVideoComponent);

                        //TODO everything that has to do with mutating the below should perhaps be done in redux or more functionally somehow
                        this.timeBeforeSeek = 0;
                        this.seeking = false;
                    }

                    _createClass(PrendusVideoComponent, [{
                        key: 'beforeRegister',
                        value: function beforeRegister() {
                            this.is = 'prendus-video-viewer';
                            this.properties = {
                                course: {
                                    type: String
                                },
                                content: {
                                    type: String
                                },
                                userFullName: {
                                    type: String
                                },
                                userEmail: {
                                    type: String
                                },
                                url: {
                                    type: String
                                },
                                noXapi: {
                                    type: Boolean
                                }
                            };
                            this.observers = ['initXAPI(course, content, userFullName, userEmail)', 'initNoXAPI(url, noXapi)'];
                        }
                    }, {
                        key: 'initXAPI',
                        value: function initXAPI() {
                            return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                                var _this = this;

                                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                //TODO this setTimeout is a hack to deal with some kind of synchronization/loading issue that plyr.js was having...not sure what it was, but letting the event loop run once with this setTimeout seems to fix it
                                                setTimeout(function () {
                                                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                                                        var prendusServerEndpointDomain, video, player;
                                                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        if (!(this.course && this.content && this.userFullName && this.userEmail)) {
                                                                            _context.next = 7;
                                                                            break;
                                                                        }

                                                                        prendusServerEndpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                                                        _context.next = 4;
                                                                        return VideoModel.getById(this.content);

                                                                    case 4:
                                                                        video = _context.sent;
                                                                        player = this.initPlayer(video.url);

                                                                        this.attachInternalListeners(player, this.course, this.content, this.userFullName, this.userEmail, prendusServerEndpointDomain + '/api/xapi/video/sendstatement');

                                                                    case 7:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, this);
                                                    }));
                                                }, 200);

                                            case 1:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this);
                            }));
                        }
                    }, {
                        key: 'initNoXAPI',
                        value: function initNoXAPI(url, noXapi) {
                            this.initPlayer(url);
                        }
                    }, {
                        key: 'initPlayer',
                        value: function initPlayer(url) {
                            var urlInfo = urlParser.parse(url);
                            var player = determinePlayer(this, urlInfo);
                            return player;
                            function determinePlayer(context, urlInfo) {
                                if (!urlInfo) {
                                    return initVideo(context, url);
                                }
                                if (urlInfo.provider === 'youtube') {
                                    return initYouTube(context, urlInfo.id);
                                }
                                if (urlInfo.provider === 'vimeo') {
                                    return initVimeo(context, urlInfo.id);
                                }
                            }
                            function initYouTube(context, url) {
                                context.querySelector('#player-container').innerHTML = '<div class="youtube-player" data-type="youtube" data-video-id="' + urlInfo.id + '"></div>';
                                var player = plyr.setup(context.querySelector('.youtube-player'))[0];
                                player.on('ready', function () {
                                    SVGFixer.fixSVGRefs();
                                });
                                return player;
                            }
                            function initVimeo(context, url) {
                                context.querySelector('#player-container').innerHTML = '<div class="vimeo-player" data-type="vimeo" data-video-id="' + urlInfo.id + '"></div>';
                                var player = plyr.setup(context.querySelector('.vimeo-player'))[0];
                                player.on('ready', function () {
                                    SVGFixer.fixSVGRefs();
                                });
                                return player;
                            }
                            function initVideo(context, url) {
                                context.querySelector('#player-container').innerHTML = '<video class="video-player" src="' + url + '" preload="metadata"></video>';
                                var player = plyr.setup(context.querySelector('.video-player'))[0];
                                player.on('ready', function () {
                                    SVGFixer.fixSVGRefs();
                                });
                                return player;
                            }
                        }
                    }, {
                        key: 'attachInternalListeners',
                        value: function attachInternalListeners(player, course, content, theUserFullName, theUserEmail, endpointUrl) {
                            var _this2 = this;

                            var videoId = content;
                            var userFullName = theUserFullName;
                            var courseId = course;
                            var userEmail = theUserEmail;
                            var baseUri = window.location.origin;
                            var fullUrl = baseUri + window.location.pathname;
                            player.on('enterfullscreen', function (e) {
                                var verb = 'enter_fullscreen';
                                var staticValues = getStaticValues();
                                var dynamicValues = getDynamicValues(_this2, player);
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            });
                            player.on('exitfullscreen', function (e) {
                                var verb = 'exit_fullscreen';
                                var staticValues = getStaticValues();
                                var dynamicValues = getDynamicValues(_this2, player);
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            });
                            player.on('playing', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = getVerb(dynamicValues.videoTime);
                                var extensions = getExtensions(dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                                function getVerb(videoTime) {
                                    if (videoTime === 0) {
                                        return 'started';
                                    } else {
                                        return 'played';
                                    }
                                }
                                function getExtensions(videoTime) {
                                    if (videoTime === 0) {
                                        return {};
                                    } else {
                                        return _defineProperty({}, baseUri + '/playerTime', videoTime);
                                    }
                                }
                            });
                            player.on('ended', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = 'ended';
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            });
                            player.on('pause', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = 'paused';
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            });
                            player.on('timeupdate', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                if (!_this2.seeking) {
                                    _this2.timeBeforeSeek = dynamicValues.videoTime;
                                    _this2.seeking = true;
                                }
                            });
                            player.on('seeked', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = 'jumped';
                                var extensions = getExtensions(dynamicValues.videoTime, _this2.timeBeforeSeek);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                                _this2.seeking = false;
                                function getExtensions(videoTime, timeBeforeSeek) {
                                    var _ref2;

                                    return _ref2 = {}, _defineProperty(_ref2, baseUri + '/oldTime', getJumpStartTime(timeBeforeSeek, videoTime)), _defineProperty(_ref2, baseUri + '/newTime', videoTime), _ref2;
                                }
                                function getJumpStartTime(timeBeforeSeek, videoTime) {
                                    if (timeBeforeSeek === videoTime) {
                                        return 0;
                                    }
                                    return timeBeforeSeek;
                                }
                            });
                            player.on('volumechange', function (e) {
                                var _extensions5;

                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = 'changed_volume';
                                var extensions = (_extensions5 = {}, _defineProperty(_extensions5, baseUri + '/playerTime', dynamicValues.videoTime), _defineProperty(_extensions5, baseUri + '/volume', dynamicValues.muted ? 0 : dynamicValues.currentVolume), _extensions5);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            });
                            //TODO this event does not yet exist for the plyr library
                            // player.on('ratechange', (e: Event) => {
                            //     const dynamicValues = getDynamicValues(this, player);
                            //     const staticValues = getStaticValues();
                            //     const verb = 'changed_playrate';
                            //     const extensions = {
                            //         [`${baseUri}/playerTime`]: dynamicValues.videoTime,
                            //         [`${baseUri}/playRate`]: dynamicValues.currentRate
                            //     };
                            //     XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            // });
                            document.addEventListener('visibilitychange', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = getVerb();
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                                function getVerb() {
                                    if (document.visibilityState === 'visible') {
                                        return 'resumed';
                                    } else {
                                        return 'suspended';
                                    }
                                }
                            });
                            window.addEventListener('beforeunload', function (e) {
                                var dynamicValues = getDynamicValues(_this2, player);
                                var staticValues = getStaticValues();
                                var verb = 'closed_video';
                                var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                                XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues, true);
                            });
                            function getStaticValues() {
                                return {
                                    videoId: videoId,
                                    userFullName: userFullName,
                                    userEmail: userEmail,
                                    courseId: courseId,
                                    baseUri: baseUri,
                                    fullUrl: fullUrl
                                };
                            }
                            function getDynamicValues(context, player) {
                                return {
                                    timestamp: new Date(),
                                    videoTime: player.getCurrentTime(),
                                    muted: player.muted,
                                    currentRate: player.playbackRate,
                                    currentVolume: player.volume //TODO getting volume currently isn't implemented by the plyr, but should be soonish: https://github.com/Selz/plyr/issues/346
                                };
                            }
                        }
                    }]);

                    return PrendusVideoComponent;
                }();

                Polymer(PrendusVideoComponent);
            })();
        }
    };
});
$__System.register('22', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, QuizResultsComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            QuizResultsComponent = function () {
                function QuizResultsComponent() {
                    _classCallCheck(this, QuizResultsComponent);
                }

                _createClass(QuizResultsComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-quiz-results';
                    }
                }, {
                    key: 'getIndex',
                    value: function getIndex(index) {
                        return index + 1;
                    }
                }, {
                    key: 'backButtonClick',
                    value: function backButtonClick() {
                        //TODO this is evil, but until we make all of our components able to reset their state appropriately, this is a quick fix
                        window.history.back();
                        setTimeout(function () {
                            window.location.reload();
                        });
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.finalGrade = state.finalGrade;
                        this.answerDetails = state.answerDetails;
                    }
                }]);

                return QuizResultsComponent;
            }();

            Polymer(QuizResultsComponent);
        }
    };
});
$__System.register('38', ['33', '39', '2e'], function (_export, _context5) {
    "use strict";

    var _regeneratorRuntime, UtilitiesService, QuizModel, _this, __awaiter, loadQuizSession, endQuizSession, clearQuestions, loadQuestionIds, Actions;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_2) {
            QuizModel = _2.QuizModel;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            loadQuizSession = function loadQuizSession(context, startQuizSessionAjax, quizId, jwt, theQuizSessionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var quizSessionId, getQuizSessionId;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    getQuizSessionId = function getQuizSessionId(startQuizSessionAjax, quizId, jwt, theQuizSessionId) {
                                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                                            var request, _quizSessionId;

                                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            if (!(theQuizSessionId === 'NOT_LTI_QUIZ_SESSION_ID')) {
                                                                _context.next = 9;
                                                                break;
                                                            }

                                                            startQuizSessionAjax.body = {
                                                                quizId: quizId,
                                                                jwt: jwt,
                                                                quizSessionId: theQuizSessionId
                                                            };
                                                            request = startQuizSessionAjax.generateRequest();
                                                            _context.next = 5;
                                                            return request.completes;

                                                        case 5:
                                                            _quizSessionId = request.response.quizSessionId;
                                                            return _context.abrupt('return', _quizSessionId);

                                                        case 9:
                                                            return _context.abrupt('return', theQuizSessionId);

                                                        case 10:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, this);
                                        }));
                                    };

                                    _context2.prev = 1;
                                    _context2.next = 4;
                                    return getQuizSessionId(startQuizSessionAjax, quizId, jwt, theQuizSessionId);

                                case 4:
                                    quizSessionId = _context2.sent;

                                    context.action = {
                                        type: 'LOAD_QUIZ_SESSION',
                                        quizSessionId: quizSessionId
                                    };
                                    _context2.next = 11;
                                    break;

                                case 8:
                                    _context2.prev = 8;
                                    _context2.t0 = _context2['catch'](1);
                                    throw _context2.t0;

                                case 11:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[1, 8]]);
                }));
            };

            endQuizSession = function endQuizSession(context, endQuizSessionAjax, quizSessionId, jwt) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                    var request, quizResults, preparedResults, answerDetails;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    endQuizSessionAjax.body = {
                                        jwt: jwt,
                                        quizSessionId: quizSessionId
                                    };
                                    request = endQuizSessionAjax.generateRequest();
                                    _context3.next = 4;
                                    return request.completes;

                                case 4:
                                    quizResults = request.response.quizResults;
                                    preparedResults = Object.keys(quizResults.questionGrades || {}).reduce(function (prev, curr) {
                                        prev[curr] = {
                                            correct: quizResults.questionGrades[curr].correct ? 'correct' : 'incorrect',
                                            yourAnswer: UtilitiesService.getUserAnswerString(quizResults.questionGrades[curr].userAnswerInfo.answerInputValue, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId),
                                            correctAnswer: UtilitiesService.getAnswerString(quizResults.questionGrades[curr].answer, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId)
                                        };
                                        return prev;
                                    }, {});
                                    answerDetails = Object.keys(preparedResults || {}).map(function (key) {
                                        return preparedResults[key];
                                    });

                                    context.action = {
                                        type: 'END_QUIZ_SESSION',
                                        finalGrade: quizResults.finalGrade,
                                        answerDetails: answerDetails
                                    };

                                case 8:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));
            };

            clearQuestions = function clearQuestions(context) {
                context.action = {
                    type: 'CLEAR_QUESTIONS'
                };
            };

            loadQuestionIds = function loadQuestionIds(context, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                    var questionIds;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    _context4.next = 3;
                                    return QuizModel.getQuestionIds(quizId);

                                case 3:
                                    questionIds = _context4.sent;

                                    context.action = {
                                        type: 'LOAD_QUESTION_IDS',
                                        questionIds: questionIds
                                    };
                                    _context4.next = 10;
                                    break;

                                case 7:
                                    _context4.prev = 7;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 10:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 7]]);
                }));
            };

            _export('Actions', Actions = {
                loadQuizSession: loadQuizSession,
                loadQuestionIds: loadQuestionIds,
                endQuizSession: endQuizSession,
                clearQuestions: clearQuestions
            });

            _export('Actions', Actions);
        }
    };
});
$__System.register('37', [], function (_export, _context) {
    "use strict";

    var sendStatement, sendVideoStatement, sendQuizStatement, XAPIService;
    return {
        setters: [],
        execute: function () {
            sendStatement = function sendStatement(prendusServerEndpointUrl, eventInfo, sync) {
                var postBody = {
                    eventInfo: eventInfo
                };
                if (!sync) {
                    var request = new XMLHttpRequest();
                    request.open('POST', prendusServerEndpointUrl, true);
                    request.setRequestHeader('content-type', 'application/json');
                    request.send(JSON.stringify(postBody));
                } else {
                    // This is here only for the beforeunload event. Unless the request is synchronous, Chrome and potentially other browsers ignore the request on beforeunload
                    var _request = new XMLHttpRequest();
                    _request.open('POST', prendusServerEndpointUrl, false);
                    _request.setRequestHeader('content-type', 'application/json');
                    _request.send(JSON.stringify(postBody));
                }
            };

            sendVideoStatement = function sendVideoStatement(prendusServerEndpointUrl, verb, extensions, staticValues, dynamicValues, sync) {
                var eventInfo = {
                    verb: verb,
                    extensions: extensions,
                    videoId: staticValues.videoId,
                    userFullName: staticValues.userFullName,
                    userEmail: staticValues.userEmail,
                    courseId: staticValues.courseId,
                    baseUri: staticValues.baseUri,
                    fullUrl: staticValues.fullUrl,
                    timestamp: dynamicValues.timestamp,
                    videoTime: dynamicValues.videoTime,
                    muted: dynamicValues.muted,
                    currentRate: dynamicValues.currentRate,
                    currentVolume: dynamicValues.currentVolume
                };
                sendStatement(prendusServerEndpointUrl, eventInfo, sync);
            };

            sendQuizStatement = function sendQuizStatement(prendusServerEndpointUrl, eventInfo, sync) {
                sendStatement(prendusServerEndpointUrl, eventInfo, sync);
            };

            _export('XAPIService', XAPIService = {
                sendVideoStatement: sendVideoStatement,
                sendQuizStatement: sendQuizStatement
            });

            _export('XAPIService', XAPIService);
        }
    };
});
$__System.register('21', ['33', '35', '37', '38', '2e', '2a', '2b'], function (_export, _context3) {
    "use strict";

    var _defineProperty, _regeneratorRuntime, _classCallCheck, _createClass, UtilitiesService, Actions, XAPIService, __awaiter, TakeQuizComponent;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_2) {
            _defineProperty = _2.default;
        }, function (_3) {
            XAPIService = _3.XAPIService;
        }, function (_4) {
            Actions = _4.Actions;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            TakeQuizComponent = function () {
                function TakeQuizComponent() {
                    _classCallCheck(this, TakeQuizComponent);
                }

                _createClass(TakeQuizComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-take-quiz';
                        this.properties = {
                            quizId: {
                                type: String,
                                observer: 'init'
                            },
                            jwt: {
                                type: String,
                                observer: 'init'
                            },
                            quizSessionId: {
                                type: String,
                                observer: 'init'
                            },
                            userFullName: {
                                type: String
                            },
                            userEmail: {
                                type: String
                            },
                            courseId: {
                                type: String
                            }
                        };
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.componentInitialized = false;

                                            if (!(this.quizId && this.jwt && this.quizSessionId)) {
                                                _context.next = 13;
                                                break;
                                            }

                                            this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                            this.endpointUrl = this.endpointDomain + '/api/xapi/quiz/sendstatement';
                                            this.initXAPIListeners(this.courseId, this.quizId, this.userFullName, this.userEmail, this.endpointUrl);
                                            _context.next = 7;
                                            return Actions.clearQuestions(this);

                                        case 7:
                                            _context.next = 9;
                                            return Actions.loadQuizSession(this, this.$.startQuizSessionAjax, this.quizId, this.jwt, this.quizSessionId);

                                        case 9:
                                            this.quizStarted(null);
                                            _context.next = 12;
                                            return Actions.loadQuestionIds(this, this.quizId);

                                        case 12:
                                            this.componentInitialized = true;

                                        case 13:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'submitClicked',
                    value: function submitClicked() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var i;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            i = 0;

                                        case 1:
                                            if (!(i < this.questionIds.length)) {
                                                _context2.next = 7;
                                                break;
                                            }

                                            _context2.next = 4;
                                            return this.querySelector('#' + this.questionIds[i]).checkAnswer();

                                        case 4:
                                            i++;
                                            _context2.next = 1;
                                            break;

                                        case 7:
                                            _context2.next = 9;
                                            return Actions.endQuizSession(this, this.$.endQuizSessionAjax, this.quizSessionIdMutable, this.jwt);

                                        case 9:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }, {
                    key: 'initXAPIListeners',
                    value: function initXAPIListeners(courseId, quizId, userFullName, userEmail, endpointUrl) {
                        var baseUri = window.location.origin;
                        var fullUrl = baseUri + window.location.pathname;
                        this.multipleInputTyped = function (e) {
                            var _extensions;

                            var verb = 'type_multiple_input';
                            var extensions = (_extensions = {}, _defineProperty(_extensions, baseUri + '/questionId', e.detail.questionId), _defineProperty(_extensions, baseUri + '/inputName', e.detail.inputName), _defineProperty(_extensions, baseUri + '/inputTyped', e.detail.inputTyped), _extensions);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.checkboxChanged = function (e) {
                            var _extensions2;

                            var verb = 'change_checkbox';
                            var extensions = (_extensions2 = {}, _defineProperty(_extensions2, baseUri + '/questionId', e.detail.questionId), _defineProperty(_extensions2, baseUri + '/checkboxName', e.detail.checkboxName), _defineProperty(_extensions2, baseUri + '/checked', e.detail.checked), _extensions2);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.radioSelected = function (e) {
                            var _extensions3;

                            var verb = 'select_radio';
                            var extensions = (_extensions3 = {}, _defineProperty(_extensions3, baseUri + '/questionId', e.detail.questionId), _defineProperty(_extensions3, baseUri + '/radioName', e.detail.radioName), _extensions3);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.quizStarted = function (e) {
                            var verb = 'started';
                            var extensions = {};
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.hintShowed = function (e) {
                            var verb = 'show_hint';
                            var extensions = _defineProperty({}, baseUri + '/questionId', e.detail.questionId);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.answerShowed = function (e) {
                            var verb = 'show_answer';
                            var extensions = _defineProperty({}, baseUri + '/questionId', e.detail.questionId);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.workedSolutionShowed = function (e) {
                            var verb = 'show_worked_solution';
                            var extensions = _defineProperty({}, baseUri + '/questionId', e.detail.questionId);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        this.answerTyped = function (e) {
                            var _extensions7;

                            var verb = 'type_answer';
                            var extensions = (_extensions7 = {}, _defineProperty(_extensions7, baseUri + '/questionId', e.detail.questionId), _defineProperty(_extensions7, baseUri + '/answerTyped', e.detail.answerTyped), _extensions7);
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                        };
                        if (this.visibilityChanged) {
                            document.removeEventListener('visibilitychange', this.visibilityChanged);
                        }
                        this.visibilityChanged = function (e) {
                            var verb = getVerb();
                            var extensions = {};
                            var eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);
                            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
                            function getVerb() {
                                if (document.visibilityState === 'visible') {
                                    return 'resumed';
                                } else {
                                    return 'suspended';
                                }
                            }
                        };
                        document.addEventListener('visibilitychange', this.visibilityChanged);
                        function getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl) {
                            return {
                                quizId: quizId,
                                verb: verb,
                                extensions: extensions,
                                userFullName: userFullName,
                                userEmail: userEmail,
                                courseId: courseId,
                                baseUri: baseUri,
                                fullUrl: fullUrl,
                                timestamp: new Date()
                            };
                        }
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.quizSessionIdMutable = state.quizSessionId;
                        this.questionIds = state.questionIds;
                    }
                }]);

                return TakeQuizComponent;
            }();

            Polymer(TakeQuizComponent);
        }
    };
});
$__System.register('3a', [], function (_export, _context) {
    "use strict";

    var InitialState;
    return {
        setters: [],
        execute: function () {
            _export('InitialState', InitialState = {
                quizSessionId: '',
                questions: [],
                selected: 0,
                quizResults: {}
            });

            _export('InitialState', InitialState);
        }
    };
});
$__System.register('3b', ['3a'], function (_export, _context) {
    "use strict";

    var InitialState, RootReducer;
    return {
        setters: [function (_a) {
            InitialState = _a.InitialState;
        }],
        execute: function () {
            _export('RootReducer', RootReducer = function RootReducer() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? InitialState : arguments[0];
                var action = arguments[1];

                switch (action.type) {
                    case 'LOAD_QUIZ_SESSION':
                        {
                            var newState = Object.assign({}, state);
                            newState.quizSessionId = action.quizSessionId;
                            return newState;
                        }
                    case 'LOAD_QUESTION_IDS':
                        {
                            var _newState = Object.assign({}, state);
                            _newState.questionIds = action.questionIds;
                            return _newState;
                        }
                    case 'CLEAR_QUESTIONS':
                        {
                            var _newState2 = Object.assign({}, state);
                            _newState2.questionIds = [];
                            return _newState2;
                        }
                    case 'END_QUIZ_SESSION':
                        {
                            var _newState3 = Object.assign({}, state);
                            _newState3.selected = 1;
                            _newState3.finalGrade = action.finalGrade;
                            _newState3.answerDetails = action.answerDetails;
                            return _newState3;
                        }
                    default:
                        {
                            return state;
                        }
                }
            });

            _export('RootReducer', RootReducer);
        }
    };
});
$__System.register('20', ['2a', '2b', '3b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, RootReducer, ViewQuizComponent;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_b2) {
            RootReducer = _b2.RootReducer;
        }],
        execute: function () {
            ViewQuizComponent = function () {
                function ViewQuizComponent() {
                    _classCallCheck(this, ViewQuizComponent);
                }

                _createClass(ViewQuizComponent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-view-quiz';
                        this.properties = {
                            quizId: {
                                type: String
                            },
                            jwt: {
                                type: String
                            },
                            quizSessionId: {
                                type: String
                            },
                            userFullName: {
                                type: String
                            },
                            userEmail: {
                                type: String
                            },
                            courseId: {
                                type: String
                            }
                        };
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.rootReducer = RootReducer;
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.selected = state.selected;
                    }
                }]);

                return ViewQuizComponent;
            }();

            Polymer(ViewQuizComponent);
        }
    };
});
$__System.register("35", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      });
    }
  };
});
$__System.register('3c', [], function (_export, _context) {
    "use strict";

    var InitialState;
    return {
        setters: [],
        execute: function () {
            _export('InitialState', InitialState = {
                mainViewToShow: 'routes',
                concepts: {},
                currentConcept: {},
                courses: [],
                courseEditCurrentCourse: {},
                courseViewCurrentCourse: {},
                editCourseConcepts: {},
                viewCourseConcepts: {},
                editConceptVideos: {},
                viewConceptVideos: {},
                currentConceptVideoId: '',
                currentConceptVideoTitle: '',
                currentConceptVideoUrl: '',
                currentUser: {
                    authorizedQuestions: {},
                    authorizedQuizzes: {},
                    metaData: {
                        email: '',
                        firstName: '',
                        lastName: '',
                        institution: '',
                        uid: ''
                    },
                    starredCourses: {},
                    sharedWithMeCourses: {},
                    sharedWithMeConcepts: {},
                    sharedWithMeVideos: {},
                    sharedWithMeQuizzes: {}
                },
                userQuestionIds: [],
                publicQuestionIds: [],
                quizQuestionIds: [],
                quizSettings: {},
                currentEditQuizId: '',
                editConceptQuizzes: {},
                viewConceptQuizzes: {},
                currentEditConceptId: '',
                publicCourses: [],
                starredCourses: [],
                sharedCourses: [],
                courseCollaboratorEmails: {},
                conceptCollaboratorEmails: {},
                videoCollaboratorEmails: {},
                quizCollaboratorEmails: {}
            });

            _export('InitialState', InitialState);
        }
    };
});
$__System.register('3d', ['35', '3c', '3e'], function (_export, _context) {
    "use strict";

    var _defineProperty, InitialState, Actions;

    function rootReducer() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? InitialState : arguments[0];
        var action = arguments[1];

        switch (action.type) {
            case 'SHOW_MAIN_SPINNER':
                {
                    var newState = Object.assign({}, state);
                    newState.mainViewToShow = 'spinner';
                    return newState;
                }
            case 'HIDE_MAIN_SPINNER':
                {
                    var _newState = Object.assign({}, state);
                    _newState.mainViewToShow = 'routes';
                    return _newState;
                }
            case 'SET_COURSE_COLLABORATOR_EMAILS':
                {
                    var _newState2 = Object.assign({}, state);
                    if (_newState2.courseCollaboratorEmails[action.uid]) {
                        _newState2.courseCollaboratorEmails[action.uid][action.courseId] = action.emails;
                    } else {
                        _newState2.courseCollaboratorEmails[action.uid] = _defineProperty({}, action.courseId, action.emails);
                    }
                    return _newState2;
                }
            case 'SET_CONCEPT_COLLABORATOR_EMAILS':
                {
                    var _newState3 = Object.assign({}, state);
                    if (_newState3.conceptCollaboratorEmails[action.courseId]) {
                        _newState3.conceptCollaboratorEmails[action.courseId][action.conceptId] = action.emails;
                    } else {
                        _newState3.conceptCollaboratorEmails[action.courseId] = _defineProperty({}, action.conceptId, action.emails);
                    }
                    return _newState3;
                }
            case 'SET_VIDEO_COLLABORATOR_EMAILS':
                {
                    var _newState4 = Object.assign({}, state);
                    if (_newState4.videoCollaboratorEmails[action.conceptId]) {
                        _newState4.videoCollaboratorEmails[action.conceptId][action.videoId] = action.emails;
                    } else {
                        _newState4.videoCollaboratorEmails[action.conceptId] = _defineProperty({}, action.videoId, action.emails);
                    }
                    return _newState4;
                }
            case 'SET_QUIZ_COLLABORATOR_EMAILS':
                {
                    var _newState5 = Object.assign({}, state);
                    if (_newState5.quizCollaboratorEmails[action.conceptId]) {
                        _newState5.quizCollaboratorEmails[action.conceptId][action.quizId] = action.emails;
                    } else {
                        _newState5.quizCollaboratorEmails[action.conceptId] = _defineProperty({}, action.quizId, action.emails);
                    }
                    return _newState5;
                }
            case 'SET_SHARED_COURSES':
                {
                    var _newState6 = Object.assign({}, state);
                    _newState6.sharedCourses = action.courses;
                    return _newState6;
                }
            case 'SET_STARRED_COURSES':
                {
                    var _newState7 = Object.assign({}, state);
                    _newState7.starredCourses = action.courses;
                    return _newState7;
                }
            case 'SET_COURSES_BY_VISIBILITY':
                {
                    var _newState8 = Object.assign({}, state);
                    if (action.visibility === 'public') {
                        _newState8.publicCourses = action.courses;
                    }
                    return _newState8;
                }
            case 'LOAD_EDIT_CONCEPT_QUIZZES':
                {
                    var _newState9 = Object.assign({}, state);
                    _newState9.editConceptQuizzes[action.conceptId] = action.quizzes;
                    return _newState9;
                }
            case 'LOAD_VIEW_CONCEPT_QUIZZES':
                {
                    var _newState10 = Object.assign({}, state);
                    _newState10.viewConceptQuizzes[action.conceptId] = action.quizzes;
                    return _newState10;
                }
            case 'SET_CURRENT_EDIT_QUIZ_ID':
                {
                    var _newState11 = Object.assign({}, state);
                    _newState11.currentEditQuizId = action.quizId;
                    return _newState11;
                }
            case 'LOAD_QUIZ_SETTINGS':
                {
                    var _newState12 = Object.assign({}, state);
                    _newState12.quizSettings = action.quizSettings;
                    return _newState12;
                }
            case 'LOAD_QUIZ_QUESTION_IDS':
                {
                    var _newState13 = Object.assign({}, state);
                    _newState13.quizQuestionIds = action.quizQuestionIds;
                    return _newState13;
                }
            case 'LOAD_USER_QUESTION_IDS':
                {
                    var _newState14 = Object.assign({}, state);
                    _newState14.userQuestionIds = action.userQuestionIds;
                    return _newState14;
                }
            case 'LOAD_PUBLIC_QUESTION_IDS':
                {
                    var _newState15 = Object.assign({}, state);
                    _newState15.publicQuestionIds = action.publicQuestionIds;
                    return _newState15;
                }
            case Actions.createUser.type:
                {
                    var _newState16 = Object.assign({}, state);
                    _newState16.currentUser = action.currentUser;
                    return _newState16;
                }
            case Actions.loginUser.type:
                {
                    var _newState17 = Object.assign({}, state);
                    _newState17.currentUser = action.user;
                    _newState17.courses = action.courses;
                    _newState17.starredCourses = action.starredCourses;
                    _newState17.sharedCourses = action.sharedCourses;
                    return _newState17;
                }
            case Actions.checkUserAuth.type:
                {
                    var _newState18 = Object.assign({}, state);
                    _newState18.currentUser = action.user;
                    _newState18.jwt = action.jwt;
                    return _newState18;
                }
            case 'GET_CONCEPT_BY_ID':
                {
                    var _newState19 = Object.assign({}, state);
                    _newState19.currentConcept = action.concept;
                    return _newState19;
                }
            case Actions.deleteConcept.type:
                {
                    var _newState20 = Object.assign({}, state);
                    //make this happen in the model
                    delete _newState20.concepts[action.conceptKey];
                    return _newState20;
                }
            case Actions.logOutUser.type:
                {
                    var _newState21 = Object.assign({}, state);
                    _newState21 = InitialState;
                    // newState.currentUser.metaData = {email: '', firstName: '', lastName: '', uid: ''};
                    return _newState21;
                }
            case Actions.updateUserMetaData.type:
                {
                    var _newState22 = Object.assign({}, state);
                    var newUser = Object.assign(_newState22.currentUser, action.user);
                    _newState22.currentUser = newUser;
                    return _newState22;
                }
            case 'LOAD_EDIT_CONCEPT_VIDEOS':
                {
                    var _newState23 = Object.assign({}, state);
                    _newState23.editConceptVideos[action.conceptId] = action.videos;
                    return _newState23;
                }
            case 'LOAD_VIEW_CONCEPT_VIDEOS':
                {
                    var _newState24 = Object.assign({}, state);
                    _newState24.viewConceptVideos[action.conceptId] = action.videos;
                    return _newState24;
                }
            case 'LOAD_EDIT_COURSE_CONCEPTS':
                {
                    var _newState25 = Object.assign({}, state);
                    _newState25.editCourseConcepts[action.courseId] = action.concepts;
                    return _newState25;
                }
            case 'LOAD_VIEW_COURSE_CONCEPTS':
                {
                    var _newState26 = Object.assign({}, state);
                    _newState26.viewCourseConcepts[action.courseId] = action.concepts;
                    return _newState26;
                }
            case 'SET_CURRENT_VIDEO_INFO':
                {
                    var _newState27 = Object.assign({}, state);
                    _newState27.currentConceptVideoId = action.id;
                    _newState27.currentConceptVideoTitle = action.title;
                    _newState27.currentConceptVideoUrl = action.url;
                    return _newState27;
                }
            case 'CLEAR_CURRENT_VIDEO_INFO':
                {
                    var _newState28 = Object.assign({}, state);
                    _newState28.currentConceptVideoId = null;
                    _newState28.currentConceptVideoTitle = '';
                    _newState28.currentConceptVideoUrl = '';
                    return _newState28;
                }
            case 'SET_CURRENT_VIDEO_ID':
                {
                    var _newState29 = Object.assign({}, state);
                    _newState29.currentConceptVideoId = action.id;
                    return _newState29;
                }
            case 'GET_COURSES_BY_USER':
                {
                    var _newState30 = Object.assign({}, state);
                    _newState30.courses = action.courses;
                    return _newState30;
                }
            case 'SET_COURSE_VIEW_CURRENT_COURSE':
                {
                    var _newState31 = Object.assign({}, state);
                    _newState31.courseViewCurrentCourse = action.currentCourse;
                    return _newState31;
                }
            case 'SET_COURSE_EDIT_CURRENT_COURSE':
                {
                    var _newState32 = Object.assign({}, state);
                    _newState32.courseEditCurrentCourse = action.currentCourse;
                    return _newState32;
                }
            case 'ADD_COURSE':
                {
                    var _newState33 = Object.assign({}, state);
                    _newState33.courses = action.courses;
                    return _newState33;
                }
            case Actions.addConcept.type:
                {
                    var _newState34 = Object.assign({}, state);
                    _newState34.currentCourse = action.currentCourse;
                    return _newState34;
                }
            default:
                {
                    return state;
                }
        }
    }

    _export('rootReducer', rootReducer);

    return {
        setters: [function (_) {
            _defineProperty = _.default;
        }, function (_c) {
            InitialState = _c.InitialState;
        }, function (_e) {
            Actions = _e.Actions;
        }],
        execute: function () {}
    };
});
$__System.register('1f', ['2a', '2b', '2f', '3d'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, FirebaseService, rootReducer, PrendusApp;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }, function (_d) {
            rootReducer = _d.rootReducer;
        }],
        execute: function () {
            PrendusApp = function () {
                function PrendusApp() {
                    _classCallCheck(this, PrendusApp);
                }

                _createClass(PrendusApp, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-app';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.username = state.currentUser.email;
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        if (window.PRENDUS_ENV === 'production') {
                            FirebaseService.init('AIzaSyAKxLCb9pQdng5_1qi6SGnv4YVdkuO_iG4', 'prendus-production.firebaseapp.com', 'https://prendus-production.firebaseio.com', 'prendus-production.appspot.com', 'prendus-production');
                        } else {
                            FirebaseService.init('AIzaSyBv1mFan0M_QmBhQ7Hkgd0McMidMJtNFRg', 'prendus-development.firebaseapp.com', 'https://prendus-development.firebaseio.com', 'prendus-development.appspot.com', 'prendus-development');
                        }
                        this.rootReducer = rootReducer;
                    }
                }]);

                return PrendusApp;
            }();

            Polymer(PrendusApp);
        }
    };
});
$__System.register('1e', ['2e', '2a', '2b', '3e'], function (_export, _context7) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCollaboratorMenuContent;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCollaboratorMenuContent = function () {
                function PrendusCollaboratorMenuContent() {
                    _classCallCheck(this, PrendusCollaboratorMenuContent);
                }

                _createClass(PrendusCollaboratorMenuContent, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-collaborator-menu-content';
                        this.properties = {
                            uid: {
                                type: String
                            },
                            courseId: {
                                type: String
                            },
                            course: {
                                type: Boolean
                            },
                            conceptId: {
                                type: String
                            },
                            concept: {
                                type: Boolean
                            },
                            videoId: {
                                type: String
                            },
                            video: {
                                type: Boolean
                            },
                            quizId: {
                                type: String
                            },
                            quiz: {
                                type: String
                            }
                        };
                        this.observers = ['initCourse(uid, courseId, course)', 'initConcept(courseId, conceptId, concept)', 'initVideo(conceptId, videoId, video)', 'initQuiz(conceptId, quizId, quiz)'];
                    }
                }, {
                    key: 'initCourse',
                    value: function initCourse(uid, courseId, course) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return Actions.loadCourseCollaboratorEmails(this, uid, courseId);

                                        case 3:
                                            _context.next = 8;
                                            break;

                                        case 5:
                                            _context.prev = 5;
                                            _context.t0 = _context['catch'](0);

                                            alert(_context.t0);

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[0, 5]]);
                        }));
                    }
                }, {
                    key: 'initConcept',
                    value: function initConcept(courseId, conceptId, concept) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;
                                            _context2.next = 3;
                                            return Actions.loadConceptCollaboratorEmails(this, courseId, conceptId);

                                        case 3:
                                            _context2.next = 8;
                                            break;

                                        case 5:
                                            _context2.prev = 5;
                                            _context2.t0 = _context2['catch'](0);

                                            alert(_context2.t0);

                                        case 8:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[0, 5]]);
                        }));
                    }
                }, {
                    key: 'initVideo',
                    value: function initVideo(conceptId, videoId, video) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;
                                            _context3.next = 3;
                                            return Actions.loadVideoCollaboratorEmails(this, conceptId, videoId);

                                        case 3:
                                            _context3.next = 8;
                                            break;

                                        case 5:
                                            _context3.prev = 5;
                                            _context3.t0 = _context3['catch'](0);

                                            alert(_context3.t0);

                                        case 8:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this, [[0, 5]]);
                        }));
                    }
                }, {
                    key: 'initQuiz',
                    value: function initQuiz(conceptId, quizId, quiz) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.prev = 0;
                                            _context4.next = 3;
                                            return Actions.loadQuizCollaboratorEmails(this, conceptId, quizId);

                                        case 3:
                                            _context4.next = 8;
                                            break;

                                        case 5:
                                            _context4.prev = 5;
                                            _context4.t0 = _context4['catch'](0);

                                            alert(_context4.t0);

                                        case 8:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, this, [[0, 5]]);
                        }));
                    }
                }, {
                    key: 'addCollaboratorClick',
                    value: function addCollaboratorClick(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                            var email;
                            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            _context5.prev = 0;
                                            email = this.querySelector('#collaboratorInput').value;

                                            if (!(this.uid && this.courseId)) {
                                                _context5.next = 7;
                                                break;
                                            }

                                            _context5.next = 5;
                                            return Actions.addCourseCollaborator(this, this.courseId, email);

                                        case 5:
                                            _context5.next = 7;
                                            return Actions.loadCourseCollaboratorEmails(this, this.uid, this.courseId);

                                        case 7:
                                            if (!(this.courseId && this.conceptId)) {
                                                _context5.next = 12;
                                                break;
                                            }

                                            _context5.next = 10;
                                            return Actions.addConceptCollaborator(this, this.conceptId, email);

                                        case 10:
                                            _context5.next = 12;
                                            return Actions.loadConceptCollaboratorEmails(this, this.courseId, this.conceptId);

                                        case 12:
                                            if (!(this.conceptId && this.videoId)) {
                                                _context5.next = 17;
                                                break;
                                            }

                                            _context5.next = 15;
                                            return Actions.addVideoCollaborator(this, this.videoId, email);

                                        case 15:
                                            _context5.next = 17;
                                            return Actions.loadVideoCollaboratorEmails(this, this.conceptId, this.videoId);

                                        case 17:
                                            if (!(this.conceptId && this.quizId)) {
                                                _context5.next = 22;
                                                break;
                                            }

                                            _context5.next = 20;
                                            return Actions.addQuizCollaborator(this, this.quizId, email);

                                        case 20:
                                            _context5.next = 22;
                                            return Actions.loadQuizCollaboratorEmails(this, this.conceptId, this.quizId);

                                        case 22:
                                            _context5.next = 27;
                                            break;

                                        case 24:
                                            _context5.prev = 24;
                                            _context5.t0 = _context5['catch'](0);

                                            alert(_context5.t0);

                                        case 27:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, this, [[0, 24]]);
                        }));
                    }
                }, {
                    key: 'removeCollaboratorClick',
                    value: function removeCollaboratorClick(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee6() {
                            var email;
                            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                while (1) {
                                    switch (_context6.prev = _context6.next) {
                                        case 0:
                                            _context6.prev = 0;
                                            email = e.model.item;

                                            if (!(this.uid && this.courseId)) {
                                                _context6.next = 7;
                                                break;
                                            }

                                            _context6.next = 5;
                                            return Actions.removeCourseCollaborator(this, this.courseId, email);

                                        case 5:
                                            _context6.next = 7;
                                            return Actions.loadCourseCollaboratorEmails(this, this.uid, this.courseId);

                                        case 7:
                                            if (!(this.courseId && this.conceptId)) {
                                                _context6.next = 12;
                                                break;
                                            }

                                            _context6.next = 10;
                                            return Actions.removeConceptCollaborator(this, this.conceptId, email);

                                        case 10:
                                            _context6.next = 12;
                                            return Actions.loadConceptCollaboratorEmails(this, this.courseId, this.conceptId);

                                        case 12:
                                            if (!(this.conceptId && this.videoId)) {
                                                _context6.next = 17;
                                                break;
                                            }

                                            _context6.next = 15;
                                            return Actions.removeVideoCollaborator(this, this.videoId, email);

                                        case 15:
                                            _context6.next = 17;
                                            return Actions.loadVideoCollaboratorEmails(this, this.conceptId, this.videoId);

                                        case 17:
                                            if (!(this.conceptId && this.quizId)) {
                                                _context6.next = 22;
                                                break;
                                            }

                                            _context6.next = 20;
                                            return Actions.removeQuizCollaborator(this, this.quizId, email);

                                        case 20:
                                            _context6.next = 22;
                                            return Actions.loadQuizCollaboratorEmails(this, this.conceptId, this.quizId);

                                        case 22:
                                            _context6.next = 27;
                                            break;

                                        case 24:
                                            _context6.prev = 24;
                                            _context6.t0 = _context6['catch'](0);

                                            alert(_context6.t0);

                                        case 27:
                                        case 'end':
                                            return _context6.stop();
                                    }
                                }
                            }, _callee6, this, [[0, 24]]);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        if (this.uid && this.courseId) {
                            this.collaboratorEmails = state.courseCollaboratorEmails[this.uid] && state.courseCollaboratorEmails[this.uid][this.courseId];
                        }
                        if (this.courseId && this.conceptId) {
                            this.collaboratorEmails = state.conceptCollaboratorEmails[this.courseId] && state.conceptCollaboratorEmails[this.courseId][this.conceptId];
                        }
                        if (this.conceptId && this.videoId) {
                            this.collaboratorEmails = state.videoCollaboratorEmails[this.conceptId] && state.videoCollaboratorEmails[this.conceptId][this.videoId];
                        }
                        if (this.conceptId && this.quizId) {
                            this.collaboratorEmails = state.quizCollaboratorEmails[this.conceptId] && state.quizCollaboratorEmails[this.conceptId][this.quizId];
                        }
                    }
                }]);

                return PrendusCollaboratorMenuContent;
            }();

            Polymer(PrendusCollaboratorMenuContent);
        }
    };
});
$__System.register('1d', ['2e', '2a', '2b', '3e', '2f'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusConceptContainerEdit;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            _export('PrendusConceptContainerEdit', PrendusConceptContainerEdit = function () {
                function PrendusConceptContainerEdit() {
                    _classCallCheck(this, PrendusConceptContainerEdit);
                }

                _createClass(PrendusConceptContainerEdit, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-container-edit';
                        this.properties = {
                            conceptId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var path, concept;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 8;
                                                break;
                                            }

                                            path = 'concepts/' + this.conceptId;
                                            _context.next = 4;
                                            return FirebaseService.get(path);

                                        case 4:
                                            concept = _context.sent;
                                            _context.next = 7;
                                            return Actions.getConceptById.execute(this, this.conceptId);

                                        case 7:
                                            this.title = concept.title;

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'toggle',
                    value: function toggle(e) {
                        var collapseTarget = e.target.id;
                        this.querySelector('.conceptToggle').toggle();
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.conceptData = state.currentConcept;
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.selected = 0;
                    }
                }]);

                return PrendusConceptContainerEdit;
            }());

            _export('PrendusConceptContainerEdit', PrendusConceptContainerEdit);

            Polymer(PrendusConceptContainerEdit);
        }
    };
});
$__System.register('1c', ['2e', '2a', '2b', '2f'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, FirebaseService, __awaiter, PrendusConceptContainer;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusConceptContainer = function () {
                function PrendusConceptContainer() {
                    _classCallCheck(this, PrendusConceptContainer);
                }

                _createClass(PrendusConceptContainer, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-container';
                        this.properties = {
                            conceptId: {
                                type: String
                            },
                            courseId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var path, concept;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 11;
                                                break;
                                            }

                                            _context.prev = 1;
                                            path = 'concepts/' + this.conceptId;
                                            _context.next = 5;
                                            return FirebaseService.get(path);

                                        case 5:
                                            concept = _context.sent;
                                            //Am I doing this right? I feel like this was pretty smart on my part. Keeps the title scoped to just the concept component - AKA Dont want redux on this
                                            this.title = concept.title;
                                            _context.next = 11;
                                            break;

                                        case 9:
                                            _context.prev = 9;
                                            _context.t0 = _context['catch'](1);

                                        case 11:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[1, 9]]);
                        }));
                    }
                }, {
                    key: 'toggle',
                    value: function toggle(e) {
                        var collapseTarget = e.target.id;
                        this.querySelector('.conceptToggle').toggle();
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.conceptData = state.currentConcept;
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.selected = 0;
                    }
                }]);

                return PrendusConceptContainer;
            }();

            Polymer(PrendusConceptContainer);
        }
    };
});
$__System.register('1b', ['2e', '2a', '2b', '3e'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptQuizContainerEdit;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusConceptQuizContainerEdit = function () {
                function PrendusConceptQuizContainerEdit() {
                    _classCallCheck(this, PrendusConceptQuizContainerEdit);
                }

                _createClass(PrendusConceptQuizContainerEdit, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-quiz-container-edit';
                        this.properties = {
                            conceptId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 3;
                                                break;
                                            }

                                            _context.next = 3;
                                            return Actions.loadEditConceptQuizzes(this, this.conceptId);

                                        case 3:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'addQuizClick',
                    value: function addQuizClick(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var quizId;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.next = 2;
                                            return Actions.createNewQuiz(this, this.conceptId);

                                        case 2:
                                            quizId = _context2.sent;

                                            window.history.pushState({}, '', 'courses/edit-quiz/concept/' + this.conceptId + '/quiz/' + quizId);
                                            this.fire('location-changed', {}, { node: window });
                                            _context2.next = 7;
                                            return Actions.loadEditConceptQuizzes(this, this.conceptId);

                                        case 7:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }, {
                    key: 'quizRowClick',
                    value: function quizRowClick(e) {
                        var quizId = e.model.item.id;
                        window.history.pushState({}, '', 'courses/edit-quiz/concept/' + this.conceptId + '/quiz/' + quizId);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.quizzes = state.editConceptQuizzes[this.conceptId];
                    }
                }]);

                return PrendusConceptQuizContainerEdit;
            }();

            Polymer(PrendusConceptQuizContainerEdit);
        }
    };
});
$__System.register('1a', ['2e', '2a', '2b', '3e'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptQuizContainer;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusConceptQuizContainer = function () {
                function PrendusConceptQuizContainer() {
                    _classCallCheck(this, PrendusConceptQuizContainer);
                }

                _createClass(PrendusConceptQuizContainer, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-quiz-container';
                        this.properties = {
                            conceptId: {
                                type: String
                            },
                            courseId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 3;
                                                break;
                                            }

                                            _context.next = 3;
                                            return Actions.loadViewConceptQuizzes(this, this.conceptId);

                                        case 3:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'quizRowClick',
                    value: function quizRowClick(e) {
                        var quizId = e.model.item.id;
                        //this needs to be changed to take the quiz
                        window.history.pushState({}, '', 'courses/view-quiz/course/' + this.courseId + '/quiz/' + quizId + '/quiz-session-id/NOT_LTI_QUIZ_SESSION_ID');
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.quizzes = state.viewConceptQuizzes[this.conceptId];
                    }
                }]);

                return PrendusConceptQuizContainer;
            }();

            Polymer(PrendusConceptQuizContainer);
        }
    };
});
$__System.register('19', ['2e', '2a', '2b', '3e', '2f'], function (_export, _context4) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusConceptVideoContainerEdit;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusConceptVideoContainerEdit = function () {
                function PrendusConceptVideoContainerEdit() {
                    _classCallCheck(this, PrendusConceptVideoContainerEdit);
                }

                _createClass(PrendusConceptVideoContainerEdit, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-video-container-edit';
                        this.properties = {
                            conceptId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 3;
                                                break;
                                            }

                                            _context.next = 3;
                                            return Actions.loadEditConceptVideos(this, this.conceptId);

                                        case 3:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'addVideoClick',
                    value: function addVideoClick(e) {
                        Actions.clearCurrentVideoInfo(this);
                        this.$.editVideoDialog.open();
                    }
                }, {
                    key: 'videoRowClick',
                    value: function videoRowClick(e) {
                        var id = e.model.item.id;
                        var title = e.model.item.title;
                        var url = e.model.item.url;
                        Actions.setCurrentVideoInfo(this, id, title, url);
                        this.$.editVideoDialog.open();
                    }
                }, {
                    key: 'saveVideo',
                    value: function saveVideo(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var title, url, user, video;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            title = e.detail.title;
                                            url = e.detail.url;
                                            _context2.next = 4;
                                            return FirebaseService.getLoggedInUser();

                                        case 4:
                                            user = _context2.sent;
                                            video = {
                                                id: null,
                                                uid: user.uid,
                                                title: title,
                                                url: url,
                                                collaborators: {}
                                            };
                                            _context2.next = 8;
                                            return Actions.saveVideo(this, this.conceptId, this.currentVideoId, video);

                                        case 8:
                                            this.$.videoEditor.indicateSaved();
                                            Actions.setCurrentVideoInfo(this, this.currentVideoId, title, url);
                                            _context2.next = 12;
                                            return Actions.loadEditConceptVideos(this, this.conceptId);

                                        case 12:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }, {
                    key: 'deleteVideo',
                    value: function deleteVideo(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            this.$.editVideoDialog.close();
                                            _context3.next = 3;
                                            return Actions.deleteVideo(this, this.conceptId, this.currentVideoId);

                                        case 3:
                                            _context3.next = 5;
                                            return Actions.loadEditConceptVideos(this, this.conceptId);

                                        case 5:
                                            Actions.clearCurrentVideoInfo(this);

                                        case 6:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.videos = state.editConceptVideos[this.conceptId];
                        this.currentVideoId = state.currentConceptVideoId;
                        this.currentVideoTitle = state.currentConceptVideoTitle;
                        this.currentVideoUrl = state.currentConceptVideoUrl;
                    }
                }]);

                return PrendusConceptVideoContainerEdit;
            }();

            Polymer(PrendusConceptVideoContainerEdit);
        }
    };
});
$__System.register('18', ['2e', '2a', '2b', '3e'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptVideoContainer;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusConceptVideoContainer = function () {
                function PrendusConceptVideoContainer() {
                    _classCallCheck(this, PrendusConceptVideoContainer);
                }

                _createClass(PrendusConceptVideoContainer, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-concept-video-container';
                        this.properties = {
                            conceptId: {
                                type: String
                            },
                            courseId: {
                                type: String
                            }
                        };
                        this.observers = ['init(conceptId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context.next = 3;
                                                break;
                                            }

                                            _context.next = 3;
                                            return Actions.loadViewConceptVideos(this, this.conceptId);

                                        case 3:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'addVideoClick',
                    value: function addVideoClick(e) {
                        Actions.clearCurrentVideoInfo(this);
                        this.$.editVideoDialog.open();
                    }
                }, {
                    key: 'videoRowClick',
                    value: function videoRowClick(e) {
                        var id = e.model.item.id;
                        var title = e.model.item.title;
                        var url = e.model.item.url;
                        Actions.setCurrentVideoInfo(this, id, title, url);
                        //go to the url
                        // courses/view-video/course/:courseId/video/:videoId
                        window.history.pushState({}, '', 'courses/view-video/course/' + this.courseId + '/video/' + id);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.videos = state.viewConceptVideos[this.conceptId];
                        this.currentVideoId = state.currentConceptVideoId;
                        this.currentVideoTitle = state.currentConceptVideoTitle;
                        this.currentVideoUrl = state.currentConceptVideoUrl;
                    }
                }]);

                return PrendusConceptVideoContainer;
            }();

            Polymer(PrendusConceptVideoContainer);
        }
    };
});
$__System.register('17', ['2e', '2a', '2b', '3e'], function (_export, _context4) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCourseEdit;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCourseEdit = function () {
                function PrendusCourseEdit() {
                    _classCallCheck(this, PrendusCourseEdit);
                }

                _createClass(PrendusCourseEdit, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-course-edit';
                        this.properties = {
                            route: {
                                type: Object,
                                observer: 'getCourse'
                            },
                            data: {
                                type: Object
                            }
                        };
                    }
                }, {
                    key: 'getCourse',
                    value: function getCourse() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.data.courseId) {
                                                _context.next = 7;
                                                break;
                                            }

                                            Actions.showMainSpinner(this);
                                            _context.next = 4;
                                            return Actions.getCourseEditCourseById(this, this.data.courseId);

                                        case 4:
                                            _context.next = 6;
                                            return Actions.loadEditCourseConcepts(this, this.data.courseId);

                                        case 6:
                                            Actions.hideMainSpinner(this);

                                        case 7:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.courseId = state.courseEditCurrentCourse.id;
                        this.startDate = state.courseEditCurrentCourse.startDate;
                        this.endDate = state.courseEditCurrentCourse.endDate;
                        this.username = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                        this.currentCourse = state.courseEditCurrentCourse;
                        this.courseConcepts = state.editCourseConcepts[this.courseId];
                        this.courseConceptsLength = this.courseConcepts && this.courseConcepts.length;
                    }
                }, {
                    key: 'addConcept',
                    value: function addConcept(e) {
                        addDialog.open();
                    }
                }, {
                    key: 'openStartDatePicker',
                    value: function openStartDatePicker(e) {
                        this.querySelector('#selectStartDate').open();
                    }
                }, {
                    key: 'openEndDatePicker',
                    value: function openEndDatePicker(e) {
                        this.querySelector('#selectEndDate').open();
                    }
                }, {
                    key: 'deleteItem',
                    value: function deleteItem(e) {
                        // this.querySelector('#deleteConfirm').open();
                        // Actions.deleteConcept.execute(this, this.courseId, e.target.id);
                        // Actions.loadCourseConcepts(this, this.data.courseId);
                        alert('fix this');
                    }
                }, {
                    key: 'toggle',
                    value: function toggle(e) {
                        var collapseTarget = e.target.id;
                        this.querySelector('#Concept' + collapseTarget).toggle();
                    }
                }, {
                    key: 'addConceptFormDone',
                    value: function addConceptFormDone(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var newConcept;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            e.preventDefault();

                                            if (!this.$.conceptFormName.value) {
                                                _context2.next = 19;
                                                break;
                                            }

                                            this.querySelector('#addDialog').close();
                                            newConcept = {
                                                uid: this.uid,
                                                title: this.$.conceptFormName.value
                                            };
                                            _context2.prev = 4;
                                            _context2.next = 7;
                                            return Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);

                                        case 7:
                                            _context2.next = 9;
                                            return Actions.getCourseEditCourseById(this, this.data.courseId);

                                        case 9:
                                            this.successMessage = '';
                                            this.successMessage = 'Concept added successfully';
                                            Actions.loadEditCourseConcepts(this, this.data.courseId);
                                            _context2.next = 18;
                                            break;

                                        case 14:
                                            _context2.prev = 14;
                                            _context2.t0 = _context2['catch'](4);

                                            this.errorMessage = '';
                                            this.errorMessage = _context2.t0.message;

                                        case 18:
                                            this.$.conceptFormName.value = '';

                                        case 19:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[4, 14]]);
                        }));
                    }
                }, {
                    key: 'sortableEnded',
                    value: function sortableEnded(e) {
                        if (typeof e.newIndex !== 'undefined') {
                            var updateConceptPositionArray = [];
                            for (var i = 0, len = this.courseConcepts.length; i < len; i++) {
                                if (this.courseConcepts[i].position != i) {
                                    this.courseConcepts[i].position = i;
                                    updateConceptPositionArray.push(this.courseConcepts[i]);
                                }
                            }
                            try {
                                Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
                                this.successMessage = '';
                                this.successMessage = 'Concept ordered successfully';
                            } catch (error) {
                                this.errorMessage = '';
                                this.errorMessage = error.message;
                            }
                        }
                    }
                }, {
                    key: 'attributeChanged',
                    value: function attributeChanged(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                            var value, attribute;
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;

                                            if (!(typeof e.target !== 'undefined')) {
                                                _context3.next = 8;
                                                break;
                                            }

                                            value = e.target.value;
                                            attribute = e.target.name;
                                            _context3.next = 6;
                                            return Actions.updateCourseField(this, this.courseId, attribute, value);

                                        case 6:
                                            this.successMessage = '';
                                            this.successMessage = attribute + ' has been updated';

                                        case 8:
                                            _context3.next = 14;
                                            break;

                                        case 10:
                                            _context3.prev = 10;
                                            _context3.t0 = _context3['catch'](0);

                                            this.errorMessage = '';
                                            this.errorMessage = _context3.t0.message;

                                        case 14:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this, [[0, 10]]);
                        }));
                    }
                }]);

                return PrendusCourseEdit;
            }();

            Polymer(PrendusCourseEdit);
        }
    };
});
$__System.register('16', ['2e', '2a', '2b', '3e', '2f'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusCourseHomepage;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCourseHomepage = function () {
                function PrendusCourseHomepage() {
                    _classCallCheck(this, PrendusCourseHomepage);
                }

                _createClass(PrendusCourseHomepage, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-course-homepage';
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var user;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return FirebaseService.getLoggedInUser();

                                        case 3:
                                            user = _context.sent;

                                            Actions.getCoursesByUser.execute(this);
                                            Actions.getStarredCoursesByUser(this, user.uid);
                                            Actions.getSharedCoursesByUser(this, user.uid);
                                            _context.next = 13;
                                            break;

                                        case 9:
                                            _context.prev = 9;
                                            _context.t0 = _context['catch'](0);

                                            this.errorMessage = '';
                                            this.errorMessage = _context.t0.message;

                                        case 13:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[0, 9]]);
                        }));
                    }
                }, {
                    key: 'addCourse',
                    value: function addCourse(e) {
                        this.querySelector('#addCourseDialog').open();
                    }
                }, {
                    key: 'addCourseFormDone',
                    value: function addCourseFormDone(e) {
                        e.preventDefault();
                        if (this.querySelector('#courseFormName').value) {
                            this.querySelector('#addCourseDialog').close();
                            this.formTitle = this.querySelector('#courseFormName').value;
                            this.courseDescription = this.querySelector('#courseDescription').value;
                            var newCourse = {
                                visibility: 'public',
                                title: this.formTitle,
                                description: this.courseDescription,
                                uid: this.uid
                            };
                            try {
                                Actions.addCourse.execute(this, newCourse);
                            } catch (error) {
                                this.errorMessage = '';
                                this.errorMessage = error.message;
                            }
                            this.querySelector('#courseFormName').value = '';
                        }
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.userCourses = state.courses;
                        this.starredCourses = state.starredCourses;
                        this.sharedCourses = state.sharedCourses;
                        this.username = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                    }
                }]);

                return PrendusCourseHomepage;
            }();

            Polymer(PrendusCourseHomepage);
        }
    };
});
$__System.register('15', ['2e', '2a', '2b', '3e', '2f'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusCoursePreview;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCoursePreview = function () {
                function PrendusCoursePreview() {
                    _classCallCheck(this, PrendusCoursePreview);
                }

                _createClass(PrendusCoursePreview, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-course-preview';
                        this.properties = {
                            course: {
                                type: Object,
                                observer: 'init'
                            }
                        };
                    }
                }, {
                    key: 'init',
                    value: function init(course) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var user;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return FirebaseService.getLoggedInUser();

                                        case 3:
                                            user = _context.sent;

                                            this.numStars = Object.keys(this.course.userStars || {}).length;
                                            if (user) {
                                                this.uid = user.uid;
                                                if (course.uid === this.uid) {
                                                    this.hasEditAccess = true;
                                                } else if (course.collaborators) {
                                                    this.hasEditAccess = this.checkCollaboratorStatus(course.collaborators, this.uid);
                                                }
                                            } else {
                                                this.starIcon = 'icons:star-border';
                                            }
                                            _context.next = 12;
                                            break;

                                        case 8:
                                            _context.prev = 8;
                                            _context.t0 = _context['catch'](0);

                                            this.errorMessage = '';
                                            this.errorMessage = _context.t0.message;

                                        case 12:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[0, 8]]);
                        }));
                    }
                }, {
                    key: 'checkCollaboratorStatus',
                    value: function checkCollaboratorStatus(collaborators, uid) {
                        if (collaborators[uid]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    key: 'starClick',
                    value: function starClick(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;

                                            if (!(this.user && this.user.metaData.uid)) {
                                                _context2.next = 22;
                                                break;
                                            }

                                            if (!this.user.starredCourses) {
                                                _context2.next = 12;
                                                break;
                                            }

                                            if (!this.user.starredCourses[this.course.id]) {
                                                _context2.next = 8;
                                                break;
                                            }

                                            _context2.next = 6;
                                            return Actions.unstarCourse(this, this.course.id);

                                        case 6:
                                            _context2.next = 10;
                                            break;

                                        case 8:
                                            _context2.next = 10;
                                            return Actions.starCourse(this, this.course.id);

                                        case 10:
                                            _context2.next = 14;
                                            break;

                                        case 12:
                                            _context2.next = 14;
                                            return Actions.starCourse(this, this.course.id);

                                        case 14:
                                            _context2.next = 16;
                                            return Actions.checkUserAuth.execute(this);

                                        case 16:
                                            Actions.getCoursesByVisibility(this, 'public');
                                            Actions.getCoursesByUser.execute(this);
                                            Actions.getStarredCoursesByUser(this, this.user.metaData.uid);
                                            Actions.getSharedCoursesByUser(this, this.user.metaData.uid);
                                            _context2.next = 24;
                                            break;

                                        case 22:
                                            this.errorMessage = '';
                                            this.errorMessage = 'You must be logged in to star a course';

                                        case 24:
                                            _context2.next = 30;
                                            break;

                                        case 26:
                                            _context2.prev = 26;
                                            _context2.t0 = _context2['catch'](0);

                                            this.errorMessage = '';
                                            this.errorMessage = _context2.t0.message;

                                        case 30:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[0, 26]]);
                        }));
                    }
                }, {
                    key: 'editCourse',
                    value: function editCourse(e) {
                        var location = '/courses/edit/' + this.course.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'viewCourse',
                    value: function viewCourse(e) {
                        var location = '/courses/view/' + this.course.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.user = state.currentUser;
                        this.uid = state.currentUser.metaData.uid;
                        this.numStars = Object.keys(this.course.userStars || {}).length;
                        if (this.user && this.course) {
                            if (this.user.starredCourses) {
                                if (this.user.starredCourses[this.course.id]) {
                                    this.starIcon = 'icons:star';
                                } else {
                                    this.starIcon = 'icons:star-border';
                                }
                            } else {
                                this.starIcon = 'icons:star-border';
                            }
                        } else {
                            this.starIcon = 'icons:star-border';
                        }
                    }
                }]);

                return PrendusCoursePreview;
            }();

            Polymer(PrendusCoursePreview);
        }
    };
});
$__System.register('14', ['2e', '2a', '2b'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusCourseRouter;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCourseRouter = function () {
                function PrendusCourseRouter() {
                    _classCallCheck(this, PrendusCourseRouter);
                }

                _createClass(PrendusCourseRouter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-course-router';
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }]);

                return PrendusCourseRouter;
            }();

            Polymer(PrendusCourseRouter);
        }
    };
});
$__System.register('13', ['2e', '2a', '2b', '3e'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCourseView;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            _export('PrendusCourseView', PrendusCourseView = function () {
                function PrendusCourseView() {
                    _classCallCheck(this, PrendusCourseView);
                }

                _createClass(PrendusCourseView, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-course-view';
                        this.properties = {
                            title: {
                                type: String,
                                value: 'Course Name'
                            },
                            courses: {
                                type: Array,
                                value: [{ title: 'Course Title', instructor: 'Instructor Name' }]
                            },
                            route: {
                                type: Object
                            },
                            data: {
                                type: Object
                            }
                        };
                        this.observers = ['viewCourse(route)', 'viewData(data)'];
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.courseId = state.courseViewCurrentCourse.id;
                        this.username = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                        this.currentCourse = state.courseViewCurrentCourse;
                        this.courseConcepts = state.viewCourseConcepts[this.courseId];
                    }
                }, {
                    key: 'toggle',
                    value: function toggle(e) {
                        var collapseTarget = e.target.id;
                        this.querySelector('#Concept' + collapseTarget).toggle();
                    }
                }, {
                    key: 'addConceptFormDone',
                    value: function addConceptFormDone(e) {
                        e.preventDefault();
                        if (this.$.conceptFormName.value) {
                            this.querySelector('#addDialog').close();
                            var newConcept = {
                                creator: this.uid,
                                title: this.$.conceptFormName.value
                            };
                            Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
                        }
                    }
                }, {
                    key: 'sortableEnded',
                    value: function sortableEnded(e) {
                        if (typeof e.newIndex !== 'undefined') {
                            var updateConceptPositionArray = [];
                            for (var i = 0, len = this.courseConcepts.length; i < len; i++) {
                                if (this.courseConcepts[i].pos != i) {
                                    this.courseConcepts[i].pos = i;
                                    updateConceptPositionArray.push(this.concepts[i]);
                                }
                            }
                            Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
                        }
                    }
                }, {
                    key: 'viewCourse',
                    value: function viewCourse() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!this.data.courseId) {
                                                _context.next = 7;
                                                break;
                                            }

                                            Actions.showMainSpinner(this);
                                            _context.next = 4;
                                            return Actions.getCourseViewCourseById(this, this.data.courseId);

                                        case 4:
                                            _context.next = 6;
                                            return Actions.loadViewCourseConcepts(this, this.data.courseId);

                                        case 6:
                                            Actions.hideMainSpinner(this);

                                        case 7:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'viewData',
                    value: function viewData() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (!this.data.courseId) {
                                                _context2.next = 7;
                                                break;
                                            }

                                            Actions.showMainSpinner(this);
                                            _context2.next = 4;
                                            return Actions.getCourseViewCourseById(this, this.data.courseId);

                                        case 4:
                                            _context2.next = 6;
                                            return Actions.loadViewCourseConcepts(this, this.data.courseId);

                                        case 6:
                                            Actions.hideMainSpinner(this);

                                        case 7:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }]);

                return PrendusCourseView;
            }());

            _export('PrendusCourseView', PrendusCourseView);

            Polymer(PrendusCourseView);
        }
    };
});
$__System.register('12', ['2e', '2a', '2b', '3e'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCreateAccount;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusCreateAccount = function () {
                function PrendusCreateAccount() {
                    _classCallCheck(this, PrendusCreateAccount);
                }

                _createClass(PrendusCreateAccount, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-create-account';
                        this.listeners = {
                            'signup-submit.tap': 'createUser'
                        };
                    }
                }, {
                    key: 'createUser',
                    value: function createUser(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var userMetaData, location;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.email = this.$.formEmail.value;
                                            this.firstName = this.$.firstName.value;
                                            this.lastName = this.$.lastName.value;
                                            this.institution = this.$.institution.value;
                                            userMetaData = {
                                                email: this.email,
                                                firstName: this.firstName,
                                                lastName: this.lastName,
                                                institution: this.institution
                                            };
                                            _context.prev = 5;
                                            _context.next = 8;
                                            return Actions.createUser.execute(this, userMetaData, this.$.formPassword.value);

                                        case 8:
                                            this.$.formEmail.value = '';
                                            this.$.formPassword.value = '';
                                            this.$.retypePassword.value = '';
                                            this.$.firstName.value = '';
                                            this.$.lastName.value = '';
                                            this.$.institution.value = '';
                                            location = '';

                                            window.history.pushState({}, '', location);
                                            this.fire('location-changed', {}, { node: window });
                                            _context.next = 23;
                                            break;

                                        case 19:
                                            _context.prev = 19;
                                            _context.t0 = _context['catch'](5);

                                            this.errorMessage = '';
                                            this.errorMessage = _context.t0.message;

                                        case 23:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[5, 19]]);
                        }));
                    }
                }, {
                    key: 'ready',
                    value: function ready(e) {}
                }]);

                return PrendusCreateAccount;
            }();

            Polymer(PrendusCreateAccount);
        }
    };
});
$__System.register('11', ['2e', '2a', '2b', '3e'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusEditQuestionRouter;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusEditQuestionRouter = function () {
                function PrendusEditQuestionRouter() {
                    _classCallCheck(this, PrendusEditQuestionRouter);
                }

                _createClass(PrendusEditQuestionRouter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-edit-question-router';
                    }
                }, {
                    key: 'editProblemComponentLoaded',
                    value: function editProblemComponentLoaded(e) {
                        Actions.hideMainSpinner(this);
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.jwt = state.jwt;
                    }
                }, {
                    key: 'questionSaved',
                    value: function questionSaved() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var quizEditorComponent;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            //TODO this is evil, figure out another way to manually reload the questions without a DOM search
                                            quizEditorComponent = document.getElementById('quizEditorComponent');

                                            quizEditorComponent.manuallyReloadQuestions();
                                        //TODO this is evil, figure out another way to manually reload the questions without a DOM search

                                        case 2:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }]);

                return PrendusEditQuestionRouter;
            }();

            Polymer(PrendusEditQuestionRouter);
        }
    };
});
$__System.register('10', ['2e', '2a', '2b'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusEditQuizRouter;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusEditQuizRouter = function () {
                function PrendusEditQuizRouter() {
                    _classCallCheck(this, PrendusEditQuizRouter);
                }

                _createClass(PrendusEditQuizRouter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-edit-quiz-router';
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.selected = 0;

                                        case 1:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.jwt = state.jwt;
                    }
                }, {
                    key: 'routeToEditQuestion',
                    value: function routeToEditQuestion() {
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        var editProblemComponent = document.getElementById('#editProblemComponent');
                        editProblemComponent.initialLoad = false;
                        editProblemComponent.init();
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        window.history.pushState({}, '', 'courses/edit-question/course/' + this.courseId + '/video/' + id);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'routeToCreateQuestion',
                    value: function routeToCreateQuestion() {
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        var editProblemComponent = document.getElementById('#editProblemComponent');
                        editProblemComponent.originalText = '';
                        editProblemComponent.originalCode = '';
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                    }
                }]);

                return PrendusEditQuizRouter;
            }();

            Polymer(PrendusEditQuizRouter);
        }
    };
});
$__System.register('f', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusExample;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusExample = function () {
                function PrendusExample() {
                    _classCallCheck(this, PrendusExample);
                }

                _createClass(PrendusExample, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-example';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.username = state.currentUser.email;
                    }
                }]);

                return PrendusExample;
            }();

            Polymer(PrendusExample);
        }
    };
});
$__System.register('e', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusFooter;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusFooter = function () {
                function PrendusFooter() {
                    _classCallCheck(this, PrendusFooter);
                }

                _createClass(PrendusFooter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-footer';
                    }
                }, {
                    key: 'changeURL',
                    value: function changeURL(e) {
                        var location = e.target.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }]);

                return PrendusFooter;
            }();

            Polymer(PrendusFooter);
        }
    };
});
$__System.register('d', ['2e', '2a', '2b', '3e'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusHomepage;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusHomepage = function () {
                function PrendusHomepage() {
                    _classCallCheck(this, PrendusHomepage);
                }

                _createClass(PrendusHomepage, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-homepage';
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return Actions.getCoursesByVisibility(this, 'public');

                                        case 2:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'viewCourse',
                    value: function viewCourse(e) {
                        var courseId = e.model.item.courseId;
                        window.history.pushState({}, '', '/courses/view/' + courseId);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'starCourse',
                    value: function starCourse(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var courseId;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            courseId = e.model.item.courseId;
                                            _context2.next = 3;
                                            return Actions.starCourse(this, courseId);

                                        case 3:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.publicCourses = state.publicCourses;
                    }
                }]);

                return PrendusHomepage;
            }();

            Polymer(PrendusHomepage);
        }
    };
});
$__System.register('c', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusLanding;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusLanding = function () {
                function PrendusLanding() {
                    _classCallCheck(this, PrendusLanding);
                }

                _createClass(PrendusLanding, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-landing';
                    }
                }, {
                    key: 'changeURL',
                    value: function changeURL(e) {
                        var location = e.target.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }]);

                return PrendusLanding;
            }();

            Polymer(PrendusLanding);
        }
    };
});
$__System.register('b', ['2e', '2a', '2b', '3e'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusLogin;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusLogin = function () {
                function PrendusLogin() {
                    _classCallCheck(this, PrendusLogin);
                }

                _createClass(PrendusLogin, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-login', this.listeners = {
                            'signin-submit.tap': 'loginTap'
                        };
                    }
                }, {
                    key: 'loginTap',
                    value: function loginTap(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var location;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return Actions.loginUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);

                                        case 3:
                                            this.$.loginEmail.value = '';
                                            this.$.loginPassword.value = '';
                                            location = 'courses/home';

                                            window.history.pushState({}, '', location);
                                            this.fire('location-changed', {}, { node: window });
                                            _context.next = 14;
                                            break;

                                        case 10:
                                            _context.prev = 10;
                                            _context.t0 = _context['catch'](0);

                                            this.errorMessage = '';
                                            this.errorMessage = _context.t0.message;

                                        case 14:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[0, 10]]);
                        }));
                    }
                }, {
                    key: 'ready',
                    value: function ready() {}
                }]);

                return PrendusLogin;
            }();

            Polymer(PrendusLogin);
        }
    };
});
$__System.register('a', ['2a', '2b', '3e'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, Actions, PrendusNavbar;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e) {
            Actions = _e.Actions;
        }],
        execute: function () {
            _export('PrendusNavbar', PrendusNavbar = function () {
                function PrendusNavbar() {
                    _classCallCheck(this, PrendusNavbar);
                }

                _createClass(PrendusNavbar, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-navbar';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.username = state.currentUser.metaData.email;
                    }
                }, {
                    key: 'changeURL',
                    value: function changeURL(e) {
                        var location = e.target.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'goHome',
                    value: function goHome() {
                        window.history.pushState({}, '', '');
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'openDropdown',
                    value: function openDropdown(e) {
                        var btn = document.querySelector("iron-dropdown");
                        btn.toggle();
                    }
                }, {
                    key: 'logOutUser',
                    value: function logOutUser(e) {
                        Actions.logOutUser.execute(this);
                        var location = "/login";
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        Actions.checkUserAuth.execute(this);
                    }
                }]);

                return PrendusNavbar;
            }());

            _export('PrendusNavbar', PrendusNavbar);

            Polymer(PrendusNavbar);
        }
    };
});
$__System.register('9', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusNotification;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusNotification = function () {
                function PrendusNotification() {
                    _classCallCheck(this, PrendusNotification);
                }

                _createClass(PrendusNotification, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-notification';
                        this.properties = {
                            successMessage: {
                                type: String,
                                observer: 'showSuccessMessage'
                            },
                            errorMessage: {
                                type: String,
                                observer: 'showErrorMessage'
                            }
                        };
                    }
                }, {
                    key: 'showErrorMessage',
                    value: function showErrorMessage() {
                        if (this.errorMessage) {
                            this.toastText = this.errorMessage;
                            this.querySelector('#errorToastContainer').open();
                        }
                    }
                }, {
                    key: 'showSuccessMessage',
                    value: function showSuccessMessage() {
                        if (this.successMessage) {
                            this.toastText = this.successMessage;
                            this.querySelector('#successToastContainer').open();
                        }
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.username = state.currentUser.email;
                    }
                }, {
                    key: 'ready',
                    value: function ready() {}
                }]);

                return PrendusNotification;
            }();

            Polymer(PrendusNotification);
        }
    };
});
$__System.register('8', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusExample;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusExample = function () {
                function PrendusExample() {
                    _classCallCheck(this, PrendusExample);
                }

                _createClass(PrendusExample, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-privacy-policy';
                    }
                }]);

                return PrendusExample;
            }();

            Polymer(PrendusExample);
        }
    };
});
$__System.register('7', ['2e', '2a', '2b', '3e'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusProfile;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            _export('PrendusProfile', PrendusProfile = function () {
                function PrendusProfile() {
                    _classCallCheck(this, PrendusProfile);
                }

                _createClass(PrendusProfile, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-profile';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.firstName = state.currentUser.metaData.firstName;
                        this.lastName = state.currentUser.metaData.lastName;
                        this.institution = state.currentUser.metaData.institution;
                        this.pastEmail = state.currentUser.metaData.email;
                        this.email = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                    }
                }, {
                    key: 'changeProfile',
                    value: function changeProfile(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var submitValue;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!(this.$.updateEmail.value != this.pastEmail)) {
                                                _context.next = 4;
                                                break;
                                            }

                                            this.$.confirmEmailChange.open();
                                            _context.next = 16;
                                            break;

                                        case 4:
                                            submitValue = {
                                                firstName: this.$.firstName.value,
                                                lastName: this.$.lastName.value,
                                                institution: this.$.institution.value
                                            };
                                            _context.prev = 5;
                                            _context.next = 8;
                                            return Actions.updateUserMetaData.execute(this, this.uid, submitValue);

                                        case 8:
                                            this.successMessage = '';
                                            this.successMessage = 'Profile Updated Successfully';
                                            _context.next = 16;
                                            break;

                                        case 12:
                                            _context.prev = 12;
                                            _context.t0 = _context['catch'](5);

                                            this.errorMessage = '';
                                            this.errorMessage = _context.t0.message;

                                        case 16:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[5, 12]]);
                        }));
                    }
                }, {
                    key: 'closeOverlay',
                    value: function closeOverlay(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            var submitValue;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (!(e.detail.confirmed === true)) {
                                                _context2.next = 15;
                                                break;
                                            }

                                            _context2.prev = 1;
                                            submitValue = {
                                                firstName: this.$.firstName.value,
                                                lastName: this.$.lastName.value,
                                                institution: this.$.institution.value,
                                                email: this.$.updateEmail.value
                                            };
                                            _context2.next = 5;
                                            return Actions.updateUserEmail.execute(this, this.pastEmail, this.$.changeEmailPassword.value, submitValue.email);

                                        case 5:
                                            _context2.next = 7;
                                            return Actions.updateUserMetaData.execute(this, this.uid, submitValue);

                                        case 7:
                                            this.successMessage = '';
                                            this.successMessage = 'Profile & Email Updated Successfully';
                                            _context2.next = 15;
                                            break;

                                        case 11:
                                            _context2.prev = 11;
                                            _context2.t0 = _context2['catch'](1);

                                            this.errorMessage = '';
                                            this.errorMessage = _context2.t0.message;

                                        case 15:
                                            this.$.changeEmailPassword.value = ''; //need to clear the form

                                        case 16:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[1, 11]]);
                        }));
                    }
                }, {
                    key: 'ready',
                    value: function ready(e) {
                        this.$.updateProfileErrorToast.fitInto = this.$.toastTarget;
                        this.$.updateProfileSuccessToast.fitInto = this.$.toastTarget;
                    }
                }]);

                return PrendusProfile;
            }());

            _export('PrendusProfile', PrendusProfile);

            Polymer(PrendusProfile);
        }
    };
});
$__System.register('3f', ['33', '40', '2d', '2e', '2f'], function (_export, _context24) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, ConceptModel, UtilitiesService, _this, __awaiter, conceptsPath, dataPath, createOrUpdate, associateConcept, disassociateConcept, getById, getCoursesByUser, courseConceptsToArray, orderCourseConcepts, updateCourseConcepts, deleteCourse, associateCollaborator, disassociateCollaborator, getCollaboratorUids, getAllByVisibility, resolveCourseIds, updateCourseField, getConceptIds, associateUserStar, disassociateUserStar, CourseModel;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_2) {
            ConceptModel = _2.ConceptModel;
        }, function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            conceptsPath = 'concepts';
            dataPath = 'courses';

            createOrUpdate = function createOrUpdate(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                    var path, _path;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!id) {
                                        _context.next = 8;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 5;
                                    return FirebaseService.update(path, data);

                                case 5:
                                    return _context.abrupt('return', id);

                                case 8:
                                    _path = dataPath;
                                    _context.next = 11;
                                    return FirebaseService.push(_path, data);

                                case 11:
                                    return _context.abrupt('return', _context.sent);

                                case 12:
                                    _context.next = 17;
                                    break;

                                case 14:
                                    _context.prev = 14;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 17:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 14]]);
                }));
            };

            associateConcept = function associateConcept(courseId, conceptId, pos) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var path, conceptData;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    path = dataPath + '/' + courseId + '/concepts/' + conceptId;
                                    conceptData = {
                                        id: conceptId,
                                        position: pos
                                    };
                                    _context2.next = 5;
                                    return FirebaseService.set(path, conceptData);

                                case 5:
                                    _context2.next = 10;
                                    break;

                                case 7:
                                    _context2.prev = 7;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 7]]);
                }));
            };

            disassociateConcept = function disassociateConcept(courseId, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    path = dataPath + '/' + courseId + '/concepts/' + conceptId;
                                    _context3.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context3.next = 9;
                                    break;

                                case 6:
                                    _context3.prev = 6;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 9:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 6]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                    var path, course;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context4.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    course = _context4.sent;

                                    course.id = id;
                                    return _context4.abrupt('return', course);

                                case 9:
                                    _context4.prev = 9;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 12:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 9]]);
                }));
            };

            getCoursesByUser = function getCoursesByUser(uid) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee6() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    return _context6.delegateYield(_regeneratorRuntime.mark(function _callee5() {
                                        var path, firebaseCourses, firebaseCoursesArray;
                                        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        path = dataPath;
                                                        _context5.next = 3;
                                                        return FirebaseService.getAllBy(path, 'uid', uid);

                                                    case 3:
                                                        firebaseCourses = _context5.sent;
                                                        firebaseCoursesArray = Object.keys(firebaseCourses || {}).map(function (key) {
                                                            return Object.assign({}, firebaseCourses[key], {
                                                                id: key
                                                            });
                                                        });
                                                        return _context5.abrupt('return', {
                                                            v: firebaseCoursesArray
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context6.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context6.next = 5;
                                        break;
                                    }

                                    return _context6.abrupt('return', _ret.v);

                                case 5:
                                    _context6.next = 10;
                                    break;

                                case 7:
                                    _context6.prev = 7;
                                    _context6.t1 = _context6['catch'](0);
                                    throw _context6.t1;

                                case 10:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 7]]);
                }));
            };

            courseConceptsToArray = function courseConceptsToArray(course) {
                try {
                    var courseConceptsArray = Object.keys(course.concepts || {}).map(function (key) {
                        return Object.assign({}, course.concepts[key], {
                            key: key
                        });
                    });
                    return courseConceptsArray;
                } catch (error) {
                    throw error;
                }
            };

            orderCourseConcepts = function orderCourseConcepts(courseConcepts) {
                try {
                    var compare = function compare(a, b) {
                        if (a.position < b.position) return -1;
                        if (a.position > b.position) return 1;
                        return 0;
                    };

                    var newCourseConcepts = [].concat(_toConsumableArray(courseConcepts));

                    newCourseConcepts.sort(compare);
                    return newCourseConcepts;
                } catch (error) {
                    throw error;
                }
            };

            updateCourseConcepts = function updateCourseConcepts(id, conceptArray) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee8() {
                    var _this3 = this;

                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return UtilitiesService.asyncForEach(conceptArray, function (concept) {
                                        return __awaiter(_this3, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                                            var path;
                                            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                while (1) {
                                                    switch (_context7.prev = _context7.next) {
                                                        case 0:
                                                            path = dataPath + '/' + id + '/concepts/' + concept.id;
                                                            _context7.next = 3;
                                                            return FirebaseService.update(path, concept);

                                                        case 3:
                                                        case 'end':
                                                            return _context7.stop();
                                                    }
                                                }
                                            }, _callee7, this);
                                        }));
                                    });

                                case 3:
                                    _context8.next = 8;
                                    break;

                                case 5:
                                    _context8.prev = 5;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 8:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 5]]);
                }));
            };

            deleteCourse = function deleteCourse(key) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee9() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    path = dataPath + '/' + key;
                                    _context9.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    return _context9.abrupt('return', _context9.sent);

                                case 7:
                                    _context9.prev = 7;
                                    _context9.t0 = _context9['catch'](0);
                                    throw _context9.t0;

                                case 10:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[0, 7]]);
                }));
            };

            associateCollaborator = function associateCollaborator(courseId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var _this4 = this;

                    var path, _conceptsPath, conceptsObject, conceptIds;

                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;

                                    //TODO it would be nice to do the following in a transaction, so that if adding collaborators fails anywhere it fails everywhere
                                    path = dataPath + '/' + courseId + '/collaborators/' + uid;
                                    _context11.next = 4;
                                    return FirebaseService.set(path, uid);

                                case 4:
                                    _conceptsPath = dataPath + '/' + courseId + '/concepts';
                                    _context11.next = 7;
                                    return FirebaseService.get(_conceptsPath);

                                case 7:
                                    conceptsObject = _context11.sent;
                                    conceptIds = Object.keys(conceptsObject || {});
                                    _context11.next = 11;
                                    return UtilitiesService.asyncForEach(conceptIds, function (conceptId) {
                                        return __awaiter(_this4, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                                            return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                                                while (1) {
                                                    switch (_context10.prev = _context10.next) {
                                                        case 0:
                                                            _context10.next = 2;
                                                            return ConceptModel.associateCollaborator(conceptId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context10.stop();
                                                    }
                                                }
                                            }, _callee10, this);
                                        }));
                                    });

                                case 11:
                                    _context11.next = 16;
                                    break;

                                case 13:
                                    _context11.prev = 13;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 16:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 13]]);
                }));
            };

            disassociateCollaborator = function disassociateCollaborator(courseId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee13() {
                    var _this5 = this;

                    var path, _conceptsPath2, conceptsObject, conceptIds;

                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;

                                    //TODO it would be nice to do the following in a transaction, so that if adding collaborators fails anywhere it fails everywhere
                                    path = dataPath + '/' + courseId + '/collaborators/' + uid;
                                    _context13.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _conceptsPath2 = dataPath + '/' + courseId + '/concepts';
                                    _context13.next = 7;
                                    return FirebaseService.get(_conceptsPath2);

                                case 7:
                                    conceptsObject = _context13.sent;
                                    conceptIds = Object.keys(conceptsObject || {});
                                    _context13.next = 11;
                                    return UtilitiesService.asyncForEach(conceptIds, function (conceptId) {
                                        return __awaiter(_this5, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
                                            return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                                                while (1) {
                                                    switch (_context12.prev = _context12.next) {
                                                        case 0:
                                                            _context12.next = 2;
                                                            return ConceptModel.disassociateCollaborator(conceptId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context12.stop();
                                                    }
                                                }
                                            }, _callee12, this);
                                        }));
                                    });

                                case 11:
                                    _context13.next = 16;
                                    break;

                                case 13:
                                    _context13.prev = 13;
                                    _context13.t0 = _context13['catch'](0);
                                    throw _context13.t0;

                                case 16:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[0, 13]]);
                }));
            };

            getCollaboratorUids = function getCollaboratorUids(courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee14() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;
                                    path = dataPath + '/' + courseId + '/collaborators';
                                    _context14.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context14.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context14.abrupt('return', collaboratorUids);

                                case 9:
                                    _context14.prev = 9;
                                    _context14.t0 = _context14['catch'](0);
                                    throw _context14.t0;

                                case 12:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this, [[0, 9]]);
                }));
            };

            getAllByVisibility = function getAllByVisibility(visibility) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee16() {
                    var _this6 = this;

                    var _ret2;

                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;
                                    return _context16.delegateYield(_regeneratorRuntime.mark(function _callee15() {
                                        var path, coursesObject, coursesArray;
                                        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                                            while (1) {
                                                switch (_context15.prev = _context15.next) {
                                                    case 0:
                                                        path = '' + dataPath;
                                                        _context15.next = 3;
                                                        return FirebaseService.getAllBy(path, 'visibility', visibility);

                                                    case 3:
                                                        coursesObject = _context15.sent;
                                                        coursesArray = Object.keys(coursesObject || {}).map(function (key) {
                                                            return Object.assign({}, coursesObject[key], {
                                                                id: key
                                                            });
                                                        });
                                                        return _context15.abrupt('return', {
                                                            v: coursesArray
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context15.stop();
                                                }
                                            }
                                        }, _callee15, _this6);
                                    })(), 't0', 2);

                                case 2:
                                    _ret2 = _context16.t0;

                                    if (!(typeof _ret2 === "object")) {
                                        _context16.next = 5;
                                        break;
                                    }

                                    return _context16.abrupt('return', _ret2.v);

                                case 5:
                                    _context16.next = 10;
                                    break;

                                case 7:
                                    _context16.prev = 7;
                                    _context16.t1 = _context16['catch'](0);
                                    throw _context16.t1;

                                case 10:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this, [[0, 7]]);
                }));
            };

            resolveCourseIds = function resolveCourseIds(courseIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee19() {
                    var _this7 = this;

                    var _ret3;

                    return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    _context19.prev = 0;
                                    return _context19.delegateYield(_regeneratorRuntime.mark(function _callee18() {
                                        var asyncReduce = function asyncReduce(courseIds, courses) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee17() {
                                                var courseId, course;
                                                return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                                                    while (1) {
                                                        switch (_context17.prev = _context17.next) {
                                                            case 0:
                                                                if (!(courseIds.length === 0)) {
                                                                    _context17.next = 2;
                                                                    break;
                                                                }

                                                                return _context17.abrupt('return', courses);

                                                            case 2:
                                                                courseId = courseIds[0];
                                                                _context17.next = 5;
                                                                return getById(courseId);

                                                            case 5:
                                                                course = _context17.sent;

                                                                course.id = courseId;
                                                                return _context17.abrupt('return', asyncReduce(courseIds.slice(1), [].concat(_toConsumableArray(courses), [course])));

                                                            case 8:
                                                            case 'end':
                                                                return _context17.stop();
                                                        }
                                                    }
                                                }, _callee17, this);
                                            }));
                                        };

                                        var courses;
                                        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                                            while (1) {
                                                switch (_context18.prev = _context18.next) {
                                                    case 0:
                                                        _context18.next = 2;
                                                        return asyncReduce(courseIds, []);

                                                    case 2:
                                                        courses = _context18.sent;
                                                        return _context18.abrupt('return', {
                                                            v: courses
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context18.stop();
                                                }
                                            }
                                        }, _callee18, _this7);
                                    })(), 't0', 2);

                                case 2:
                                    _ret3 = _context19.t0;

                                    if (!(typeof _ret3 === "object")) {
                                        _context19.next = 5;
                                        break;
                                    }

                                    return _context19.abrupt('return', _ret3.v);

                                case 5:
                                    _context19.next = 10;
                                    break;

                                case 7:
                                    _context19.prev = 7;
                                    _context19.t1 = _context19['catch'](0);
                                    throw _context19.t1;

                                case 10:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this, [[0, 7]]);
                }));
            };

            updateCourseField = function updateCourseField(id, field, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee20() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    _context20.prev = 0;
                                    path = dataPath + '/' + id + '/' + field;
                                    _context20.next = 4;
                                    return FirebaseService.set(path, value);

                                case 4:
                                    _context20.next = 9;
                                    break;

                                case 6:
                                    _context20.prev = 6;
                                    _context20.t0 = _context20['catch'](0);
                                    throw _context20.t0;

                                case 9:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this, [[0, 6]]);
                }));
            };

            getConceptIds = function getConceptIds(courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee21() {
                    var path, conceptIdsObject, conceptIds;
                    return _regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    _context21.prev = 0;
                                    path = dataPath + '/' + courseId + '/concepts';
                                    _context21.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    conceptIdsObject = _context21.sent;
                                    conceptIds = Object.keys(conceptIdsObject || {});
                                    return _context21.abrupt('return', conceptIds);

                                case 9:
                                    _context21.prev = 9;
                                    _context21.t0 = _context21['catch'](0);
                                    throw _context21.t0;

                                case 12:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this, [[0, 9]]);
                }));
            };

            associateUserStar = function associateUserStar(courseId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee22() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    _context22.prev = 0;
                                    path = dataPath + '/' + courseId + '/userStars/' + uid;
                                    _context22.next = 4;
                                    return FirebaseService.set(path, uid);

                                case 4:
                                    _context22.next = 9;
                                    break;

                                case 6:
                                    _context22.prev = 6;
                                    _context22.t0 = _context22['catch'](0);
                                    throw _context22.t0;

                                case 9:
                                case 'end':
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, this, [[0, 6]]);
                }));
            };

            disassociateUserStar = function disassociateUserStar(courseId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee23() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    _context23.prev = 0;
                                    path = dataPath + '/' + courseId + '/userStars/' + uid;
                                    _context23.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context23.next = 9;
                                    break;

                                case 6:
                                    _context23.prev = 6;
                                    _context23.t0 = _context23['catch'](0);
                                    throw _context23.t0;

                                case 9:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this, [[0, 6]]);
                }));
            };

            _export('CourseModel', CourseModel = {
                createOrUpdate: createOrUpdate,
                getById: getById,
                getCoursesByUser: getCoursesByUser,
                deleteCourse: deleteCourse,
                associateConcept: associateConcept,
                disassociateConcept: disassociateConcept,
                orderCourseConcepts: orderCourseConcepts,
                updateCourseConcepts: updateCourseConcepts,
                courseConceptsToArray: courseConceptsToArray,
                associateCollaborator: associateCollaborator,
                disassociateCollaborator: disassociateCollaborator,
                getCollaboratorUids: getCollaboratorUids,
                getAllByVisibility: getAllByVisibility,
                resolveCourseIds: resolveCourseIds,
                dataPath: dataPath,
                updateCourseField: updateCourseField,
                getConceptIds: getConceptIds,
                associateUserStar: associateUserStar,
                disassociateUserStar: disassociateUserStar
            });

            _export('CourseModel', CourseModel);
        }
    };
});
$__System.register('40', ['33', '36', '39', '2d', '2e', '2f'], function (_export, _context24) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, VideoModel, QuizModel, UtilitiesService, _this, __awaiter, dataPath, save, getById, deleteConcept, conceptsObjectToArray, associateCollaborator, associateCollaborators, disassociateCollaborator, getCollaboratorUids, getVideoIds, getQuizIds, resolveConceptIds, associateVideo, disassociateVideo, associateQuiz, disassociateQuiz, filterConceptsByCollaborator, filterConceptDatasByCollaborator, ConceptModel;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_2) {
            VideoModel = _2.VideoModel;
        }, function (_3) {
            QuizModel = _3.QuizModel;
        }, function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'concepts';

            save = function save(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                    var path, _path, conceptId;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!id) {
                                        _context.next = 8;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 5;
                                    return FirebaseService.set(path, data);

                                case 5:
                                    return _context.abrupt('return', id);

                                case 8:
                                    _path = dataPath;
                                    _context.next = 11;
                                    return FirebaseService.push(_path, data);

                                case 11:
                                    conceptId = _context.sent;
                                    return _context.abrupt('return', conceptId);

                                case 13:
                                    _context.next = 18;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 18:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 15]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                    var path, concept;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context2.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    concept = _context2.sent;

                                    concept.id = id;
                                    return _context2.abrupt('return', concept);

                                case 9:
                                    _context2.prev = 9;
                                    _context2.t0 = _context2['catch'](0);
                                    return _context2.abrupt('return', _context2.t0);

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 9]]);
                }));
            };

            deleteConcept = function deleteConcept(key) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                    var path, conceptDelete;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    path = dataPath + '/' + key;
                                    _context3.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    conceptDelete = _context3.sent;
                                    _context3.next = 10;
                                    break;

                                case 7:
                                    _context3.prev = 7;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 10:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 7]]);
                }));
            };

            conceptsObjectToArray = function conceptsObjectToArray(conceptsObject) {
                try {
                    var conceptsArray = Object.keys(conceptsObject).map(function (key) {
                        return conceptsObject[key];
                    });
                    return conceptsArray;
                } catch (error) {
                    throw error;
                }
            };

            associateCollaborator = function associateCollaborator(conceptId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var _this2 = this;

                    var path, videosPath, videosObject, videoIds, quizzesPath, quizzesObject, quizIds;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;

                                    //TODO it would be nice to do the following in a transaction, so that if adding collaborators fails anywhere it fails everywhere
                                    path = dataPath + '/' + conceptId + '/collaborators/' + uid;
                                    _context6.next = 4;
                                    return FirebaseService.set(path, uid);

                                case 4:
                                    videosPath = dataPath + '/' + conceptId + '/videos';
                                    _context6.next = 7;
                                    return FirebaseService.get(videosPath);

                                case 7:
                                    videosObject = _context6.sent;
                                    videoIds = Object.keys(videosObject || {});
                                    _context6.next = 11;
                                    return UtilitiesService.asyncForEach(videoIds, function (videoId) {
                                        return __awaiter(_this2, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                                            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                while (1) {
                                                    switch (_context4.prev = _context4.next) {
                                                        case 0:
                                                            _context4.next = 2;
                                                            return VideoModel.associateCollaborator(videoId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context4.stop();
                                                    }
                                                }
                                            }, _callee4, this);
                                        }));
                                    });

                                case 11:
                                    quizzesPath = dataPath + '/' + conceptId + '/quizzes';
                                    _context6.next = 14;
                                    return FirebaseService.get(quizzesPath);

                                case 14:
                                    quizzesObject = _context6.sent;
                                    quizIds = Object.keys(quizzesObject || {});
                                    _context6.next = 18;
                                    return UtilitiesService.asyncForEach(quizIds, function (quizId) {
                                        return __awaiter(_this2, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                                            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                while (1) {
                                                    switch (_context5.prev = _context5.next) {
                                                        case 0:
                                                            _context5.next = 2;
                                                            return QuizModel.associateCollaborator(quizId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context5.stop();
                                                    }
                                                }
                                            }, _callee5, this);
                                        }));
                                    });

                                case 18:
                                    _context6.next = 23;
                                    break;

                                case 20:
                                    _context6.prev = 20;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 23:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 20]]);
                }));
            };

            associateCollaborators = function associateCollaborators(conceptId, uids) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var _this3 = this;

                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return UtilitiesService.asyncForEach(uids, function (uid) {
                                        return __awaiter(_this3, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                                            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                while (1) {
                                                    switch (_context7.prev = _context7.next) {
                                                        case 0:
                                                            _context7.next = 2;
                                                            return associateCollaborator(conceptId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context7.stop();
                                                    }
                                                }
                                            }, _callee7, this);
                                        }));
                                    });

                                case 3:
                                    _context8.next = 8;
                                    break;

                                case 5:
                                    _context8.prev = 5;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 8:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 5]]);
                }));
            };

            disassociateCollaborator = function disassociateCollaborator(conceptId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var _this4 = this;

                    var path, videosPath, videosObject, videoIds, quizzesPath, quizzesObject, quizIds;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;

                                    //TODO it would be nice to do the following in a transaction, so that if adding collaborators fails anywhere it fails everywhere
                                    path = dataPath + '/' + conceptId + '/collaborators/' + uid;
                                    _context11.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    videosPath = dataPath + '/' + conceptId + '/videos';
                                    _context11.next = 7;
                                    return FirebaseService.get(videosPath);

                                case 7:
                                    videosObject = _context11.sent;
                                    videoIds = Object.keys(videosObject || {});
                                    _context11.next = 11;
                                    return UtilitiesService.asyncForEach(videoIds, function (videoId) {
                                        return __awaiter(_this4, void 0, void 0, _regeneratorRuntime.mark(function _callee9() {
                                            return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                                while (1) {
                                                    switch (_context9.prev = _context9.next) {
                                                        case 0:
                                                            _context9.next = 2;
                                                            return VideoModel.disassociateCollaborator(videoId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context9.stop();
                                                    }
                                                }
                                            }, _callee9, this);
                                        }));
                                    });

                                case 11:
                                    quizzesPath = dataPath + '/' + conceptId + '/quizzes';
                                    _context11.next = 14;
                                    return FirebaseService.get(quizzesPath);

                                case 14:
                                    quizzesObject = _context11.sent;
                                    quizIds = Object.keys(quizzesObject || {});
                                    _context11.next = 18;
                                    return UtilitiesService.asyncForEach(quizIds, function (quizId) {
                                        return __awaiter(_this4, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                                            return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                                                while (1) {
                                                    switch (_context10.prev = _context10.next) {
                                                        case 0:
                                                            _context10.next = 2;
                                                            return QuizModel.disassociateCollaborator(quizId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context10.stop();
                                                    }
                                                }
                                            }, _callee10, this);
                                        }));
                                    });

                                case 18:
                                    _context11.next = 23;
                                    break;

                                case 20:
                                    _context11.prev = 20;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 23:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 20]]);
                }));
            };

            getCollaboratorUids = function getCollaboratorUids(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee12() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + conceptId + '/collaborators';
                                    _context12.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context12.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context12.abrupt('return', collaboratorUids);

                                case 9:
                                    _context12.prev = 9;
                                    _context12.t0 = _context12['catch'](0);
                                    throw _context12.t0;

                                case 12:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this, [[0, 9]]);
                }));
            };

            getVideoIds = function getVideoIds(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee13() {
                    var path, videoIdsObject, videoIds;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos';
                                    _context13.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    videoIdsObject = _context13.sent;
                                    videoIds = Object.keys(videoIdsObject || {});
                                    return _context13.abrupt('return', videoIds);

                                case 9:
                                    _context13.prev = 9;
                                    _context13.t0 = _context13['catch'](0);
                                    throw _context13.t0;

                                case 12:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[0, 9]]);
                }));
            };

            getQuizIds = function getQuizIds(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee14() {
                    var path, quizIdsObject, quizIds;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes';
                                    _context14.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    quizIdsObject = _context14.sent;
                                    quizIds = Object.keys(quizIdsObject || {});
                                    return _context14.abrupt('return', quizIds);

                                case 9:
                                    _context14.prev = 9;
                                    _context14.t0 = _context14['catch'](0);
                                    throw _context14.t0;

                                case 12:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this, [[0, 9]]);
                }));
            };

            resolveConceptIds = function resolveConceptIds(conceptIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee17() {
                    var _this5 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    _context17.prev = 0;
                                    return _context17.delegateYield(_regeneratorRuntime.mark(function _callee16() {
                                        var asyncReduce = function asyncReduce(conceptIds, concepts) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee15() {
                                                var conceptId, concept;
                                                return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                                                    while (1) {
                                                        switch (_context15.prev = _context15.next) {
                                                            case 0:
                                                                if (!(conceptIds.length === 0)) {
                                                                    _context15.next = 2;
                                                                    break;
                                                                }

                                                                return _context15.abrupt('return', concepts);

                                                            case 2:
                                                                conceptId = conceptIds[0];
                                                                _context15.next = 5;
                                                                return getById(conceptId);

                                                            case 5:
                                                                concept = _context15.sent;

                                                                concept.id = conceptId;
                                                                return _context15.abrupt('return', asyncReduce(conceptIds.slice(1), [].concat(_toConsumableArray(concepts), [concept])));

                                                            case 8:
                                                            case 'end':
                                                                return _context15.stop();
                                                        }
                                                    }
                                                }, _callee15, this);
                                            }));
                                        };

                                        var concepts;
                                        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                                            while (1) {
                                                switch (_context16.prev = _context16.next) {
                                                    case 0:
                                                        _context16.next = 2;
                                                        return asyncReduce(conceptIds, []);

                                                    case 2:
                                                        concepts = _context16.sent;
                                                        return _context16.abrupt('return', {
                                                            v: concepts
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context16.stop();
                                                }
                                            }
                                        }, _callee16, _this5);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context17.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context17.next = 5;
                                        break;
                                    }

                                    return _context17.abrupt('return', _ret.v);

                                case 5:
                                    _context17.next = 10;
                                    break;

                                case 7:
                                    _context17.prev = 7;
                                    _context17.t1 = _context17['catch'](0);
                                    throw _context17.t1;

                                case 10:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this, [[0, 7]]);
                }));
            };

            associateVideo = function associateVideo(conceptId, videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee18() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    _context18.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos/' + videoId;
                                    _context18.next = 4;
                                    return FirebaseService.set(path, videoId);

                                case 4:
                                    _context18.next = 9;
                                    break;

                                case 6:
                                    _context18.prev = 6;
                                    _context18.t0 = _context18['catch'](0);
                                    throw _context18.t0;

                                case 9:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this, [[0, 6]]);
                }));
            };

            disassociateVideo = function disassociateVideo(conceptId, videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee19() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    _context19.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos/' + videoId;
                                    _context19.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context19.next = 9;
                                    break;

                                case 6:
                                    _context19.prev = 6;
                                    _context19.t0 = _context19['catch'](0);
                                    throw _context19.t0;

                                case 9:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this, [[0, 6]]);
                }));
            };

            associateQuiz = function associateQuiz(conceptId, quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee20() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    _context20.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes/' + quizId;
                                    _context20.next = 4;
                                    return FirebaseService.set(path, quizId);

                                case 4:
                                    _context20.next = 9;
                                    break;

                                case 6:
                                    _context20.prev = 6;
                                    _context20.t0 = _context20['catch'](0);
                                    throw _context20.t0;

                                case 9:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this, [[0, 6]]);
                }));
            };

            disassociateQuiz = function disassociateQuiz(conceptId, quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee21() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    _context21.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes/' + quizId;
                                    _context21.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context21.next = 9;
                                    break;

                                case 6:
                                    _context21.prev = 6;
                                    _context21.t0 = _context21['catch'](0);
                                    throw _context21.t0;

                                case 9:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this, [[0, 6]]);
                }));
            };

            filterConceptsByCollaborator = function filterConceptsByCollaborator(conceptIds, courseUid, collaboratorUid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee22() {
                    var concepts;
                    return _regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    _context22.next = 2;
                                    return resolveConceptIds(conceptIds);

                                case 2:
                                    concepts = _context22.sent;
                                    return _context22.abrupt('return', concepts.filter(function (concept) {
                                        if (courseUid === collaboratorUid) {
                                            return true;
                                        }
                                        if (!concept.collaborators) {
                                            return false;
                                        }
                                        if (concept.collaborators[collaboratorUid]) {
                                            return true;
                                        }
                                        return false;
                                    }));

                                case 4:
                                case 'end':
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, this);
                }));
            };

            filterConceptDatasByCollaborator = function filterConceptDatasByCollaborator(conceptDatasObject, courseUid, collaboratorUid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee23() {
                    var conceptIds, concepts, filteredConcepts, filteredConceptsIds;
                    return _regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    conceptIds = Object.keys(conceptDatasObject || {});
                                    _context23.next = 3;
                                    return resolveConceptIds(conceptIds);

                                case 3:
                                    concepts = _context23.sent;
                                    filteredConcepts = concepts.filter(function (concept) {
                                        if (courseUid === collaboratorUid) {
                                            return true;
                                        }
                                        if (!concept.collaborators) {
                                            return false;
                                        }
                                        if (concept.collaborators[collaboratorUid]) {
                                            return true;
                                        }
                                        return false;
                                    });
                                    filteredConceptsIds = filteredConcepts.reduce(function (prev, curr) {
                                        prev.push(curr.id);
                                        return prev;
                                    }, []);
                                    return _context23.abrupt('return', filteredConceptsIds.reduce(function (prev, curr) {
                                        prev.push({
                                            id: curr,
                                            position: conceptDatasObject[curr].position
                                        });
                                        return prev;
                                    }, []));

                                case 7:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this);
                }));
            };

            _export('ConceptModel', ConceptModel = {
                save: save,
                getById: getById,
                deleteConcept: deleteConcept,
                conceptsObjectToArray: conceptsObjectToArray,
                associateCollaborator: associateCollaborator,
                disassociateCollaborator: disassociateCollaborator,
                getCollaboratorUids: getCollaboratorUids,
                dataPath: dataPath,
                resolveConceptIds: resolveConceptIds,
                associateVideo: associateVideo,
                disassociateVideo: disassociateVideo,
                associateQuiz: associateQuiz,
                disassociateQuiz: disassociateQuiz,
                getVideoIds: getVideoIds,
                getQuizIds: getQuizIds,
                associateCollaborators: associateCollaborators,
                filterConceptsByCollaborator: filterConceptsByCollaborator,
                filterConceptDatasByCollaborator: filterConceptDatasByCollaborator
            });

            _export('ConceptModel', ConceptModel);
        }
    };
});
$__System.register('41', ['2d', '2e', '2f'], function (_export, _context24) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, save, updateFirebaseUser, updateMetaData, getById, getMetaDataById, starCourse, unstarCourse, shareCourseWithMe, unshareCourseWithMe, shareConceptWithMe, unshareConceptWithMe, shareVideoWithMe, unshareVideoWithMe, shareQuizWithMe, unshareQuizWithMe, getStarredCoursesIds, getSharedWithMeCoursesIds, getSharedWithMeConceptsIds, getSharedWithMeVideosIds, getSharedWithMeQuizzesIds, getEmailById, getEmailsByIds, UserModel;

    return {
        setters: [function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'users';

            save = function save(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                    var path, _path, newId;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!id) {
                                        _context.next = 8;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 5;
                                    return FirebaseService.update(path, data);

                                case 5:
                                    return _context.abrupt('return', id);

                                case 8:
                                    _path = dataPath;
                                    _context.next = 11;
                                    return FirebaseService.push(_path, data);

                                case 11:
                                    newId = _context.sent;
                                    return _context.abrupt('return', newId);

                                case 13:
                                    _context.next = 18;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 18:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 15]]);
                }));
            };

            updateFirebaseUser = function updateFirebaseUser(loggedInUser, email) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return FirebaseService.updateUserProfile(loggedInUser, email);

                                case 3:
                                    _context2.next = 8;
                                    break;

                                case 5:
                                    _context2.prev = 5;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 8:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 5]]);
                }));
            };

            updateMetaData = function updateMetaData(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                    var newPath;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    newPath = dataPath + '/' + id + '/metaData';
                                    _context3.next = 4;
                                    return FirebaseService.update(newPath, data);

                                case 4:
                                    _context3.next = 9;
                                    break;

                                case 6:
                                    _context3.prev = 6;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 9:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 6]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
                    var newPath, userData;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    newPath = dataPath + '/' + id;
                                    _context4.next = 4;
                                    return FirebaseService.get(newPath);

                                case 4:
                                    userData = _context4.sent;
                                    return _context4.abrupt('return', userData);

                                case 8:
                                    _context4.prev = 8;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 11:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 8]]);
                }));
            };

            getMetaDataById = function getMetaDataById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee5() {
                    var newPath, userData;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    newPath = dataPath + '/' + id + '/metaData';
                                    _context5.next = 4;
                                    return FirebaseService.get(newPath);

                                case 4:
                                    userData = _context5.sent;
                                    return _context5.abrupt('return', userData);

                                case 8:
                                    _context5.prev = 8;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 11:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 8]]);
                }));
            };

            starCourse = function starCourse(uid, courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    path = dataPath + '/' + uid + '/starredCourses/' + courseId;
                                    _context6.next = 4;
                                    return FirebaseService.set(path, courseId);

                                case 4:
                                    _context6.next = 9;
                                    break;

                                case 6:
                                    _context6.prev = 6;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 9:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 6]]);
                }));
            };

            unstarCourse = function unstarCourse(uid, courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    path = dataPath + '/' + uid + '/starredCourses/' + courseId;
                                    _context7.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context7.next = 9;
                                    break;

                                case 6:
                                    _context7.prev = 6;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 9:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 6]]);
                }));
            };

            shareCourseWithMe = function shareCourseWithMe(uid, courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeCourses/' + courseId;
                                    _context8.next = 4;
                                    return FirebaseService.set(path, courseId);

                                case 4:
                                    _context8.next = 9;
                                    break;

                                case 6:
                                    _context8.prev = 6;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 9:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 6]]);
                }));
            };

            unshareCourseWithMe = function unshareCourseWithMe(uid, courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeCourses/' + courseId;
                                    _context9.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context9.next = 9;
                                    break;

                                case 6:
                                    _context9.prev = 6;
                                    _context9.t0 = _context9['catch'](0);
                                    throw _context9.t0;

                                case 9:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[0, 6]]);
                }));
            };

            shareConceptWithMe = function shareConceptWithMe(uid, conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee10() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeConcepts/' + conceptId;
                                    _context10.next = 4;
                                    return FirebaseService.set(path, conceptId);

                                case 4:
                                    _context10.next = 9;
                                    break;

                                case 6:
                                    _context10.prev = 6;
                                    _context10.t0 = _context10['catch'](0);
                                    throw _context10.t0;

                                case 9:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 6]]);
                }));
            };

            unshareConceptWithMe = function unshareConceptWithMe(uid, conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeConcepts/' + conceptId;
                                    _context11.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context11.next = 9;
                                    break;

                                case 6:
                                    _context11.prev = 6;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 9:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 6]]);
                }));
            };

            shareVideoWithMe = function shareVideoWithMe(uid, videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee12() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeVideos/' + videoId;
                                    _context12.next = 4;
                                    return FirebaseService.set(path, videoId);

                                case 4:
                                    _context12.next = 9;
                                    break;

                                case 6:
                                    _context12.prev = 6;
                                    _context12.t0 = _context12['catch'](0);
                                    throw _context12.t0;

                                case 9:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this, [[0, 6]]);
                }));
            };

            unshareVideoWithMe = function unshareVideoWithMe(uid, videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee13() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeVideos/' + videoId;
                                    _context13.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context13.next = 9;
                                    break;

                                case 6:
                                    _context13.prev = 6;
                                    _context13.t0 = _context13['catch'](0);
                                    throw _context13.t0;

                                case 9:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[0, 6]]);
                }));
            };

            shareQuizWithMe = function shareQuizWithMe(uid, quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee14() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeQuizzes/' + quizId;
                                    _context14.next = 4;
                                    return FirebaseService.set(path, quizId);

                                case 4:
                                    _context14.next = 9;
                                    break;

                                case 6:
                                    _context14.prev = 6;
                                    _context14.t0 = _context14['catch'](0);
                                    throw _context14.t0;

                                case 9:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this, [[0, 6]]);
                }));
            };

            unshareQuizWithMe = function unshareQuizWithMe(uid, quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee15() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    _context15.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeQuizzes/' + quizId;
                                    _context15.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context15.next = 9;
                                    break;

                                case 6:
                                    _context15.prev = 6;
                                    _context15.t0 = _context15['catch'](0);
                                    throw _context15.t0;

                                case 9:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this, [[0, 6]]);
                }));
            };

            getStarredCoursesIds = function getStarredCoursesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee16() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;
                                    path = dataPath + '/' + uid + '/starredCourses';
                                    _context16.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context16.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context16.abrupt('return', courseIds);

                                case 9:
                                    _context16.prev = 9;
                                    _context16.t0 = _context16['catch'](0);
                                    throw _context16.t0;

                                case 12:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this, [[0, 9]]);
                }));
            };

            getSharedWithMeCoursesIds = function getSharedWithMeCoursesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee17() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    _context17.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeCourses';
                                    _context17.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context17.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context17.abrupt('return', courseIds);

                                case 9:
                                    _context17.prev = 9;
                                    _context17.t0 = _context17['catch'](0);
                                    throw _context17.t0;

                                case 12:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this, [[0, 9]]);
                }));
            };

            getSharedWithMeConceptsIds = function getSharedWithMeConceptsIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee18() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    _context18.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeConcepts';
                                    _context18.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context18.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context18.abrupt('return', courseIds);

                                case 9:
                                    _context18.prev = 9;
                                    _context18.t0 = _context18['catch'](0);
                                    throw _context18.t0;

                                case 12:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this, [[0, 9]]);
                }));
            };

            getSharedWithMeVideosIds = function getSharedWithMeVideosIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee19() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    _context19.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeVideos';
                                    _context19.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context19.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context19.abrupt('return', courseIds);

                                case 9:
                                    _context19.prev = 9;
                                    _context19.t0 = _context19['catch'](0);
                                    throw _context19.t0;

                                case 12:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this, [[0, 9]]);
                }));
            };

            getSharedWithMeQuizzesIds = function getSharedWithMeQuizzesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee20() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    _context20.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeQuizzes';
                                    _context20.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context20.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context20.abrupt('return', courseIds);

                                case 9:
                                    _context20.prev = 9;
                                    _context20.t0 = _context20['catch'](0);
                                    throw _context20.t0;

                                case 12:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this, [[0, 9]]);
                }));
            };

            getEmailById = function getEmailById(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee21() {
                    var path, email;
                    return _regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    _context21.prev = 0;
                                    path = dataPath + '/' + uid + '/metaData/email';
                                    _context21.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    email = _context21.sent;
                                    return _context21.abrupt('return', email);

                                case 8:
                                    _context21.prev = 8;
                                    _context21.t0 = _context21['catch'](0);
                                    throw _context21.t0;

                                case 11:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this, [[0, 8]]);
                }));
            };

            getEmailsByIds = function getEmailsByIds(uids) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee23() {
                    var emails, asyncReduce;
                    return _regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    asyncReduce = function asyncReduce(uids, emails) {
                                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee22() {
                                            var uid, email;
                                            return _regeneratorRuntime.wrap(function _callee22$(_context22) {
                                                while (1) {
                                                    switch (_context22.prev = _context22.next) {
                                                        case 0:
                                                            if (!(uids.length === 0)) {
                                                                _context22.next = 2;
                                                                break;
                                                            }

                                                            return _context22.abrupt('return', emails);

                                                        case 2:
                                                            uid = uids[0];
                                                            _context22.next = 5;
                                                            return getEmailById(uid);

                                                        case 5:
                                                            email = _context22.sent;
                                                            return _context22.abrupt('return', asyncReduce(uids.slice(1), [].concat(_toConsumableArray(emails), [email])));

                                                        case 7:
                                                        case 'end':
                                                            return _context22.stop();
                                                    }
                                                }
                                            }, _callee22, this);
                                        }));
                                    };

                                    _context23.prev = 1;
                                    _context23.next = 4;
                                    return asyncReduce(uids, []);

                                case 4:
                                    emails = _context23.sent;
                                    return _context23.abrupt('return', emails);

                                case 8:
                                    _context23.prev = 8;
                                    _context23.t0 = _context23['catch'](1);
                                    throw _context23.t0;

                                case 11:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this, [[1, 8]]);
                }));
            };

            _export('UserModel', UserModel = {
                save: save,
                updateFirebaseUser: updateFirebaseUser,
                updateMetaData: updateMetaData,
                getById: getById,
                getMetaDataById: getMetaDataById,
                starCourse: starCourse,
                shareCourseWithMe: shareCourseWithMe,
                getStarredCoursesIds: getStarredCoursesIds,
                getEmailById: getEmailById,
                getEmailsByIds: getEmailsByIds,
                getSharedWithMeCoursesIds: getSharedWithMeCoursesIds,
                getSharedWithMeQuizzesIds: getSharedWithMeQuizzesIds,
                shareConceptWithMe: shareConceptWithMe,
                shareVideoWithMe: shareVideoWithMe,
                getSharedWithMeConceptsIds: getSharedWithMeConceptsIds,
                getSharedWithMeVideosIds: getSharedWithMeVideosIds,
                unstarCourse: unstarCourse,
                shareQuizWithMe: shareQuizWithMe,
                unshareCourseWithMe: unshareCourseWithMe,
                unshareConceptWithMe: unshareConceptWithMe,
                unshareVideoWithMe: unshareVideoWithMe,
                unshareQuizWithMe: unshareQuizWithMe
            });

            _export('UserModel', UserModel);
        }
    };
});
$__System.register('36', ['2d', '2e', '2f'], function (_export, _context13) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, createOrUpdate, getById, removeById, update, associateCollaborator, associateCollaborators, disassociateCollaborator, getCollaboratorUids, resolveVideoIds, filterVideosByCollaborator, VideoModel;

    return {
        setters: [function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'videos';

            createOrUpdate = function createOrUpdate(id, data) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var path, timestampEnabledData, _path;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!id) {
                                        _context.next = 8;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 5;
                                    return FirebaseService.update(path, data);

                                case 5:
                                    return _context.abrupt('return', id);

                                case 8:
                                    timestampEnabledData = Object.assign({}, data, {
                                        timestamp: window.firebase.database.ServerValue.TIMESTAMP
                                    });
                                    _path = dataPath;
                                    _context.next = 12;
                                    return FirebaseService.push(_path, timestampEnabledData);

                                case 12:
                                    return _context.abrupt('return', _context.sent);

                                case 13:
                                    _context.next = 18;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 18:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 15]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var path, video;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context2.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    video = _context2.sent;

                                    video.id = id;
                                    return _context2.abrupt('return', video);

                                case 9:
                                    _context2.prev = 9;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 9]]);
                }));
            };

            removeById = function removeById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return FirebaseService.remove(dataPath + '/' + id);

                                case 3:
                                    _context3.next = 8;
                                    break;

                                case 5:
                                    _context3.prev = 5;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 8:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 5]]);
                }));
            };

            update = function update(id, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context4.next = 4;
                                    return FirebaseService.update(path, data);

                                case 4:
                                    _context4.next = 9;
                                    break;

                                case 6:
                                    _context4.prev = 6;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 9:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 6]]);
                }));
            };

            associateCollaborator = function associateCollaborator(videoId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee5() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    path = dataPath + '/' + videoId + '/collaborators/' + uid;
                                    _context5.next = 4;
                                    return FirebaseService.set(path, uid);

                                case 4:
                                    _context5.next = 9;
                                    break;

                                case 6:
                                    _context5.prev = 6;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 9:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 6]]);
                }));
            };

            associateCollaborators = function associateCollaborators(videoId, uids) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var uidsObject, path;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    uidsObject = uids.reduce(function (prev, curr) {
                                        prev[curr] = curr;
                                        return prev;
                                    }, {});
                                    path = dataPath + '/' + videoId + '/collaborators';
                                    _context6.next = 5;
                                    return FirebaseService.update(path, uidsObject);

                                case 5:
                                    _context6.next = 10;
                                    break;

                                case 7:
                                    _context6.prev = 7;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 10:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 7]]);
                }));
            };

            disassociateCollaborator = function disassociateCollaborator(videoId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    path = dataPath + '/' + videoId + '/collaborators/' + uid;
                                    _context7.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context7.next = 9;
                                    break;

                                case 6:
                                    _context7.prev = 6;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 9:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 6]]);
                }));
            };

            getCollaboratorUids = function getCollaboratorUids(videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    path = dataPath + '/' + videoId + '/collaborators';
                                    _context8.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context8.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context8.abrupt('return', collaboratorUids);

                                case 9:
                                    _context8.prev = 9;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 12:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 9]]);
                }));
            };

            resolveVideoIds = function resolveVideoIds(videoIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    return _context11.delegateYield(_regeneratorRuntime.mark(function _callee10() {
                                        var asyncReduce = function asyncReduce(videoIds, videos) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                                                var videoId, video;
                                                return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                                    while (1) {
                                                        switch (_context9.prev = _context9.next) {
                                                            case 0:
                                                                if (!(videoIds.length === 0)) {
                                                                    _context9.next = 2;
                                                                    break;
                                                                }

                                                                return _context9.abrupt('return', videos);

                                                            case 2:
                                                                videoId = videoIds[0];
                                                                _context9.next = 5;
                                                                return getById(videoId);

                                                            case 5:
                                                                video = _context9.sent;

                                                                video.id = videoId;
                                                                return _context9.abrupt('return', asyncReduce(videoIds.slice(1), [].concat(_toConsumableArray(videos), [video])));

                                                            case 8:
                                                            case 'end':
                                                                return _context9.stop();
                                                        }
                                                    }
                                                }, _callee9, this);
                                            }));
                                        };

                                        var videos;
                                        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                                            while (1) {
                                                switch (_context10.prev = _context10.next) {
                                                    case 0:
                                                        _context10.next = 2;
                                                        return asyncReduce(videoIds, []);

                                                    case 2:
                                                        videos = _context10.sent;
                                                        return _context10.abrupt('return', {
                                                            v: videos
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context10.stop();
                                                }
                                            }
                                        }, _callee10, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context11.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context11.next = 5;
                                        break;
                                    }

                                    return _context11.abrupt('return', _ret.v);

                                case 5:
                                    _context11.next = 10;
                                    break;

                                case 7:
                                    _context11.prev = 7;
                                    _context11.t1 = _context11['catch'](0);
                                    throw _context11.t1;

                                case 10:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 7]]);
                }));
            };

            filterVideosByCollaborator = function filterVideosByCollaborator(videoIds, conceptUid, collaboratorUid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee12() {
                    var videos;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.next = 2;
                                    return resolveVideoIds(videoIds);

                                case 2:
                                    videos = _context12.sent;
                                    return _context12.abrupt('return', videos.filter(function (video) {
                                        if (conceptUid === collaboratorUid) {
                                            return true;
                                        }
                                        if (!video.collaborators) {
                                            return false;
                                        }
                                        if (video.collaborators[collaboratorUid]) {
                                            return true;
                                        }
                                        return false;
                                    }));

                                case 4:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this);
                }));
            };

            _export('VideoModel', VideoModel = {
                createOrUpdate: createOrUpdate,
                update: update,
                getById: getById,
                removeById: removeById,
                associateCollaborator: associateCollaborator,
                disassociateCollaborator: disassociateCollaborator,
                getCollaboratorUids: getCollaboratorUids,
                dataPath: dataPath,
                resolveVideoIds: resolveVideoIds,
                associateCollaborators: associateCollaborators,
                filterVideosByCollaborator: filterVideosByCollaborator
            });

            _export('VideoModel', VideoModel);
        }
    };
});
$__System.register('39', ['2d', '2e', '2f'], function (_export, _context19) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, createOrUpdate, getById, removeById, associateQuestion, disassociateQuestion, associateCollaborator, associateCollaborators, disassociateCollaborator, getCollaboratorUids, setQuestionSetting, setQuizSetting, getQuizSettings, updateTitle, getQuestionIds, resolveQuizIds, filterQuizzesByCollaborator, QuizModel;

    return {
        setters: [function (_d) {
            _toConsumableArray = _d.default;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'quizzes';

            createOrUpdate = function createOrUpdate(id, data) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var path, timestampEnabledData, _path;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!id) {
                                        _context.next = 8;
                                        break;
                                    }

                                    path = dataPath + '/' + id;
                                    _context.next = 5;
                                    return FirebaseService.update(path, data);

                                case 5:
                                    return _context.abrupt('return', id);

                                case 8:
                                    timestampEnabledData = Object.assign({}, data, {
                                        timestamp: window.firebase.database.ServerValue.TIMESTAMP
                                    });
                                    _path = dataPath;
                                    _context.next = 12;
                                    return FirebaseService.push(_path, timestampEnabledData);

                                case 12:
                                    return _context.abrupt('return', _context.sent);

                                case 13:
                                    _context.next = 18;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 18:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 15]]);
                }));
            };

            getById = function getById(id) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var path, quiz;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context2.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    quiz = _context2.sent;

                                    quiz.id = id;
                                    return _context2.abrupt('return', quiz);

                                case 9:
                                    _context2.prev = 9;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 9]]);
                }));
            };

            removeById = function removeById(id) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return FirebaseService.remove(dataPath + '/' + id);

                                case 3:
                                    _context3.next = 8;
                                    break;

                                case 5:
                                    _context3.prev = 5;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 8:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 5]]);
                }));
            };

            associateQuestion = function associateQuestion(quizId, questionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions/' + questionId + '/settings';
                                    _context4.next = 4;
                                    return FirebaseService.set(path, {
                                        answerFeedback: true,
                                        showAnswer: true,
                                        showHint: true,
                                        showCode: true,
                                        graded: true,
                                        showConfidenceLevel: true,
                                        allowGeneration: true
                                    });

                                case 4:
                                    _context4.next = 9;
                                    break;

                                case 6:
                                    _context4.prev = 6;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 9:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 6]]);
                }));
            };

            disassociateQuestion = function disassociateQuestion(quizId, questionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions/' + questionId;
                                    _context5.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context5.next = 9;
                                    break;

                                case 6:
                                    _context5.prev = 6;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 9:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 6]]);
                }));
            };

            associateCollaborator = function associateCollaborator(quizId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    path = dataPath + '/' + quizId + '/collaborators/' + uid;
                                    _context6.next = 4;
                                    return FirebaseService.set(path, uid);

                                case 4:
                                    _context6.next = 9;
                                    break;

                                case 6:
                                    _context6.prev = 6;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 9:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 6]]);
                }));
            };

            associateCollaborators = function associateCollaborators(quizId, uids) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var uidsObject, path;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    uidsObject = uids.reduce(function (prev, curr) {
                                        prev[curr] = curr;
                                        return prev;
                                    }, {});
                                    path = dataPath + '/' + quizId + '/collaborators';
                                    _context7.next = 5;
                                    return FirebaseService.update(path, uidsObject);

                                case 5:
                                    _context7.next = 10;
                                    break;

                                case 7:
                                    _context7.prev = 7;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 10:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 7]]);
                }));
            };

            disassociateCollaborator = function disassociateCollaborator(quizId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    path = dataPath + '/' + quizId + '/collaborators/' + uid;
                                    _context8.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context8.next = 9;
                                    break;

                                case 6:
                                    _context8.prev = 6;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 9:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 6]]);
                }));
            };

            getCollaboratorUids = function getCollaboratorUids(quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    path = dataPath + '/' + quizId + '/collaborators';
                                    _context9.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context9.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context9.abrupt('return', collaboratorUids);

                                case 9:
                                    _context9.prev = 9;
                                    _context9.t0 = _context9['catch'](0);
                                    throw _context9.t0;

                                case 12:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[0, 9]]);
                }));
            };

            setQuestionSetting = function setQuestionSetting(quizId, questionId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions/' + questionId + '/settings/' + settingName;
                                    _context10.next = 4;
                                    return FirebaseService.set(path, value);

                                case 4:
                                    _context10.next = 9;
                                    break;

                                case 6:
                                    _context10.prev = 6;
                                    _context10.t0 = _context10['catch'](0);
                                    throw _context10.t0;

                                case 9:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 6]]);
                }));
            };

            setQuizSetting = function setQuizSetting(quizId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee11() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    path = dataPath + '/' + quizId + '/quizSettings/' + settingName;
                                    _context11.next = 4;
                                    return FirebaseService.set(path, value);

                                case 4:
                                    _context11.next = 9;
                                    break;

                                case 6:
                                    _context11.prev = 6;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 9:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 6]]);
                }));
            };

            getQuizSettings = function getQuizSettings(quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + quizId + '/quizSettings';
                                    _context12.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    return _context12.abrupt('return', _context12.sent);

                                case 7:
                                    _context12.prev = 7;
                                    _context12.t0 = _context12['catch'](0);
                                    throw _context12.t0;

                                case 10:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this, [[0, 7]]);
                }));
            };

            updateTitle = function updateTitle(quizId, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee13() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    path = dataPath + '/' + quizId + '/title';
                                    _context13.next = 4;
                                    return FirebaseService.set(path, value);

                                case 4:
                                    _context13.next = 9;
                                    break;

                                case 6:
                                    _context13.prev = 6;
                                    _context13.t0 = _context13['catch'](0);
                                    throw _context13.t0;

                                case 9:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[0, 6]]);
                }));
            };

            getQuestionIds = function getQuestionIds(quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee14() {
                    var path, questionsObject;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions';
                                    _context14.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    questionsObject = _context14.sent;
                                    return _context14.abrupt('return', Object.keys(questionsObject || {}));

                                case 8:
                                    _context14.prev = 8;
                                    _context14.t0 = _context14['catch'](0);
                                    throw _context14.t0;

                                case 11:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this, [[0, 8]]);
                }));
            };

            resolveQuizIds = function resolveQuizIds(quizIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee17() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    _context17.prev = 0;
                                    return _context17.delegateYield(_regeneratorRuntime.mark(function _callee16() {
                                        var asyncReduce = function asyncReduce(quizIds, quizzes) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee15() {
                                                var quizId, quiz;
                                                return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                                                    while (1) {
                                                        switch (_context15.prev = _context15.next) {
                                                            case 0:
                                                                if (!(quizIds.length === 0)) {
                                                                    _context15.next = 2;
                                                                    break;
                                                                }

                                                                return _context15.abrupt('return', quizzes);

                                                            case 2:
                                                                quizId = quizIds[0];
                                                                _context15.next = 5;
                                                                return getById(quizId);

                                                            case 5:
                                                                quiz = _context15.sent;

                                                                quiz.id = quizId;
                                                                return _context15.abrupt('return', asyncReduce(quizIds.slice(1), [].concat(_toConsumableArray(quizzes), [quiz])));

                                                            case 8:
                                                            case 'end':
                                                                return _context15.stop();
                                                        }
                                                    }
                                                }, _callee15, this);
                                            }));
                                        };

                                        var quizzes;
                                        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                                            while (1) {
                                                switch (_context16.prev = _context16.next) {
                                                    case 0:
                                                        _context16.next = 2;
                                                        return asyncReduce(quizIds, []);

                                                    case 2:
                                                        quizzes = _context16.sent;
                                                        return _context16.abrupt('return', {
                                                            v: quizzes
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context16.stop();
                                                }
                                            }
                                        }, _callee16, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context17.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context17.next = 5;
                                        break;
                                    }

                                    return _context17.abrupt('return', _ret.v);

                                case 5:
                                    _context17.next = 10;
                                    break;

                                case 7:
                                    _context17.prev = 7;
                                    _context17.t1 = _context17['catch'](0);
                                    throw _context17.t1;

                                case 10:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this, [[0, 7]]);
                }));
            };

            filterQuizzesByCollaborator = function filterQuizzesByCollaborator(quizIds, conceptUid, collaboratorUid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee18() {
                    var quizzes;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    _context18.next = 2;
                                    return resolveQuizIds(quizIds);

                                case 2:
                                    quizzes = _context18.sent;
                                    return _context18.abrupt('return', quizzes.filter(function (quiz) {
                                        if (conceptUid === collaboratorUid) {
                                            return true;
                                        }
                                        if (!quiz.collaborators) {
                                            return false;
                                        }
                                        if (quiz.collaborators[collaboratorUid]) {
                                            return true;
                                        }
                                        return false;
                                    }));

                                case 4:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this);
                }));
            };

            _export('QuizModel', QuizModel = {
                dataPath: dataPath,
                createOrUpdate: createOrUpdate,
                getById: getById,
                removeById: removeById,
                associateQuestion: associateQuestion,
                getQuestionIds: getQuestionIds,
                disassociateQuestion: disassociateQuestion,
                setQuestionSetting: setQuestionSetting,
                setQuizSetting: setQuizSetting,
                getQuizSettings: getQuizSettings,
                updateTitle: updateTitle,
                associateCollaborator: associateCollaborator,
                getCollaboratorUids: getCollaboratorUids,
                disassociateCollaborator: disassociateCollaborator,
                resolveQuizIds: resolveQuizIds,
                associateCollaborators: associateCollaborators,
                filterQuizzesByCollaborator: filterQuizzesByCollaborator
            });

            _export('QuizModel', QuizModel);
        }
    };
});
$__System.register('42', ['2e', '2f'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, setUidByEmail, getUidByEmail, EmailsToUidsModel;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            dataPath = 'emailsToUids';

            setUidByEmail = function setUidByEmail(email, uid) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var encodedEmail, path;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    encodedEmail = btoa(email);
                                    path = dataPath + '/' + encodedEmail;
                                    _context.next = 5;
                                    return FirebaseService.set(path, uid);

                                case 5:
                                    _context.next = 10;
                                    break;

                                case 7:
                                    _context.prev = 7;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 10:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 7]]);
                }));
            };

            getUidByEmail = function getUidByEmail(email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var encodedEmail, path, uid;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    encodedEmail = btoa(email);
                                    path = dataPath + '/' + encodedEmail;
                                    _context2.next = 5;
                                    return FirebaseService.get(path);

                                case 5:
                                    uid = _context2.sent;
                                    return _context2.abrupt('return', uid);

                                case 9:
                                    _context2.prev = 9;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 9]]);
                }));
            };

            _export('EmailsToUidsModel', EmailsToUidsModel = {
                setUidByEmail: setUidByEmail,
                getUidByEmail: getUidByEmail
            });

            _export('EmailsToUidsModel', EmailsToUidsModel);
        }
    };
});
$__System.register("2d", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }return arr2;
        } else {
          return Array.from(arr);
        }
      });
    }
  };
});
$__System.register("43", ["2e", "2d"], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _toConsumableArray, _this, __awaiter, queue, transactionOccurring, execute, ExecuteAsyncInOrder;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_d) {
            _toConsumableArray = _d.default;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            queue = [];
            transactionOccurring = false;

            execute = function execute(newOperation) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var currentOperation;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (newOperation) {
                                        queue = [].concat(_toConsumableArray(queue), [newOperation]);
                                    }

                                    if (!transactionOccurring) {
                                        _context.next = 3;
                                        break;
                                    }

                                    return _context.abrupt("return");

                                case 3:
                                    currentOperation = queue[0];

                                    if (currentOperation) {
                                        _context.next = 6;
                                        break;
                                    }

                                    return _context.abrupt("return");

                                case 6:
                                    queue = queue.slice(1);
                                    transactionOccurring = true;
                                    _context.next = 10;
                                    return currentOperation();

                                case 10:
                                    transactionOccurring = false;
                                    execute(null);

                                case 12:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            };

            _export("ExecuteAsyncInOrder", ExecuteAsyncInOrder = {
                execute: execute
            });

            _export("ExecuteAsyncInOrder", ExecuteAsyncInOrder);
        }
    };
});
$__System.register('3e',['36','39','40','41','42','43','2e','2f','3f'],function(_export,_context65){"use strict";var _regeneratorRuntime,FirebaseService,CourseModel,ConceptModel,UserModel,VideoModel,QuizModel,EmailsToUidsModel,ExecuteAsyncInOrder,_this,__awaiter,showMainSpinner,hideMainSpinner,loadCourseCollaboratorEmails,loadConceptCollaboratorEmails,loadVideoCollaboratorEmails,loadQuizCollaboratorEmails,addCourseCollaborator,addConceptCollaborator,addVideoCollaborator,addQuizCollaborator,removeCourseCollaborator,removeConceptCollaborator,removeVideoCollaborator,removeQuizCollaborator,starCourse,unstarCourse,getQuiz,updateQuizTitle,createNewQuiz,loadEditConceptQuizzes,loadViewConceptQuizzes,setCurrentEditQuizId,loadQuizSettings,setQuizSetting,setQuestionSetting,loadQuizQuestionIds,addQuestionToQuiz,removeQuestionFromQuiz,loadUserQuestionIds,loadPublicQuestionIds,deleteVideo,saveVideo,setCurrentVideoInfo,clearCurrentVideoInfo,loadEditConceptVideos,loadViewConceptVideos,loadEditCourseConcepts,loadViewCourseConcepts,createUser,loginUser,updateUserEmail,updateUserMetaData,checkUserAuth,addConcept,getConceptById,addCourse,getCoursesByUser,getStarredCoursesByUser,getSharedCoursesByUser,getCoursesByVisibility,getCourseViewCourseById,getCourseEditCourseById,deleteConcept,orderConcepts,updateCourseField,logOutUser,Actions;return{setters:[function(_){VideoModel=_.VideoModel;},function(_2){QuizModel=_2.QuizModel;},function(_3){ConceptModel=_3.ConceptModel;},function(_4){UserModel=_4.UserModel;},function(_5){EmailsToUidsModel=_5.EmailsToUidsModel;},function(_6){ExecuteAsyncInOrder=_6.ExecuteAsyncInOrder;},function(_e){_regeneratorRuntime=_e.default;},function(_f){FirebaseService=_f.FirebaseService;},function(_f2){CourseModel=_f2.CourseModel;}],execute:function(){_this=this;__awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator.throw(value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value);}).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments)).next());});};showMainSpinner=function showMainSpinner(context){context.action={type:'SHOW_MAIN_SPINNER'};};hideMainSpinner=function hideMainSpinner(context){context.action={type:'HIDE_MAIN_SPINNER'};};loadCourseCollaboratorEmails=function loadCourseCollaboratorEmails(context,uid,courseId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee2(){var operation;return _regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee(){var uids,emails,conceptIds;return _regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return CourseModel.getCollaboratorUids(courseId);case 3:uids=_context.sent;_context.next=6;return FirebaseService.set('security/'+uid+'/collaboratorSecurityInfo',{collection:CourseModel.dataPath,id:courseId});case 6:_context.next=8;return UserModel.getEmailsByIds(uids);case 8:emails=_context.sent;context.action={type:'SET_COURSE_COLLABORATOR_EMAILS',emails:emails,uid:uid,courseId:courseId};_context.next=12;return CourseModel.getConceptIds(courseId);case 12:conceptIds=_context.sent;conceptIds.forEach(function(conceptId){loadConceptCollaboratorEmails(context,courseId,conceptId);});_context.next=19;break;case 16:_context.prev=16;_context.t0=_context['catch'](0);throw _context.t0;case 19:case'end':return _context.stop();}}},_callee,this,[[0,16]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context2.stop();}}},_callee2,this);}));};loadConceptCollaboratorEmails=function loadConceptCollaboratorEmails(context,courseId,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee4(){var operation;return _regeneratorRuntime.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee3(){var user,uids,emails,videoIds,quizIds;return _regeneratorRuntime.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.prev=0;_context3.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context3.sent;_context3.next=6;return ConceptModel.getCollaboratorUids(conceptId);case 6:uids=_context3.sent;_context3.next=9;return FirebaseService.set('security/'+user.uid+'/collaboratorSecurityInfo',{collection:ConceptModel.dataPath,id:conceptId});case 9:_context3.next=11;return UserModel.getEmailsByIds(uids);case 11:emails=_context3.sent;context.action={type:'SET_CONCEPT_COLLABORATOR_EMAILS',emails:emails,courseId:courseId,conceptId:conceptId};_context3.next=15;return ConceptModel.getVideoIds(conceptId);case 15:videoIds=_context3.sent;videoIds.forEach(function(videoId){loadVideoCollaboratorEmails(context,conceptId,videoId);});_context3.next=19;return ConceptModel.getQuizIds(conceptId);case 19:quizIds=_context3.sent;quizIds.forEach(function(quizId){loadQuizCollaboratorEmails(context,conceptId,quizId);});_context3.next=26;break;case 23:_context3.prev=23;_context3.t0=_context3['catch'](0);throw _context3.t0;case 26:case'end':return _context3.stop();}}},_callee3,this,[[0,23]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context4.stop();}}},_callee4,this);}));};loadVideoCollaboratorEmails=function loadVideoCollaboratorEmails(context,conceptId,videoId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee6(){var operation;return _regeneratorRuntime.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee5(){var user,uids,emails;return _regeneratorRuntime.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.prev=0;_context5.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context5.sent;_context5.next=6;return VideoModel.getCollaboratorUids(videoId);case 6:uids=_context5.sent;_context5.next=9;return FirebaseService.set('security/'+user.uid+'/collaboratorSecurityInfo',{collection:VideoModel.dataPath,id:videoId});case 9:_context5.next=11;return UserModel.getEmailsByIds(uids);case 11:emails=_context5.sent;context.action={type:'SET_VIDEO_COLLABORATOR_EMAILS',emails:emails,conceptId:conceptId,videoId:videoId};_context5.next=18;break;case 15:_context5.prev=15;_context5.t0=_context5['catch'](0);throw _context5.t0;case 18:case'end':return _context5.stop();}}},_callee5,this,[[0,15]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context6.stop();}}},_callee6,this);}));};loadQuizCollaboratorEmails=function loadQuizCollaboratorEmails(context,conceptId,quizId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee8(){var operation;return _regeneratorRuntime.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee7(){var user,uids,emails;return _regeneratorRuntime.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:_context7.prev=0;_context7.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context7.sent;_context7.next=6;return QuizModel.getCollaboratorUids(quizId);case 6:uids=_context7.sent;_context7.next=9;return FirebaseService.set('security/'+user.uid+'/collaboratorSecurityInfo',{collection:QuizModel.dataPath,id:quizId});case 9:_context7.next=11;return UserModel.getEmailsByIds(uids);case 11:emails=_context7.sent;context.action={type:'SET_QUIZ_COLLABORATOR_EMAILS',emails:emails,conceptId:conceptId,quizId:quizId};_context7.next=18;break;case 15:_context7.prev=15;_context7.t0=_context7['catch'](0);throw _context7.t0;case 18:case'end':return _context7.stop();}}},_callee7,this,[[0,15]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context8.stop();}}},_callee8,this);}));};addCourseCollaborator=function addCourseCollaborator(context,courseId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee10(){var operation;return _regeneratorRuntime.wrap(function _callee10$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee9(){var user,uid;return _regeneratorRuntime.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:_context9.prev=0;_context9.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context9.sent;_context9.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context9.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context9.sent;if(uid){_context9.next=11;break;}throw'The user does not exist';case 11:_context9.next=13;return CourseModel.associateCollaborator(courseId,uid);case 13:_context9.next=15;return UserModel.shareCourseWithMe(uid,courseId);case 15:_context9.next=20;break;case 17:_context9.prev=17;_context9.t0=_context9['catch'](0);throw _context9.t0;case 20:case'end':return _context9.stop();}}},_callee9,this,[[0,17]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context10.stop();}}},_callee10,this);}));};addConceptCollaborator=function addConceptCollaborator(context,conceptId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee12(){var operation;return _regeneratorRuntime.wrap(function _callee12$(_context12){while(1){switch(_context12.prev=_context12.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee11(){var user,uid;return _regeneratorRuntime.wrap(function _callee11$(_context11){while(1){switch(_context11.prev=_context11.next){case 0:_context11.prev=0;_context11.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context11.sent;_context11.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context11.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context11.sent;if(uid){_context11.next=11;break;}throw'The user does not exist';case 11:_context11.next=13;return ConceptModel.associateCollaborator(conceptId,uid);case 13:_context11.next=15;return UserModel.shareConceptWithMe(uid,conceptId);case 15:_context11.next=20;break;case 17:_context11.prev=17;_context11.t0=_context11['catch'](0);throw _context11.t0;case 20:case'end':return _context11.stop();}}},_callee11,this,[[0,17]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context12.stop();}}},_callee12,this);}));};addVideoCollaborator=function addVideoCollaborator(context,videoId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee14(){var operation;return _regeneratorRuntime.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee13(){var user,uid;return _regeneratorRuntime.wrap(function _callee13$(_context13){while(1){switch(_context13.prev=_context13.next){case 0:_context13.prev=0;_context13.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context13.sent;_context13.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context13.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context13.sent;if(uid){_context13.next=11;break;}throw'The user does not exist';case 11:_context13.next=13;return VideoModel.associateCollaborator(videoId,uid);case 13:_context13.next=15;return UserModel.shareVideoWithMe(uid,videoId);case 15:_context13.next=20;break;case 17:_context13.prev=17;_context13.t0=_context13['catch'](0);throw _context13.t0;case 20:case'end':return _context13.stop();}}},_callee13,this,[[0,17]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context14.stop();}}},_callee14,this);}));};addQuizCollaborator=function addQuizCollaborator(context,quizId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee16(){var operation;return _regeneratorRuntime.wrap(function _callee16$(_context16){while(1){switch(_context16.prev=_context16.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee15(){var user,uid;return _regeneratorRuntime.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:_context15.prev=0;_context15.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context15.sent;_context15.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context15.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context15.sent;if(uid){_context15.next=11;break;}throw'The user does not exist';case 11:_context15.next=13;return QuizModel.associateCollaborator(quizId,uid);case 13:_context15.next=15;return UserModel.shareQuizWithMe(uid,quizId);case 15:_context15.next=20;break;case 17:_context15.prev=17;_context15.t0=_context15['catch'](0);throw _context15.t0;case 20:case'end':return _context15.stop();}}},_callee15,this,[[0,17]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context16.stop();}}},_callee16,this);}));};removeCourseCollaborator=function removeCourseCollaborator(context,courseId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee18(){var operation;return _regeneratorRuntime.wrap(function _callee18$(_context18){while(1){switch(_context18.prev=_context18.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee17(){var user,uid;return _regeneratorRuntime.wrap(function _callee17$(_context17){while(1){switch(_context17.prev=_context17.next){case 0:_context17.prev=0;_context17.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context17.sent;_context17.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context17.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context17.sent;if(uid){_context17.next=11;break;}throw'The user does not exist';case 11:_context17.next=13;return CourseModel.disassociateCollaborator(courseId,uid);case 13:_context17.next=15;return UserModel.unshareCourseWithMe(uid,courseId);case 15:_context17.next=20;break;case 17:_context17.prev=17;_context17.t0=_context17['catch'](0);throw _context17.t0;case 20:case'end':return _context17.stop();}}},_callee17,this,[[0,17]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context18.stop();}}},_callee18,this);}));};removeConceptCollaborator=function removeConceptCollaborator(context,conceptId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee20(){var operation;return _regeneratorRuntime.wrap(function _callee20$(_context20){while(1){switch(_context20.prev=_context20.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee19(){var user,uid;return _regeneratorRuntime.wrap(function _callee19$(_context19){while(1){switch(_context19.prev=_context19.next){case 0:_context19.prev=0;_context19.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context19.sent;_context19.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context19.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context19.sent;if(uid){_context19.next=11;break;}throw'The user does not exist';case 11:_context19.next=13;return ConceptModel.disassociateCollaborator(conceptId,uid);case 13:_context19.next=18;break;case 15:_context19.prev=15;_context19.t0=_context19['catch'](0);throw _context19.t0;case 18:case'end':return _context19.stop();}}},_callee19,this,[[0,15]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context20.stop();}}},_callee20,this);}));};removeVideoCollaborator=function removeVideoCollaborator(context,videoId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee22(){var operation;return _regeneratorRuntime.wrap(function _callee22$(_context22){while(1){switch(_context22.prev=_context22.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee21(){var user,uid;return _regeneratorRuntime.wrap(function _callee21$(_context21){while(1){switch(_context21.prev=_context21.next){case 0:_context21.prev=0;_context21.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context21.sent;_context21.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context21.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context21.sent;if(uid){_context21.next=11;break;}throw'The user does not exist';case 11:_context21.next=13;return VideoModel.disassociateCollaborator(videoId,uid);case 13:_context21.next=18;break;case 15:_context21.prev=15;_context21.t0=_context21['catch'](0);throw _context21.t0;case 18:case'end':return _context21.stop();}}},_callee21,this,[[0,15]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context22.stop();}}},_callee22,this);}));};removeQuizCollaborator=function removeQuizCollaborator(context,quizId,email){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee24(){var operation;return _regeneratorRuntime.wrap(function _callee24$(_context24){while(1){switch(_context24.prev=_context24.next){case 0:operation=function operation(){return __awaiter(this,void 0,void 0,_regeneratorRuntime.mark(function _callee23(){var user,uid;return _regeneratorRuntime.wrap(function _callee23$(_context23){while(1){switch(_context23.prev=_context23.next){case 0:_context23.prev=0;_context23.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context23.sent;_context23.next=6;return FirebaseService.set('security/'+user.uid+'/emailToUidSecurityInfo/encodedEmail',btoa(email));case 6:_context23.next=8;return EmailsToUidsModel.getUidByEmail(email);case 8:uid=_context23.sent;if(uid){_context23.next=11;break;}throw'The user does not exist';case 11:_context23.next=13;return QuizModel.disassociateCollaborator(quizId,uid);case 13:_context23.next=18;break;case 15:_context23.prev=15;_context23.t0=_context23['catch'](0);throw _context23.t0;case 18:case'end':return _context23.stop();}}},_callee23,this,[[0,15]]);}));};ExecuteAsyncInOrder.execute(operation);case 2:case'end':return _context24.stop();}}},_callee24,this);}));};starCourse=function starCourse(context,courseId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee25(){var user;return _regeneratorRuntime.wrap(function _callee25$(_context25){while(1){switch(_context25.prev=_context25.next){case 0:_context25.next=2;return FirebaseService.getLoggedInUser();case 2:user=_context25.sent;_context25.next=5;return CourseModel.associateUserStar(courseId,user.uid);case 5:_context25.next=7;return UserModel.starCourse(user.uid,courseId);case 7:context.action={type:'STAR_COURSE'};case 8:case'end':return _context25.stop();}}},_callee25,this);}));};unstarCourse=function unstarCourse(context,courseId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee26(){var user;return _regeneratorRuntime.wrap(function _callee26$(_context26){while(1){switch(_context26.prev=_context26.next){case 0:_context26.next=2;return FirebaseService.getLoggedInUser();case 2:user=_context26.sent;_context26.next=5;return CourseModel.disassociateUserStar(courseId,user.uid);case 5:_context26.next=7;return UserModel.unstarCourse(user.uid,courseId);case 7:context.action={type:'UNSTAR_COURSE'};case 8:case'end':return _context26.stop();}}},_callee26,this);}));};getQuiz=function getQuiz(quizId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee27(){var quiz;return _regeneratorRuntime.wrap(function _callee27$(_context27){while(1){switch(_context27.prev=_context27.next){case 0:_context27.next=2;return QuizModel.getById(quizId);case 2:quiz=_context27.sent;return _context27.abrupt('return',quiz);case 4:case'end':return _context27.stop();}}},_callee27,this);}));};updateQuizTitle=function updateQuizTitle(quizId,title){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee28(){return _regeneratorRuntime.wrap(function _callee28$(_context28){while(1){switch(_context28.prev=_context28.next){case 0:_context28.next=2;return QuizModel.updateTitle(quizId,title);case 2:case'end':return _context28.stop();}}},_callee28,this);}));};createNewQuiz=function createNewQuiz(context,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee29(){var user,uid,quizId,conceptCollaboratorUids;return _regeneratorRuntime.wrap(function _callee29$(_context29){while(1){switch(_context29.prev=_context29.next){case 0:_context29.next=2;return FirebaseService.getLoggedInUser();case 2:user=_context29.sent;uid=user.uid;_context29.next=6;return QuizModel.createOrUpdate(null,{id:null,uid:uid,title:'Untitled Quiz',private:false,quizSettings:{answerFeedback:true,showAnswer:true,showHint:true,showCode:true,graded:false,showConfidenceLevel:false,allowGeneration:true},questions:{},collaborators:{}});case 6:quizId=_context29.sent;_context29.next=9;return ConceptModel.associateQuiz(conceptId,quizId);case 9:_context29.next=11;return ConceptModel.getCollaboratorUids(conceptId);case 11:conceptCollaboratorUids=_context29.sent;_context29.next=14;return QuizModel.associateCollaborators(quizId,conceptCollaboratorUids);case 14:return _context29.abrupt('return',quizId);case 15:case'end':return _context29.stop();}}},_callee29,this);}));};loadEditConceptQuizzes=function loadEditConceptQuizzes(context,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee30(){var user,concept,quizzIds,quizzes;return _regeneratorRuntime.wrap(function _callee30$(_context30){while(1){switch(_context30.prev=_context30.next){case 0:_context30.next=2;return FirebaseService.getLoggedInUser();case 2:user=_context30.sent;_context30.next=5;return ConceptModel.getById(conceptId);case 5:concept=_context30.sent;_context30.next=8;return ConceptModel.getQuizIds(conceptId);case 8:quizzIds=_context30.sent;_context30.next=11;return QuizModel.filterQuizzesByCollaborator(quizzIds,concept.uid,user.uid);case 11:quizzes=_context30.sent;context.action={type:'LOAD_EDIT_CONCEPT_QUIZZES',conceptId:conceptId,quizzes:quizzes};case 13:case'end':return _context30.stop();}}},_callee30,this);}));};loadViewConceptQuizzes=function loadViewConceptQuizzes(context,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee31(){var quizzIds,quizzes;return _regeneratorRuntime.wrap(function _callee31$(_context31){while(1){switch(_context31.prev=_context31.next){case 0:_context31.next=2;return ConceptModel.getQuizIds(conceptId);case 2:quizzIds=_context31.sent;_context31.next=5;return QuizModel.resolveQuizIds(quizzIds);case 5:quizzes=_context31.sent;context.action={type:'LOAD_VIEW_CONCEPT_QUIZZES',conceptId:conceptId,quizzes:quizzes};case 7:case'end':return _context31.stop();}}},_callee31,this);}));};setCurrentEditQuizId=function setCurrentEditQuizId(context,quizId){context.action={type:'SET_CURRENT_EDIT_QUIZ_ID',quizId:quizId};};loadQuizSettings=function loadQuizSettings(context,quizId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee32(){var quizSettings;return _regeneratorRuntime.wrap(function _callee32$(_context32){while(1){switch(_context32.prev=_context32.next){case 0:_context32.next=2;return QuizModel.getQuizSettings(quizId);case 2:quizSettings=_context32.sent;context.action={type:'LOAD_QUIZ_SETTINGS',quizSettings:quizSettings};case 4:case'end':return _context32.stop();}}},_callee32,this);}));};setQuizSetting=function setQuizSetting(context,quizId,settingName,value){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee33(){return _regeneratorRuntime.wrap(function _callee33$(_context33){while(1){switch(_context33.prev=_context33.next){case 0:_context33.next=2;return QuizModel.setQuizSetting(quizId,settingName,value);case 2:case'end':return _context33.stop();}}},_callee33,this);}));};setQuestionSetting=function setQuestionSetting(context,quizId,questionId,settingName,value){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee34(){return _regeneratorRuntime.wrap(function _callee34$(_context34){while(1){switch(_context34.prev=_context34.next){case 0:_context34.next=2;return QuizModel.setQuestionSetting(quizId,questionId,settingName,value);case 2:case'end':return _context34.stop();}}},_callee34,this);}));};loadQuizQuestionIds=function loadQuizQuestionIds(context,quizId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee35(){var quizQuestionIds;return _regeneratorRuntime.wrap(function _callee35$(_context35){while(1){switch(_context35.prev=_context35.next){case 0:_context35.next=2;return QuizModel.getQuestionIds(quizId);case 2:quizQuestionIds=_context35.sent;context.action={type:'LOAD_QUIZ_QUESTION_IDS',quizQuestionIds:quizQuestionIds};case 4:case'end':return _context35.stop();}}},_callee35,this);}));};addQuestionToQuiz=function addQuestionToQuiz(context,quizId,questionId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee36(){return _regeneratorRuntime.wrap(function _callee36$(_context36){while(1){switch(_context36.prev=_context36.next){case 0:_context36.next=2;return QuizModel.associateQuestion(quizId,questionId);case 2:case'end':return _context36.stop();}}},_callee36,this);}));};removeQuestionFromQuiz=function removeQuestionFromQuiz(context,quizId,questionId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee37(){return _regeneratorRuntime.wrap(function _callee37$(_context37){while(1){switch(_context37.prev=_context37.next){case 0:_context37.next=2;return QuizModel.disassociateQuestion(quizId,questionId);case 2:case'end':return _context37.stop();}}},_callee37,this);}));};loadUserQuestionIds=function loadUserQuestionIds(context,getUserQuestionIdsAjax){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee38(){var request,userQuestionIds;return _regeneratorRuntime.wrap(function _callee38$(_context38){while(1){switch(_context38.prev=_context38.next){case 0:request=getUserQuestionIdsAjax.generateRequest();_context38.next=3;return request.completes;case 3:userQuestionIds=request.response.questionIds;context.action={type:'LOAD_USER_QUESTION_IDS',userQuestionIds:userQuestionIds};case 5:case'end':return _context38.stop();}}},_callee38,this);}));};loadPublicQuestionIds=function loadPublicQuestionIds(context,getPublicQuestionIdsAjax){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee39(){var request,publicQuestionIds;return _regeneratorRuntime.wrap(function _callee39$(_context39){while(1){switch(_context39.prev=_context39.next){case 0:request=getPublicQuestionIdsAjax.generateRequest();_context39.next=3;return request.completes;case 3:publicQuestionIds=request.response.questionIds;context.action={type:'LOAD_PUBLIC_QUESTION_IDS',publicQuestionIds:publicQuestionIds};case 5:case'end':return _context39.stop();}}},_callee39,this);}));};deleteVideo=function deleteVideo(context,conceptId,videoId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee40(){return _regeneratorRuntime.wrap(function _callee40$(_context40){while(1){switch(_context40.prev=_context40.next){case 0:_context40.prev=0;_context40.next=3;return ConceptModel.disassociateVideo(conceptId,videoId);case 3:_context40.next=8;break;case 5:_context40.prev=5;_context40.t0=_context40['catch'](0);throw _context40.t0;case 8:case'end':return _context40.stop();}}},_callee40,this,[[0,5]]);}));};saveVideo=function saveVideo(context,conceptId,videoId,video){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee41(){var newId,conceptCollaboratorUids;return _regeneratorRuntime.wrap(function _callee41$(_context41){while(1){switch(_context41.prev=_context41.next){case 0:_context41.prev=0;_context41.next=3;return VideoModel.createOrUpdate(videoId,video);case 3:newId=_context41.sent;_context41.next=6;return ConceptModel.associateVideo(conceptId,newId);case 6:if(videoId){_context41.next=12;break;}_context41.next=9;return ConceptModel.getCollaboratorUids(conceptId);case 9:conceptCollaboratorUids=_context41.sent;_context41.next=12;return VideoModel.associateCollaborators(newId,conceptCollaboratorUids);case 12:context.action={type:'SET_CURRENT_VIDEO_ID',id:newId};_context41.next=18;break;case 15:_context41.prev=15;_context41.t0=_context41['catch'](0);throw _context41.t0;case 18:case'end':return _context41.stop();}}},_callee41,this,[[0,15]]);}));};setCurrentVideoInfo=function setCurrentVideoInfo(context,id,title,url){context.action={type:'SET_CURRENT_VIDEO_INFO',id:id,title:title,url:url};};clearCurrentVideoInfo=function clearCurrentVideoInfo(context){context.action={type:'CLEAR_CURRENT_VIDEO_INFO'};};loadEditConceptVideos=function loadEditConceptVideos(context,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee42(){var user,concept,videoIds,videos;return _regeneratorRuntime.wrap(function _callee42$(_context42){while(1){switch(_context42.prev=_context42.next){case 0:_context42.prev=0;_context42.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context42.sent;_context42.next=6;return ConceptModel.getById(conceptId);case 6:concept=_context42.sent;_context42.next=9;return ConceptModel.getVideoIds(conceptId);case 9:videoIds=_context42.sent;_context42.next=12;return VideoModel.filterVideosByCollaborator(videoIds,concept.uid,user.uid);case 12:videos=_context42.sent;context.action={type:'LOAD_EDIT_CONCEPT_VIDEOS',videos:videos,conceptId:conceptId};_context42.next=19;break;case 16:_context42.prev=16;_context42.t0=_context42['catch'](0);throw _context42.t0;case 19:case'end':return _context42.stop();}}},_callee42,this,[[0,16]]);}));};loadViewConceptVideos=function loadViewConceptVideos(context,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee43(){var videoIds,videos;return _regeneratorRuntime.wrap(function _callee43$(_context43){while(1){switch(_context43.prev=_context43.next){case 0:_context43.prev=0;_context43.next=3;return ConceptModel.getVideoIds(conceptId);case 3:videoIds=_context43.sent;_context43.next=6;return VideoModel.resolveVideoIds(videoIds);case 6:videos=_context43.sent;context.action={type:'LOAD_VIEW_CONCEPT_VIDEOS',videos:videos,conceptId:conceptId};_context43.next=13;break;case 10:_context43.prev=10;_context43.t0=_context43['catch'](0);throw _context43.t0;case 13:case'end':return _context43.stop();}}},_callee43,this,[[0,10]]);}));};loadEditCourseConcepts=function loadEditCourseConcepts(context,courseId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee44(){var user,course,conceptDatasObject,concepts;return _regeneratorRuntime.wrap(function _callee44$(_context44){while(1){switch(_context44.prev=_context44.next){case 0:_context44.prev=0;_context44.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context44.sent;_context44.next=6;return CourseModel.getById(courseId);case 6:course=_context44.sent;conceptDatasObject=course.concepts;_context44.next=10;return ConceptModel.filterConceptDatasByCollaborator(conceptDatasObject,course.uid,user.uid);case 10:concepts=_context44.sent;context.action={type:'LOAD_EDIT_COURSE_CONCEPTS',concepts:concepts,courseId:courseId};_context44.next=17;break;case 14:_context44.prev=14;_context44.t0=_context44['catch'](0);throw _context44.t0;case 17:case'end':return _context44.stop();}}},_callee44,this,[[0,14]]);}));};loadViewCourseConcepts=function loadViewCourseConcepts(context,courseId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee46(){var _this2=this;return _regeneratorRuntime.wrap(function _callee46$(_context46){while(1){switch(_context46.prev=_context46.next){case 0:_context46.prev=0;return _context46.delegateYield(_regeneratorRuntime.mark(function _callee45(){var course,conceptDatasObject,concepts;return _regeneratorRuntime.wrap(function _callee45$(_context45){while(1){switch(_context45.prev=_context45.next){case 0:_context45.next=2;return CourseModel.getById(courseId);case 2:course=_context45.sent;conceptDatasObject=course.concepts;concepts=Object.keys(conceptDatasObject||{}).map(function(conceptDataId){return conceptDatasObject[conceptDataId];});context.action={type:'LOAD_VIEW_COURSE_CONCEPTS',concepts:concepts,courseId:courseId};case 6:case'end':return _context45.stop();}}},_callee45,_this2);})(),'t0',2);case 2:_context46.next=7;break;case 4:_context46.prev=4;_context46.t1=_context46['catch'](0);throw _context46.t1;case 7:case'end':return _context46.stop();}}},_callee46,this,[[0,4]]);}));};createUser={type:'CREATE_USER',execute:function execute(context,data,password){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee47(){var success,loggedInUser;return _regeneratorRuntime.wrap(function _callee47$(_context47){while(1){switch(_context47.prev=_context47.next){case 0:_context47.prev=0;_context47.next=3;return FirebaseService.createUserWithEmailAndPassword(data.email,password);case 3:success=_context47.sent;_context47.next=6;return FirebaseService.logInUserWithEmailAndPassword(data.email,password);case 6:loggedInUser=_context47.sent;_context47.next=9;return UserModel.updateMetaData(loggedInUser.uid,data);case 9:_context47.next=11;return EmailsToUidsModel.setUidByEmail(data.email,loggedInUser.uid);case 11://TODO I'm doing this because we're about to launch and it will fix the errors we've been having with synchronizing the user after signup.
//This just refreshes the whole app with the user logged in. Might want to change this, seems to work well though.
window.location.href='';_context47.next=17;break;case 14:_context47.prev=14;_context47.t0=_context47['catch'](0);throw _context47.t0;case 17:case'end':return _context47.stop();}}},_callee47,this,[[0,14]]);}));}};loginUser={type:'LOGIN_USER',execute:function execute(context,email,password){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee48(){var loggedInUser;return _regeneratorRuntime.wrap(function _callee48$(_context48){while(1){switch(_context48.prev=_context48.next){case 0:_context48.prev=0;_context48.next=3;return FirebaseService.logInUserWithEmailAndPassword(email,password);case 3:loggedInUser=_context48.sent;//let user = await UserModel.getById(loggedInUser.uid); //sets ancillary user data such as name, institution, etc.
//user.metaData.uid = loggedInUser.uid;
//const courses = await CourseModel.getCoursesByUser(loggedInUser.uid);
//need to go here so that user info loads when a user logs in. If not, starred courses and shared courses don't appear once they
//const starredCourseIds = await UserModel.getStarredCoursesIds(loggedInUser.uid);
//const starredCourses = await CourseModel.resolveCourseIds(starredCourseIds);
//const sharedCourseIds = await UserModel.getSharedWithMeCoursesIds(loggedInUser.uid);
//const sharedCourses = await CourseModel.resolveCourseIds(sharedCourseIds);
//TODO I'm doing this because we're about to launch and it will fix the errors we've been having with synchronizing the user after signup.
//This just refreshes the whole app with the user logged in. Might want to change this, seems to work well though.
window.location.href='';_context48.next=10;break;case 7:_context48.prev=7;_context48.t0=_context48['catch'](0);throw _context48.t0;case 10:case'end':return _context48.stop();}}},_callee48,this,[[0,7]]);}));}};updateUserEmail={type:'UPDATE_USER_PROFILE',execute:function execute(context,pastEmail,password,newEmail){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee49(){var loggedInUser;return _regeneratorRuntime.wrap(function _callee49$(_context49){while(1){switch(_context49.prev=_context49.next){case 0:_context49.prev=0;_context49.next=3;return FirebaseService.logInUserWithEmailAndPassword(pastEmail,password);case 3:loggedInUser=_context49.sent;_context49.next=6;return UserModel.updateFirebaseUser(loggedInUser,newEmail);case 6:_context49.next=11;break;case 8:_context49.prev=8;_context49.t0=_context49['catch'](0);throw _context49.t0;case 11:case'end':return _context49.stop();}}},_callee49,this,[[0,8]]);}));}};updateUserMetaData={type:'UPDATE_USER_META_DATA',execute:function execute(context,uid,metaData){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee50(){return _regeneratorRuntime.wrap(function _callee50$(_context50){while(1){switch(_context50.prev=_context50.next){case 0:_context50.prev=0;_context50.next=3;return UserModel.updateMetaData(uid,metaData);case 3:context.action={type:Actions.updateUserMetaData.type,user:metaData};_context50.next=9;break;case 6:_context50.prev=6;_context50.t0=_context50['catch'](0);throw _context50.t0;case 9:case'end':return _context50.stop();}}},_callee50,this,[[0,6]]);}));}};checkUserAuth={type:'CHECK_USER_AUTH',execute:function execute(context){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee51(){var loggedInUser,user,jwt;return _regeneratorRuntime.wrap(function _callee51$(_context51){while(1){switch(_context51.prev=_context51.next){case 0:_context51.prev=0;_context51.next=3;return FirebaseService.getLoggedInUser();case 3:loggedInUser=_context51.sent;if(!loggedInUser){_context51.next=13;break;}_context51.next=7;return UserModel.getById(loggedInUser.uid);case 7:user=_context51.sent;user.metaData.uid=loggedInUser.uid;//OK because its being created here.
_context51.next=11;return loggedInUser.getToken();case 11:jwt=_context51.sent;context.action={type:Actions.checkUserAuth.type,user:user,jwt:jwt};case 13:_context51.next=18;break;case 15:_context51.prev=15;_context51.t0=_context51['catch'](0);throw _context51.t0;case 18:case'end':return _context51.stop();}}},_callee51,this,[[0,15]]);}));}};addConcept={type:'ADD_CONCEPT',execute:function execute(context,courseId,newConcept,conceptPos){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee52(){var conceptId,course,conceptsArray,orderedConcepts,courseCollaboratorUids;return _regeneratorRuntime.wrap(function _callee52$(_context52){while(1){switch(_context52.prev=_context52.next){case 0:_context52.prev=0;_context52.next=3;return ConceptModel.save(null,newConcept);case 3:conceptId=_context52.sent;_context52.next=6;return CourseModel.associateConcept(courseId,conceptId,conceptPos);case 6:_context52.next=8;return CourseModel.getById(courseId);case 8:course=_context52.sent;_context52.next=11;return CourseModel.courseConceptsToArray(course);case 11:conceptsArray=_context52.sent;orderedConcepts=CourseModel.orderCourseConcepts(conceptsArray);course.concepts=orderedConcepts;context.action={type:'ADD_CONCEPT',currentCourse:course};_context52.next=17;return CourseModel.getCollaboratorUids(courseId);case 17:courseCollaboratorUids=_context52.sent;_context52.next=20;return ConceptModel.associateCollaborators(conceptId,courseCollaboratorUids);case 20:_context52.next=25;break;case 22:_context52.prev=22;_context52.t0=_context52['catch'](0);throw _context52.t0;case 25:case'end':return _context52.stop();}}},_callee52,this,[[0,22]]);}));}};getConceptById={type:'GET_CONCEPT_BY_ID',execute:function execute(context,id){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee53(){var concept;return _regeneratorRuntime.wrap(function _callee53$(_context53){while(1){switch(_context53.prev=_context53.next){case 0:_context53.prev=0;_context53.next=3;return ConceptModel.getById(id);case 3:concept=_context53.sent;context.action={type:Actions.getConceptById.type,concept:concept};_context53.next=10;break;case 7:_context53.prev=7;_context53.t0=_context53['catch'](0);throw _context53.t0;case 10:case'end':return _context53.stop();}}},_callee53,this,[[0,7]]);}));}};addCourse={type:'ADD_COURSE',execute:function execute(context,newCourse){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee54(){var user,courseId,courses;return _regeneratorRuntime.wrap(function _callee54$(_context54){while(1){switch(_context54.prev=_context54.next){case 0:_context54.prev=0;_context54.next=3;return FirebaseService.getLoggedInUser();case 3:user=_context54.sent;_context54.next=6;return CourseModel.createOrUpdate(null,newCourse);case 6:courseId=_context54.sent;_context54.next=9;return addCourseCollaborator(context,courseId,user.email);case 9:_context54.next=11;return CourseModel.getCoursesByUser(newCourse.uid);case 11:courses=_context54.sent;context.action={type:Actions.addCourse.type,courses:courses};_context54.next=18;break;case 15:_context54.prev=15;_context54.t0=_context54['catch'](0);throw _context54.t0;case 18:case'end':return _context54.stop();}}},_callee54,this,[[0,15]]);}));}};getCoursesByUser={execute:function execute(context){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee55(){var loggedInUser,courses;return _regeneratorRuntime.wrap(function _callee55$(_context55){while(1){switch(_context55.prev=_context55.next){case 0:_context55.prev=0;_context55.next=3;return FirebaseService.getLoggedInUser();case 3:loggedInUser=_context55.sent;if(!loggedInUser){_context55.next=9;break;}_context55.next=7;return CourseModel.getCoursesByUser(loggedInUser.uid);case 7:courses=_context55.sent;context.action={type:'GET_COURSES_BY_USER',courses:courses};case 9:_context55.next=14;break;case 11:_context55.prev=11;_context55.t0=_context55['catch'](0);throw _context55.t0;case 14:case'end':return _context55.stop();}}},_callee55,this,[[0,11]]);}));}};getStarredCoursesByUser=function getStarredCoursesByUser(context,uid){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee56(){var courseIds,courses;return _regeneratorRuntime.wrap(function _callee56$(_context56){while(1){switch(_context56.prev=_context56.next){case 0:_context56.prev=0;_context56.next=3;return UserModel.getStarredCoursesIds(uid);case 3:courseIds=_context56.sent;_context56.next=6;return CourseModel.resolveCourseIds(courseIds);case 6:courses=_context56.sent;context.action={type:'SET_STARRED_COURSES',courses:courses};_context56.next=13;break;case 10:_context56.prev=10;_context56.t0=_context56['catch'](0);throw _context56.t0;case 13:case'end':return _context56.stop();}}},_callee56,this,[[0,10]]);}));};getSharedCoursesByUser=function getSharedCoursesByUser(context,uid){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee57(){var courseIds,courses;return _regeneratorRuntime.wrap(function _callee57$(_context57){while(1){switch(_context57.prev=_context57.next){case 0:_context57.prev=0;_context57.next=3;return UserModel.getSharedWithMeCoursesIds(uid);case 3:courseIds=_context57.sent;_context57.next=6;return CourseModel.resolveCourseIds(courseIds);case 6:courses=_context57.sent;context.action={type:'SET_SHARED_COURSES',courses:courses};_context57.next=13;break;case 10:_context57.prev=10;_context57.t0=_context57['catch'](0);throw _context57.t0;case 13:case'end':return _context57.stop();}}},_callee57,this,[[0,10]]);}));};getCoursesByVisibility=function getCoursesByVisibility(context,visibility){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee58(){var courses;return _regeneratorRuntime.wrap(function _callee58$(_context58){while(1){switch(_context58.prev=_context58.next){case 0:_context58.next=2;return CourseModel.getAllByVisibility(visibility);case 2:courses=_context58.sent;context.action={type:'SET_COURSES_BY_VISIBILITY',visibility:visibility,courses:courses};case 4:case'end':return _context58.stop();}}},_callee58,this);}));};getCourseViewCourseById=function getCourseViewCourseById(context,id){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee59(){var course;return _regeneratorRuntime.wrap(function _callee59$(_context59){while(1){switch(_context59.prev=_context59.next){case 0:_context59.prev=0;_context59.next=3;return CourseModel.getById(id);case 3:course=_context59.sent;//   const conceptsArray = await CourseModel.courseConceptsToArray(course);
//   const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
//   course.concepts = orderedConcepts;
context.action={type:'SET_COURSE_VIEW_CURRENT_COURSE',currentCourse:course};_context59.next=10;break;case 7:_context59.prev=7;_context59.t0=_context59['catch'](0);throw _context59.t0;case 10:case'end':return _context59.stop();}}},_callee59,this,[[0,7]]);}));};getCourseEditCourseById=function getCourseEditCourseById(context,id){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee60(){var course;return _regeneratorRuntime.wrap(function _callee60$(_context60){while(1){switch(_context60.prev=_context60.next){case 0:_context60.prev=0;_context60.next=3;return CourseModel.getById(id);case 3:course=_context60.sent;//   const conceptsArray = await CourseModel.courseConceptsToArray(course);
//   const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
//   course.concepts = orderedConcepts;
context.action={type:'SET_COURSE_EDIT_CURRENT_COURSE',currentCourse:course};_context60.next=10;break;case 7:_context60.prev=7;_context60.t0=_context60['catch'](0);throw _context60.t0;case 10:case'end':return _context60.stop();}}},_callee60,this,[[0,7]]);}));};deleteConcept={execute:function execute(context,courseId,conceptId){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee61(){var course;return _regeneratorRuntime.wrap(function _callee61$(_context61){while(1){switch(_context61.prev=_context61.next){case 0:_context61.prev=0;_context61.next=3;return CourseModel.disassociateConcept(courseId,conceptId);case 3:_context61.next=5;return CourseModel.getById(courseId);case 5:course=_context61.sent;// const conceptsArray = await CourseModel.courseConceptsToArray(course);
// const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
// course.concepts = orderedConcepts;
context.action={type:'GET_COURSE_BY_ID',currentCourse:course};_context61.next=12;break;case 9:_context61.prev=9;_context61.t0=_context61['catch'](0);throw _context61.t0;case 12:case'end':return _context61.stop();}}},_callee61,this,[[0,9]]);}));}};orderConcepts={type:'ORDER_CONCEPTS',execute:function execute(context,id,courseConceptsArray){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee62(){return _regeneratorRuntime.wrap(function _callee62$(_context62){while(1){switch(_context62.prev=_context62.next){case 0:_context62.prev=0;_context62.next=3;return CourseModel.updateCourseConcepts(id,courseConceptsArray);case 3:_context62.next=8;break;case 5:_context62.prev=5;_context62.t0=_context62['catch'](0);throw _context62.t0;case 8:case'end':return _context62.stop();}}},_callee62,this,[[0,5]]);}));}};updateCourseField=function updateCourseField(context,id,field,value){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee63(){var course;return _regeneratorRuntime.wrap(function _callee63$(_context63){while(1){switch(_context63.prev=_context63.next){case 0:_context63.prev=0;_context63.next=3;return CourseModel.updateCourseField(id,field,value);case 3:_context63.next=5;return CourseModel.getById(id);case 5:course=_context63.sent;//   const conceptsArray = await CourseModel.courseConceptsToArray(course);
//   const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
//   course.concepts = orderedConcepts;
context.action={type:'GET_COURSE_BY_ID',currentCourse:course};_context63.next=12;break;case 9:_context63.prev=9;_context63.t0=_context63['catch'](0);throw _context63.t0;case 12:case'end':return _context63.stop();}}},_callee63,this,[[0,9]]);}));};logOutUser={type:'LOGOUT_USER',execute:function execute(context){return __awaiter(_this,void 0,void 0,_regeneratorRuntime.mark(function _callee64(){return _regeneratorRuntime.wrap(function _callee64$(_context64){while(1){switch(_context64.prev=_context64.next){case 0:_context64.next=2;return FirebaseService.logOutUser();case 2://TODO I'm doing this because we're about to launch and it will fix the errors we've been having with synchronizing the user after signup.
//This just refreshes the whole app with the user logged in. Might want to change this, seems to work well though.
window.location.href='';//   context.action = {
//     type: Actions.logOutUser.type,
// };
case 3:case'end':return _context64.stop();}}},_callee64,this);}));}};_export('Actions',Actions={loginUser:loginUser,checkUserAuth:checkUserAuth,deleteConcept:deleteConcept,orderConcepts:orderConcepts,addConcept:addConcept,createUser:createUser,logOutUser:logOutUser,updateUserEmail:updateUserEmail,updateUserMetaData:updateUserMetaData,loadEditConceptVideos:loadEditConceptVideos,loadViewConceptVideos:loadViewConceptVideos,setCurrentVideoInfo:setCurrentVideoInfo,saveVideo:saveVideo,clearCurrentVideoInfo:clearCurrentVideoInfo,deleteVideo:deleteVideo,addCourse:addCourse,getCoursesByUser:getCoursesByUser,getCoursesByVisibility:getCoursesByVisibility,loadUserQuestionIds:loadUserQuestionIds,addQuestionToQuiz:addQuestionToQuiz,loadQuizQuestionIds:loadQuizQuestionIds,removeQuestionFromQuiz:removeQuestionFromQuiz,setQuizSetting:setQuizSetting,setQuestionSetting:setQuestionSetting,loadQuizSettings:loadQuizSettings,setCurrentEditQuizId:setCurrentEditQuizId,loadEditConceptQuizzes:loadEditConceptQuizzes,loadViewConceptQuizzes:loadViewConceptQuizzes,createNewQuiz:createNewQuiz,updateQuizTitle:updateQuizTitle,getQuiz:getQuiz,getCourseViewCourseById:getCourseViewCourseById,getCourseEditCourseById:getCourseEditCourseById,getConceptById:getConceptById,loadPublicQuestionIds:loadPublicQuestionIds,starCourse:starCourse,unstarCourse:unstarCourse,getStarredCoursesByUser:getStarredCoursesByUser,addQuizCollaborator:addQuizCollaborator,loadQuizCollaboratorEmails:loadQuizCollaboratorEmails,removeQuizCollaborator:removeQuizCollaborator,getSharedCoursesByUser:getSharedCoursesByUser,loadCourseCollaboratorEmails:loadCourseCollaboratorEmails,loadConceptCollaboratorEmails:loadConceptCollaboratorEmails,loadVideoCollaboratorEmails:loadVideoCollaboratorEmails,addCourseCollaborator:addCourseCollaborator,addConceptCollaborator:addConceptCollaborator,addVideoCollaborator:addVideoCollaborator,removeCourseCollaborator:removeCourseCollaborator,removeConceptCollaborator:removeConceptCollaborator,removeVideoCollaborator:removeVideoCollaborator,updateCourseField:updateCourseField,loadEditCourseConcepts:loadEditCourseConcepts,loadViewCourseConcepts:loadViewCourseConcepts,showMainSpinner:showMainSpinner,hideMainSpinner:hideMainSpinner});_export('Actions',Actions);}};});
$__System.register("33", ["2e"], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _this, __awaiter, asyncForEach, getPrendusServerEndpointDomain, createUUID, handleServerSideError, UtilitiesService;

    function getUserAnswerString(answerInputValue, userInputs, userCheckboxes, userRadios, questionSessionId) {
        if (Object.keys(userInputs).length !== 0) {
            var getInputContents = function getInputContents(element) {
                return element.innerHTML;
            };

            var inputElements = userInputs.map(function (inputId) {
                return document.getElementById(inputId + questionSessionId);
            });
            var inputAnswerString = constructAnswerString(inputElements, getInputContents);
            return inputAnswerString;
        }
        if (Object.keys(userCheckboxes).length !== 0) {
            var getCheckboxLabel = function getCheckboxLabel(element) {
                if (element.checked) {
                    return element.parentElement.childNodes[2].textContent.trim();
                } else {
                    return '';
                }
            };

            var paperCheckboxElements = userCheckboxes.map(function (checkboxId) {
                return document.getElementById(checkboxId + questionSessionId);
            });
            var checkboxAnswerString = constructAnswerString(paperCheckboxElements, getCheckboxLabel);
            return checkboxAnswerString;
        }
        if (Object.keys(userRadios).length !== 0) {
            var getRadioLabel = function getRadioLabel(element) {
                if (element.checked) {
                    return element.querySelector('#radioLabel').innerHTML.trim();
                } else {
                    return '';
                }
            };

            var paperRadioElements = userRadios.map(function (radioId) {
                return document.getElementById(radioId + questionSessionId);
            });
            var radioAnswerString = constructAnswerString(paperRadioElements, getRadioLabel);
            return radioAnswerString;
        }
        return answerInputValue;
    }
    function constructAnswerString(items, retrieveText) {
        return items.reduce(function (prev, curr) {
            var comma = prev ? ', ' : '';
            return prev + comma + retrieveText(curr);
        }, '');
    }
    function getAnswerString(answer, userInputs, userCheckboxes, userRadios, questionSessionId) {
        if (Object.keys(userInputs).length !== 0) {
            return userInputs.reduce(function (prev, curr) {
                var comma = prev ? ', ' : '';
                return prev + comma + answer[curr];
            }, '');
        }
        if (Object.keys(userCheckboxes).length !== 0) {
            var getCheckboxLabel = function getCheckboxLabel(element) {
                return element.parentElement.childNodes[2].textContent.trim();
            };

            var filteredCheckboxes = userCheckboxes.filter(function (element) {
                return answer[element];
            });
            var paperCheckboxElements = filteredCheckboxes.map(function (checkboxId) {
                return document.getElementById(checkboxId + questionSessionId);
            });
            var checkboxAnswerString = constructAnswerString(paperCheckboxElements, getCheckboxLabel);
            return checkboxAnswerString;
        }
        if (Object.keys(userRadios).length !== 0) {
            var getRadioLabel = function getRadioLabel(element) {
                return element.querySelector('#radioLabel').innerHTML.trim();
            };

            var filteredRadios = userRadios.filter(function (element) {
                return answer[element];
            });
            var paperRadioElements = filteredRadios.map(function (radioId) {
                return document.getElementById(radioId + questionSessionId);
            });
            var radioAnswerString = constructAnswerString(paperRadioElements, getRadioLabel);
            return radioAnswerString;
        }
        return answer;
    }
    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            asyncForEach = function asyncForEach(collection, behavior) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!(collection.length === 0)) {
                                        _context.next = 2;
                                        break;
                                    }

                                    return _context.abrupt("return");

                                case 2:
                                    _context.next = 4;
                                    return behavior(collection[0]);

                                case 4:
                                    _context.next = 6;
                                    return asyncForEach(collection.slice(1), behavior);

                                case 6:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            };

            getPrendusServerEndpointDomain = function getPrendusServerEndpointDomain() {
                if (window.location.hostname === 'localhost') {
                    return "http://localhost:5000";
                } else {
                    return "https://prenduslearning.com";
                }
            };

            createUUID = function createUUID() {
                //From persistence.js; Copyright (c) 2010 Zef Hemel <zef@zef.me> * * Permission is hereby granted, free of charge, to any person * obtaining a copy of this software and associated documentation * files (the "Software"), to deal in the Software without * restriction, including without limitation the rights to use, * copy, modify, merge, publish, distribute, sublicense, and/or sell * copies of the Software, and to permit persons to whom the * Software is furnished to do so, subject to the following * conditions: * * The above copyright notice and this permission notice shall be * included in all copies or substantial portions of the Software. * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR * OTHER DEALINGS IN THE SOFTWARE.
                var s = [];
                var hexDigits = "0123456789ABCDEF";
                for (var i = 0; i < 32; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[12] = "4";
                s[16] = hexDigits.substr(s[16] & 0x3 | 0x8, 1);
                var uuid = s.join("");
                return uuid;
            };

            handleServerSideError = function handleServerSideError(error, res) {
                console.log(error);
                if (error.status === 403) {
                    res.status(403).json({
                        errorMessage: error.errorMessage
                    });
                    return;
                }
                if (error.status === 401) {
                    res.status(401).json({
                        errorMessage: error.errorMessage
                    });
                    return;
                }
                if (process.env.NODE_ENV === 'production') {
                    res.status(500).json({
                        errorMessage: 'Sorry, internal server error. Try again.'
                    });
                } else {
                    res.status(500).json({
                        errorMessage: error.toString()
                    });
                }
            };

            _export("UtilitiesService", UtilitiesService = {
                getPrendusServerEndpointDomain: getPrendusServerEndpointDomain,
                createUUID: createUUID,
                handleServerSideError: handleServerSideError,
                getAnswerString: getAnswerString,
                getUserAnswerString: getUserAnswerString,
                asyncForEach: asyncForEach
            });

            _export("UtilitiesService", UtilitiesService);
        }
    };
});
$__System.register("2e", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (module) {
        /**
         * Copyright (c) 2014, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
         * additional grant of patent rights can be found in the PATENTS file in
         * the same directory.
         */

        !function (global) {
          "use strict";

          var hasOwn = Object.prototype.hasOwnProperty;
          var undefined; // More compressible than void 0.
          var $Symbol = typeof Symbol === "function" ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || "@@iterator";
          var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

          var inModule = typeof module === "object";
          var runtime = global.regeneratorRuntime;
          if (runtime) {
            if (inModule) {
              // If regeneratorRuntime is defined globally and we're in a module,
              // make the exports object identical to regeneratorRuntime.
              module.exports = runtime;
            }
            // Don't bother evaluating the rest of this file if the runtime was
            // already defined globally.
            return;
          }

          // Define the runtime globally (as expected by generated code) as either
          // module.exports (if we're in a module) or a new, empty object.
          runtime = global.regeneratorRuntime = inModule ? module.exports : {};

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided, then outerFn.prototype instanceof Generator.
            var generator = Object.create((outerFn || Generator).prototype);
            var context = new Context(tryLocsList || []);

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);

            return generator;
          }
          runtime.wrap = wrap;

          // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return { type: "normal", arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: "throw", arg: err };
            }
          }

          var GenStateSuspendedStart = "suspendedStart";
          var GenStateSuspendedYield = "suspendedYield";
          var GenStateExecuting = "executing";
          var GenStateCompleted = "completed";

          // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {};

          // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}

          var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
          GeneratorFunctionPrototype.constructor = GeneratorFunction;
          GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

          // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            ["next", "throw", "return"].forEach(function (method) {
              prototype[method] = function (arg) {
                return this._invoke(method, arg);
              };
            });
          }

          runtime.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === "function" && genFun.constructor;
            return ctor ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
          };

          runtime.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              if (!(toStringTagSymbol in genFun)) {
                genFun[toStringTagSymbol] = "GeneratorFunction";
              }
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
          };

          // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `value instanceof AwaitArgument` to determine if the yielded value is
          // meant to be awaited. Some may consider the name of this method too
          // cutesy, but they are curmudgeons.
          runtime.awrap = function (arg) {
            return new AwaitArgument(arg);
          };

          function AwaitArgument(arg) {
            this.arg = arg;
          }

          function AsyncIterator(generator) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if (record.type === "throw") {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;
                if (value instanceof AwaitArgument) {
                  return Promise.resolve(value.arg).then(function (value) {
                    invoke("next", value, resolve, reject);
                  }, function (err) {
                    invoke("throw", err, resolve, reject);
                  });
                }

                return Promise.resolve(value).then(function (unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration. If the Promise is rejected, however, the
                  // result for this iteration will be rejected with the same
                  // reason. Note that rejections of yielded Promises are not
                  // thrown back into the generator function, as is the case
                  // when an awaited Promise is rejected. This difference in
                  // behavior between yield and await is important, because it
                  // allows the consumer to decide what to do with the yielded
                  // rejection (swallow it and continue, manually .throw it back
                  // into the generator, abandon iteration, whatever). With
                  // await, by contrast, there is no opportunity to examine the
                  // rejection reason outside the generator function, so the
                  // only option is to throw it from the await expression, and
                  // let the generator function handle the exception.
                  result.value = unwrapped;
                  resolve(result);
                }, reject);
              }
            }

            if (typeof process === "object" && process.domain) {
              invoke = process.domain.bind(invoke);
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new Promise(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return previousPromise =
              // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
              // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);

          // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          runtime.async = function (innerFn, outerFn, self, tryLocsList) {
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

            return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error("Generator is already running");
              }

              if (state === GenStateCompleted) {
                if (method === "throw") {
                  throw arg;
                }

                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
              }

              while (true) {
                var delegate = context.delegate;
                if (delegate) {
                  if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                    // A return or throw (when the delegate iterator has no throw
                    // method) always terminates the yield* loop.
                    context.delegate = null;

                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    var returnMethod = delegate.iterator["return"];
                    if (returnMethod) {
                      var record = tryCatch(returnMethod, delegate.iterator, arg);
                      if (record.type === "throw") {
                        // If the return method threw an exception, let that
                        // exception prevail over the original return or throw.
                        method = "throw";
                        arg = record.arg;
                        continue;
                      }
                    }

                    if (method === "return") {
                      // Continue with the outer return, now that the delegate
                      // iterator has been terminated.
                      continue;
                    }
                  }

                  var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                  if (record.type === "throw") {
                    context.delegate = null;

                    // Like returning generator.throw(uncaught), but without the
                    // overhead of an extra function call.
                    method = "throw";
                    arg = record.arg;
                    continue;
                  }

                  // Delegate generator ran and handled its own exceptions so
                  // regardless of what the method was, we continue as if it is
                  // "next" with an undefined arg.
                  method = "next";
                  arg = undefined;

                  var info = record.arg;
                  if (info.done) {
                    context[delegate.resultName] = info.value;
                    context.next = delegate.nextLoc;
                  } else {
                    state = GenStateSuspendedYield;
                    return info;
                  }

                  context.delegate = null;
                }

                if (method === "next") {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = arg;
                } else if (method === "throw") {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw arg;
                  }

                  if (context.dispatchException(arg)) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    method = "next";
                    arg = undefined;
                  }
                } else if (method === "return") {
                  context.abrupt("return", arg);
                }

                state = GenStateExecuting;

                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                  var info = {
                    value: record.arg,
                    done: context.done
                  };

                  if (record.arg === ContinueSentinel) {
                    if (context.delegate && method === "next") {
                      // Deliberately forget the last sent value so that we don't
                      // accidentally pass it on to the delegate.
                      arg = undefined;
                    }
                  } else {
                    return info;
                  }
                } else if (record.type === "throw") {
                  state = GenStateCompleted;
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(arg) call above.
                  method = "throw";
                  arg = record.arg;
                }
              }
            };
          }

          // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.
          defineIteratorMethods(Gp);

          Gp[iteratorSymbol] = function () {
            return this;
          };

          Gp[toStringTagSymbol] = "Generator";

          Gp.toString = function () {
            return "[object Generator]";
          };

          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal";
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: "root" }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          runtime.keys = function (object) {
            var keys = [];
            for (var key in object) {
              keys.push(key);
            }
            keys.reverse();

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              }

              // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.
              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === "function") {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                    next = function next() {
                  while (++i < iterable.length) {
                    if (hasOwn.call(iterable, i)) {
                      next.value = iterable[i];
                      next.done = false;
                      return next;
                    }
                  }

                  next.value = undefined;
                  next.done = true;

                  return next;
                };

                return next.next = next;
              }
            }

            // Return an iterator with no values.
            return { next: doneResult };
          }
          runtime.values = values;

          function doneResult() {
            return { value: undefined, done: true };
          }

          Context.prototype = {
            constructor: Context,

            reset: function reset(skipTempReset) {
              this.prev = 0;
              this.next = 0;
              // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined;
              this.done = false;
              this.delegate = null;

              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                    this[name] = undefined;
                  }
                }
              }
            },

            stop: function stop() {
              this.done = true;

              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;
              if (rootRecord.type === "throw") {
                throw rootRecord.arg;
              }

              return this.rval;
            },

            dispatchException: function dispatchException(exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;
              function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === "root") {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle("end");
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, "catchLoc");
                  var hasFinally = hasOwn.call(entry, "finallyLoc");

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error("try statement without catch or finally");
                  }
                }
              }
            },

            abrupt: function abrupt(type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.next = finallyEntry.finallyLoc;
              } else {
                this.complete(record);
              }

              return ContinueSentinel;
            },

            complete: function complete(record, afterLoc) {
              if (record.type === "throw") {
                throw record.arg;
              }

              if (record.type === "break" || record.type === "continue") {
                this.next = record.arg;
              } else if (record.type === "return") {
                this.rval = record.arg;
                this.next = "end";
              } else if (record.type === "normal" && afterLoc) {
                this.next = afterLoc;
              }
            },

            finish: function finish(finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },

            "catch": function _catch(tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === "throw") {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }
                  return thrown;
                }
              }

              // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.
              throw new Error("illegal catch attempt");
            },

            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
              };

              return ContinueSentinel;
            }
          };
        }(
        // Among the various tricks for obtaining a reference to the global
        // object, this seems to be the most reliable technique that does not
        // use indirect eval (which violates Content Security Policy).
        typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);
        return module.exports;
      }({ exports: {} }));
    }
  };
});
$__System.register('2f', ['2e'], function (_export, _context12) {
    "use strict";

    var _regeneratorRuntime, _this, __awaiter, prendusFirebaseApps, prendusFirebaseApp, set, remove, push, get, update, getAllBy, createUserWithEmailAndPassword, logInUserWithEmailAndPassword, logOutUser, getLoggedInUser, updateUserProfile, sendPasswordResetEmail, init, FirebaseService;

    return {
        setters: [function (_e) {
            _regeneratorRuntime = _e.default;
        }],
        execute: function () {
            _this = this;

            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            prendusFirebaseApps = {};
            prendusFirebaseApp = void 0;

            set = function set(path, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee() {
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return prendusFirebaseApp.database().ref(path).set(data);

                                case 3:
                                    _context.next = 8;
                                    break;

                                case 5:
                                    _context.prev = 5;
                                    _context.t0 = _context['catch'](0);
                                    throw _context.t0;

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 5]]);
                }));
            };

            remove = function remove(path) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee2() {
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return prendusFirebaseApp.database().ref(path).set(null);

                                case 3:
                                    _context2.next = 8;
                                    break;

                                case 5:
                                    _context2.prev = 5;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 8:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 5]]);
                }));
            };

            push = function push(path, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee3() {
                    var newId;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return prendusFirebaseApp.database().ref(path).push(data).key;

                                case 3:
                                    newId = _context3.sent;
                                    return _context3.abrupt('return', newId);

                                case 7:
                                    _context3.prev = 7;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 10:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 7]]);
                }));
            };

            get = function get(path) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee4() {
                    var dataSnapshot;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    _context4.next = 3;
                                    return prendusFirebaseApp.database().ref(path).once('value');

                                case 3:
                                    dataSnapshot = _context4.sent;
                                    return _context4.abrupt('return', dataSnapshot.val());

                                case 7:
                                    _context4.prev = 7;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 10:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 7]]);
                }));
            };

            update = function update(path, data) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee5() {
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    _context5.next = 3;
                                    return prendusFirebaseApp.database().ref(path).update(data);

                                case 3:
                                    _context5.next = 8;
                                    break;

                                case 5:
                                    _context5.prev = 5;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 8:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 5]]);
                }));
            };

            getAllBy = function getAllBy(path, key, value) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var dataSnapshot;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    _context6.next = 3;
                                    return prendusFirebaseApp.database().ref(path).orderByChild(key).equalTo(value).once('value');

                                case 3:
                                    dataSnapshot = _context6.sent;
                                    return _context6.abrupt('return', dataSnapshot.val());

                                case 7:
                                    _context6.prev = 7;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 10:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 7]]);
                }));
            };

            createUserWithEmailAndPassword = function createUserWithEmailAndPassword(email, password) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var user;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    _context7.next = 3;
                                    return prendusFirebaseApp.auth().createUserWithEmailAndPassword(email, password);

                                case 3:
                                    user = _context7.sent;
                                    return _context7.abrupt('return', user);

                                case 7:
                                    _context7.prev = 7;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 10:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 7]]);
                }));
            };

            logInUserWithEmailAndPassword = function logInUserWithEmailAndPassword(email, password) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var user;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return prendusFirebaseApp.auth().signInWithEmailAndPassword(email, password);

                                case 3:
                                    user = _context8.sent;
                                    return _context8.abrupt('return', user);

                                case 7:
                                    _context8.prev = 7;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 10:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 7]]);
                }));
            };

            logOutUser = function logOutUser() {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.next = 2;
                                    return prendusFirebaseApp.auth().signOut();

                                case 2:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this);
                }));
            };

            getLoggedInUser = function getLoggedInUser() {
                return new Promise(function (resolve, reject) {
                    prendusFirebaseApp.auth().onAuthStateChanged(function (user) {
                        resolve(user);
                    });
                });
            };

            updateUserProfile = function updateUserProfile(loggedInUser, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    _context10.next = 3;
                                    return loggedInUser.updateEmail(email);

                                case 3:
                                    _context10.next = 8;
                                    break;

                                case 5:
                                    _context10.prev = 5;
                                    _context10.t0 = _context10['catch'](0);
                                    throw _context10.t0;

                                case 8:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 5]]);
                }));
            };

            sendPasswordResetEmail = function sendPasswordResetEmail(email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee11() {
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    _context11.next = 3;
                                    return prendusFirebaseApp.auth().sendPasswordResetEmail(email);

                                case 3:
                                    _context11.next = 8;
                                    break;

                                case 5:
                                    _context11.prev = 5;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 8:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 5]]);
                }));
            };

            init = function init(apiKey, authDomain, databaseURL, storageBucket, name) {
                prendusFirebaseApp = prendusFirebaseApps[name];
                if (!prendusFirebaseApp) {
                    prendusFirebaseApp = window.firebase.initializeApp({
                        apiKey: apiKey,
                        authDomain: authDomain,
                        databaseURL: databaseURL,
                        storageBucket: storageBucket
                    }, name);
                    prendusFirebaseApps[name] = prendusFirebaseApp;
                }
            };

            _export('FirebaseService', FirebaseService = {
                init: init,
                set: set,
                remove: remove,
                push: push,
                get: get,
                update: update,
                createUserWithEmailAndPassword: createUserWithEmailAndPassword,
                logInUserWithEmailAndPassword: logInUserWithEmailAndPassword,
                logOutUser: logOutUser,
                getLoggedInUser: getLoggedInUser,
                updateUserProfile: updateUserProfile,
                getAllBy: getAllBy,
                sendPasswordResetEmail: sendPasswordResetEmail
            });

            _export('FirebaseService', FirebaseService);
        }
    };
});
$__System.register('6', ['33', '2e', '2a', '2b', '3e', '2f'], function (_export, _context20) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, UtilitiesService, FirebaseService, __awaiter, PrendusQuizEditor;

    return {
        setters: [function (_) {
            UtilitiesService = _.UtilitiesService;
        }, function (_e) {
            _regeneratorRuntime = _e.default;
        }, function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }, function (_e2) {
            Actions = _e2.Actions;
        }, function (_f) {
            FirebaseService = _f.FirebaseService;
        }],
        execute: function () {
            __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };

            PrendusQuizEditor = function () {
                function PrendusQuizEditor() {
                    _classCallCheck(this, PrendusQuizEditor);
                }

                _createClass(PrendusQuizEditor, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-quiz-editor';
                        this.properties = {
                            conceptId: {
                                type: String,
                                observer: 'conceptIdSet'
                            },
                            quizId: {
                                type: String,
                                observer: 'quizIdSet'
                            }
                        };
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var user;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                            _context.next = 3;
                                            return FirebaseService.getLoggedInUser();

                                        case 3:
                                            user = _context.sent;
                                            _context.next = 6;
                                            return user.getToken();

                                        case 6:
                                            this.jwt = _context.sent;

                                            this.title = '';
                                            this.selected = 0;

                                        case 9:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'conceptIdSet',
                    value: function conceptIdSet() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (!this.conceptId) {
                                                _context2.next = 7;
                                                break;
                                            }

                                            _context2.next = 3;
                                            return this.init();

                                        case 3:
                                            _context2.next = 5;
                                            return this.loadUserQuestionIds();

                                        case 5:
                                            _context2.next = 7;
                                            return this.loadPublicQuestionIds();

                                        case 7:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                }, {
                    key: 'quizIdSet',
                    value: function quizIdSet() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                            var quiz;
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            if (!this.quizId) {
                                                _context3.next = 9;
                                                break;
                                            }

                                            _context3.next = 3;
                                            return this.init();

                                        case 3:
                                            _context3.next = 5;
                                            return Actions.getQuiz(this.quizId);

                                        case 5:
                                            quiz = _context3.sent;

                                            this.title = quiz.title;
                                            this.loadQuizQuestionIds();
                                            Actions.loadQuizSettings(this, this.quizId);

                                        case 9:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, this);
                        }));
                    }
                }, {
                    key: 'loadPublicQuestionIds',
                    value: function loadPublicQuestionIds() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                            var getPublicQuestionIdsAjax;
                            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            getPublicQuestionIdsAjax = this.querySelector('#getPublicQuestionIdsAjax');
                                            _context4.next = 3;
                                            return Actions.loadPublicQuestionIds(this, getPublicQuestionIdsAjax);

                                        case 3:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, this);
                        }));
                    }
                }, {
                    key: 'loadUserQuestionIds',
                    value: function loadUserQuestionIds() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                            var getUserQuestionIdsAjax;
                            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            getUserQuestionIdsAjax = this.querySelector('#getUserQuestionIdsAjax');
                                            _context5.next = 3;
                                            return Actions.loadUserQuestionIds(this, getUserQuestionIdsAjax);

                                        case 3:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, this);
                        }));
                    }
                }, {
                    key: 'loadQuizQuestionIds',
                    value: function loadQuizQuestionIds() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee6() {
                            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                while (1) {
                                    switch (_context6.prev = _context6.next) {
                                        case 0:
                                            _context6.next = 2;
                                            return Actions.loadQuizQuestionIds(this, this.quizId);

                                        case 2:
                                        case 'end':
                                            return _context6.stop();
                                    }
                                }
                            }, _callee6, this);
                        }));
                    }
                }, {
                    key: 'addQuestionToQuiz',
                    value: function addQuestionToQuiz(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                            var questionId;
                            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                while (1) {
                                    switch (_context7.prev = _context7.next) {
                                        case 0:
                                            questionId = e.model.item;
                                            _context7.next = 3;
                                            return Actions.addQuestionToQuiz(this, this.quizId, questionId);

                                        case 3:
                                            _context7.next = 5;
                                            return this.loadQuizQuestionIds();

                                        case 5:
                                        case 'end':
                                            return _context7.stop();
                                    }
                                }
                            }, _callee7, this);
                        }));
                    }
                }, {
                    key: 'removeQuestionFromQuiz',
                    value: function removeQuestionFromQuiz(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee8() {
                            var questionId;
                            return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                                while (1) {
                                    switch (_context8.prev = _context8.next) {
                                        case 0:
                                            questionId = e.model.item;
                                            _context8.next = 3;
                                            return Actions.removeQuestionFromQuiz(this, this.quizId, questionId);

                                        case 3:
                                            _context8.next = 5;
                                            return this.loadQuizQuestionIds();

                                        case 5:
                                        case 'end':
                                            return _context8.stop();
                                    }
                                }
                            }, _callee8, this);
                        }));
                    }
                }, {
                    key: 'shareQuizClick',
                    value: function shareQuizClick() {
                        this.querySelector('#shareQuizDialog').open();
                    }
                }, {
                    key: 'createQuestion',
                    value: function createQuestion(e) {
                        Actions.showMainSpinner(this);
                        window.history.pushState({}, '', 'courses/edit-question/question');
                        this.fire('location-changed', {}, { node: window });
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        //TODO all of this is evil. We are just mutating the component's state not explicitly
                        var editProblemComponent = document.getElementById('editProblemComponent');
                        editProblemComponent.questionId = undefined;
                        editProblemComponent.originalText = '';
                        editProblemComponent.originalCode = '';
                        editProblemComponent.init();
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                    }
                }, {
                    key: 'editQuestion',
                    value: function editQuestion(e) {
                        Actions.showMainSpinner(this);
                        var questionId = e.model.item;
                        window.history.pushState({}, '', 'courses/edit-question/question/' + questionId);
                        this.fire('location-changed', {}, { node: window });
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        //TODO all of this is evil. We are just mutating the component's state not explicitly
                        var editProblemComponent = document.getElementById('editProblemComponent');
                        editProblemComponent.initialLoad = false;
                        editProblemComponent.init();
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                    }
                }, {
                    key: 'showEmptyQuizQuestionsText',
                    value: function showEmptyQuizQuestionsText(quizQuestionIds) {
                        var showEmptyQuizQuestionsText = !quizQuestionIds || quizQuestionIds.length === 0;
                        return showEmptyQuizQuestionsText;
                    }
                }, {
                    key: 'manuallyReloadQuestions',
                    value: function manuallyReloadQuestions() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee9() {
                            var _this = this;

                            return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                    switch (_context9.prev = _context9.next) {
                                        case 0:
                                            _context9.next = 2;
                                            return this.loadUserQuestionIds();

                                        case 2:
                                            _context9.next = 4;
                                            return this.loadPublicQuestionIds();

                                        case 4:
                                            _context9.next = 6;
                                            return this.loadQuizQuestionIds();

                                        case 6:
                                            this.userQuestionIds.forEach(function (questionId) {
                                                var viewQuestionElement = _this.querySelector('#user-question-id-' + questionId);
                                                viewQuestionElement.loadNextProblem();
                                            });
                                            this.publicQuestionIds.forEach(function (questionId) {
                                                var viewQuestionElement = _this.querySelector('#public-question-id-' + questionId);
                                                viewQuestionElement.loadNextProblem();
                                            });
                                            this.quizQuestionIds.forEach(function (questionId) {
                                                var viewQuestionElement = _this.querySelector('#quiz-question-id-' + questionId);
                                                viewQuestionElement.loadNextProblem();
                                            });

                                        case 9:
                                        case 'end':
                                            return _context9.stop();
                                    }
                                }
                            }, _callee9, this);
                        }));
                    }
                }, {
                    key: 'showSettingsMenu',
                    value: function showSettingsMenu() {
                        this.showSettings = !this.showSettings;
                    }
                }, {
                    key: 'answerFeedbackToggled',
                    value: function answerFeedbackToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                                while (1) {
                                    switch (_context10.prev = _context10.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context10.next = 3;
                                            return this.applySettings('answerFeedback', checked);

                                        case 3:
                                        case 'end':
                                            return _context10.stop();
                                    }
                                }
                            }, _callee10, this);
                        }));
                    }
                }, {
                    key: 'showAnswerToggled',
                    value: function showAnswerToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee11() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                                while (1) {
                                    switch (_context11.prev = _context11.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context11.next = 3;
                                            return this.applySettings('showAnswer', checked);

                                        case 3:
                                        case 'end':
                                            return _context11.stop();
                                    }
                                }
                            }, _callee11, this);
                        }));
                    }
                }, {
                    key: 'showHintToggled',
                    value: function showHintToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                                while (1) {
                                    switch (_context12.prev = _context12.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context12.next = 3;
                                            return this.applySettings('showHint', checked);

                                        case 3:
                                        case 'end':
                                            return _context12.stop();
                                    }
                                }
                            }, _callee12, this);
                        }));
                    }
                }, {
                    key: 'showCodeToggled',
                    value: function showCodeToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee13() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                                while (1) {
                                    switch (_context13.prev = _context13.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context13.next = 3;
                                            return this.applySettings('showCode', checked);

                                        case 3:
                                        case 'end':
                                            return _context13.stop();
                                    }
                                }
                            }, _callee13, this);
                        }));
                    }
                }, {
                    key: 'gradedToggled',
                    value: function gradedToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee14() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                                while (1) {
                                    switch (_context14.prev = _context14.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context14.next = 3;
                                            return this.applySettings('graded', checked);

                                        case 3:
                                        case 'end':
                                            return _context14.stop();
                                    }
                                }
                            }, _callee14, this);
                        }));
                    }
                }, {
                    key: 'showConfidenceLevelToggled',
                    value: function showConfidenceLevelToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee15() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                                while (1) {
                                    switch (_context15.prev = _context15.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context15.next = 3;
                                            return this.applySettings('showConfidenceLevel', checked);

                                        case 3:
                                        case 'end':
                                            return _context15.stop();
                                    }
                                }
                            }, _callee15, this);
                        }));
                    }
                }, {
                    key: 'allowGenerationToggled',
                    value: function allowGenerationToggled(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee16() {
                            var checked;
                            return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                                while (1) {
                                    switch (_context16.prev = _context16.next) {
                                        case 0:
                                            checked = e.target.checked;
                                            _context16.next = 3;
                                            return this.applySettings('allowGeneration', checked);

                                        case 3:
                                        case 'end':
                                            return _context16.stop();
                                    }
                                }
                            }, _callee16, this);
                        }));
                    }
                }, {
                    key: 'maxNumAttemptsChanged',
                    value: function maxNumAttemptsChanged(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee17() {
                            var value;
                            return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                                while (1) {
                                    switch (_context17.prev = _context17.next) {
                                        case 0:
                                            value = e.target.value;
                                            _context17.next = 3;
                                            return this.applySettings('maxNumAttempts', value);

                                        case 3:
                                        case 'end':
                                            return _context17.stop();
                                    }
                                }
                            }, _callee17, this);
                        }));
                    }
                }, {
                    key: 'titleChanged',
                    value: function titleChanged(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee18() {
                            var value;
                            return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                                while (1) {
                                    switch (_context18.prev = _context18.next) {
                                        case 0:
                                            value = e.target.value;
                                            _context18.next = 3;
                                            return Actions.updateQuizTitle(this.quizId, value);

                                        case 3:
                                            _context18.next = 5;
                                            return Actions.loadEditConceptQuizzes(this, this.conceptId);

                                        case 5:
                                        case 'end':
                                            return _context18.stop();
                                    }
                                }
                            }, _callee18, this);
                        }));
                    }
                }, {
                    key: 'applySettings',
                    value: function applySettings(settingName, value) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee19() {
                            var _this2 = this;

                            return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                                while (1) {
                                    switch (_context19.prev = _context19.next) {
                                        case 0:
                                            _context19.next = 2;
                                            return Actions.setQuizSetting(this, this.quizId, settingName, value);

                                        case 2:
                                            this.quizQuestionIds.forEach(function (questionId) {
                                                Actions.setQuestionSetting(_this2, _this2.quizId, questionId, settingName, value);
                                            });

                                        case 3:
                                        case 'end':
                                            return _context19.stop();
                                    }
                                }
                            }, _callee19, this);
                        }));
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.quizSettings = state.quizSettings;
                        this.userQuestionIds = state.userQuestionIds;
                        this.publicQuestionIds = state.publicQuestionIds;
                        this.quizQuestionIds = state.quizQuestionIds;
                        this.collaboratorEmails = state.collaboratorEmails;
                    }
                }]);

                return PrendusQuizEditor;
            }();

            Polymer(PrendusQuizEditor);
        }
    };
});
$__System.register("5", ["2a", "2b"], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusRouter;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusRouter = function () {
                function PrendusRouter() {
                    _classCallCheck(this, PrendusRouter);
                }

                _createClass(PrendusRouter, [{
                    key: "beforeRegister",
                    value: function beforeRegister() {
                        this.is = "prendus-router";
                    }
                }, {
                    key: "mapStateToThis",
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.mainViewToShow = state.mainViewToShow;
                    }
                }]);

                return PrendusRouter;
            }();

            Polymer(PrendusRouter);
        }
    };
});
$__System.register('4', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusExample;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusExample = function () {
                function PrendusExample() {
                    _classCallCheck(this, PrendusExample);
                }

                _createClass(PrendusExample, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-terms-of-service';
                    }
                }]);

                return PrendusExample;
            }();

            Polymer(PrendusExample);
        }
    };
});
$__System.register('3', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusVideoEditor;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            _export('PrendusVideoEditor', PrendusVideoEditor = function () {
                function PrendusVideoEditor() {
                    _classCallCheck(this, PrendusVideoEditor);
                }

                _createClass(PrendusVideoEditor, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-video-editor';
                        this.properties = {
                            conceptId: {
                                type: String
                            },
                            videoId: {
                                type: String
                            },
                            title: {
                                type: String,
                                notify: true
                            },
                            url: {
                                type: String,
                                notify: true
                            }
                        };
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        this.$.savedToast.fitInto = this;
                        this.addEventListener('mousedown', function (e) {
                            e.stopPropagation();
                        });
                        //TODO you might need this in the future
                        // this.addEventListener('mousemove', (e) => {
                        //     e.stopPropagation();
                        // });
                    }
                }, {
                    key: 'saveClick',
                    value: function saveClick() {
                        var title = this.$.titleInput.value;
                        var url = this.$.urlInput.value;
                        this.fire('save', {
                            title: title,
                            url: url
                        }, {
                            bubbles: false
                        });
                    }
                }, {
                    key: 'deleteClick',
                    value: function deleteClick() {
                        this.fire('delete', {}, {
                            bubbles: false
                        });
                    }
                }, {
                    key: 'updateTitle',
                    value: function updateTitle() {
                        this.title = this.$.titleInput.value;
                    }
                }, {
                    key: 'updateUrl',
                    value: function updateUrl() {
                        this.url = this.$.urlInput.value;
                    }
                }, {
                    key: 'indicateSaved',
                    value: function indicateSaved() {
                        this.$.savedToast.open();
                    }
                }]);

                return PrendusVideoEditor;
            }());

            _export('PrendusVideoEditor', PrendusVideoEditor);

            Polymer(PrendusVideoEditor);
        }
    };
});
$__System.register('2', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusViewQuizRouter;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusViewQuizRouter = function () {
                function PrendusViewQuizRouter() {
                    _classCallCheck(this, PrendusViewQuizRouter);
                }

                _createClass(PrendusViewQuizRouter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-view-quiz-router';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.userFullName = state.currentUser.metaData.firstName + ' ' + state.currentUser.metaData.lastName;
                        this.userEmail = state.currentUser.metaData.email;
                        this.jwt = state.jwt;
                    }
                }]);

                return PrendusViewQuizRouter;
            }();

            Polymer(PrendusViewQuizRouter);
        }
    };
});
$__System.register("2a", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      });
    }
  };
});
$__System.register("2b", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }());
    }
  };
});
$__System.register('1', ['2a', '2b'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusViewVideoRouter;

    return {
        setters: [function (_a) {
            _classCallCheck = _a.default;
        }, function (_b) {
            _createClass = _b.default;
        }],
        execute: function () {
            PrendusViewVideoRouter = function () {
                function PrendusViewVideoRouter() {
                    _classCallCheck(this, PrendusViewVideoRouter);
                }

                _createClass(PrendusViewVideoRouter, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-view-video-router';
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.userFullName = state.currentUser.metaData.firstName + ' ' + state.currentUser.metaData.lastName;
                        this.userEmail = state.currentUser.metaData.email;
                    }
                }]);

                return PrendusViewVideoRouter;
            }();

            Polymer(PrendusViewVideoRouter);
        }
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
            });
        