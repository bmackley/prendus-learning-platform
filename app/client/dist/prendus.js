!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register('24', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, CodeEditorComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('27', ['28', '29', '2a'], function (_export, _context12) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, save, update, removeById, getById, getAllIdsBy, getAllIdsByUid, getAllIdsByVisibility, resolveQuestionIds, QuestionModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
                                    return _context4.abrupt('return', question);

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
                                                                return _context9.abrupt('return', asyncReduce(questionIds.slice(1), [].concat(_toConsumableArray(questions), [question])));

                                                            case 7:
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
$__System.register('2b', ['27', '29'], function (_export, _context5) {
    "use strict";

    var _regeneratorRuntime, QuestionModel, _this, __awaiter, initialLoadQuestion, saveQuestion, savePreviewQuestion, Actions;

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
        setters: [function (_) {
            QuestionModel = _.QuestionModel;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
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
                savePreviewQuestion: savePreviewQuestion
            });

            _export('Actions', Actions);
        }
    };
});
$__System.register('2c', [], function (_export, _context) {
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
$__System.register('2d', ['2c'], function (_export, _context) {
    "use strict";

    var InitialState, RootReducer;
    return {
        setters: [function (_c) {
            InitialState = _c.InitialState;
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
$__System.register('23', ['25', '26', '29', '2b', '2d', '2e'], function (_export, _context6) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, RootReducer, UtilitiesService, __awaiter, EditProblemComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_b) {
            Actions = _b.Actions;
        }, function (_d) {
            RootReducer = _d.RootReducer;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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
                                                _context2.next = 11;
                                                break;
                                            }

                                            if (this.initialLoad) {
                                                _context2.next = 11;
                                                break;
                                            }

                                            _context2.prev = 2;
                                            _context2.next = 5;
                                            return Actions.initialLoadQuestion(this, this.questionId);

                                        case 5:
                                            _context2.next = 11;
                                            break;

                                        case 7:
                                            _context2.prev = 7;
                                            _context2.t0 = _context2['catch'](2);

                                            this.toastMessage = _context2.t0.errorMessage || _context2.t0.toString();
                                            this.$.toast.open();

                                        case 11:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this, [[2, 7]]);
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
$__System.register('22', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, HelpComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('21', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, RenderMathComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('20', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, TextEditorComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('1f', ['25', '26', '29', '2e'], function (_export, _context6) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, UtilitiesService, __awaiter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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
$__System.register('1e', ['25', '26', '29', '30', '31', '2f', '2a', '2e'], function (_export, _context2) {
    "use strict";

    var _defineProperty, _regeneratorRuntime, _classCallCheck, _createClass, FirebaseService, VideoModel, UtilitiesService, XAPIService, __awaiter, PrendusVideoComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            VideoModel = _4.VideoModel;
        }, function (_5) {
            XAPIService = _5.XAPIService;
        }, function (_f) {
            _defineProperty = _f.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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

            FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');

            PrendusVideoComponent = function () {
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
                            }
                        };
                        this.observers = ['init(course, content, userFullName, userEmail)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var prendusServerEndpointDomain, video;
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

                                            this.videoSrc = video.url;
                                            this.attachInternalListeners(this.course, this.content, this.userFullName, this.userEmail, prendusServerEndpointDomain + '/api/xapi/video/sendstatement');

                                        case 7:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'attachInternalListeners',
                    value: function attachInternalListeners(course, content, theUserFullName, theUserEmail, endpointUrl) {
                        var _this = this;

                        var videoId = content;
                        var userFullName = theUserFullName;
                        var courseId = course;
                        var userEmail = theUserEmail;
                        var baseUri = window.location.origin;
                        var fullUrl = baseUri + window.location.pathname;
                        var videoJSPlayer = videojs('theVideoPlayer');
                        var html5Player = this.$.theVideoPlayer;
                        videoJSPlayer.on('fullscreenchange', function (e) {
                            var isFullscreen = videoJSPlayer.isFullscreen();
                            var verb = getVerb(isFullscreen);
                            var staticValues = getStaticValues();
                            var dynamicValues = getDynamicValues(_this);
                            var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            function getVerb(isFullScreen) {
                                if (isFullScreen) {
                                    return 'enter_fullscreen';
                                } else {
                                    return 'exit_fullscreen';
                                }
                            }
                        });
                        html5Player.addEventListener('playing', function (e) {
                            var dynamicValues = getDynamicValues(_this);
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
                        html5Player.addEventListener('ended', function (e) {
                            var dynamicValues = getDynamicValues(_this);
                            var staticValues = getStaticValues();
                            var verb = 'ended';
                            var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                        });
                        html5Player.addEventListener('pause', function (e) {
                            var dynamicValues = getDynamicValues(_this);
                            var staticValues = getStaticValues();
                            var verb = 'paused';
                            var extensions = _defineProperty({}, baseUri + '/playerTime', dynamicValues.videoTime);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                        });
                        html5Player.addEventListener('timeupdate', function (e) {
                            var dynamicValues = getDynamicValues(_this);
                            if (!_this.seeking) {
                                _this.timeBeforeSeek = dynamicValues.videoTime;
                                _this.seeking = true;
                            }
                        });
                        html5Player.addEventListener('seeked', function (e) {
                            var dynamicValues = getDynamicValues(_this);
                            var staticValues = getStaticValues();
                            var verb = 'jumped';
                            var extensions = getExtensions(dynamicValues.videoTime, _this.timeBeforeSeek);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                            _this.seeking = false;
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
                        html5Player.addEventListener('volumechange', function (e) {
                            var _extensions4;

                            var dynamicValues = getDynamicValues(_this);
                            var staticValues = getStaticValues();
                            var verb = 'changed_volume';
                            var extensions = (_extensions4 = {}, _defineProperty(_extensions4, baseUri + '/playerTime', dynamicValues.videoTime), _defineProperty(_extensions4, baseUri + '/volume', dynamicValues.muted ? 0 : dynamicValues.currentVolume), _extensions4);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                        });
                        html5Player.addEventListener('ratechange', function (e) {
                            var _extensions5;

                            var dynamicValues = getDynamicValues(_this);
                            var staticValues = getStaticValues();
                            var verb = 'changed_playrate';
                            var extensions = (_extensions5 = {}, _defineProperty(_extensions5, baseUri + '/playerTime', dynamicValues.videoTime), _defineProperty(_extensions5, baseUri + '/playRate', dynamicValues.currentRate), _extensions5);
                            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
                        });
                        document.addEventListener('visibilitychange', function (e) {
                            var dynamicValues = getDynamicValues(_this);
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
                            var dynamicValues = getDynamicValues(_this);
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
                        function getDynamicValues(context) {
                            return {
                                timestamp: new Date(),
                                videoTime: context.$.theVideoPlayer.currentTime,
                                muted: context.$.theVideoPlayer.muted,
                                currentRate: context.$.theVideoPlayer.playbackRate,
                                currentVolume: context.$.theVideoPlayer.volume
                            };
                        }
                    }
                }]);

                return PrendusVideoComponent;
            }();

            Polymer(PrendusVideoComponent);
        }
    };
});
$__System.register('1d', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, QuizResultsComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register("2f", [], function (_export, _context) {
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
$__System.register('32', ['29', '2a', '2e'], function (_export, _context6) {
    "use strict";

    var _regeneratorRuntime, FirebaseService, UtilitiesService, _this, __awaiter, loadQuizSession, endQuizSession, clearQuestions, loadQuestions, Actions;

    return {
        setters: [function (_) {
            _regeneratorRuntime = _.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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
                                    preparedResults = Object.keys(quizResults.questionGrades).reduce(function (prev, curr) {
                                        prev[curr] = {
                                            correct: quizResults.questionGrades[curr].correct ? 'correct' : 'incorrect',
                                            yourAnswer: UtilitiesService.getUserAnswerString(quizResults.questionGrades[curr].userAnswerInfo.answerInputValue, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId),
                                            correctAnswer: UtilitiesService.getAnswerString(quizResults.questionGrades[curr].answer, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId)
                                        };
                                        return prev;
                                    }, {});
                                    answerDetails = Object.keys(preparedResults).map(function (key) {
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

            loadQuestions = function loadQuestions(context, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                    var _this2 = this;

                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    return _context5.delegateYield(_regeneratorRuntime.mark(function _callee4() {
                                        var quiz, questionsObject, questionsArray;
                                        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return FirebaseService.get('quizzes/' + quizId);

                                                    case 2:
                                                        quiz = _context4.sent;
                                                        questionsObject = quiz.questions;
                                                        questionsArray = Object.keys(questionsObject || {}).map(function (key) {
                                                            return Object.assign({}, questionsObject[key], {
                                                                id: key
                                                            });
                                                        });

                                                        context.action = {
                                                            type: 'LOAD_QUESTIONS',
                                                            questions: questionsArray
                                                        };

                                                    case 6:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _context5.next = 7;
                                    break;

                                case 4:
                                    _context5.prev = 4;
                                    _context5.t1 = _context5['catch'](0);
                                    throw _context5.t1;

                                case 7:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 4]]);
                }));
            };

            _export('Actions', Actions = {
                loadQuizSession: loadQuizSession,
                loadQuestions: loadQuestions,
                endQuizSession: endQuizSession,
                clearQuestions: clearQuestions
            });

            _export('Actions', Actions);
        }
    };
});
$__System.register('31', [], function (_export, _context) {
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
$__System.register('1c', ['25', '26', '29', '31', '32', '2f', '2e'], function (_export, _context3) {
    "use strict";

    var _defineProperty, _regeneratorRuntime, _classCallCheck, _createClass, UtilitiesService, Actions, XAPIService, __awaiter, TakeQuizComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            XAPIService = _4.XAPIService;
        }, function (_5) {
            Actions = _5.Actions;
        }, function (_f) {
            _defineProperty = _f.default;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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
                        this.observers = ['init(quizId, jwt, quizSessionId)'];
                    }
                }, {
                    key: 'init',
                    value: function init() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
                                            this.endpointUrl = UtilitiesService.getPrendusServerEndpointDomain() + '/api/xapi/quiz/sendstatement';
                                            this.initXAPIListeners(this.courseId, this.quizId, this.userFullName, this.userEmail, this.endpointUrl);
                                            _context.next = 5;
                                            return Actions.clearQuestions(this);

                                        case 5:
                                            _context.next = 7;
                                            return Actions.loadQuizSession(this, this.$.startQuizSessionAjax, this.quizId, this.jwt, this.quizSessionId);

                                        case 7:
                                            this.quizStarted();
                                            _context.next = 10;
                                            return Actions.loadQuestions(this, this.quizId);

                                        case 10:
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
                                            if (!(i < this.questions.length)) {
                                                _context2.next = 7;
                                                break;
                                            }

                                            _context2.next = 4;
                                            return this.querySelector('#' + this.questions[i].id).checkAnswer();

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
                        document.addEventListener('visibilitychange', function (e) {
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
                        });
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
                        this.questions = state.questions;
                    }
                }]);

                return TakeQuizComponent;
            }();

            Polymer(TakeQuizComponent);
        }
    };
});
$__System.register('33', [], function (_export, _context) {
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
$__System.register('34', ['33'], function (_export, _context) {
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
                    case 'LOAD_QUIZ_SESSION':
                        {
                            var newState = Object.assign({}, state);
                            newState.quizSessionId = action.quizSessionId;
                            return newState;
                        }
                    case 'LOAD_QUESTIONS':
                        {
                            var _newState = Object.assign({}, state);
                            _newState.questions = action.questions;
                            return _newState;
                        }
                    case 'CLEAR_QUESTIONS':
                        {
                            var _newState2 = Object.assign({}, state);
                            _newState2.questions = [];
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
$__System.register('1b', ['25', '26', '34'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, RootReducer, ViewQuizComponent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            RootReducer = _3.RootReducer;
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
$__System.register('35', [], function (_export, _context) {
    "use strict";

    var InitialState;
    return {
        setters: [],
        execute: function () {
            _export('InitialState', InitialState = {
                concepts: {},
                currentConcept: {},
                courses: [],
                currentCourse: {},
                courseConcepts: [],
                conceptVideos: {},
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
                        institution: ''
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
                conceptQuizzes: {},
                currentEditConceptId: '',
                publicCourses: [],
                starredCourses: [],
                sharedCourses: [],
                collaboratorEmails: []
            });

            _export('InitialState', InitialState);
        }
    };
});
$__System.register('36', ['35', '37'], function (_export, _context) {
    "use strict";

    var InitialState, Actions;
    function rootReducer() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? InitialState : arguments[0];
        var action = arguments[1];

        switch (action.type) {
            case 'SET_COURSE_COLLABORATOR_EMAILS':
                {
                    var newState = Object.assign({}, state);
                    newState.courseCollaboratorEmails = action.emails;
                    return newState;
                }
            case 'SET_CONCEPT_COLLABORATOR_EMAILS':
                {
                    var _newState = Object.assign({}, state);
                    _newState.conceptCollaboratorEmails = action.emails;
                    return _newState;
                }
            case 'SET_VIDEO_COLLABORATOR_EMAILS':
                {
                    var _newState2 = Object.assign({}, state);
                    _newState2.videoCollaboratorEmails = action.emails;
                    return _newState2;
                }
            case 'SET_QUIZ_COLLABORATOR_EMAILS':
                {
                    var _newState3 = Object.assign({}, state);
                    _newState3.quizCollaboratorEmails = action.emails;
                    return _newState3;
                }
            case 'SET_SHARED_COURSES':
                {
                    var _newState4 = Object.assign({}, state);
                    _newState4.sharedCourses = action.courses;
                    return _newState4;
                }
            case 'SET_STARRED_COURSES':
                {
                    var _newState5 = Object.assign({}, state);
                    _newState5.starredCourses = action.courses;
                    return _newState5;
                }
            case 'SET_COURSES_BY_VISIBILITY':
                {
                    var _newState6 = Object.assign({}, state);
                    if (action.visibility === 'public') {
                        _newState6.publicCourses = action.courses;
                    }
                    return _newState6;
                }
            case 'LOAD_CONCEPT_QUIZZES':
                {
                    var _newState7 = Object.assign({}, state);
                    _newState7.conceptQuizzes[action.conceptId] = action.quizzes;
                    return _newState7;
                }
            case 'SET_CURRENT_EDIT_QUIZ_ID':
                {
                    var _newState8 = Object.assign({}, state);
                    _newState8.currentEditQuizId = action.quizId;
                    return _newState8;
                }
            case 'LOAD_QUIZ_SETTINGS':
                {
                    var _newState9 = Object.assign({}, state);
                    _newState9.quizSettings = action.quizSettings;
                    return _newState9;
                }
            case 'LOAD_QUIZ_QUESTION_IDS':
                {
                    var _newState10 = Object.assign({}, state);
                    _newState10.quizQuestionIds = action.quizQuestionIds;
                    return _newState10;
                }
            case 'LOAD_USER_QUESTION_IDS':
                {
                    var _newState11 = Object.assign({}, state);
                    _newState11.userQuestionIds = action.userQuestionIds;
                    return _newState11;
                }
            case 'LOAD_PUBLIC_QUESTION_IDS':
                {
                    var _newState12 = Object.assign({}, state);
                    _newState12.publicQuestionIds = action.publicQuestionIds;
                    return _newState12;
                }
            case Actions.createUser.type:
                {
                    var _newState13 = Object.assign({}, state);
                    _newState13.currentUser = action.currentUser;
                    return _newState13;
                }
            case Actions.loginUser.type:
                {
                    var _newState14 = Object.assign({}, state);
                    _newState14.currentUser = action.user;
                    return _newState14;
                }
            case Actions.checkUserAuth.type:
                {
                    var _newState15 = Object.assign({}, state);
                    _newState15.currentUser = action.user;
                    _newState15.jwt = action.jwt;
                    return _newState15;
                }
            case 'GET_CONCEPT_BY_ID':
                {
                    var _newState16 = Object.assign({}, state);
                    _newState16.currentConcept = action.concept;
                    return _newState16;
                }
            case Actions.deleteConcept.type:
                {
                    var _newState17 = Object.assign({}, state);
                    //make this happen in the model
                    delete _newState17.concepts[action.conceptKey];
                    return _newState17;
                }
            case Actions.logOutUser.type:
                {
                    var _newState18 = Object.assign({}, state);
                    _newState18 = InitialState;
                    // newState.currentUser.metaData = {email: '', firstName: '', lastName: '', uid: ''};
                    return _newState18;
                }
            case Actions.updateUserMetaData.type:
                {
                    var _newState19 = Object.assign({}, state);
                    var newUser = Object.assign(_newState19.currentUser, action.user);
                    _newState19.currentUser = newUser;
                    return _newState19;
                }
            case 'LOAD_CONCEPT_VIDEOS':
                {
                    var _newState20 = Object.assign({}, state);
                    _newState20.conceptVideos[action.conceptId] = action.videos;
                    return _newState20;
                }
            case 'SET_CURRENT_VIDEO_INFO':
                {
                    var _newState21 = Object.assign({}, state);
                    _newState21.currentConceptVideoId = action.id;
                    _newState21.currentConceptVideoTitle = action.title;
                    _newState21.currentConceptVideoUrl = action.url;
                    return _newState21;
                }
            case 'CLEAR_CURRENT_VIDEO_INFO':
                {
                    var _newState22 = Object.assign({}, state);
                    _newState22.currentConceptVideoId = null;
                    _newState22.currentConceptVideoTitle = '';
                    _newState22.currentConceptVideoUrl = '';
                    return _newState22;
                }
            case 'SET_CURRENT_VIDEO_ID':
                {
                    var _newState23 = Object.assign({}, state);
                    _newState23.currentConceptVideoId = action.id;
                    return _newState23;
                }
            case 'GET_COURSES_BY_USER':
                {
                    var _newState24 = Object.assign({}, state);
                    _newState24.courses = action.courses;
                    //newState.currentConceptVideoId = action.newCourse;
                    return _newState24;
                }
            case 'GET_COURSE_BY_ID':
                {
                    var _newState25 = Object.assign({}, state);
                    _newState25.currentCourse = action.currentCourse;
                    _newState25.courseConcepts = action.currentCourse.concepts;
                    //newState.currentConceptVideoId = action.newCourse;
                    return _newState25;
                }
            case 'ADD_COURSE':
                {
                    var _newState26 = Object.assign({}, state);
                    _newState26.courses = action.courses;
                    return _newState26;
                }
            case Actions.addConcept.type:
                {
                    var _newState27 = Object.assign({}, state);
                    _newState27.currentCourse = action.currentCourse;
                    _newState27.courseConcepts = action.currentCourse.concepts;
                    return _newState27;
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
            InitialState = _.InitialState;
        }, function (_2) {
            Actions = _2.Actions;
        }],
        execute: function () {}
    };
});
$__System.register('1a', ['25', '26', '36'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, rootReducer, PrendusApp;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            rootReducer = _3.rootReducer;
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
                        this.rootReducer = rootReducer;
                    }
                }]);

                return PrendusApp;
            }();

            Polymer(PrendusApp);
        }
    };
});
$__System.register('19', ['25', '26', '29', '37'], function (_export, _context7) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCollaboratorMenuContent;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                            courseId: {
                                type: String
                            },
                            conceptId: {
                                type: String
                            },
                            videoId: {
                                type: String
                            },
                            quizId: {
                                type: String
                            }
                        };
                        this.observers = ['initCourse(courseId)', 'initConcept(conceptId)', 'initVideo(videoId)', 'initQuiz(quizId)'];
                    }
                }, {
                    key: 'initCourse',
                    value: function initCourse(courseId) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return Actions.loadCourseCollaboratorEmails(this, courseId);

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
                    value: function initConcept(conceptId) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;
                                            _context2.next = 3;
                                            return Actions.loadConceptCollaboratorEmails(this, conceptId);

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
                    value: function initVideo(videoId) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;
                                            _context3.next = 3;
                                            return Actions.loadVideoCollaboratorEmails(this, videoId);

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
                    value: function initQuiz(quizId) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.prev = 0;
                                            _context4.next = 3;
                                            return Actions.loadQuizCollaboratorEmails(this, quizId);

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

                                            if (!this.courseId) {
                                                _context5.next = 7;
                                                break;
                                            }

                                            _context5.next = 5;
                                            return Actions.addCourseCollaborator(this, this.courseId, email);

                                        case 5:
                                            _context5.next = 7;
                                            return Actions.loadCourseCollaboratorEmails(this, this.courseId);

                                        case 7:
                                            if (!this.conceptId) {
                                                _context5.next = 12;
                                                break;
                                            }

                                            _context5.next = 10;
                                            return Actions.addConceptCollaborator(this, this.conceptId, email);

                                        case 10:
                                            _context5.next = 12;
                                            return Actions.loadConceptCollaboratorEmails(this, this.conceptId);

                                        case 12:
                                            if (!this.videoId) {
                                                _context5.next = 17;
                                                break;
                                            }

                                            _context5.next = 15;
                                            return Actions.addVideoCollaborator(this, this.videoId, email);

                                        case 15:
                                            _context5.next = 17;
                                            return Actions.loadVideoCollaboratorEmails(this, this.videoId);

                                        case 17:
                                            if (!this.quizId) {
                                                _context5.next = 22;
                                                break;
                                            }

                                            _context5.next = 20;
                                            return Actions.addQuizCollaborator(this, this.quizId, email);

                                        case 20:
                                            _context5.next = 22;
                                            return Actions.loadQuizCollaboratorEmails(this, this.quizId);

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

                                            if (!this.courseId) {
                                                _context6.next = 7;
                                                break;
                                            }

                                            _context6.next = 5;
                                            return Actions.removeCourseCollaborator(this, this.courseId, email);

                                        case 5:
                                            _context6.next = 7;
                                            return Actions.loadCourseCollaboratorEmails(this, this.courseId);

                                        case 7:
                                            if (!this.conceptId) {
                                                _context6.next = 12;
                                                break;
                                            }

                                            _context6.next = 10;
                                            return Actions.removeConceptCollaborator(this, this.conceptId, email);

                                        case 10:
                                            _context6.next = 12;
                                            return Actions.loadConceptCollaboratorEmails(this, this.conceptId);

                                        case 12:
                                            if (!this.videoId) {
                                                _context6.next = 17;
                                                break;
                                            }

                                            _context6.next = 15;
                                            return Actions.removeVideoCollaborator(this, this.videoId, email);

                                        case 15:
                                            _context6.next = 17;
                                            return Actions.loadVideoCollaboratorEmails(this, this.videoId);

                                        case 17:
                                            if (!this.quizId) {
                                                _context6.next = 22;
                                                break;
                                            }

                                            _context6.next = 20;
                                            return Actions.removeQuizCollaborator(this, this.quizId, email);

                                        case 20:
                                            _context6.next = 22;
                                            return Actions.loadQuizCollaboratorEmails(this, this.quizId);

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
                        if (this.courseId) {
                            this.collaboratorEmails = state.courseCollaboratorEmails;
                        }
                        if (this.conceptId) {
                            this.collaboratorEmails = state.conceptCollaboratorEmails;
                        }
                        if (this.videoId) {
                            this.collaboratorEmails = state.videoCollaboratorEmails;
                        }
                        if (this.quizId) {
                            this.collaboratorEmails = state.quizCollaboratorEmails;
                        }
                    }
                }]);

                return PrendusCollaboratorMenuContent;
            }();

            Polymer(PrendusCollaboratorMenuContent);
        }
    };
});
$__System.register('18', ['25', '26', '29', '37', '2a'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusConceptContainerEdit;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
$__System.register('17', ['25', '26', '29', '2a'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, FirebaseService, __awaiter, PrendusConceptContainer;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
$__System.register('16', ['25', '26', '29', '37'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptQuizContainerEdit;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                            return Actions.loadConceptQuizzes(this, this.conceptId);

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
                                            return Actions.loadConceptQuizzes(this, this.conceptId);

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
                        this.quizzes = state.conceptQuizzes[this.conceptId];
                    }
                }]);

                return PrendusConceptQuizContainerEdit;
            }();

            Polymer(PrendusConceptQuizContainerEdit);
        }
    };
});
$__System.register('15', ['25', '26', '29', '37'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptQuizContainer;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                            return Actions.loadConceptQuizzes(this, this.conceptId);

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
                        this.quizzes = state.conceptQuizzes[this.conceptId];
                    }
                }]);

                return PrendusConceptQuizContainer;
            }();

            Polymer(PrendusConceptQuizContainer);
        }
    };
});
$__System.register('14', ['25', '26', '29', '37'], function (_export, _context4) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptVideoContainerEdit;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                            return Actions.loadConceptVideos(this, this.conceptId);

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
                            var title, url, video;
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            title = e.detail.title;
                                            url = e.detail.url;
                                            video = {
                                                title: title,
                                                url: url,
                                                collaborators: {}
                                            };
                                            _context2.next = 5;
                                            return Actions.saveVideo(this, this.conceptId, this.currentVideoId, video);

                                        case 5:
                                            this.$.videoEditor.indicateSaved();
                                            Actions.setCurrentVideoInfo(this, this.currentVideoId, title, url);
                                            _context2.next = 9;
                                            return Actions.loadConceptVideos(this, this.conceptId);

                                        case 9:
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
                                            return Actions.deleteVideo(this, this.currentVideoId);

                                        case 3:
                                            _context3.next = 5;
                                            return Actions.loadConceptVideos(this, this.conceptId);

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
                        this.videos = state.conceptVideos[this.conceptId];
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
$__System.register('13', ['25', '26', '29', '37'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusConceptVideoContainer;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                            return Actions.loadConceptVideos(this, this.conceptId);

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
                        this.videos = state.conceptVideos[this.conceptId];
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
$__System.register('12', ['25', '26', '29', '37'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCourseEdit;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                type: Object
                            },
                            data: {
                                type: Object
                            }
                        };
                        this.observers = ['getCourse(route)', 'getData(data)'];
                    }
                }, {
                    key: 'getCourse',
                    value: function getCourse() {
                        if (this.data.courseId) {
                            Actions.getCourseById.execute(this, this.data.courseId);
                        }
                    }
                }, {
                    key: 'getData',
                    value: function getData() {
                        if (this.data.courseId) {
                            Actions.getCourseById.execute(this, this.data.courseId);
                        }
                    }
                }, {
                    key: 'mapStateToThis',
                    value: function mapStateToThis(e) {
                        var state = e.detail.state;
                        this.courseId = state.currentCourse.id;
                        this.startDate = state.currentCourse.startDate;
                        this.endDate = state.currentCourse.endDate;
                        this.username = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                        this.currentCourse = state.currentCourse;
                        this.courseConcepts = this.currentCourse.concepts;
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
                        Actions.deleteConcept.execute(this, this.courseId, e.target.id);
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
                                uid: this.uid,
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
                                if (this.courseConcepts[i].position != i) {
                                    this.courseConcepts[i].position = i;
                                    updateConceptPositionArray.push(this.courseConcepts[i]);
                                }
                            }
                            Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
                        }
                    }
                }, {
                    key: 'titleChanged',
                    value: function titleChanged(e) {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            var value;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            try {
                                                value = e.target.value;

                                                console.log('title changed', value);
                                            } catch (error) {}

                                        case 1:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }]);

                return PrendusCourseEdit;
            }();

            Polymer(PrendusCourseEdit);
        }
    };
});
$__System.register('11', ['25', '26', '29', '37', '2a'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, FirebaseService, __awaiter, PrendusCourseHomepage;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
                                            _context.next = 2;
                                            return FirebaseService.getLoggedInUser();

                                        case 2:
                                            user = _context.sent;

                                            Actions.getCoursesByUser.execute(this);
                                            Actions.getStarredCoursesByUser(this, user.uid);
                                            Actions.getSharedCoursesByUser(this, user.uid);

                                        case 6:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }, {
                    key: 'editCourse',
                    value: function editCourse(e) {
                        var location = '/courses/edit/' + e.target.id;
                        window.history.pushState({}, '', location);
                        this.fire('location-changed', {}, { node: window });
                    }
                }, {
                    key: 'viewCourse',
                    value: function viewCourse(e) {
                        try {
                            var location = '/courses/view/' + e.target.id;
                            window.history.pushState({}, '', location);
                            this.fire('location-changed', {}, { node: window });
                        } catch (error) {
                            alert(error);
                        }
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
                                private: false,
                                title: this.formTitle,
                                description: this.courseDescription,
                                uid: this.uid
                            };
                            Actions.addCourse.execute(this, newCourse);
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
$__System.register('10', ['25', '26', '29'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusCourseRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
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
$__System.register('f', ['25', '26', '37'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, Actions, PrendusCourseView;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            Actions = _3.Actions;
        }],
        execute: function () {
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
                        this.courseId = state.currentCourse.id;
                        this.username = state.currentUser.metaData.email;
                        this.uid = state.currentUser.metaData.uid;
                        this.currentCourse = state.currentCourse;
                        this.courseConcepts = this.currentCourse.concepts;
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
                        if (this.data.courseId) {
                            Actions.getCourseById.execute(this, this.data.courseId);
                        }
                    }
                }, {
                    key: 'viewData',
                    value: function viewData() {
                        if (this.data.courseId) {
                            Actions.getCourseById.execute(this, this.data.courseId);
                        }
                    }
                }]);

                return PrendusCourseView;
            }());

            _export('PrendusCourseView', PrendusCourseView);

            Polymer(PrendusCourseView);
        }
    };
});
$__System.register('e', ['25', '26', '29', '37'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusCreateAccount;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                    var _this = this;

                    _classCallCheck(this, PrendusCreateAccount);

                    this.specialTap = function (e) {
                        return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
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
                                            location = 'courses/home';

                                            window.history.pushState({}, '', location);
                                            this.fire('location-changed', {}, { node: window });
                                            _context.next = 23;
                                            break;

                                        case 19:
                                            _context.prev = 19;
                                            _context.t0 = _context['catch'](5);

                                            this.signUpToastText = _context.t0;
                                            this.$.signUpToast.open();

                                        case 23:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this, [[5, 19]]);
                        }));
                    };
                }

                _createClass(PrendusCreateAccount, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-create-account';
                    }
                }, {
                    key: 'ready',
                    value: function ready(e) {
                        this.$.signUpToast.fitInto = this.$.toastTarget;
                    }
                }]);

                return PrendusCreateAccount;
            }();

            Polymer(PrendusCreateAccount);
        }
    };
});
$__System.register('d', ['25', '26', '29'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusEditQuestionRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
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
$__System.register('c', ['25', '26', '29'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusEditQuizRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
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
$__System.register('b', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusErrorMessage;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }],
        execute: function () {
            PrendusErrorMessage = function () {
                function PrendusErrorMessage() {
                    _classCallCheck(this, PrendusErrorMessage);
                }

                _createClass(PrendusErrorMessage, [{
                    key: 'beforeRegister',
                    value: function beforeRegister() {
                        this.is = 'prendus-error-message';
                        this.properties = {
                            message: {
                                type: String
                            }
                        };
                        this.observers = ['setMessage(message)'];
                    }
                }, {
                    key: 'setMessage',
                    value: function setMessage() {
                        console.log(this.message);
                        this.toastText = this.message;
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
                        this.$.toastContainer.fitInto = this.$.toastTarget;
                    }
                }]);

                return PrendusErrorMessage;
            }();

            Polymer(PrendusErrorMessage);
        }
    };
});
$__System.register('a', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusExample;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('9', ['25', '26', '29', '37'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusHomepage;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
$__System.register('8', ['25', '26', '29', '37'], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusLogin;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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

                                            this.loginFormToastText = _context.t0.message;
                                            this.$.loginToast.open();

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
                    value: function ready() {
                        this.$.loginToast.fitInto = this.$.toastTarget;
                    }
                }]);

                return PrendusLogin;
            }();

            Polymer(PrendusLogin);
        }
    };
});
$__System.register('7', ['25', '26', '37'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, Actions, PrendusNavbar;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            Actions = _3.Actions;
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
$__System.register('6', ['25', '26', '29', '37'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, __awaiter, PrendusProfile;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
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
                                            this.updateProfileSuccessToastText = 'Profile Successfully Updated';
                                            this.$.updateProfileSuccessToast.open();
                                            _context.next = 16;
                                            break;

                                        case 12:
                                            _context.prev = 12;
                                            _context.t0 = _context['catch'](5);

                                            this.updateProfileErrorToastText = _context.t0.message;
                                            this.$.updateProfileErrorToast.open();

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
                                            this.updateProfileSuccessToastText = 'Profile & Email Updated Successfully';
                                            this.$.updateProfileSuccessToast.open();
                                            _context2.next = 15;
                                            break;

                                        case 11:
                                            _context2.prev = 11;
                                            _context2.t0 = _context2['catch'](1);

                                            this.updateProfileErrorToastText = _context2.t0.message;
                                            this.$.updateProfileErrorToast.open();

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
$__System.register('38', ['28', '29', '39', '2a', '2e'], function (_export, _context20) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, ConceptModel, UtilitiesService, _this, __awaiter, conceptsPath, dataPath, createOrUpdate, associateConcept, disassociateConcept, deleteCourseConcept, getById, getCoursesByUser, courseConceptsToArray, orderCourseConcepts, updateCourseConcepts, deleteCourse, associateCollaborator, disassociateCollaborator, getCollaboratorUids, getAllByVisibility, resolveCourseIds, CourseModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_3) {
            ConceptModel = _3.ConceptModel;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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

            deleteCourseConcept = function deleteCourseConcept(id, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    path = dataPath + '/' + id + '/concepts/' + conceptId + '/';
                                    _context4.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    return _context4.abrupt('return', _context4.sent);

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

            getById = function getById(id) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                    var path, course;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    path = dataPath + '/' + id;
                                    _context5.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    course = _context5.sent;

                                    course.id = id;
                                    return _context5.abrupt('return', course);

                                case 9:
                                    _context5.prev = 9;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 12:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 9]]);
                }));
            };

            getCoursesByUser = function getCoursesByUser(uid) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    return _context7.delegateYield(_regeneratorRuntime.mark(function _callee6() {
                                        var path, firebaseCourses, firebaseCoursesArray;
                                        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                            while (1) {
                                                switch (_context6.prev = _context6.next) {
                                                    case 0:
                                                        path = dataPath;
                                                        _context6.next = 3;
                                                        return FirebaseService.getAllBy(path, 'uid', uid);

                                                    case 3:
                                                        firebaseCourses = _context6.sent;
                                                        firebaseCoursesArray = Object.keys(firebaseCourses || {}).map(function (key) {
                                                            return Object.assign({}, firebaseCourses[key], {
                                                                id: key
                                                            });
                                                        });
                                                        return _context6.abrupt('return', {
                                                            v: firebaseCoursesArray
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context6.stop();
                                                }
                                            }
                                        }, _callee6, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context7.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context7.next = 5;
                                        break;
                                    }

                                    return _context7.abrupt('return', _ret.v);

                                case 5:
                                    _context7.next = 10;
                                    break;

                                case 7:
                                    _context7.prev = 7;
                                    _context7.t1 = _context7['catch'](0);
                                    throw _context7.t1;

                                case 10:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 7]]);
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
                    var key, path;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.t0 = _regeneratorRuntime.keys(conceptArray);

                                case 2:
                                    if ((_context8.t1 = _context8.t0()).done) {
                                        _context8.next = 9;
                                        break;
                                    }

                                    key = _context8.t1.value;
                                    path = dataPath + '/' + id + '/concepts/' + conceptArray[key].key;
                                    _context8.next = 7;
                                    return FirebaseService.update(path, conceptArray[key]);

                                case 7:
                                    _context8.next = 2;
                                    break;

                                case 9:
                                    return _context8.abrupt('return');

                                case 12:
                                    _context8.prev = 12;
                                    _context8.t2 = _context8['catch'](0);
                                    throw _context8.t2;

                                case 15:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 12]]);
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
                    var _this3 = this;

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
                                        return __awaiter(_this3, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
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
                    var _this4 = this;

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
                                        return __awaiter(_this4, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
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
                    var _this5 = this;

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
                                                                courseId: key
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
                                        }, _callee15, _this5);
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
                    var _this6 = this;

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
                                                                return _context17.abrupt('return', asyncReduce(courseIds.slice(1), [].concat(_toConsumableArray(courses), [course])));

                                                            case 7:
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
                                        }, _callee18, _this6);
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

            _export('CourseModel', CourseModel = {
                createOrUpdate: createOrUpdate,
                getById: getById,
                getCoursesByUser: getCoursesByUser,
                deleteCourse: deleteCourse,
                associateConcept: associateConcept,
                disassociateConcept: disassociateConcept,
                deleteCourseConcept: deleteCourseConcept,
                orderCourseConcepts: orderCourseConcepts,
                updateCourseConcepts: updateCourseConcepts,
                courseConceptsToArray: courseConceptsToArray,
                associateCollaborator: associateCollaborator,
                disassociateCollaborator: disassociateCollaborator,
                getCollaboratorUids: getCollaboratorUids,
                getAllByVisibility: getAllByVisibility,
                resolveCourseIds: resolveCourseIds,
                dataPath: dataPath
            });

            _export('CourseModel', CourseModel);
        }
    };
});
$__System.register('39', ['28', '29', '30', '2a', '3a', '2e'], function (_export, _context20) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, VideoModel, QuizModel, UtilitiesService, _this, __awaiter, dataPath, save, getById, deleteConcept, conceptsObjectToArray, associateCollaborator, disassociateCollaborator, getCollaboratorUids, getVideoIds, getQuizIds, resolveConceptIds, associateVideo, disassociateVideo, associateQuiz, disassociateQuiz, ConceptModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_3) {
            VideoModel = _3.VideoModel;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
        }, function (_a2) {
            QuizModel = _a2.QuizModel;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
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
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
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
                                    return _context2.abrupt('return', concept);

                                case 8:
                                    _context2.prev = 8;
                                    _context2.t0 = _context2['catch'](0);
                                    return _context2.abrupt('return', _context2.t0);

                                case 11:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 8]]);
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

            disassociateCollaborator = function disassociateCollaborator(conceptId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                    var _this3 = this;

                    var path, videosPath, videosObject, videoIds, quizzesPath, quizzesObject, quizIds;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;

                                    //TODO it would be nice to do the following in a transaction, so that if adding collaborators fails anywhere it fails everywhere
                                    path = dataPath + '/' + conceptId + '/collaborators/' + uid;
                                    _context9.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    videosPath = dataPath + '/' + conceptId + '/videos';
                                    _context9.next = 7;
                                    return FirebaseService.get(videosPath);

                                case 7:
                                    videosObject = _context9.sent;
                                    videoIds = Object.keys(videosObject || {});
                                    _context9.next = 11;
                                    return UtilitiesService.asyncForEach(videoIds, function (videoId) {
                                        return __awaiter(_this3, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                                            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                while (1) {
                                                    switch (_context7.prev = _context7.next) {
                                                        case 0:
                                                            _context7.next = 2;
                                                            return VideoModel.disassociateCollaborator(videoId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context7.stop();
                                                    }
                                                }
                                            }, _callee7, this);
                                        }));
                                    });

                                case 11:
                                    quizzesPath = dataPath + '/' + conceptId + '/quizzes';
                                    _context9.next = 14;
                                    return FirebaseService.get(quizzesPath);

                                case 14:
                                    quizzesObject = _context9.sent;
                                    quizIds = Object.keys(quizzesObject || {});
                                    _context9.next = 18;
                                    return UtilitiesService.asyncForEach(quizIds, function (quizId) {
                                        return __awaiter(_this3, void 0, void 0, _regeneratorRuntime.mark(function _callee8() {
                                            return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                                                while (1) {
                                                    switch (_context8.prev = _context8.next) {
                                                        case 0:
                                                            _context8.next = 2;
                                                            return QuizModel.disassociateCollaborator(quizId, uid);

                                                        case 2:
                                                        case 'end':
                                                            return _context8.stop();
                                                    }
                                                }
                                            }, _callee8, this);
                                        }));
                                    });

                                case 18:
                                    _context9.next = 23;
                                    break;

                                case 20:
                                    _context9.prev = 20;
                                    _context9.t0 = _context9['catch'](0);
                                    throw _context9.t0;

                                case 23:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[0, 20]]);
                }));
            };

            getCollaboratorUids = function getCollaboratorUids(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee10() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    path = dataPath + '/' + conceptId + '/collaborators';
                                    _context10.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context10.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context10.abrupt('return', collaboratorUids);

                                case 9:
                                    _context10.prev = 9;
                                    _context10.t0 = _context10['catch'](0);
                                    throw _context10.t0;

                                case 12:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 9]]);
                }));
            };

            getVideoIds = function getVideoIds(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var path, videoIdsObject, videoIds;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos';
                                    _context11.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    videoIdsObject = _context11.sent;
                                    videoIds = Object.keys(videoIdsObject || {});
                                    return _context11.abrupt('return', videoIds);

                                case 9:
                                    _context11.prev = 9;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 12:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 9]]);
                }));
            };

            getQuizIds = function getQuizIds(conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee12() {
                    var path, quizIdsObject, quizIds;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes';
                                    _context12.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    quizIdsObject = _context12.sent;
                                    quizIds = Object.keys(quizIdsObject || {});
                                    return _context12.abrupt('return', quizIds);

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

            resolveConceptIds = function resolveConceptIds(conceptIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee15() {
                    var _this4 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    _context15.prev = 0;
                                    return _context15.delegateYield(_regeneratorRuntime.mark(function _callee14() {
                                        var asyncReduce = function asyncReduce(conceptIds, concepts) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee13() {
                                                var conceptId, concept;
                                                return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                                                    while (1) {
                                                        switch (_context13.prev = _context13.next) {
                                                            case 0:
                                                                if (!(conceptIds.length === 0)) {
                                                                    _context13.next = 2;
                                                                    break;
                                                                }

                                                                return _context13.abrupt('return', concepts);

                                                            case 2:
                                                                conceptId = conceptIds[0];
                                                                _context13.next = 5;
                                                                return getById(conceptId);

                                                            case 5:
                                                                concept = _context13.sent;
                                                                return _context13.abrupt('return', asyncReduce(conceptIds.slice(1), [].concat(_toConsumableArray(concepts), [concept])));

                                                            case 7:
                                                            case 'end':
                                                                return _context13.stop();
                                                        }
                                                    }
                                                }, _callee13, this);
                                            }));
                                        };

                                        var concepts;
                                        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                                            while (1) {
                                                switch (_context14.prev = _context14.next) {
                                                    case 0:
                                                        _context14.next = 2;
                                                        return asyncReduce(conceptIds, []);

                                                    case 2:
                                                        concepts = _context14.sent;
                                                        return _context14.abrupt('return', {
                                                            v: concepts
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context14.stop();
                                                }
                                            }
                                        }, _callee14, _this4);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context15.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context15.next = 5;
                                        break;
                                    }

                                    return _context15.abrupt('return', _ret.v);

                                case 5:
                                    _context15.next = 10;
                                    break;

                                case 7:
                                    _context15.prev = 7;
                                    _context15.t1 = _context15['catch'](0);
                                    throw _context15.t1;

                                case 10:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this, [[0, 7]]);
                }));
            };

            associateVideo = function associateVideo(conceptId, videoId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee16() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos/' + videoId;
                                    _context16.next = 4;
                                    return FirebaseService.set(path, videoId);

                                case 4:
                                    _context16.next = 9;
                                    break;

                                case 6:
                                    _context16.prev = 6;
                                    _context16.t0 = _context16['catch'](0);
                                    throw _context16.t0;

                                case 9:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this, [[0, 6]]);
                }));
            };

            disassociateVideo = function disassociateVideo(conceptId, videoId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee17() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    _context17.prev = 0;
                                    path = dataPath + '/' + conceptId + '/videos/' + videoId;
                                    _context17.next = 4;
                                    return FirebaseService.remove(path);

                                case 4:
                                    _context17.next = 9;
                                    break;

                                case 6:
                                    _context17.prev = 6;
                                    _context17.t0 = _context17['catch'](0);
                                    throw _context17.t0;

                                case 9:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this, [[0, 6]]);
                }));
            };

            associateQuiz = function associateQuiz(conceptId, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee18() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    _context18.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes/' + quizId;
                                    _context18.next = 4;
                                    return FirebaseService.set(path, quizId);

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

            disassociateQuiz = function disassociateQuiz(conceptId, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee19() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    _context19.prev = 0;
                                    path = dataPath + '/' + conceptId + '/quizzes/' + quizId;
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
                getQuizIds: getQuizIds
            });

            _export('ConceptModel', ConceptModel);
        }
    };
});
$__System.register('3b', ['28', '29', '2a'], function (_export, _context19) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, save, updateFirebaseUser, updateMetaData, getById, getMetaDataById, starCourse, shareCourseWithMe, shareConceptWithMe, shareVideoWithMe, shareQuizWithMe, getStarredCoursesIds, getSharedWithMeCoursesIds, getSharedWithMeConceptsIds, getSharedWithMeVideosIds, getSharedWithMeQuizzesIds, getEmailById, getEmailsByIds, UserModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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

            shareCourseWithMe = function shareCourseWithMe(uid, courseId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeCourses/' + courseId;
                                    _context7.next = 4;
                                    return FirebaseService.set(path, courseId);

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

            shareConceptWithMe = function shareConceptWithMe(uid, conceptId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeConcepts/' + conceptId;
                                    _context8.next = 4;
                                    return FirebaseService.set(path, conceptId);

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

            shareVideoWithMe = function shareVideoWithMe(uid, videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee9() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeVideos/' + videoId;
                                    _context9.next = 4;
                                    return FirebaseService.set(path, videoId);

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

            shareQuizWithMe = function shareQuizWithMe(uid, quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee10() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeQuizzes/' + quizId;
                                    _context10.next = 4;
                                    return FirebaseService.set(path, quizId);

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

            getStarredCoursesIds = function getStarredCoursesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee11() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    path = dataPath + '/' + uid + '/starredCourses';
                                    _context11.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context11.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context11.abrupt('return', courseIds);

                                case 9:
                                    _context11.prev = 9;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 12:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 9]]);
                }));
            };

            getSharedWithMeCoursesIds = function getSharedWithMeCoursesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee12() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeCourses';
                                    _context12.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context12.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context12.abrupt('return', courseIds);

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

            getSharedWithMeConceptsIds = function getSharedWithMeConceptsIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee13() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeConcepts';
                                    _context13.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context13.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context13.abrupt('return', courseIds);

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

            getSharedWithMeVideosIds = function getSharedWithMeVideosIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee14() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeVideos';
                                    _context14.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context14.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context14.abrupt('return', courseIds);

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

            getSharedWithMeQuizzesIds = function getSharedWithMeQuizzesIds(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee15() {
                    var path, courseIdsObject, courseIds;
                    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    _context15.prev = 0;
                                    path = dataPath + '/' + uid + '/sharedWithMeQuizzes';
                                    _context15.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    courseIdsObject = _context15.sent;
                                    courseIds = Object.keys(courseIdsObject || {});
                                    return _context15.abrupt('return', courseIds);

                                case 9:
                                    _context15.prev = 9;
                                    _context15.t0 = _context15['catch'](0);
                                    throw _context15.t0;

                                case 12:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this, [[0, 9]]);
                }));
            };

            getEmailById = function getEmailById(uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee16() {
                    var path, email;
                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;
                                    path = dataPath + '/' + uid + '/metaData/email';
                                    _context16.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    email = _context16.sent;
                                    return _context16.abrupt('return', email);

                                case 8:
                                    _context16.prev = 8;
                                    _context16.t0 = _context16['catch'](0);
                                    throw _context16.t0;

                                case 11:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this, [[0, 8]]);
                }));
            };

            getEmailsByIds = function getEmailsByIds(uids) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee18() {
                    var emails, asyncReduce;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    asyncReduce = function asyncReduce(uids, emails) {
                                        return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee17() {
                                            var uid, email;
                                            return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                                                while (1) {
                                                    switch (_context17.prev = _context17.next) {
                                                        case 0:
                                                            if (!(uids.length === 0)) {
                                                                _context17.next = 2;
                                                                break;
                                                            }

                                                            return _context17.abrupt('return', emails);

                                                        case 2:
                                                            uid = uids[0];
                                                            _context17.next = 5;
                                                            return getEmailById(uid);

                                                        case 5:
                                                            email = _context17.sent;
                                                            return _context17.abrupt('return', asyncReduce(uids.slice(1), [].concat(_toConsumableArray(emails), [email])));

                                                        case 7:
                                                        case 'end':
                                                            return _context17.stop();
                                                    }
                                                }
                                            }, _callee17, this);
                                        }));
                                    };

                                    _context18.prev = 1;
                                    _context18.next = 4;
                                    return asyncReduce(uids, []);

                                case 4:
                                    emails = _context18.sent;
                                    return _context18.abrupt('return', emails);

                                case 8:
                                    _context18.prev = 8;
                                    _context18.t0 = _context18['catch'](1);
                                    throw _context18.t0;

                                case 11:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this, [[1, 8]]);
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
                getSharedWithMeVideosIds: getSharedWithMeVideosIds
            });

            _export('UserModel', UserModel);
        }
    };
});
$__System.register('30', ['28', '29', '2a'], function (_export, _context11) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, createOrUpdate, getById, removeById, update, associateCollaborator, disassociateCollaborator, getCollaboratorUids, resolveVideoIds, VideoModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
                                    return _context2.abrupt('return', video);

                                case 8:
                                    _context2.prev = 8;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 11:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 8]]);
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

            disassociateCollaborator = function disassociateCollaborator(videoId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee6() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    path = dataPath + '/' + videoId + '/collaborators/' + uid;
                                    _context6.next = 4;
                                    return FirebaseService.remove(path);

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

            getCollaboratorUids = function getCollaboratorUids(videoId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    path = dataPath + '/' + videoId + '/collaborators';
                                    _context7.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    collaboratorUidsObject = _context7.sent;
                                    collaboratorUids = Object.keys(collaboratorUidsObject || {});
                                    return _context7.abrupt('return', collaboratorUids);

                                case 9:
                                    _context7.prev = 9;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 12:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 9]]);
                }));
            };

            resolveVideoIds = function resolveVideoIds(videoIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee10() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    return _context10.delegateYield(_regeneratorRuntime.mark(function _callee9() {
                                        var asyncReduce = function asyncReduce(videoIds, videos) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                                                var videoId, video;
                                                return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                                                    while (1) {
                                                        switch (_context8.prev = _context8.next) {
                                                            case 0:
                                                                if (!(videoIds.length === 0)) {
                                                                    _context8.next = 2;
                                                                    break;
                                                                }

                                                                return _context8.abrupt('return', videos);

                                                            case 2:
                                                                videoId = videoIds[0];
                                                                _context8.next = 5;
                                                                return getById(videoId);

                                                            case 5:
                                                                video = _context8.sent;
                                                                return _context8.abrupt('return', asyncReduce(videoIds.slice(1), [].concat(_toConsumableArray(videos), [video])));

                                                            case 7:
                                                            case 'end':
                                                                return _context8.stop();
                                                        }
                                                    }
                                                }, _callee8, this);
                                            }));
                                        };

                                        var videos;
                                        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                                            while (1) {
                                                switch (_context9.prev = _context9.next) {
                                                    case 0:
                                                        _context9.next = 2;
                                                        return asyncReduce(videoIds, []);

                                                    case 2:
                                                        videos = _context9.sent;
                                                        return _context9.abrupt('return', {
                                                            v: videos
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context9.stop();
                                                }
                                            }
                                        }, _callee9, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context10.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context10.next = 5;
                                        break;
                                    }

                                    return _context10.abrupt('return', _ret.v);

                                case 5:
                                    _context10.next = 10;
                                    break;

                                case 7:
                                    _context10.prev = 7;
                                    _context10.t1 = _context10['catch'](0);
                                    throw _context10.t1;

                                case 10:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 7]]);
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
                resolveVideoIds: resolveVideoIds
            });

            _export('VideoModel', VideoModel);
        }
    };
});
$__System.register("28", [], function (_export, _context) {
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
$__System.register('3a', ['28', '29', '2a'], function (_export, _context17) {
    "use strict";

    var _toConsumableArray, _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, createOrUpdate, getById, removeById, associateQuestion, disassociateQuestion, associateCollaborator, disassociateCollaborator, getCollaboratorUids, setQuestionSetting, setQuizSetting, getQuizSettings, updateTitle, getQuestionIds, resolveQuizIds, QuizModel;

    return {
        setters: [function (_) {
            _toConsumableArray = _.default;
        }, function (_2) {
            _regeneratorRuntime = _2.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
                                    return _context2.abrupt('return', quiz);

                                case 8:
                                    _context2.prev = 8;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 11:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 8]]);
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

            disassociateCollaborator = function disassociateCollaborator(quizId, uid) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee7() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    path = dataPath + '/' + quizId + '/collaborators/' + uid;
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

            getCollaboratorUids = function getCollaboratorUids(quizId) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee8() {
                    var path, collaboratorUidsObject, collaboratorUids;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    path = dataPath + '/' + quizId + '/collaborators';
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

            setQuestionSetting = function setQuestionSetting(quizId, questionId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee9() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions/' + questionId + '/settings/' + settingName;
                                    _context9.next = 4;
                                    return FirebaseService.set(path, value);

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

            setQuizSetting = function setQuizSetting(quizId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    path = dataPath + '/' + quizId + '/quizSettings/' + settingName;
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

            getQuizSettings = function getQuizSettings(quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee11() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    path = dataPath + '/' + quizId + '/quizSettings';
                                    _context11.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    return _context11.abrupt('return', _context11.sent);

                                case 7:
                                    _context11.prev = 7;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 10:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 7]]);
                }));
            };

            updateTitle = function updateTitle(quizId, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
                    var path;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    path = dataPath + '/' + quizId + '/title';
                                    _context12.next = 4;
                                    return FirebaseService.set(path, value);

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

            getQuestionIds = function getQuestionIds(quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee13() {
                    var path, questionsObject;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    path = dataPath + '/' + quizId + '/questions';
                                    _context13.next = 4;
                                    return FirebaseService.get(path);

                                case 4:
                                    questionsObject = _context13.sent;
                                    return _context13.abrupt('return', Object.keys(questionsObject || {}));

                                case 8:
                                    _context13.prev = 8;
                                    _context13.t0 = _context13['catch'](0);
                                    throw _context13.t0;

                                case 11:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[0, 8]]);
                }));
            };

            resolveQuizIds = function resolveQuizIds(quizIds) {
                return __awaiter(_this, void 0, Promise, _regeneratorRuntime.mark(function _callee16() {
                    var _this2 = this;

                    var _ret;

                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;
                                    return _context16.delegateYield(_regeneratorRuntime.mark(function _callee15() {
                                        var asyncReduce = function asyncReduce(quizIds, quizzes) {
                                            return __awaiter(this, void 0, Promise, _regeneratorRuntime.mark(function _callee14() {
                                                var quizId, quiz;
                                                return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                                                    while (1) {
                                                        switch (_context14.prev = _context14.next) {
                                                            case 0:
                                                                if (!(quizIds.length === 0)) {
                                                                    _context14.next = 2;
                                                                    break;
                                                                }

                                                                return _context14.abrupt('return', quizzes);

                                                            case 2:
                                                                quizId = quizIds[0];
                                                                _context14.next = 5;
                                                                return getById(quizId);

                                                            case 5:
                                                                quiz = _context14.sent;
                                                                return _context14.abrupt('return', asyncReduce(quizIds.slice(1), [].concat(_toConsumableArray(quizzes), [quiz])));

                                                            case 7:
                                                            case 'end':
                                                                return _context14.stop();
                                                        }
                                                    }
                                                }, _callee14, this);
                                            }));
                                        };

                                        var quizzes;
                                        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                                            while (1) {
                                                switch (_context15.prev = _context15.next) {
                                                    case 0:
                                                        _context15.next = 2;
                                                        return asyncReduce(quizIds, []);

                                                    case 2:
                                                        quizzes = _context15.sent;
                                                        return _context15.abrupt('return', {
                                                            v: quizzes
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context15.stop();
                                                }
                                            }
                                        }, _callee15, _this2);
                                    })(), 't0', 2);

                                case 2:
                                    _ret = _context16.t0;

                                    if (!(typeof _ret === "object")) {
                                        _context16.next = 5;
                                        break;
                                    }

                                    return _context16.abrupt('return', _ret.v);

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
                resolveQuizIds: resolveQuizIds
            });

            _export('QuizModel', QuizModel);
        }
    };
});
$__System.register('3c', ['29', '2a'], function (_export, _context3) {
    "use strict";

    var _regeneratorRuntime, FirebaseService, _this, __awaiter, dataPath, setUidByEmail, getUidByEmail, EmailsToUidsModel;

    return {
        setters: [function (_) {
            _regeneratorRuntime = _.default;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
$__System.register('37', ['29', '30', '38', '39', '2a', '3b', '3a', '3c'], function (_export, _context46) {
    "use strict";

    var _regeneratorRuntime, FirebaseService, CourseModel, ConceptModel, UserModel, VideoModel, QuizModel, EmailsToUidsModel, _this, __awaiter, loadCourseCollaboratorEmails, loadConceptCollaboratorEmails, loadVideoCollaboratorEmails, loadQuizCollaboratorEmails, addCourseCollaborator, addConceptCollaborator, addVideoCollaborator, addQuizCollaborator, removeCourseCollaborator, removeConceptCollaborator, removeVideoCollaborator, removeQuizCollaborator, starCourse, getQuiz, updateQuizTitle, createNewQuiz, loadConceptQuizzes, setCurrentEditQuizId, loadQuizSettings, setQuizSetting, setQuestionSetting, loadQuizQuestionIds, addQuestionToQuiz, removeQuestionFromQuiz, loadUserQuestionIds, loadPublicQuestionIds, deleteVideo, saveVideo, setCurrentVideoInfo, clearCurrentVideoInfo, loadConceptVideos, createUser, loginUser, updateUserEmail, updateUserMetaData, checkUserAuth, addConcept, getConceptById, addCourse, getCoursesByUser, getStarredCoursesByUser, getSharedCoursesByUser, getCoursesByVisibility, getCourseById, deleteConcept, orderConcepts, updateCourseTitle, logOutUser, Actions;

    return {
        setters: [function (_) {
            _regeneratorRuntime = _.default;
        }, function (_2) {
            VideoModel = _2.VideoModel;
        }, function (_3) {
            CourseModel = _3.CourseModel;
        }, function (_4) {
            ConceptModel = _4.ConceptModel;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
        }, function (_b) {
            UserModel = _b.UserModel;
        }, function (_a2) {
            QuizModel = _a2.QuizModel;
        }, function (_c) {
            EmailsToUidsModel = _c.EmailsToUidsModel;
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

            FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');

            loadCourseCollaboratorEmails = function loadCourseCollaboratorEmails(context, courseId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                    var user, uids, emails;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return FirebaseService.getLoggedInUser();

                                case 3:
                                    user = _context.sent;
                                    _context.next = 6;
                                    return CourseModel.getCollaboratorUids(courseId);

                                case 6:
                                    uids = _context.sent;
                                    _context.next = 9;
                                    return FirebaseService.set('security/' + user.uid + '/collaboratorSecurityInfo', {
                                        collection: CourseModel.dataPath,
                                        id: courseId
                                    });

                                case 9:
                                    _context.next = 11;
                                    return UserModel.getEmailsByIds(uids);

                                case 11:
                                    emails = _context.sent;

                                    context.action = {
                                        type: 'SET_COURSE_COLLABORATOR_EMAILS',
                                        emails: emails
                                    };
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

            loadConceptCollaboratorEmails = function loadConceptCollaboratorEmails(context, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee2() {
                    var user, uids, emails;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return FirebaseService.getLoggedInUser();

                                case 3:
                                    user = _context2.sent;
                                    _context2.next = 6;
                                    return ConceptModel.getCollaboratorUids(conceptId);

                                case 6:
                                    uids = _context2.sent;
                                    _context2.next = 9;
                                    return FirebaseService.set('security/' + user.uid + '/collaboratorSecurityInfo', {
                                        collection: ConceptModel.dataPath,
                                        id: conceptId
                                    });

                                case 9:
                                    _context2.next = 11;
                                    return UserModel.getEmailsByIds(uids);

                                case 11:
                                    emails = _context2.sent;

                                    context.action = {
                                        type: 'SET_CONCEPT_COLLABORATOR_EMAILS',
                                        emails: emails
                                    };
                                    _context2.next = 18;
                                    break;

                                case 15:
                                    _context2.prev = 15;
                                    _context2.t0 = _context2['catch'](0);
                                    throw _context2.t0;

                                case 18:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 15]]);
                }));
            };

            loadVideoCollaboratorEmails = function loadVideoCollaboratorEmails(context, videoId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee3() {
                    var user, uids, emails;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return FirebaseService.getLoggedInUser();

                                case 3:
                                    user = _context3.sent;
                                    _context3.next = 6;
                                    return VideoModel.getCollaboratorUids(videoId);

                                case 6:
                                    uids = _context3.sent;
                                    _context3.next = 9;
                                    return FirebaseService.set('security/' + user.uid + '/collaboratorSecurityInfo', {
                                        collection: VideoModel.dataPath,
                                        id: videoId
                                    });

                                case 9:
                                    _context3.next = 11;
                                    return UserModel.getEmailsByIds(uids);

                                case 11:
                                    emails = _context3.sent;

                                    context.action = {
                                        type: 'SET_VIDEO_COLLABORATOR_EMAILS',
                                        emails: emails
                                    };
                                    _context3.next = 18;
                                    break;

                                case 15:
                                    _context3.prev = 15;
                                    _context3.t0 = _context3['catch'](0);
                                    throw _context3.t0;

                                case 18:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 15]]);
                }));
            };

            loadQuizCollaboratorEmails = function loadQuizCollaboratorEmails(context, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee4() {
                    var user, uids, emails;
                    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    _context4.next = 3;
                                    return FirebaseService.getLoggedInUser();

                                case 3:
                                    user = _context4.sent;
                                    _context4.next = 6;
                                    return QuizModel.getCollaboratorUids(quizId);

                                case 6:
                                    uids = _context4.sent;
                                    _context4.next = 9;
                                    return FirebaseService.set('security/' + user.uid + '/collaboratorSecurityInfo', {
                                        collection: QuizModel.dataPath,
                                        id: quizId
                                    });

                                case 9:
                                    _context4.next = 11;
                                    return UserModel.getEmailsByIds(uids);

                                case 11:
                                    emails = _context4.sent;

                                    context.action = {
                                        type: 'SET_QUIZ_COLLABORATOR_EMAILS',
                                        emails: emails
                                    };
                                    _context4.next = 18;
                                    break;

                                case 15:
                                    _context4.prev = 15;
                                    _context4.t0 = _context4['catch'](0);
                                    throw _context4.t0;

                                case 18:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[0, 15]]);
                }));
            };

            addCourseCollaborator = function addCourseCollaborator(context, courseId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee5() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    _context5.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context5.sent;

                                    if (uid) {
                                        _context5.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context5.next = 8;
                                    return CourseModel.associateCollaborator(courseId, uid);

                                case 8:
                                    _context5.next = 13;
                                    break;

                                case 10:
                                    _context5.prev = 10;
                                    _context5.t0 = _context5['catch'](0);
                                    throw _context5.t0;

                                case 13:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[0, 10]]);
                }));
            };

            addConceptCollaborator = function addConceptCollaborator(context, conceptId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee6() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    _context6.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context6.sent;

                                    if (uid) {
                                        _context6.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context6.next = 8;
                                    return ConceptModel.associateCollaborator(conceptId, uid);

                                case 8:
                                    _context6.next = 13;
                                    break;

                                case 10:
                                    _context6.prev = 10;
                                    _context6.t0 = _context6['catch'](0);
                                    throw _context6.t0;

                                case 13:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[0, 10]]);
                }));
            };

            addVideoCollaborator = function addVideoCollaborator(context, videoId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee7() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.prev = 0;
                                    _context7.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context7.sent;

                                    if (uid) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context7.next = 8;
                                    return VideoModel.associateCollaborator(videoId, uid);

                                case 8:
                                    _context7.next = 13;
                                    break;

                                case 10:
                                    _context7.prev = 10;
                                    _context7.t0 = _context7['catch'](0);
                                    throw _context7.t0;

                                case 13:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[0, 10]]);
                }));
            };

            addQuizCollaborator = function addQuizCollaborator(context, quizId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee8() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context8.sent;

                                    if (uid) {
                                        _context8.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context8.next = 8;
                                    return QuizModel.associateCollaborator(quizId, uid);

                                case 8:
                                    _context8.next = 13;
                                    break;

                                case 10:
                                    _context8.prev = 10;
                                    _context8.t0 = _context8['catch'](0);
                                    throw _context8.t0;

                                case 13:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[0, 10]]);
                }));
            };

            removeCourseCollaborator = function removeCourseCollaborator(context, courseId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee9() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    _context9.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context9.sent;

                                    if (uid) {
                                        _context9.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context9.next = 8;
                                    return CourseModel.disassociateCollaborator(courseId, uid);

                                case 8:
                                    _context9.next = 13;
                                    break;

                                case 10:
                                    _context9.prev = 10;
                                    _context9.t0 = _context9['catch'](0);
                                    throw _context9.t0;

                                case 13:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[0, 10]]);
                }));
            };

            removeConceptCollaborator = function removeConceptCollaborator(context, conceptId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee10() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    _context10.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context10.sent;

                                    if (uid) {
                                        _context10.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context10.next = 8;
                                    return ConceptModel.disassociateCollaborator(conceptId, uid);

                                case 8:
                                    _context10.next = 13;
                                    break;

                                case 10:
                                    _context10.prev = 10;
                                    _context10.t0 = _context10['catch'](0);
                                    throw _context10.t0;

                                case 13:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[0, 10]]);
                }));
            };

            removeVideoCollaborator = function removeVideoCollaborator(context, videoId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee11() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    _context11.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context11.sent;

                                    if (uid) {
                                        _context11.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context11.next = 8;
                                    return VideoModel.disassociateCollaborator(videoId, uid);

                                case 8:
                                    _context11.next = 13;
                                    break;

                                case 10:
                                    _context11.prev = 10;
                                    _context11.t0 = _context11['catch'](0);
                                    throw _context11.t0;

                                case 13:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[0, 10]]);
                }));
            };

            removeQuizCollaborator = function removeQuizCollaborator(context, quizId, email) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee12() {
                    var uid;
                    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    _context12.next = 3;
                                    return EmailsToUidsModel.getUidByEmail(email);

                                case 3:
                                    uid = _context12.sent;

                                    if (uid) {
                                        _context12.next = 6;
                                        break;
                                    }

                                    throw 'The user does not exist';

                                case 6:
                                    _context12.next = 8;
                                    return QuizModel.disassociateCollaborator(quizId, uid);

                                case 8:
                                    _context12.next = 13;
                                    break;

                                case 10:
                                    _context12.prev = 10;
                                    _context12.t0 = _context12['catch'](0);
                                    throw _context12.t0;

                                case 13:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this, [[0, 10]]);
                }));
            };

            starCourse = function starCourse(context, courseId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee13() {
                    var user;
                    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.next = 2;
                                    return FirebaseService.getLoggedInUser();

                                case 2:
                                    user = _context13.sent;
                                    _context13.next = 5;
                                    return UserModel.starCourse(user.uid, courseId);

                                case 5:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this);
                }));
            };

            getQuiz = function getQuiz(quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee14() {
                    var quiz;
                    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.next = 2;
                                    return QuizModel.getById(quizId);

                                case 2:
                                    quiz = _context14.sent;
                                    return _context14.abrupt('return', quiz);

                                case 4:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this);
                }));
            };

            updateQuizTitle = function updateQuizTitle(quizId, title) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee15() {
                    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    _context15.next = 2;
                                    return QuizModel.updateTitle(quizId, title);

                                case 2:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this);
                }));
            };

            createNewQuiz = function createNewQuiz(context, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee16() {
                    var user, uid, quizId;
                    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.next = 2;
                                    return FirebaseService.getLoggedInUser();

                                case 2:
                                    user = _context16.sent;
                                    uid = user.uid;
                                    _context16.next = 6;
                                    return QuizModel.createOrUpdate(null, {
                                        id: null,
                                        uid: uid,
                                        title: '',
                                        private: false,
                                        quizSettings: {
                                            answerFeedback: true,
                                            showAnswer: true,
                                            showHint: true,
                                            showCode: true,
                                            graded: false,
                                            showConfidenceLevel: true,
                                            allowGeneration: true
                                        },
                                        questions: {},
                                        collaborators: {}
                                    });

                                case 6:
                                    quizId = _context16.sent;
                                    _context16.next = 9;
                                    return ConceptModel.associateQuiz(conceptId, quizId);

                                case 9:
                                    return _context16.abrupt('return', quizId);

                                case 10:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this);
                }));
            };

            loadConceptQuizzes = function loadConceptQuizzes(context, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee17() {
                    var quizzIds, quizzes;
                    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    _context17.next = 2;
                                    return ConceptModel.getQuizIds(conceptId);

                                case 2:
                                    quizzIds = _context17.sent;
                                    _context17.next = 5;
                                    return QuizModel.resolveQuizIds(quizzIds);

                                case 5:
                                    quizzes = _context17.sent;

                                    context.action = {
                                        type: 'LOAD_CONCEPT_QUIZZES',
                                        conceptId: conceptId,
                                        quizzes: quizzes
                                    };

                                case 7:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this);
                }));
            };

            setCurrentEditQuizId = function setCurrentEditQuizId(context, quizId) {
                context.action = {
                    type: 'SET_CURRENT_EDIT_QUIZ_ID',
                    quizId: quizId
                };
            };

            loadQuizSettings = function loadQuizSettings(context, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee18() {
                    var quizSettings;
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    _context18.next = 2;
                                    return QuizModel.getQuizSettings(quizId);

                                case 2:
                                    quizSettings = _context18.sent;

                                    context.action = {
                                        type: 'LOAD_QUIZ_SETTINGS',
                                        quizSettings: quizSettings
                                    };

                                case 4:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this);
                }));
            };

            setQuizSetting = function setQuizSetting(context, quizId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee19() {
                    return _regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    _context19.next = 2;
                                    return QuizModel.setQuizSetting(quizId, settingName, value);

                                case 2:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this);
                }));
            };

            setQuestionSetting = function setQuestionSetting(context, quizId, questionId, settingName, value) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee20() {
                    return _regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    _context20.next = 2;
                                    return QuizModel.setQuestionSetting(quizId, questionId, settingName, value);

                                case 2:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this);
                }));
            };

            loadQuizQuestionIds = function loadQuizQuestionIds(context, quizId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee21() {
                    var quizQuestionIds;
                    return _regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    _context21.next = 2;
                                    return QuizModel.getQuestionIds(quizId);

                                case 2:
                                    quizQuestionIds = _context21.sent;

                                    context.action = {
                                        type: 'LOAD_QUIZ_QUESTION_IDS',
                                        quizQuestionIds: quizQuestionIds
                                    };

                                case 4:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this);
                }));
            };

            addQuestionToQuiz = function addQuestionToQuiz(context, quizId, questionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee22() {
                    return _regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    _context22.next = 2;
                                    return QuizModel.associateQuestion(quizId, questionId);

                                case 2:
                                case 'end':
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, this);
                }));
            };

            removeQuestionFromQuiz = function removeQuestionFromQuiz(context, quizId, questionId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee23() {
                    return _regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    _context23.next = 2;
                                    return QuizModel.disassociateQuestion(quizId, questionId);

                                case 2:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this);
                }));
            };

            loadUserQuestionIds = function loadUserQuestionIds(context, getUserQuestionIdsAjax) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee24() {
                    var request, userQuestionIds;
                    return _regeneratorRuntime.wrap(function _callee24$(_context24) {
                        while (1) {
                            switch (_context24.prev = _context24.next) {
                                case 0:
                                    request = getUserQuestionIdsAjax.generateRequest();
                                    _context24.next = 3;
                                    return request.completes;

                                case 3:
                                    userQuestionIds = request.response.questionIds;

                                    context.action = {
                                        type: 'LOAD_USER_QUESTION_IDS',
                                        userQuestionIds: userQuestionIds
                                    };

                                case 5:
                                case 'end':
                                    return _context24.stop();
                            }
                        }
                    }, _callee24, this);
                }));
            };

            loadPublicQuestionIds = function loadPublicQuestionIds(context, getPublicQuestionIdsAjax) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee25() {
                    var request, publicQuestionIds;
                    return _regeneratorRuntime.wrap(function _callee25$(_context25) {
                        while (1) {
                            switch (_context25.prev = _context25.next) {
                                case 0:
                                    request = getPublicQuestionIdsAjax.generateRequest();
                                    _context25.next = 3;
                                    return request.completes;

                                case 3:
                                    publicQuestionIds = request.response.questionIds;

                                    context.action = {
                                        type: 'LOAD_PUBLIC_QUESTION_IDS',
                                        publicQuestionIds: publicQuestionIds
                                    };

                                case 5:
                                case 'end':
                                    return _context25.stop();
                            }
                        }
                    }, _callee25, this);
                }));
            };

            deleteVideo = function deleteVideo(context, id) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee26() {
                    return _regeneratorRuntime.wrap(function _callee26$(_context26) {
                        while (1) {
                            switch (_context26.prev = _context26.next) {
                                case 0:
                                    _context26.prev = 0;
                                    _context26.next = 3;
                                    return VideoModel.removeById(id);

                                case 3:
                                    _context26.next = 8;
                                    break;

                                case 5:
                                    _context26.prev = 5;
                                    _context26.t0 = _context26['catch'](0);
                                    throw _context26.t0;

                                case 8:
                                case 'end':
                                    return _context26.stop();
                            }
                        }
                    }, _callee26, this, [[0, 5]]);
                }));
            };

            saveVideo = function saveVideo(context, conceptId, videoId, video) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee27() {
                    var newId;
                    return _regeneratorRuntime.wrap(function _callee27$(_context27) {
                        while (1) {
                            switch (_context27.prev = _context27.next) {
                                case 0:
                                    _context27.prev = 0;
                                    _context27.next = 3;
                                    return VideoModel.createOrUpdate(videoId, video);

                                case 3:
                                    newId = _context27.sent;
                                    _context27.next = 6;
                                    return ConceptModel.associateVideo(conceptId, newId);

                                case 6:
                                    context.action = {
                                        type: 'SET_CURRENT_VIDEO_ID',
                                        id: newId
                                    };
                                    _context27.next = 12;
                                    break;

                                case 9:
                                    _context27.prev = 9;
                                    _context27.t0 = _context27['catch'](0);
                                    throw _context27.t0;

                                case 12:
                                case 'end':
                                    return _context27.stop();
                            }
                        }
                    }, _callee27, this, [[0, 9]]);
                }));
            };

            setCurrentVideoInfo = function setCurrentVideoInfo(context, id, title, url) {
                context.action = {
                    type: 'SET_CURRENT_VIDEO_INFO',
                    id: id,
                    title: title,
                    url: url
                };
            };

            clearCurrentVideoInfo = function clearCurrentVideoInfo(context) {
                context.action = {
                    type: 'CLEAR_CURRENT_VIDEO_INFO'
                };
            };

            loadConceptVideos = function loadConceptVideos(context, conceptId) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee28() {
                    var videoIds, videos;
                    return _regeneratorRuntime.wrap(function _callee28$(_context28) {
                        while (1) {
                            switch (_context28.prev = _context28.next) {
                                case 0:
                                    _context28.prev = 0;
                                    _context28.next = 3;
                                    return ConceptModel.getVideoIds(conceptId);

                                case 3:
                                    videoIds = _context28.sent;
                                    _context28.next = 6;
                                    return VideoModel.resolveVideoIds(videoIds);

                                case 6:
                                    videos = _context28.sent;

                                    context.action = {
                                        type: 'LOAD_CONCEPT_VIDEOS',
                                        videos: videos,
                                        conceptId: conceptId
                                    };
                                    _context28.next = 13;
                                    break;

                                case 10:
                                    _context28.prev = 10;
                                    _context28.t0 = _context28['catch'](0);
                                    throw _context28.t0;

                                case 13:
                                case 'end':
                                    return _context28.stop();
                            }
                        }
                    }, _callee28, this, [[0, 10]]);
                }));
            };

            createUser = {
                type: 'CREATE_USER',
                execute: function execute(context, data, password) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee29() {
                        var success, loggedInUser;
                        return _regeneratorRuntime.wrap(function _callee29$(_context29) {
                            while (1) {
                                switch (_context29.prev = _context29.next) {
                                    case 0:
                                        _context29.prev = 0;
                                        _context29.next = 3;
                                        return FirebaseService.createUserWithEmailAndPassword(data.email, password);

                                    case 3:
                                        success = _context29.sent;
                                        _context29.next = 6;
                                        return FirebaseService.logInUserWithEmailAndPassword(data.email, password);

                                    case 6:
                                        loggedInUser = _context29.sent;
                                        _context29.next = 9;
                                        return UserModel.updateMetaData(loggedInUser.uid, data);

                                    case 9:
                                        _context29.next = 11;
                                        return EmailsToUidsModel.setUidByEmail(data.email, loggedInUser.uid);

                                    case 11:
                                        data.email = loggedInUser.email;
                                        context.action = {
                                            type: Actions.createUser.type,
                                            currentUser: data
                                        };
                                        _context29.next = 18;
                                        break;

                                    case 15:
                                        _context29.prev = 15;
                                        _context29.t0 = _context29['catch'](0);
                                        throw _context29.t0;

                                    case 18:
                                    case 'end':
                                        return _context29.stop();
                                }
                            }
                        }, _callee29, this, [[0, 15]]);
                    }));
                }
            };
            loginUser = {
                type: 'LOGIN_USER',
                execute: function execute(context, email, password) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee30() {
                        var loggedInUser, user;
                        return _regeneratorRuntime.wrap(function _callee30$(_context30) {
                            while (1) {
                                switch (_context30.prev = _context30.next) {
                                    case 0:
                                        _context30.prev = 0;
                                        _context30.next = 3;
                                        return FirebaseService.logInUserWithEmailAndPassword(email, password);

                                    case 3:
                                        loggedInUser = _context30.sent;
                                        _context30.next = 6;
                                        return UserModel.getById(loggedInUser.uid);

                                    case 6:
                                        user = _context30.sent;
                                        //sets ancillary user data such as name, institution, etc.
                                        user.metaData.uid = loggedInUser.uid;
                                        context.action = {
                                            type: Actions.loginUser.type,
                                            user: user
                                        };
                                        _context30.next = 14;
                                        break;

                                    case 11:
                                        _context30.prev = 11;
                                        _context30.t0 = _context30['catch'](0);
                                        throw _context30.t0;

                                    case 14:
                                    case 'end':
                                        return _context30.stop();
                                }
                            }
                        }, _callee30, this, [[0, 11]]);
                    }));
                }
            };
            updateUserEmail = {
                type: 'UPDATE_USER_PROFILE',
                execute: function execute(context, pastEmail, password, newEmail) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee31() {
                        var loggedInUser;
                        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
                            while (1) {
                                switch (_context31.prev = _context31.next) {
                                    case 0:
                                        _context31.prev = 0;
                                        _context31.next = 3;
                                        return FirebaseService.logInUserWithEmailAndPassword(pastEmail, password);

                                    case 3:
                                        loggedInUser = _context31.sent;
                                        _context31.next = 6;
                                        return UserModel.updateFirebaseUser(loggedInUser, newEmail);

                                    case 6:
                                        _context31.next = 11;
                                        break;

                                    case 8:
                                        _context31.prev = 8;
                                        _context31.t0 = _context31['catch'](0);
                                        throw _context31.t0;

                                    case 11:
                                    case 'end':
                                        return _context31.stop();
                                }
                            }
                        }, _callee31, this, [[0, 8]]);
                    }));
                }
            };
            updateUserMetaData = {
                type: 'UPDATE_USER_META_DATA',
                execute: function execute(context, uid, metaData) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee32() {
                        return _regeneratorRuntime.wrap(function _callee32$(_context32) {
                            while (1) {
                                switch (_context32.prev = _context32.next) {
                                    case 0:
                                        _context32.prev = 0;
                                        _context32.next = 3;
                                        return UserModel.updateMetaData(uid, metaData);

                                    case 3:
                                        context.action = {
                                            type: Actions.updateUserMetaData.type,
                                            user: metaData
                                        };
                                        _context32.next = 9;
                                        break;

                                    case 6:
                                        _context32.prev = 6;
                                        _context32.t0 = _context32['catch'](0);
                                        throw _context32.t0;

                                    case 9:
                                    case 'end':
                                        return _context32.stop();
                                }
                            }
                        }, _callee32, this, [[0, 6]]);
                    }));
                }
            };
            checkUserAuth = {
                type: 'CHECK_USER_AUTH',
                execute: function execute(context) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee33() {
                        var loggedInUser, user, jwt;
                        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
                            while (1) {
                                switch (_context33.prev = _context33.next) {
                                    case 0:
                                        _context33.prev = 0;
                                        _context33.next = 3;
                                        return FirebaseService.getLoggedInUser();

                                    case 3:
                                        loggedInUser = _context33.sent;

                                        if (!loggedInUser) {
                                            _context33.next = 13;
                                            break;
                                        }

                                        _context33.next = 7;
                                        return UserModel.getById(loggedInUser.uid);

                                    case 7:
                                        user = _context33.sent;

                                        user.metaData.uid = loggedInUser.uid; //OK because its being created here.
                                        _context33.next = 11;
                                        return loggedInUser.getToken();

                                    case 11:
                                        jwt = _context33.sent;

                                        context.action = {
                                            type: Actions.checkUserAuth.type,
                                            user: user,
                                            jwt: jwt
                                        };

                                    case 13:
                                        _context33.next = 18;
                                        break;

                                    case 15:
                                        _context33.prev = 15;
                                        _context33.t0 = _context33['catch'](0);
                                        throw _context33.t0;

                                    case 18:
                                    case 'end':
                                        return _context33.stop();
                                }
                            }
                        }, _callee33, this, [[0, 15]]);
                    }));
                }
            };
            addConcept = {
                type: 'ADD_CONCEPT',
                execute: function execute(context, courseId, newConcept, conceptPos) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee34() {
                        var conceptId, course, conceptsArray, orderedConcepts;
                        return _regeneratorRuntime.wrap(function _callee34$(_context34) {
                            while (1) {
                                switch (_context34.prev = _context34.next) {
                                    case 0:
                                        _context34.prev = 0;
                                        _context34.next = 3;
                                        return ConceptModel.save(null, newConcept);

                                    case 3:
                                        conceptId = _context34.sent;
                                        _context34.next = 6;
                                        return CourseModel.associateConcept(courseId, conceptId, conceptPos);

                                    case 6:
                                        _context34.next = 8;
                                        return CourseModel.getById(courseId);

                                    case 8:
                                        course = _context34.sent;
                                        _context34.next = 11;
                                        return CourseModel.courseConceptsToArray(course);

                                    case 11:
                                        conceptsArray = _context34.sent;
                                        orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);

                                        course.concepts = orderedConcepts;
                                        context.action = {
                                            type: 'ADD_CONCEPT',
                                            currentCourse: course
                                        };
                                        _context34.next = 20;
                                        break;

                                    case 17:
                                        _context34.prev = 17;
                                        _context34.t0 = _context34['catch'](0);
                                        throw _context34.t0;

                                    case 20:
                                    case 'end':
                                        return _context34.stop();
                                }
                            }
                        }, _callee34, this, [[0, 17]]);
                    }));
                }
            };
            getConceptById = {
                type: 'GET_CONCEPT_BY_ID',
                execute: function execute(context, id) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee35() {
                        var concept;
                        return _regeneratorRuntime.wrap(function _callee35$(_context35) {
                            while (1) {
                                switch (_context35.prev = _context35.next) {
                                    case 0:
                                        _context35.prev = 0;
                                        _context35.next = 3;
                                        return ConceptModel.getById(id);

                                    case 3:
                                        concept = _context35.sent;

                                        context.action = {
                                            type: Actions.getConceptById.type,
                                            concept: concept
                                        };
                                        _context35.next = 10;
                                        break;

                                    case 7:
                                        _context35.prev = 7;
                                        _context35.t0 = _context35['catch'](0);
                                        throw _context35.t0;

                                    case 10:
                                    case 'end':
                                        return _context35.stop();
                                }
                            }
                        }, _callee35, this, [[0, 7]]);
                    }));
                }
            };
            addCourse = {
                type: 'ADD_COURSE',
                execute: function execute(context, newCourse) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee36() {
                        var courseId, courses;
                        return _regeneratorRuntime.wrap(function _callee36$(_context36) {
                            while (1) {
                                switch (_context36.prev = _context36.next) {
                                    case 0:
                                        _context36.prev = 0;
                                        _context36.next = 3;
                                        return CourseModel.createOrUpdate(null, newCourse);

                                    case 3:
                                        courseId = _context36.sent;
                                        _context36.next = 6;
                                        return CourseModel.getCoursesByUser(newCourse.uid);

                                    case 6:
                                        courses = _context36.sent;

                                        context.action = {
                                            type: Actions.addCourse.type,
                                            courses: courses
                                        };
                                        _context36.next = 13;
                                        break;

                                    case 10:
                                        _context36.prev = 10;
                                        _context36.t0 = _context36['catch'](0);
                                        throw _context36.t0;

                                    case 13:
                                    case 'end':
                                        return _context36.stop();
                                }
                            }
                        }, _callee36, this, [[0, 10]]);
                    }));
                }
            };
            getCoursesByUser = {
                execute: function execute(context) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee37() {
                        var loggedInUser, courses;
                        return _regeneratorRuntime.wrap(function _callee37$(_context37) {
                            while (1) {
                                switch (_context37.prev = _context37.next) {
                                    case 0:
                                        _context37.prev = 0;
                                        _context37.next = 3;
                                        return FirebaseService.getLoggedInUser();

                                    case 3:
                                        loggedInUser = _context37.sent;

                                        if (!loggedInUser) {
                                            _context37.next = 9;
                                            break;
                                        }

                                        _context37.next = 7;
                                        return CourseModel.getCoursesByUser(loggedInUser.uid);

                                    case 7:
                                        courses = _context37.sent;

                                        context.action = {
                                            type: 'GET_COURSES_BY_USER',
                                            courses: courses
                                        };

                                    case 9:
                                        _context37.next = 14;
                                        break;

                                    case 11:
                                        _context37.prev = 11;
                                        _context37.t0 = _context37['catch'](0);
                                        throw _context37.t0;

                                    case 14:
                                    case 'end':
                                        return _context37.stop();
                                }
                            }
                        }, _callee37, this, [[0, 11]]);
                    }));
                }
            };

            getStarredCoursesByUser = function getStarredCoursesByUser(context, uid) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee38() {
                    var courseIds, courses;
                    return _regeneratorRuntime.wrap(function _callee38$(_context38) {
                        while (1) {
                            switch (_context38.prev = _context38.next) {
                                case 0:
                                    _context38.prev = 0;
                                    _context38.next = 3;
                                    return UserModel.getStarredCoursesIds(uid);

                                case 3:
                                    courseIds = _context38.sent;
                                    _context38.next = 6;
                                    return CourseModel.resolveCourseIds(courseIds);

                                case 6:
                                    courses = _context38.sent;

                                    context.action = {
                                        type: 'SET_STARRED_COURSES',
                                        courses: courses
                                    };
                                    _context38.next = 13;
                                    break;

                                case 10:
                                    _context38.prev = 10;
                                    _context38.t0 = _context38['catch'](0);
                                    throw _context38.t0;

                                case 13:
                                case 'end':
                                    return _context38.stop();
                            }
                        }
                    }, _callee38, this, [[0, 10]]);
                }));
            };

            getSharedCoursesByUser = function getSharedCoursesByUser(context, uid) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee39() {
                    var courseIds, courses;
                    return _regeneratorRuntime.wrap(function _callee39$(_context39) {
                        while (1) {
                            switch (_context39.prev = _context39.next) {
                                case 0:
                                    _context39.prev = 0;
                                    _context39.next = 3;
                                    return UserModel.getSharedWithMeCoursesIds(uid);

                                case 3:
                                    courseIds = _context39.sent;
                                    _context39.next = 6;
                                    return CourseModel.resolveCourseIds(courseIds);

                                case 6:
                                    courses = _context39.sent;

                                    context.action = {
                                        type: 'SET_SHARED_COURSES',
                                        courses: courses
                                    };
                                    _context39.next = 13;
                                    break;

                                case 10:
                                    _context39.prev = 10;
                                    _context39.t0 = _context39['catch'](0);
                                    throw _context39.t0;

                                case 13:
                                case 'end':
                                    return _context39.stop();
                            }
                        }
                    }, _callee39, this, [[0, 10]]);
                }));
            };

            getCoursesByVisibility = function getCoursesByVisibility(context, visibility) {
                return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee40() {
                    var courses;
                    return _regeneratorRuntime.wrap(function _callee40$(_context40) {
                        while (1) {
                            switch (_context40.prev = _context40.next) {
                                case 0:
                                    _context40.next = 2;
                                    return CourseModel.getAllByVisibility(visibility);

                                case 2:
                                    courses = _context40.sent;

                                    context.action = {
                                        type: 'SET_COURSES_BY_VISIBILITY',
                                        visibility: visibility,
                                        courses: courses
                                    };

                                case 4:
                                case 'end':
                                    return _context40.stop();
                            }
                        }
                    }, _callee40, this);
                }));
            };

            getCourseById = {
                execute: function execute(context, id) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee41() {
                        var course, conceptsArray, orderedConcepts;
                        return _regeneratorRuntime.wrap(function _callee41$(_context41) {
                            while (1) {
                                switch (_context41.prev = _context41.next) {
                                    case 0:
                                        _context41.prev = 0;
                                        _context41.next = 3;
                                        return CourseModel.getById(id);

                                    case 3:
                                        course = _context41.sent;
                                        _context41.next = 6;
                                        return CourseModel.courseConceptsToArray(course);

                                    case 6:
                                        conceptsArray = _context41.sent;
                                        orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);

                                        course.concepts = orderedConcepts;
                                        context.action = {
                                            type: 'GET_COURSE_BY_ID',
                                            currentCourse: course
                                        };
                                        _context41.next = 15;
                                        break;

                                    case 12:
                                        _context41.prev = 12;
                                        _context41.t0 = _context41['catch'](0);
                                        throw _context41.t0;

                                    case 15:
                                    case 'end':
                                        return _context41.stop();
                                }
                            }
                        }, _callee41, this, [[0, 12]]);
                    }));
                }
            };
            deleteConcept = {
                execute: function execute(context, id, conceptId) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee42() {
                        var course, conceptsArray, orderedConcepts;
                        return _regeneratorRuntime.wrap(function _callee42$(_context42) {
                            while (1) {
                                switch (_context42.prev = _context42.next) {
                                    case 0:
                                        _context42.prev = 0;
                                        _context42.next = 3;
                                        return CourseModel.deleteCourseConcept(id, conceptId);

                                    case 3:
                                        _context42.next = 5;
                                        return CourseModel.getById(id);

                                    case 5:
                                        course = _context42.sent;
                                        _context42.next = 8;
                                        return CourseModel.courseConceptsToArray(course);

                                    case 8:
                                        conceptsArray = _context42.sent;
                                        orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);

                                        course.concepts = orderedConcepts;
                                        context.action = {
                                            type: 'GET_COURSE_BY_ID',
                                            currentCourse: course
                                        };
                                        _context42.next = 17;
                                        break;

                                    case 14:
                                        _context42.prev = 14;
                                        _context42.t0 = _context42['catch'](0);
                                        throw _context42.t0;

                                    case 17:
                                    case 'end':
                                        return _context42.stop();
                                }
                            }
                        }, _callee42, this, [[0, 14]]);
                    }));
                }
            };
            orderConcepts = {
                type: 'ORDER_CONCEPTS',
                execute: function execute(context, id, courseConceptsArray) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee43() {
                        return _regeneratorRuntime.wrap(function _callee43$(_context43) {
                            while (1) {
                                switch (_context43.prev = _context43.next) {
                                    case 0:
                                        _context43.prev = 0;
                                        _context43.next = 3;
                                        return CourseModel.updateCourseConcepts(id, courseConceptsArray);

                                    case 3:
                                        _context43.next = 8;
                                        break;

                                    case 5:
                                        _context43.prev = 5;
                                        _context43.t0 = _context43['catch'](0);
                                        throw _context43.t0;

                                    case 8:
                                    case 'end':
                                        return _context43.stop();
                                }
                            }
                        }, _callee43, this, [[0, 5]]);
                    }));
                }
            };
            updateCourseTitle = {
                execute: function execute(context, id, title) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee44() {
                        return _regeneratorRuntime.wrap(function _callee44$(_context44) {
                            while (1) {
                                switch (_context44.prev = _context44.next) {
                                    case 0:
                                        _context44.prev = 0;
                                        _context44.next = 3;
                                        return CourseModel.updateCourseTitle(id, title);

                                    case 3:
                                        context.action = {
                                            type: 'UPDATE_COURSE_TITLE',
                                            currentCourse: orderedCourse
                                        };
                                        _context44.next = 9;
                                        break;

                                    case 6:
                                        _context44.prev = 6;
                                        _context44.t0 = _context44['catch'](0);
                                        throw _context44.t0;

                                    case 9:
                                    case 'end':
                                        return _context44.stop();
                                }
                            }
                        }, _callee44, this, [[0, 6]]);
                    }));
                }
            };
            logOutUser = {
                type: 'LOGOUT_USER',
                execute: function execute(context) {
                    return __awaiter(_this, void 0, void 0, _regeneratorRuntime.mark(function _callee45() {
                        return _regeneratorRuntime.wrap(function _callee45$(_context45) {
                            while (1) {
                                switch (_context45.prev = _context45.next) {
                                    case 0:
                                        _context45.next = 2;
                                        return FirebaseService.logOutUser();

                                    case 2:
                                        context.action = {
                                            type: Actions.logOutUser.type
                                        };

                                    case 3:
                                    case 'end':
                                        return _context45.stop();
                                }
                            }
                        }, _callee45, this);
                    }));
                }
            };

            _export('Actions', Actions = {
                loginUser: loginUser,
                checkUserAuth: checkUserAuth,
                deleteConcept: deleteConcept,
                orderConcepts: orderConcepts,
                addConcept: addConcept,
                createUser: createUser,
                logOutUser: logOutUser,
                updateUserEmail: updateUserEmail,
                updateUserMetaData: updateUserMetaData,
                loadConceptVideos: loadConceptVideos,
                setCurrentVideoInfo: setCurrentVideoInfo,
                saveVideo: saveVideo,
                clearCurrentVideoInfo: clearCurrentVideoInfo,
                deleteVideo: deleteVideo,
                addCourse: addCourse,
                getCoursesByUser: getCoursesByUser,
                getCoursesByVisibility: getCoursesByVisibility,
                loadUserQuestionIds: loadUserQuestionIds,
                addQuestionToQuiz: addQuestionToQuiz,
                loadQuizQuestionIds: loadQuizQuestionIds,
                removeQuestionFromQuiz: removeQuestionFromQuiz,
                setQuizSetting: setQuizSetting,
                setQuestionSetting: setQuestionSetting,
                loadQuizSettings: loadQuizSettings,
                setCurrentEditQuizId: setCurrentEditQuizId,
                loadConceptQuizzes: loadConceptQuizzes,
                createNewQuiz: createNewQuiz,
                updateQuizTitle: updateQuizTitle,
                getQuiz: getQuiz,
                getCourseById: getCourseById,
                getConceptById: getConceptById,
                loadPublicQuestionIds: loadPublicQuestionIds,
                starCourse: starCourse,
                getStarredCoursesByUser: getStarredCoursesByUser,
                addQuizCollaborator: addQuizCollaborator,
                loadQuizCollaboratorEmails: loadQuizCollaboratorEmails,
                removeQuizCollaborator: removeQuizCollaborator,
                getSharedCoursesByUser: getSharedCoursesByUser,
                loadCourseCollaboratorEmails: loadCourseCollaboratorEmails,
                loadConceptCollaboratorEmails: loadConceptCollaboratorEmails,
                loadVideoCollaboratorEmails: loadVideoCollaboratorEmails,
                addCourseCollaborator: addCourseCollaborator,
                addConceptCollaborator: addConceptCollaborator,
                addVideoCollaborator: addVideoCollaborator,
                removeCourseCollaborator: removeCourseCollaborator,
                removeConceptCollaborator: removeConceptCollaborator,
                removeVideoCollaborator: removeVideoCollaborator
            });

            _export('Actions', Actions);
        }
    };
});
$__System.register("2e", ["29"], function (_export, _context2) {
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
        setters: [function (_) {
            _regeneratorRuntime = _.default;
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
$__System.register('2a', ['29'], function (_export, _context11) {
    "use strict";

    var _regeneratorRuntime, _this, __awaiter, prendusFirebaseApps, prendusFirebaseApp, set, remove, push, get, update, getAllBy, createUserWithEmailAndPassword, logInUserWithEmailAndPassword, logOutUser, getLoggedInUser, updateUserProfile, init, FirebaseService;

    return {
        setters: [function (_) {
            _regeneratorRuntime = _.default;
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
                getAllBy: getAllBy
            });

            _export('FirebaseService', FirebaseService);
        }
    };
});
$__System.register('5', ['25', '26', '29', '37', '2e', '2a'], function (_export, _context20) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, Actions, UtilitiesService, FirebaseService, __awaiter, PrendusQuizEditor;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
        }, function (_4) {
            Actions = _4.Actions;
        }, function (_e) {
            UtilitiesService = _e.UtilitiesService;
        }, function (_a) {
            FirebaseService = _a.FirebaseService;
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
                        window.history.pushState({}, '', 'courses/edit-question/question');
                        this.fire('location-changed', {}, { node: window });
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                        var editProblemComponent = document.getElementById('editProblemComponent');
                        editProblemComponent.originalText = '';
                        editProblemComponent.originalCode = '';
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
                    }
                }, {
                    key: 'editQuestion',
                    value: function editQuestion(e) {
                        var questionId = e.model.item;
                        window.history.pushState({}, '', 'courses/edit-question/question/' + questionId);
                        this.fire('location-changed', {}, { node: window });
                        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
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
                                            return Actions.loadConceptQuizzes(this, this.conceptId);

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
$__System.register("29", [], function (_export, _context) {
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
$__System.register("4", ["25", "26", "29"], function (_export, _context2) {
    "use strict";

    var _regeneratorRuntime, _classCallCheck, _createClass, __awaiter, PrendusRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
        }, function (_3) {
            _regeneratorRuntime = _3.default;
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
                    }
                }, {
                    key: "ready",
                    value: function ready() {
                        return __awaiter(this, void 0, void 0, _regeneratorRuntime.mark(function _callee() {
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, this);
                        }));
                    }
                }]);

                return PrendusRouter;
            }();

            Polymer(PrendusRouter);
        }
    };
});
$__System.register('3', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusVideoEditor;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register('2', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusViewQuizRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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
$__System.register("25", [], function (_export, _context) {
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
$__System.register("26", [], function (_export, _context) {
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
$__System.register('1', ['25', '26'], function (_export, _context) {
    "use strict";

    var _classCallCheck, _createClass, PrendusViewVideoRouter;

    return {
        setters: [function (_) {
            _classCallCheck = _.default;
        }, function (_2) {
            _createClass = _2.default;
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