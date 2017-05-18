import {InitialState} from './initial-state';
import {State} from '../typings/state';
import {Action} from '../typings/action';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {QuestionScaffold} from '../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../node_modules/prendus-services/typings/question-scaffold-answer';
import {UtilitiesService} from '../node_modules/prendus-services/services/utilities-service';

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
					};
        }
				case 'SHOW_NOTIFICATION': {
					return {
						...state,
						notificationType: action.notificationType,
						notificationText: action.notificationText
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
					};
        }

        case 'SET_LESSON_COLLABORATOR_EMAILS': {
					const lessonCollaboratorEmails: { [courseId: string]: { [lessonId: string]: string[] } } = { ...state.lessonCollaboratorEmails };
					if (state.lessonCollaboratorEmails[action.courseId]) {
						lessonCollaboratorEmails[action.courseId][action.lessonId] = action.emails;
					} else {
						lessonCollaboratorEmails[action.courseId] = {
								[action.lessonId]: action.emails
						};
					}
					return {
						...state,
						lessonCollaboratorEmails
					};
        }

        case 'SET_VIDEO_COLLABORATOR_EMAILS': {
					const videoCollaboratorEmails: { [lessonId: string]: { [videoId: string]: string[] } } = { ...state.videoCollaboratorEmails };
					if (state.videoCollaboratorEmails[action.lessonId]) {
						videoCollaboratorEmails[action.lessonId][action.videoId] = action.emails;
					} else {
						videoCollaboratorEmails[action.lessonId] = {
								[action.videoId]: action.emails
						};
					}
					return {
						...state,
						videoCollaboratorEmails
					};
        }
        case 'SET_QUIZ_COLLABORATOR_EMAILS': {
					const quizCollaboratorEmails: { [lessonId: string]: { [quizId: string]: string[] } } = { ...state.quizCollaboratorEmails };
					if (state.quizCollaboratorEmails[action.lessonId]) {
						quizCollaboratorEmails[action.lessonId][action.quizId] = action.emails;
					} else {
						quizCollaboratorEmails[action.lessonId] = {
								[action.quizId]: action.emails
						};
					}
					return {
						...state,
						quizCollaboratorEmails
					};
        }
        case 'SET_SHARED_COURSES': {
					return {
						...state,
						sharedCourses: action.courses
					};
        }
        case 'SET_STARRED_COURSES': {
					return {
						...state,
						starredCourses: action.courses
					};
        }
        case 'SET_COURSES_BY_VISIBILITY': {
					if(action.visibility === 'public') {
						return {
							...state,
							publicCourses: action.courses
						};
					} else {
						return state;
					}
        }

        case 'LOAD_EDIT_LESSON_QUIZZES': {
					const editLessonQuizzes: { [lessonId: string]: Quiz[] } = { ...state.editLessonQuizzes };
					editLessonQuizzes[action.lessonId] = action.quizzes;
					return {
						...state,
						editLessonQuizzes
					};
        }
        case 'LOAD_VIEW_LESSON_QUIZZES': {
					const viewLessonQuizzes: { [lessonId: string]: Quiz[] } = { ...state.viewLessonQuizzes };
					viewLessonQuizzes[action.lessonId] = action.quizzes;
					return {
						...state,
						viewLessonQuizzes
					};
        }
        case 'SET_CURRENT_EDIT_QUIZ_ID': {
					return {
						...state,
						currentEditQuizId: action.quizId
					};
        }
        case 'LOAD_QUIZ_SETTINGS': {
					return {
						...state,
						quizQuestionSettings: action.quizQuestionSettings
					};
        }
        case 'LOAD_QUIZ_QUESTION_IDS': {
					return {
						...state,
						quizQuestionIds: action.quizQuestionIds
					};
        }
				case 'LOAD_QUIZ_QUESTIONS_DATA': {
					return {
						...state,
						quizQuestionsData: action.quizQuestionsData
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
				return {
					...state,
					currentUser: action.user,
					jwt: action.jwt
				};
      }
			case 'LOAD_CURRENT_USER': {
				return {
					...state,
					currentUser: action.user
				};
			}
			case 'LOAD_TEACHERS': {
				return {
					...state,
					unverifiedTeachers: action.unverifiedTeachers,
					verifiedTeachers: action.verifiedTeachers
				};
			}
      case 'GET_LESSON_BY_ID': {
        return {
					...state,
					currentLesson: action.lesson
				};
      }
      case 'DELETE_LESSON': {
        return {
          ...state,
          currentCourse: action.currentCourse,
          lessonId: action.lessonId
        };
      }
			case 'ADD_LESSON': {
				const currentCourseLessons: CourseLessonData[] = [
					...state.viewCourseLessons[action.courseId],
					{
						id: action.lessonId,
						position: state.viewCourseLessons[action.courseId].length
					}
				];
				return {
					...state,
					viewCourseLessons: {
						...state.viewCourseLessons,
						[action.courseId]: currentCourseLessons
					}
				};
			}
      case 'DELETE_LESSON': {
				const currentCourseLessons: CourseLessonData[] = [ ...state.viewCourseLessons[action.courseId] ]
					.filter((lessonData) => lessonData.id !== action.lessonId);
				const viewCourseLessons: { [courseId: string]: CourseLessonData[] } = {
					...state.viewCourseLessons,
					[action.courseId]: currentCourseLessons
				}
        return {
          ...state,
          viewCourseLessons
        };
        // //TODO this may be broken idk
        // delete newState.lessons[action.lessonKey];
        // return newState;
      }
      case 'UPDATE_USER_META_DATA': {
				return  {
					...state,
					currentUser: {
						...state.currentUser,
						metaData: action.userMetaData
					}
				};
      }
      case 'LOAD_EDIT_LESSON_VIDEOS': {
				return {
					...state,
					editLessonVideos: {
						...state.editLessonVideos,
						[action.lessonId]: action.videos
					}
				};
      }
      case 'LOAD_VIEW_LESSON_VIDEOS': {
				return {
					...state,
					viewLessonVideos: {
						...state.viewLessonVideos,
						[action.lessonId]: action.videos
					}
				};
      }
      case 'LOAD_VIEW_COURSE_LESSONS': {
				return {
					...state,
					viewCourseLessons: {
						...state.viewCourseLessons,
						[action.courseId]: action.orderedLessons
					}
				};
      }
      case 'SET_CURRENT_VIDEO_INFO': {
				return {
					...state,
					currentVideo: action.currentVideo
				};
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
				};
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
				};
      }
      case 'GET_COURSES_BY_USER': {
				return {
					...state,
					courses: action.courses
				};
      }
      case 'SET_COURSE_TAGS': {
				return {
					...state,
					resultingCourses: action.courses
				};
      }
      case 'SET_COURSE_VIEW_CURRENT_COURSE': {
				return {
					...state,
					courseViewCurrentCourse: action.currentCourse,
					// courseTagNames: action.courseTagNames
				};
      }
      case 'UPDATE_COURSES': {
				return {
					...state,
					courses: action.courses,
					// QUESTION: why are these being set to the same value?
					sharedCourses: action.courses
				};
      }

      case 'RELOAD_PUBLIC_COURSES': {
        return {
          ...state,
          publicCourses: action.courses
        };
      }

      case 'SET_CHOSEN_LESSON': {
        return {
          ...state,
          chosenLesson: action.chosenLesson
        };
      }

      case 'SET_LTI_STATE': {
        localStorage.setItem('ltiState', JSON.stringify(action.ltiState));
        return {
          ...state,
          ltiState: action.ltiState
        };
      }
      case 'SET_DISABLED_NEXT': {
        return {
          ...state,
          disableNext: action.disableNext
        };

      }

      case 'SET_CURRENT_QUESTION_SCAFFOLD': {
        const currentQuestionScaffold: QuestionScaffold = action.currentQuestionScaffold;
        const questionScaffoldAnswers: QuestionScaffoldAnswer[] = UtilitiesService.getQuestionScaffoldAnswers(currentQuestionScaffold);
        return {
          ...state,
          currentQuestionScaffold,
          questionScaffoldAnswers
        };
      }

      case 'UPDATE_CURRENT_QUESTION_SCAFFOLD': {
        const comments: string[] = action.comments;
        const answers: string[] = action.answers;
        const explanation: string = action.explanation;
        const answersObj: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } = getAnswers(state.currentQuestionScaffold, answers, comments);
        const questionScaffoldAnswers: QuestionScaffoldAnswer[] = UtilitiesService.getQuestionScaffoldAnswers(state.currentQuestionScaffold);
        const question: string = action.questionStem;
        return {
          ...state,
          currentQuestionScaffold: {
            ...state.currentQuestionScaffold,
            answers: answersObj,
            // only take new explanation if given
            explanation: explanation || state.currentQuestionScaffold.explanation,
            // only take new question if given
            question: question || state.currentQuestionScaffold.question
          },
          questionScaffoldAnswers,
        };

        function getAnswers(questionScaffold: QuestionScaffold, answers: string[], comments: string[]): { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } {
          return Object.keys(questionScaffold.answers || {})
          .map((key: string, index: number) => {
            return {
              ...questionScaffold.answers[key],
              // only take new answers or comments if passed in
              text: answers ? answers[index] : questionScaffold.answers[key].text,
              comment: comments ? comments[index] : questionScaffold.answers[key].comment
            };
          })
          // convert back to object
          .reduce((result: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer }, current: QuestionScaffoldAnswer, index: number) => {
            result[`question${index}`] = current;
            return result;
          }, {});
        };
      }

      case 'SET_CURRENT_QUESTION_SCAFFOLD_EXAMPLE': {
        const currentQuestionScaffoldExample: QuestionScaffold = action.currentQuestionScaffoldExample;
        const exampleQuestionScaffoldAnswers: QuestionScaffoldAnswer[] = UtilitiesService.getQuestionScaffoldAnswers(currentQuestionScaffoldExample);
        const disableNext: boolean = action.disableNext;
        return {
          ...state,
          currentQuestionScaffoldExample,
          exampleQuestionScaffoldAnswers,
          disableNext
        };
      }

      case 'INIT_CURRENT_QUESTION_SCAFFOLD': {
        const numberOfAnswers: number = action.numberOfAnswers;

        // Define answersArr with empty strings because Array.map won't work
        // on an array with only undefineds
        const answersArr: string[] = initArray([], Array(numberOfAnswers));
        const answers: { [currentQuestionScaffoldId: string]: QuestionScaffoldAnswer} = answersArr
        .map( (currentValue: string, index: number): QuestionScaffoldAnswer => {
          return {
            text: '',
            comment: '',
            correct: index === 0,
            id: `question${index}`
          };
        })
        .reduce((result: { [currentQuestionScaffoldId: string]: QuestionScaffoldAnswer}, current: QuestionScaffoldAnswer, index: number) => {
          result[`question${index}`] = current;
          return result;
        }, {});

        const currentQuestionScaffold: QuestionScaffold = {
          answers,
          explanation: '',
          question: ''
        };

        return {
          ...state,
          currentQuestionScaffold
        };

        function initArray(arr: string[], arr2: string[]): string[] {
          if (arr2.length === 0) {
              return arr;
          }
          return initArray([...arr, ''], arr2.slice(1));
        }
      }

      case 'SET_ENROLLED_COURSES': {
        return {
          ...state,
          enrolledCourses: action.enrolledCourses
        };
      }
      default: {
          return state;
      }
    }
}
