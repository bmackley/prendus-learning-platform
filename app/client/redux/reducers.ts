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
        // newState.currentUser.email = action.email;
        // newState.currentUser.firstName = action.firstName;
        // newState.currentUser.lastName = action.lastName;
        // newState.currentUser.institution = action.institution;
        return newState;
      }
      case Actions.addConcept.type: {
        console.log('reducers add concept', action)
        const newState = Object.assign({}, state);
        console.log('new state', state)
        newState.concepts[action.key] = action;
        console.log("reducers add concept new state1 ", newState)
        newState.newConcept = newState.concepts[action.key];
        console.log("reducers add concept new state 2", newState)
        return newState;
      }
      case Actions.setConcepts.type: {
          const newState = Object.assign({}, state);
          newState.concepts = {
              // uid: action.uid,
              title: action.title,
              // pos: action.pos,
              // creator: action.creator
          };
          return newState;
      }
      case Actions.getConcepts.type: {
          const newState = Object.assign({}, state);
          newState.concepts = action.concepts;
          return newState;
      }
      case Actions.deleteConcept.type: {
        const newState = Object.assign({}, state);
        console.log('key', action.key)
        console.log('concepts', state )
        delete newState.concepts[action.conceptKey];
        newState.deletedConcept = action.conceptKey;
        console.log('Delete old State', state)
        console.log('Delete new State', newState)
        return newState;
      }
      case Actions.logOutUser.type: {
        const newState = Object.assign({}, state);
        console.log('user has been logged out actions')
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
      case 'GET_COURSES': {
        const newState = Object.assign({}, state);
        newState.courses = action.courses;
        //newState.currentConceptVideoId = action.newCourse;
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
