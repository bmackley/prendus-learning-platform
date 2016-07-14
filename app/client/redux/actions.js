"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const firebase_service_ts_1 = require('../node_modules/prendus-services/services/firebase.service.ts');
const course_model_ts_1 = require('../models/course.model.ts');
const concept_model_ts_1 = require('../models/concept.model.ts');
const user_model_ts_1 = require('../node_modules/prendus-services/models/user.model.ts');
const video_model_ts_1 = require('../node_modules/prendus-services/models/video.model.ts');
const deleteVideo = (context, id) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield video_model_ts_1.VideoModel.removeById(id);
    }
    catch (error) {
        throw error;
    }
});
const saveVideo = (context, id, video) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newId = yield video_model_ts_1.VideoModel.createOrUpdate(id, video);
        context.action = {
            type: 'SET_CURRENT_VIDEO_ID',
            id: newId
        };
    }
    catch (error) {
        throw error;
    }
});
const setCurrentVideoInfo = (context, id, title, url) => {
    context.action = {
        type: 'SET_CURRENT_VIDEO_INFO',
        id: id,
        title: title,
        url: url
    };
};
const clearCurrentVideoInfo = (context) => {
    context.action = {
        type: 'CLEAR_CURRENT_VIDEO_INFO'
    };
};
const loadConceptVideos = (context, conceptId) => __awaiter(this, void 0, void 0, function* () {
    try {
        const videos = yield video_model_ts_1.VideoModel.getAllByConcept(conceptId);
        context.action = {
            type: 'LOAD_CONCEPT_VIDEOS',
            videos: videos,
            conceptId: conceptId
        };
    }
    catch (error) {
        throw error;
    }
});
const createUser = {
    type: 'CREATE_USER',
    execute: (context, data, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const success = yield firebase_service_ts_1.FirebaseService.createUserWithEmailAndPassword(data.email, password);
            const loggedInUser = yield firebase_service_ts_1.FirebaseService.logInUserWithEmailAndPassword(data.email, password);
            yield user_model_ts_1.UserModel.updateMetaData(loggedInUser.uid, data);
            data.email = loggedInUser.email;
            context.action = {
                type: exports.Actions.createUser.type,
                currentUser: data,
            };
        }
        catch (error) {
            throw error;
        }
    })
};
const loginUser = {
    type: 'LOGIN_USER',
    execute: (context, email, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const loggedInUser = yield firebase_service_ts_1.FirebaseService.logInUserWithEmailAndPassword(email, password);
            let userData = yield user_model_ts_1.UserModel.getMetaDataById(loggedInUser.uid);
            userData.uid = loggedInUser.uid;
            context.action = {
                type: exports.Actions.loginUser.type,
                currentUser: userData,
            };
        }
        catch (error) {
            console.log('in the action throwing the error');
            throw error;
        }
    })
};
const updateUserEmail = {
    type: 'UPDATE_USER_PROFILE',
    execute: (context, pastEmail, password, newEmail) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('actions password', password);
            const loggedInUser = yield firebase_service_ts_1.FirebaseService.logInUserWithEmailAndPassword(pastEmail, password);
            console.log('loggedInUser', loggedInUser);
            yield user_model_ts_1.UserModel.updateFirebaseUser(loggedInUser, newEmail);
        }
        catch (error) {
            throw error;
        }
    })
};
const updateUserMetaData = {
    type: 'UPDATE_USER_META_DATA',
    execute: (context, uid, metaData) => __awaiter(this, void 0, void 0, function* () {
        yield user_model_ts_1.UserModel.updateMetaData(uid, metaData);
        try {
            context.action = {
                type: exports.Actions.updateUserMetaData.type,
                user: metaData,
            };
        }
        catch (error) {
            throw error;
        }
    })
};
const checkUserAuth = {
    type: 'CHECK_USER_AUTH',
    execute: (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const loggedInUser = yield firebase_service_ts_1.FirebaseService.getLoggedInUser();
            if (loggedInUser) {
                let userData = yield user_model_ts_1.UserModel.getMetaDataById(loggedInUser.uid, 'metaData');
                userData.uid = loggedInUser.uid;
                console.log('userData', userData);
                context.action = {
                    type: exports.Actions.checkUserAuth.type,
                    currentUser: userData,
                };
            }
        }
        catch (error) {
            throw error;
        }
    })
};
const setConcepts = {
    type: 'SET_CONCEPTS',
    execute: (context, newConcept) => __awaiter(this, void 0, void 0, function* () {
        try {
            const conceptSuccess = yield concept_model_ts_1.ConceptModel.save(null, newConcept);
            context.action = newConcept;
        }
        catch (error) {
            throw error;
        }
    })
};
const addConcept = {
    type: 'ADD_CONCEPT',
    execute: (context, newConcept, conceptsArray) => __awaiter(this, void 0, void 0, function* () {
        try {
            const conceptId = yield concept_model_ts_1.ConceptModel.save(null, newConcept);
            conceptsArray.conceptSuccess = newConcept;
            context.action = {
                type: exports.Actions.addConcept.type,
                key: conceptId,
                pos: newConcept.pos,
                title: newConcept.title
            };
        }
        catch (error) {
            console.log('add concept error ', error);
            throw error;
        }
    })
};
const getConcepts = {
    type: 'GET_CONCEPTS',
    execute: (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const modelConcepts = yield concept_model_ts_1.ConceptModel.getConcepts();
            console.log(modelConcepts);
            context.action = {
                type: exports.Actions.getConcepts.type,
                concepts: modelConcepts,
            };
        }
        catch (error) {
            console.log('get concepts error ', error);
            throw error;
        }
    })
};
const addCourse = {
    type: 'ADD_COURSE',
    execute: (context, newCourse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = yield course_model_ts_1.CourseModel.createOrUpdate(null, newCourse);
            const savedCourse = Object.assign({}, newCourse);
            savedCourse.courseId = courseId;
            context.action = {
                type: exports.Actions.addCourse.type,
                newCourse: savedCourse,
                courseId: courseId,
            };
        }
        catch (error) {
            console.log('add course error ', error);
            throw error;
        }
    })
};
const getCourses = {
    type: 'GET_COURSES',
    execute: (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const loggedInUser = yield firebase_service_ts_1.FirebaseService.getLoggedInUser();
            const courses = yield course_model_ts_1.CourseModel.getCourses(loggedInUser.uid);
            context.action = {
                type: exports.Actions.getCourses.type,
                courses: courses,
            };
        }
        catch (error) {
            throw error;
        }
    })
};
const deleteConcept = {
    type: 'DELETE_CONCEPT',
    execute: (context, key, conceptsArray) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield concept_model_ts_1.ConceptModel.deleteConcept(key);
            context.action = {
                type: exports.Actions.deleteConcept.type,
                conceptKey: key,
            };
        }
        catch (error) {
            context.action = {
                type: exports.Actions.displayError.type,
                error: error,
            };
        }
    })
};
const orderConcepts = {
    type: 'ORDER_CONCEPTS',
    execute: (context, conceptsArray) => __awaiter(this, void 0, void 0, function* () {
        yield concept_model_ts_1.ConceptModel.orderConcepts(conceptsArray);
    })
};
const logOutUser = {
    type: 'LOGOUT_USER',
    execute: (context) => __awaiter(this, void 0, void 0, function* () {
        console.log('logging the user out');
        yield firebase_service_ts_1.FirebaseService.logOutUser();
        console.log('user has been logged out actions');
        context.action = {
            type: exports.Actions.logOutUser.type,
            user: '',
        };
    })
};
exports.Actions = {
    loginUser: loginUser,
    checkUserAuth: checkUserAuth,
    setConcepts: setConcepts,
    getConcepts: getConcepts,
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
    getCourses: getCourses,
};
