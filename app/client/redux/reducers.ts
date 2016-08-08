import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case 'LOAD_CONCEPT_QUIZZES': {
            const newState = Object.assign({}, state);
            newState.conceptQuizzes[action.conceptId] = action.quizzes;
            return newState;
        }
        case 'SET_CURRENT_EDIT_QUIZ_ID': {
            const newState = Object.assign({}, state);
            newState.currentEditQuizId = action.quizId;
            return newState;
        }
        case 'LOAD_QUIZ_SETTINGS': {
            const newState = Object.assign({}, state);
            newState.quizSettings = action.quizSettings;
            return newState;
        }
        case 'SET_CURRENT_EDIT_QUESTION_ID': {
            const newState = Object.assign({}, state);
            newState.currentEditQuestionId = action.questionId;
            return newState;
        }
        case 'LOAD_QUIZ_QUESTION_IDS': {
            const newState = Object.assign({}, state);
            newState.quizQuestionIds = action.quizQuestionIds;
            return newState;
        }
        case 'LOAD_USER_QUESTION_IDS': {
            const newState = Object.assign({}, state);
            newState.userQuestionIds = action.userQuestionIds;
            return newState;
        }
        case 'LOAD_PUBLIC_QUESTION_IDS': {
            const newState = Object.assign({}, state);
            newState.publicQuestionIds = action.publicQuestionIds;
            return newState;
        }
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
