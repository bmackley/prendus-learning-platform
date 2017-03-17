import {InitialState} from './initial-state';
import {Actions} from './actions';
import {State} from '../typings/state';
import {Action} from '../typings/action';

export function rootReducer(state: State = InitialState, action: Action): State {
    switch(action.type) {
        case 'SHOW_MAIN_SPINNER': {
            return {
              ...state,
              mainViewToShow: 'spinner'
            };
        }
        case 'HIDE_MAIN_SPINNER': {
            const newState = Object.assign({}, state);

            newState.mainViewToShow = 'routes';

            return newState;
        }
        case 'SET_COURSE_COLLABORATOR_EMAILS': {
            const newState = Object.assign({}, state);

            if (newState.courseCollaboratorEmails[action.uid]) {
                newState.courseCollaboratorEmails[action.uid][action.courseId] = action.emails;
            }
            else {
                newState.courseCollaboratorEmails[action.uid] = {
                    [action.courseId]: action.emails
                };
            }

            return newState;
        }
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
        }

        case 'SET_VIDEO_COLLABORATOR_EMAILS': {
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
        case 'LOAD_EDIT_LESSON_QUIZZES': {
            const newState = Object.assign({}, state);
            newState.editLessonQuizzes[action.lessonId] = action.quizzes;
            return newState;
        }
        case 'LOAD_VIEW_LESSON_QUIZZES': {
            const newState = Object.assign({}, state);
            newState.viewLessonQuizzes[action.lessonId] = action.quizzes;
            return newState;
        }
        case 'SET_CURRENT_EDIT_QUIZ_ID': {
            const newState = Object.assign({}, state);
            newState.currentEditQuizId = action.quizId;
            return newState;
        }
        case 'LOAD_QUIZ_SETTINGS': {
            const newState = Object.assign({}, state);
            newState.quizQuestionSettings = action.quizQuestionSettings;
            return newState;
        }
        case 'LOAD_QUIZ_QUESTION_IDS': {
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
        }
      case 'CHECK_USER_AUTH': {
        const newState = Object.assign({}, state);
        newState.currentUser = action.user;
        newState.jwt = action.jwt;
        return newState;
      }
      case 'GET_LESSON_BY_ID': {
        const newState = Object.assign({}, state);
        newState.currentLesson = action.lesson;
        return newState;
      }
      case 'DELETE_LESSON': {
        const newState = {
          ...state,
          currentCourseViewCourse: action.currentCourse
        }
        //TODO this may be broken idk
        delete newState.lessons[action.lessonKey];
        return newState;
      }
      case 'UPDATE_USER_META_DATA': {
        const newState = Object.assign({}, state);
        newState.currentUser.metaData = action.userMetaData;
        return newState;
      }
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
      }
      case 'GET_COURSES_BY_USER': {
        const newState = Object.assign({}, state);
        newState.courses = action.courses;
        return newState;
      }
      case 'LOOKUP_LESSON_TAGS': {
        const newState = Object.assign({}, state);
        newState.resultingLessons = action.lessonsArray;
        return newState;
      }
      case 'SET_COURSE_TAGS': {
        const newState = Object.assign({}, state);
        newState.resultingCourses = action.coursesArray;
        return newState;
      }
      case 'SET_COURSE_VIEW_CURRENT_COURSE': {
        const newState = Object.assign({}, state);
        newState.courseViewCurrentCourse = action.currentCourse;
        // newState.courseTagNames = action.courseTagNames;
        return newState;
      }
      case 'ADD_TAG_EDIT_COURSE': {
        const newState = Object.assign({}, state);
        newState.courseViewCurrentCourse = action.currentCourse;
        // newState.courseTagNames = action.courseTagNames;
        return newState;
      }
      case 'DELETE_TAG_EDIT_COURSE': {
        const newState = Object.assign({}, state);
        newState.courseViewCurrentCourse = action.currentCourse;
        // newState.courseTagNames = action.courseTagNames;
        return newState;
      }
      case 'ADD_COURSE': {
        const newState = Object.assign({}, state);
        newState.courses = action.courses;
        newState.sharedCourses = action.courses;
        return newState;
      }
      case 'DELETE_COURSE': {
        const newState = Object.assign({}, state);
        newState.courses = action.courses;
        newState.sharedCourses = action.courses;
        return newState;
      }
      case 'ADD_LESSON': {
        const newState = Object.assign({}, state);
        newState.currentCourse = action.currentCourse;
        return newState;
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
