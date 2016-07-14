"use strict";
const initial_state_ts_1 = require('./initial-state.ts');
const actions_ts_1 = require('./actions.ts');
function rootReducer(state = initial_state_ts_1.InitialState, action) {
    switch (action.type) {
        case actions_ts_1.Actions.createUser.type: {
            const newState = Object.assign({}, state);
            newState.currentUser = action.currentUser;
            return newState;
        }
        case actions_ts_1.Actions.loginUser.type: {
            const newState = Object.assign({}, state);
            newState.currentUser = action.currentUser;
            return newState;
        }
        case actions_ts_1.Actions.checkUserAuth.type: {
            console.log('Reducer action user auth', action);
            const newState = Object.assign({}, state);
            newState.currentUser = action.currentUser;
            return newState;
        }
        case actions_ts_1.Actions.addConcept.type: {
            console.log('reducers add concept', action);
            const newState = Object.assign({}, state);
            console.log('new state', state);
            newState.concepts[action.key] = action;
            console.log("reducers add concept new state1 ", newState);
            newState.newConcept = newState.concepts[action.key];
            console.log("reducers add concept new state 2", newState);
            return newState;
        }
        case actions_ts_1.Actions.setConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = {
                title: action.title,
            };
            return newState;
        }
        case actions_ts_1.Actions.getConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = action.concepts;
            return newState;
        }
        case actions_ts_1.Actions.deleteConcept.type: {
            const newState = Object.assign({}, state);
            console.log('key', action.key);
            console.log('concepts', state);
            delete newState.concepts[action.conceptKey];
            newState.deletedConcept = action.conceptKey;
            console.log('Delete old State', state);
            console.log('Delete new State', newState);
            return newState;
        }
        case actions_ts_1.Actions.logOutUser.type: {
            const newState = Object.assign({}, state);
            console.log('user has been logged out actions');
            newState.currentUser = { uid: '', username: '', permissions: '' };
            return newState;
        }
        case actions_ts_1.Actions.updateUserMetaData.type: {
            const newState = Object.assign({}, state);
            const newUser = Object.assign(newState.currentUser, action.user);
            newState.currentUser = newUser;
            return newState;
        }
        case 'LOAD_CONCEPT_VIDEOS': {
            const newState = Object.assign({}, state);
            newState.conceptVideos[action.conceptId] = action.videos;
            return newState;
        }
        case 'SET_CURRENT_VIDEO_INFO': {
            const newState = Object.assign({}, state);
            newState.currentConceptVideoId = action.id;
            newState.currentConceptVideoTitle = action.title;
            newState.currentConceptVideoUrl = action.url;
            return newState;
        }
        case 'CLEAR_CURRENT_VIDEO_INFO': {
            const newState = Object.assign({}, state);
            newState.currentConceptVideoId = null;
            newState.currentConceptVideoTitle = '';
            newState.currentConceptVideoUrl = '';
            return newState;
        }
        case 'SET_CURRENT_VIDEO_ID': {
            const newState = Object.assign({}, state);
            newState.currentConceptVideoId = action.id;
            return newState;
        }
        case 'GET_COURSES': {
            const newState = Object.assign({}, state);
            newState.courses = action.courses;
            return newState;
        }
        case 'ADD_COURSE': {
            const newState = Object.assign({}, state);
            newState.courses[action.courseId] = action.newCourse;
            return newState;
        }
        default: {
            return state;
        }
    }
}
exports.rootReducer = rootReducer;
