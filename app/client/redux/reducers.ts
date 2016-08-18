import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';
import {State} from '../interfaces/state.interface.ts';
import {Action} from '../interfaces/action.interface.ts';

export function rootReducer(state: State = InitialState, action: Action): State {
    switch(action.type) {
        case 'SET_COLLABORATOR_EMAILS': {
            const newState = Object.assign({}, state);

            newState.collaboratorEmails = action.emails;

            return newState;
        }
        case 'SET_SHARED_COURSES': {
            const newState = Object.assign({}, state);

            newState.sharedCourses = action.courses;

            return newState;
        }
        case 'SET_STARRED_COURSES': {
            const newState = Object.assign({}, state);

            newState.starredCourses = action.courses;

            return newState;
        }
        case 'SET_COURSES_BY_VISIBILITY': {
            const newState = Object.assign({}, state);

            if (action.visibility === 'public') {
                newState.publicCourses = action.courses;
            }

            return newState;
        }
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
        newState.jwt = action.jwt;
        return newState;
      }
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
        let newState = Object.assign({}, state);
        newState = InitialState;
        // newState.currentUser.metaData = {email: '', firstName: '', lastName: '', uid: ''};
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
        newState.courses = action.courses;
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
