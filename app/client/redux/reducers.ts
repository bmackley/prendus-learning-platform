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
<<<<<<< HEAD
        case 'SET_LESSON_COLLABORATOR_EMAILS': {
            const newState = Object.assign({}, state);

            if (newState.lessonCollaboratorEmails[action.courseId]) {
                newState.lessonCollaboratorEmails[action.courseId][action.lessonId] = action.emails;
            }
            else {
                newState.lessonCollaboratorEmails[action.courseId] = {
                    [action.lessonId]: action.emails
                };
            }

            return newState;
=======
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
>>>>>>> origin/develop
        }

        case 'SET_VIDEO_COLLABORATOR_EMAILS': {
<<<<<<< HEAD
            const newState = Object.assign({}, state);

            if (newState.videoCollaboratorEmails[action.lessonId]) {
                newState.videoCollaboratorEmails[action.lessonId][action.videoId] = action.emails;
            }
            else {
                newState.videoCollaboratorEmails[action.lessonId] = {
                    [action.videoId]: action.emails
                };
            }

            return newState;
        }
        case 'SET_QUIZ_COLLABORATOR_EMAILS': {
            const newState = Object.assign({}, state);

            if (newState.quizCollaboratorEmails[action.lessonId]) {
                newState.quizCollaboratorEmails[action.lessonId][action.quizId] = action.emails;
            }
            else {
                newState.quizCollaboratorEmails[action.lessonId] = {
                    [action.quizId]: action.emails
                };
            }

            return newState;
=======
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
>>>>>>> origin/develop
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
<<<<<<< HEAD
        case 'LOAD_EDIT_LESSON_QUIZZES': {
            const newState = Object.assign({}, state);
            newState.editLessonQuizzes[action.lessonId] = action.quizzes;
            return newState;
        }
        case 'LOAD_VIEW_LESSON_QUIZZES': {
            const newState = Object.assign({}, state);
            newState.viewLessonQuizzes[action.lessonId] = action.quizzes;
            return newState;
=======
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
>>>>>>> origin/develop
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
<<<<<<< HEAD
            return {
              ...state,
              quizQuestionIds: action.quizQuestionIds
            };
        }
        case 'LOAD_USER_QUESTION_IDS': {
            return {
              ...state,
              userQuestionIds: action.userQuestionIds
            };
        }
        case 'LOAD_PUBLIC_QUESTION_IDS': {
            return {
              ...state,
              publicQuestionIds: action.publicQuestionIds
            };
=======
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
>>>>>>> origin/develop
        }
      case 'CHECK_USER_AUTH': {
				return {
					...state,
					currentUser: action.user,
					jwt: action.jwt
				}
      }
<<<<<<< HEAD
      case 'GET_LESSON_BY_ID': {
        const newState = Object.assign({}, state);
        newState.currentLesson = action.lesson;
        return newState;
      }
      case 'DELETE_LESSON': {
        const newState = {
=======
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
>>>>>>> origin/develop
          ...state,
          viewCourseConcepts
        }
<<<<<<< HEAD
        //TODO this may be broken idk
        delete newState.lessons[action.lessonKey];
        return newState;
=======
>>>>>>> origin/develop
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
<<<<<<< HEAD
      case 'LOAD_EDIT_LESSON_VIDEOS': {
          const newState = Object.assign({}, state);
          newState.editLessonVideos[action.lessonId] = action.videos;
          return newState;
      }
      case 'LOAD_VIEW_LESSON_VIDEOS': {
          const newState = Object.assign({}, state);
          newState.viewLessonVideos[action.lessonId] = action.videos;
          return newState;
      }
      case 'LOAD_EDIT_COURSE_LESSONS': {
          const newState = Object.assign({}, state);
          newState.editCourseLessons[action.courseId] = action.lessons;
          return newState;
      }
      case 'LOAD_VIEW_COURSE_LESSONS': {
        const newState = Object.assign({}, state);
        newState.viewCourseLessons[action.courseId] = action.orderedLessons;
        return newState;

      }
      case 'SET_CURRENT_VIDEO_INFO': {
          const newState = Object.assign({}, state);
          newState.currentLessonVideoId = action.id;
          newState.currentLessonVideoTitle = action.title;
          newState.currentLessonVideoUrl = action.url;
          return newState;
      }
      case 'CLEAR_CURRENT_VIDEO_INFO': {
          const newState = Object.assign({}, state);
          newState.currentLessonVideoId = null;
          newState.currentLessonVideoTitle = '';
          newState.currentLessonVideoUrl = '';
          return newState;
      }
      case 'SET_CURRENT_VIDEO_ID': {
          const newState = Object.assign({}, state);
          newState.currentLessonVideoId = action.id;
          return newState;
      }
      case 'GET_COURSE_BY_ID' : {
        const newState = Object.assign({}, state);
        newState.courseViewCurrentCourse = action.currentCourse;
        return newState;
=======
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
>>>>>>> origin/develop
      }
      case 'GET_COURSES_BY_USER': {
				return {
					...state,
					courses: action.courses
				}
      }
<<<<<<< HEAD
      case 'LOOKUP_LESSON_TAGS': {
        const newState = Object.assign({}, state);
        newState.resultingLessons = action.lessonsArray;
        return newState;
=======
      case 'LOOK_UP_CONCEPT_TAGS': {
				return {
					...state,
					resultingConcepts: action.concepts
				}
>>>>>>> origin/develop
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
<<<<<<< HEAD
      case 'ADD_LESSON': {
        const newState = Object.assign({}, state);
        newState.currentCourse = action.currentCourse;
        return newState;
=======
      case 'UPDATE_COURSES': {
				return {
					...state,
					courses: action.courses,
					// QUESTION: why are these being set to the same value?
					sharedCourses: action.courses
				}
>>>>>>> origin/develop
      }

      case 'RELOAD_PUBLIC_COURSES': {
        return {
          ...state,
          publicCourses: action.courses
        };
      }

      case 'SET_DISCIPLINES': {
          return {
            ...state,
            disciplines: action.disciplines
          };
      }

      case 'SET_CHOSEN_DISCIPLINE': {
        return {
          ...state,
          chosenDiscipline: action.chosenDiscipline
        };
      }

      case 'SET_CHOSEN_SUBJECT': {
        return {
          ...state,
          chosenSubject: action.chosenSubject
        };
      }

      case 'SET_CHOSEN_CONCEPT': {
        return {
          ...state,
          chosenConcept: action.chosenConcept
        };
      }
      default: {
          return state;
      }
    }
}
