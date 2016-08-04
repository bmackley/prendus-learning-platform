import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
      case Actions.createUser.type: {
          const newState = Object.assign({}, state);
          newState.currentUser = action.currentUser;
          return newState;
      }
      case Actions.loginUser.type: {
          const newState = Object.assign({}, state);
          newState.currentUser = action.currentUser;
          return newState;
      }
      case Actions.checkUserAuth.type: {
        console.log('Reducer action user auth', action)
        const newState = Object.assign({}, state);
        newState.currentUser = action.currentUser;
        return newState;
      }
      // case Actions.addConcept.type: {
      //   const newState = Object.assign({}, state);
      //   newState.concepts[action.key] = action;
      //   newState.courseConcepts = [...newState.courseConcepts, action.key];
      //   // newState.newConcept = newState.concepts[action.key];
      //   return newState;
      // }
      case Actions.setConcepts.type: {
        const newState = Object.assign({}, state);
        newState.concepts = {
          title: action.title,
        };
        return newState;
      }
      // case Actions.getConcepts.type: {
      //   const newState = Object.assign({}, state);
      //   newState.currentConcept = action.concept;
      //   return newState;
      // }
      case 'GET_CONCEPT_BY_ID': {
        console.log('reducers get concept by id')
        const newState = Object.assign({}, state);
        newState.currentConcept = action.concept;
        return newState;
      }
      case Actions.deleteConcept.type: {
        const newState = Object.assign({}, state);
        //make this happen in the model
        delete newState.concepts[action.conceptKey];
        return newState;
      }
      case Actions.logOutUser.type: {
        const newState = Object.assign({}, state);
        newState.currentUser = {uid: '', username: '', permissions: ''};
        return newState;
      }
      case Actions.updateUserMetaData.type: {
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
      case 'GET_COURSES_BY_USER': {
        const newState = Object.assign({}, state);
        newState.courses = action.courses;
        //newState.currentConceptVideoId = action.newCourse;
        return newState;
      }
      case 'GET_COURSE_BY_ID': {
        const newState = Object.assign({}, state);
        newState.currentCourse = action.currentCourse;
        newState.courseConcepts = action.currentCourse.concepts;
        //newState.currentConceptVideoId = action.newCourse;
        return newState;
      }
      case 'ADD_COURSE': {
        const newState = Object.assign({}, state);
        newState.courses = [...newState.courses, action.newCourse];
        return newState;
      }
      case Actions.addConcept.type: {
        const newState = Object.assign({}, state);
        newState.currentCourse = action.currentCourse;
        newState.courseConcepts = action.currentCourse.concepts;
        return newState;
      }
      default: {
          return state;
      }
    }
}
