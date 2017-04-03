import {InitialState} from './initial-state';
import {Actions} from './actions';
import {State} from '../typings/state';
import {Action} from '../typings/action';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {CourseConceptData} from '../node_modules/prendus-services/typings/course-concept-data';

export function rootReducer(state: State = InitialState, action: Action): State {
    switch(action.type) {
        case 'SHOW_MAIN_SPINNER': {
          return {
            ...state,
            mainViewToShow: 'spinner'
          };
        }
        case 'HIDE_MAIN_SPINNER': {
					return {
						...state,
						mainViewToShow: 'routes'
					}
        }
        case 'SET_COURSE_COLLABORATOR_EMAILS': {
					const courseCollaboratorEmails: { [uid: string]: { [courseId: string]: string[] } } = { ...state.courseCollaboratorEmails };
					if (state.courseCollaboratorEmails[action.uid]) {
						courseCollaboratorEmails[action.uid][action.courseId] = action.emails;
					} else {
						courseCollaboratorEmails[action.uid] = {
								[action.courseId]: action.emails
						};
					}
					return {
						...state,
						courseCollaboratorEmails
					}
        }
        case 'SET_CONCEPT_COLLABORATOR_EMAILS': {
					const conceptCollaboratorEmails: { [courseId: string]: { [conceptId: string]: string[] } } = { ...state.conceptCollaboratorEmails };
					if (state.conceptCollaboratorEmails[action.courseId]) {
						conceptCollaboratorEmails[action.courseId][action.conceptId] = action.emails;
					} else {
						conceptCollaboratorEmails[action.courseId] = {
								[action.conceptId]: action.emails
						};
					}
					return {
						...state,
						conceptCollaboratorEmails
					}
        }
        case 'SET_VIDEO_COLLABORATOR_EMAILS': {
					const videoCollaboratorEmails: { [conceptId: string]: { [videoId: string]: string[] } } = { ...state.videoCollaboratorEmails };
					if (state.videoCollaboratorEmails[action.conceptId]) {
						videoCollaboratorEmails[action.conceptId][action.videoId] = action.emails;
					} else {
						videoCollaboratorEmails[action.conceptId] = {
								[action.videoId]: action.emails
						};
					}
					return {
						...state,
						videoCollaboratorEmails
					}
        }
        case 'SET_QUIZ_COLLABORATOR_EMAILS': {
					const quizCollaboratorEmails: { [conceptId: string]: { [quizId: string]: string[] } } = { ...state.quizCollaboratorEmails };
					if (state.quizCollaboratorEmails[action.conceptId]) {
						quizCollaboratorEmails[action.conceptId][action.quizId] = action.emails;
					} else {
						quizCollaboratorEmails[action.conceptId] = {
								[action.quizId]: action.emails
						};
					}
					return {
						...state,
						quizCollaboratorEmails
					}
        }
        case 'SET_SHARED_COURSES': {
					return {
						...state,
						sharedCourses: action.courses
					}
        }
        case 'SET_STARRED_COURSES': {
					return {
						...state,
						starredCourses: action.courses
					}
        }
        case 'SET_COURSES_BY_VISIBILITY': {
					if(action.visibility === 'public') {
						return {
							...state,
							publicCourses: action.courses
						}
					} else {
						return state;
					}
        }
        case 'LOAD_EDIT_CONCEPT_QUIZZES': {
					const editConceptQuizzes: { [conceptId: string]: Quiz[] } = { ...state.editConceptQuizzes };
					editConceptQuizzes[action.conceptId] = action.quizzes;
					return {
						...state,
						editConceptQuizzes
					}
        }
        case 'LOAD_VIEW_CONCEPT_QUIZZES': {
					const viewConceptQuizzes: { [conceptId: string]: Quiz[] } = { ...state.viewConceptQuizzes };
					viewConceptQuizzes[action.conceptId] = action.quizzes;
					return {
						...state,
						viewConceptQuizzes
					}
        }
        case 'SET_CURRENT_EDIT_QUIZ_ID': {
					return {
						...state,
						currentEditQuizId: action.quizId
					}
        }
        case 'LOAD_QUIZ_SETTINGS': {
					return {
						...state,
						quizQuestionSettings: action.quizQuestionSettings
					}
        }
        case 'LOAD_QUIZ_QUESTION_IDS': {
					return {
						...state,
						quizQuestionIds: action.quizQuestionIds
					}
        }
        case 'LOAD_USER_QUESTION_IDS': {
					return {
						...state,
						userQuestionIds: action.userQuestionIds
					}
        }
        case 'LOAD_PUBLIC_QUESTION_IDS': {
					return {
						...state,
						publicQuestionIds: action.publicQuestionIds
					}
        }
      case 'CHECK_USER_AUTH': {
				return {
					...state,
					currentUser: action.user,
					jwt: action.jwt
				}
      }
      case 'GET_CONCEPT_BY_ID': {
				return {
					...state,
					currentConcept: action.concept
				}
      }
			case 'ADD_CONCEPT': {
				const currentCourseConcepts: CourseConceptData[] = [
					...state.viewCourseConcepts[action.courseId],
					{
						id: action.conceptId,
						position: state.viewCourseConcepts[action.courseId].length
					}
				 ]
				return {
					...state,
					viewCourseConcepts: {
						...state.viewCourseConcepts,
						[action.courseId]: currentCourseConcepts
					}
				}
			}
      case 'DELETE_CONCEPT': {
				const currentCourseConcepts: CourseConceptData[] = [ ...state.viewCourseConcepts[action.courseId] ]
					.filter((conceptData) => conceptData.id !== action.conceptId);
				const viewCourseConcepts: { [courseId: string]: CourseConceptData[] } = {
					...state.viewCourseConcepts,
					[action.courseId]: currentCourseConcepts
				}
        return {
          ...state,
          viewCourseConcepts
        }
      }
			case 'SET_USER_TYPE':
				return {
					...state,
					currentUser: {
						...state.currentUser,
						userType: action.userType
					}
				}
      case 'UPDATE_USER_META_DATA': {
				return  {
					...state,
					currentUser: {
						...state.currentUser,
						metaData: action.userMetaData
					}
				}
      }
      case 'LOAD_EDIT_CONCEPT_VIDEOS': {
				return {
					...state,
					editConceptVideos: {
						...state.editConceptVideos,
						[action.conceptId]: action.videos
					}
				}
      }
      case 'LOAD_VIEW_CONCEPT_VIDEOS': {
				return {
					...state,
					viewConceptVideos: {
						...state.viewConceptVideos,
						[action.conceptId]: action.videos
					}
				}
      }
      case 'LOAD_VIEW_COURSE_CONCEPTS': {
				return {
					...state,
					viewCourseConcepts: {
						...state.viewCourseConcepts,
						[action.courseId]: action.concepts
					}
				}
      }
      case 'SET_CURRENT_VIDEO_INFO': {
				return {
					...state,
					currentVideo: action.currentVideo
				}
      }
      case 'CLEAR_CURRENT_VIDEO_INFO': {
				return {
					...state,
					currentVideo: {
						id: '',
						title: '',
						url: '',
						uid: '',
						collaborators: {}
					}
				}
      }
      case 'SET_CURRENT_VIDEO_ID': {
				return {
					...state,
					currentVideo: {
						id: action.videoId,
						title: '',
						url: '',
						uid: '',
						collaborators: {}
					}

				}
      }
      case 'GET_COURSES_BY_USER': {
				return {
					...state,
					courses: action.courses
				}
      }
      case 'LOOK_UP_CONCEPT_TAGS': {
				return {
					...state,
					resultingConcepts: action.concepts
				}
      }
      case 'SET_COURSE_TAGS': {
				return {
					...state,
					resultingCourses: action.courses
				}
      }
      case 'SET_COURSE_VIEW_CURRENT_COURSE': {
				return {
					...state,
					courseViewCurrentCourse: action.currentCourse,
					// courseTagNames: action.courseTagNames
				}
      }
      case 'UPDATE_COURSES': {
				return {
					...state,
					courses: action.courses,
					// QUESTION: why are these being set to the same value?
					sharedCourses: action.courses
				}
      }
      case 'RELOAD_PUBLIC_COURSES': {
        return {
          ...state,
          publicCourses: action.courses
        };
      }
      default: {
          return state;
      }
    }
}
