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

      case 'SET_DISABLED_NEXT': {
        return {
          ...state,
          disableNext: action.disableNext
        };
      }

      case 'SET_CURRENT_QUESTION_SCAFFOLD': {
        const currentQuestionScaffold: QuestionScaffold = action.currentQuestionScaffold;
        const questionScaffoldAnswers: QuestionScaffoldAnswer[] = getQuestionScaffoldAnswers(currentQuestionScaffold);
        return {
          ...state,
          currentQuestionScaffold,
          questionScaffoldAnswers
        };

        function getQuestionScaffoldAnswers(questionScaffold: QuestionScaffold): QuestionScaffoldAnswer[] {
          return Object.keys(questionScaffold.answers || {}).map((key) => {
              return {
                ...questionScaffold.answers[key],
                id: key
              };
          });
        }
      }

      case 'SET_CURRENT_QUESTION_SCAFFOLD_EXAMPLE': {
        const currentQuestionScaffoldExample: QuestionScaffold = action.currentQuestionScaffoldExample;
        const exampleQuestionScaffoldAnswers: QuestionScaffoldAnswer[] = getExampleQuestionScaffoldAnswers(currentQuestionScaffoldExample);
        const disableNext: boolean = action.disableNext;
        return {
          ...state,
          currentQuestionScaffoldExample,
          exampleQuestionScaffoldAnswers,
          disableNext
        };

        function getExampleQuestionScaffoldAnswers(questionScaffold: QuestionScaffold): QuestionScaffoldAnswer[] {
          return Object.keys(currentQuestionScaffoldExample.answers || {}).map((key) => {
              return {
                ...currentQuestionScaffoldExample.answers[key],
                id: key
              };
          });
        }
      }

      case 'UPDATE_CURRENT_QUESTION_SCAFFOLD_COMMENTS': {
        const selectedIndex: number = action.selectedIndex;
        const myIndex: number = action.myIndex;
        if(selectedIndex !== undefined && myIndex !== undefined && selectedIndex === myIndex) {
          const questionScaffold: QuestionScaffold = action.currentQuestionScaffold;
          const comments: string[] = action.comments;
          const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(comments);
          const answers: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } = getAnswers(questionScaffold, comments);

          const disableNext: boolean = !isDefined;
          const questionScaffoldAnswers: QuestionScaffoldAnswer[] = getQuestionScaffoldAnswers(questionScaffold);

          return {
            ...state,
            currentQuestionScaffold: {
              ...questionScaffold,
              answers
            },
            questionScaffoldAnswers,
            disableNext
          };
        } else {
          return state;
        }

        function getAnswers(questionScaffold: QuestionScaffold, comments: string[]): { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } {
          return Object.keys(questionScaffold.answers || {})
          // update comments
          .map((key: string, index: number) => {
            return {
              ...questionScaffold.answers[key],
              comment: comments[index]
            };
          })
          // convert back to object
          .reduce((result: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer }, current: QuestionScaffoldAnswer, index: number) => {
            result[`question${index}`] = current;
            return result;
          }, {});
        }

        function getQuestionScaffoldAnswers(questionScaffold: QuestionScaffold): QuestionScaffoldAnswer[] {
          return Object.keys(questionScaffold.answers || {}).map((key) => {
              return {
                ...questionScaffold.answers[key],
                id: key
              };
          });
        }
      }

      case 'UPDATE_CURRENT_QUESTION_SCAFFOLD_DISTRACTORS': {
        const myIndex: number = action.myIndex;
        const selectedIndex: number = action.selectedIndex;
        if(myIndex !== undefined && selectedIndex !== undefined && myIndex === selectedIndex) {
          const questionScaffold: QuestionScaffold = action.currentQuestionScaffold;
          const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(action.answers);
          const answers: { [questionScaffoldId: string]: QuestionScaffoldAnswer } = getAnswers(action.answers, questionScaffold);
          const questionScaffoldAnswers: QuestionScaffoldAnswer[] = getQuestionScaffoldAnswers(questionScaffold);

          return {
            ...state,
            currentQuestionScaffold: {
              ...questionScaffold,
              answers
            },
            questionScaffoldAnswers,
            disableNext: !isDefined
          };
        } else {
          return state;
        }

        function getAnswers(answers: string[], questionScaffold: QuestionScaffold): { [questionScaffoldId: string]: QuestionScaffoldAnswer } {
          return (answers || [])
          // update the text value for each distractor
          .map((key: string, index: number) => {
            return {
              ...questionScaffold.answers[key],
              text: answers[index]
            };
          })
          // convert back to object
          .reduce((result: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer }, current: QuestionScaffoldAnswer, index: number) => {
            result[`question${index}`] = current;
            return result;
          }, {});
        }

        function getQuestionScaffoldAnswers(questionScaffold: QuestionScaffold): QuestionScaffoldAnswer[] {
          return Object.keys(questionScaffold.answers || {}).map((key) => {
              return {
                ...questionScaffold.answers[key],
                id: key
              };
          });
        }
      }

      case 'SET_DISABLED_NEXT_ON_EXAMPLE_PAGE': {
        const myIndex: number = action.myIndex;
        const selectedIndex: number = action.selectedIndex;
        if(myIndex !== undefined && selectedIndex !== undefined && myIndex === selectedIndex) {
          return {
            ...state,
            disableNext: false
          };
        } else {
          return state;
        }
      }

      case 'UPDATE_CURRENT_QUESTION_SCAFFOLD_EXPLANATION': {
        const myIndex: number = action.myIndex;
        const selectedIndex: number = action.selectedIndex;
        if(myIndex !== undefined && selectedIndex !== undefined && myIndex === selectedIndex) {
          const currentQuestionScaffold: QuestionScaffold = action.currentQuestionScaffold;
          const explanation: string = action.explanation;
          const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(explanation);
          return {
            ...state,
            currentQuestionScaffold: {
              ...currentQuestionScaffold,
              explanation
            },
            disableNext: !isDefined
          }
        } else {
          return state;
        }

      }

      case 'SET_NEW_CURRENT_QUESTION_SCAFFOLD': {
        const myIndex: number = action.myIndex;
        const selectedIndex: number = action.selectedIndex;
        if(myIndex !== undefined && selectedIndex !== undefined && myIndex === selectedIndex) {
          const questionStem: string = action.questionStem;
          const answerText: string = action.answerText;
          const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty([questionStem, answerText]);
          const currentQuestionScaffold: QuestionScaffold = getCurrentQuestionScaffold(action, answerText, questionStem);
          const questionScaffoldAnswers: QuestionScaffoldAnswer[] = getQuestionScaffoldAnswers(currentQuestionScaffold);
          return {
            ...state,
            currentQuestionScaffold,
            questionScaffoldAnswers,
            disableNext: !isDefined
          };
        } else {
          return state;
        }

        function getCurrentQuestionScaffold(action: Action, text: string, question: string): QuestionScaffold {
          return {
            ...action.currentQuestionScaffold,
            answers: {
              ...action.currentQuestionScaffold.answers,
              'question0': {
                ...action.currentQuestionScaffold.answers['question0'],
                text,
                correct: true,
                variableName: 'true'
              }
            },
            question
          };
        }

        function getQuestionScaffoldAnswers(questionScaffold: QuestionScaffold): QuestionScaffoldAnswer[] {
          return Object.keys(questionScaffold.answers || {}).map((key) => {
              return {
                ...questionScaffold.answers[key],
                id: key
              };
          });
        }
      }

      case 'INIT_CURRENT_QUESTION_SCAFFOLD': {
        const numberOfAnswers: number = action.numberOfAnswers;
        
        // Define answersArr with empty strings because Array.map won't work
        // on an array with only undefineds
        const answersArr: string[] = initArray([], Array(numberOfAnswers));
        const answers: { [currentQuestionScaffoldId: string]: QuestionScaffoldAnswer} = answersArr
        .map( (key: string, index: number): QuestionScaffoldAnswer => {
          return {
            text: '',
            comment: '',
            correct: index === 0,
            variableName: (index === 0).toString()
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
      default: {
          return state;
      }
    }
}
