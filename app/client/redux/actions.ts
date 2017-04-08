import {FirebaseService} from '../node_modules/prendus-services/services/firebase-service';
import {CourseModel} from '../node_modules/prendus-services/models/course-model';
import {LessonModel} from '../node_modules/prendus-services/models/lesson-model';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {UserModel} from '../node_modules/prendus-services/models/user-model';
import {VideoModel} from '../node_modules/prendus-services/models/video-model';
import {TagModel} from '../node_modules/prendus-services/models/tag-model';
import {QuizModel} from '../node_modules/prendus-services/models/quiz-model';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {QuizVisibility} from '../node_modules/prendus-services/typings/quiz-visibility';
import {QuestionModel} from '../node_modules/prendus-services/models/question-model';
import {Course} from '../node_modules/prendus-services/typings/course';
import {Tag} from '../node_modules/prendus-services/typings/tag';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {CourseVisibility} from '../node_modules/prendus-services/typings/course-visibility';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {UserType} from '../node_modules/prendus-services/typings/user-type';
import {User} from '../node_modules/prendus-services/typings/user';
import {EmailsToUidsModel} from '../node_modules/prendus-services/models/emails-to-uids-model';
import {Video} from '../node_modules/prendus-services/typings/video';
import {ExecuteAsyncInOrderService} from '../node_modules/prendus-services/services/execute-async-in-order-service';
import {UtilitiesService} from '../node_modules/prendus-services/services/utilities-service';
import {SubjectModel} from '../node_modules/prendus-services/models/subject-model';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {DisciplineModel} from '../node_modules/prendus-services/models/discipline-model';
import {Subject} from '../node_modules/prendus-services/typings/subject';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {ConceptModel} from '../node_modules/prendus-services/models/concept-model';

const defaultAction = (context: any): void => {
    context.action = {
        type: 'DEFAULT_ACTION'
    };
};

const showMainSpinner = (context: any): void => {
    context.action = {
        type: 'SHOW_MAIN_SPINNER'
    };
};

const hideMainSpinner = (context: any): void => {
    context.action = {
        type: 'HIDE_MAIN_SPINNER'
    };
};

const loadCourseCollaboratorEmails = async (context: any, uid: string, courseId: string): Promise<void> => {

	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const uids: string[] = await CourseModel.getCollaboratorUids(courseId);
        await FirebaseService.set(`security/${uid}/collaboratorSecurityInfo`, {
            collection: CourseModel.dataPath,
            id: courseId
        });
        const emails: string[] = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_COURSE_COLLABORATOR_EMAILS',
            emails,
            uid,
            courseId
        };

        const lessonIds: string[] = await CourseModel.getLessonIds(courseId);
        lessonIds.forEach((lessonId) => {
            loadLessonCollaboratorEmails(context, courseId, lessonId);
        });
    } catch(error) {
        throw error;
    }
	}
};

const loadLessonCollaboratorEmails = async (context: any, courseId: string, lessonId: string): Promise<void> => {

	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const uids: string[] = await LessonModel.getCollaboratorUids(lessonId);
        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: LessonModel.dataPath,
            id: lessonId
        });
        const emails: string[] = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_LESSON_COLLABORATOR_EMAILS',
            emails,
            courseId,
            lessonId
        };

        const videoIds: string[] = await LessonModel.getVideoIds(lessonId);
        videoIds.forEach((videoId) => {
            loadVideoCollaboratorEmails(context, lessonId, videoId);
        });

        const quizIds: string[] = await LessonModel.getQuizIds(lessonId);
        quizIds.forEach((quizId) => {
            loadQuizCollaboratorEmails(context, lessonId, quizId);
        });
    } catch(error) {
        throw error;
    }
	}
};

const loadVideoCollaboratorEmails = async (context: any, lessonId: string, videoId: string): Promise<void> => {

	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
      try {
          const user: any = await FirebaseService.getLoggedInUser();
          const uids: string[] = await VideoModel.getCollaboratorUids(videoId);
          await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
              collection: VideoModel.dataPath,
              id: videoId
          });
          const emails: string[] = await UserModel.getEmailsByIds(uids);

          context.action = {
              type: 'SET_VIDEO_COLLABORATOR_EMAILS',
              emails,
              lessonId,
              videoId
          };
      } catch(error) {
          throw error;
      }
		}
};

const loadQuizCollaboratorEmails = async (context: any, lessonId: string, quizId: string): Promise<void> => {

	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const uids: string[] = await QuizModel.getCollaboratorUids(quizId);
        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: QuizModel.dataPath,
            id: quizId
        });
        const emails: string[] = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_QUIZ_COLLABORATOR_EMAILS',
            emails,
            lessonId,
            quizId
        };
    } catch(error) {
        throw error;
    }
	}
};

const addCourseCollaborator = async (context: any, courseId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await CourseModel.associateCollaborator(courseId, uid);
        await UserModel.shareCourseWithMe(uid, courseId);
    } catch(error) {
        throw error;
    }
	}
};

const addLessonCollaborator = async (context: any, lessonId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await LessonModel.associateCollaborator(lessonId, uid);
        await UserModel.shareLessonWithMe(uid, lessonId);
    } catch(error) {
        throw error;
    }
	}
};

const addVideoCollaborator = async (context: any, videoId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await VideoModel.associateCollaborator(videoId, uid);
        await UserModel.shareVideoWithMe(uid, videoId);
    } catch(error) {
        throw error;
    }
	}
};

const addQuizCollaborator = async (context: any, quizId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await QuizModel.associateCollaborator(quizId, uid);
        await UserModel.shareQuizWithMe(uid, quizId);
    } catch(error) {
        throw error;
    }
	}
};

const removeCourseCollaborator = async (context: any, courseId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await CourseModel.disassociateCollaborator(courseId, uid);
        await UserModel.unshareCourseWithMe(uid, courseId);
    } catch(error) {
        throw error;
    }
	}
};

const removeLessonCollaborator = async (context: any, lessonId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await LessonModel.disassociateCollaborator(lessonId, uid);
    } catch(error) {
        throw error;
    }
	}
};

const removeVideoCollaborator = async (context: any, videoId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await VideoModel.disassociateCollaborator(videoId, uid);
    } catch(error) {
        throw error;
    }
	}
};

const removeQuizCollaborator = async (context: any, quizId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await QuizModel.disassociateCollaborator(quizId, uid);
    } catch(error) {
        throw error;
    }
	}
};

const starCourse = async (context: any, courseId: string): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    await CourseModel.associateUserStar(courseId, user.uid);
    await UserModel.starCourse(user.uid, courseId);

    context.action = {
        type: 'STAR_COURSE'
    };
};

const unstarCourse = async (context: any, courseId: string): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    await CourseModel.disassociateUserStar(courseId, user.uid);
    await UserModel.unstarCourse(user.uid, courseId);

    context.action = {
        type: 'UNSTAR_COURSE'
    };
};

const getQuiz = async (quizId: string): Promise<Quiz> => {
    const quiz: Quiz = await QuizModel.getById(quizId);

    return quiz;
};

const createNewQuiz = async (context: any, title: string, lessonId: string): Promise<string> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const uid: string = user.uid;
    // TODO: Create public courses and enforce payment before creation of a private course
    const quizId: string = await QuizModel.createOrUpdate(null, {
        id: null,
        uid,
        title,
        visibility: 'public',
        quizQuestionSettings: {
            answerFeedback: true,
            showAnswer: false,
            showHint: true,
            showCode: true,
            graded: false,
            showConfidenceLevel: false,
            allowGeneration: false
        },
        questions: {},
        collaborators: {}
    });
    await LessonModel.associateQuiz(lessonId, quizId);

    const lessonCollaboratorUids: string[] = await LessonModel.getCollaboratorUids(lessonId);
    await QuizModel.associateCollaborators(quizId, lessonCollaboratorUids);

    return quizId;
};

const deleteQuiz = async (context: any, lessonId: string, quiz: Quiz): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const lesson: Lesson = await LessonModel.getById(lessonId);
    const quizIds: string[] = await LessonModel.getQuizIds(lessonId);
    const quizzes: Quiz[] = await QuizModel.filterQuizzesByCollaborator(quizIds, lesson.uid, user.uid);

    // disassociate lesson and questions
    await LessonModel.disassociateQuiz(lessonId, quiz.id);
    for(let key in quiz.questions) {
      await QuizModel.disassociateQuestion(quiz.id, key);
    }
    // delete from database
    await QuizModel.deleteQuiz(quiz.id);
}

const loadEditLessonQuizzes = async (context: any, lessonId: string): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const lesson: Lesson = await LessonModel.getById(lessonId);

    const quizIds: string[] = await LessonModel.getQuizIds(lessonId);
    const quizzes: Quiz[] = await QuizModel.filterQuizzesByCollaborator(quizIds, lesson.uid, user.uid);

    context.action = {
        type: 'LOAD_EDIT_LESSON_QUIZZES',
        lessonId,
        quizzes
    };
};

const loadViewLessonQuizzes = async (context: any, lessonId: string): Promise<void> => {
    const quizIds: string[] = await LessonModel.getQuizIds(lessonId);
    const quizzes: Quiz[] = await QuizModel.resolveQuizIds(quizIds);

    context.action = {
        type: 'LOAD_VIEW_LESSON_QUIZZES',
        lessonId,
        quizzes
    };
};

const setCurrentEditQuizId = (context: any, quizId: string): void => {
    context.action = {
        type: 'SET_CURRENT_EDIT_QUIZ_ID',
        quizId
    };
};

const loadQuizQuestionSettings = async (context: any, quizId: string): Promise<void> => {
    const quizQuestionSettings: QuestionSettings = await QuizModel.getQuizQuestionSettings(quizId);

    context.action = {
        type: 'LOAD_QUIZ_SETTINGS',
        quizQuestionSettings
    };
};

const setQuizQuestionSetting = async (context: any, quizId: string, settingName: string, value: number | boolean | string): Promise<void> => {
  try {
    await QuizModel.setQuizQuestionSetting(quizId, settingName, value);
    const quizQuestionSettings: QuestionSettings = await QuizModel.getQuizQuestionSettings(quizId);
    context.action = {
      type: 'LOAD_QUIZ_SETTINGS',
      quizQuestionSettings
    };
  } catch(error) {
    throw error;
  }

};

const setQuestionSetting = async (context: any, quizId: string, questionId: string, settingName: string, value: number | boolean | QuizVisibility): Promise<void> => {
  try {
    await QuizModel.setQuestionSetting(quizId, questionId, settingName, value);
  } catch(error) {
    throw error;
  }
};

const loadQuizQuestionIds = async (context: any, quizId: string): Promise<void> => {
    const quizQuestionIds: string[] = await QuizModel.getQuestionIds(quizId);

		context.action = {
			type: 'LOAD_QUIZ_QUESTION_IDS',
			quizQuestionIds
		};

		// TODO: add this back in once we iron out the bugs
		// streamId(quizQuestionIds, 0);
		//
		// function streamId(ids: string[], index: number) {
		// 	setTimeout(() => {
		// 		if (index === ids.length - 1) {
		// 			return;
		// 		}
		//
		// 		context.action = {
		// 			type: 'LOAD_QUIZ_QUESTION_IDS',
		// 			quizQuestionIds: ids.slice(0, index)
		// 		};
		//
		// 		streamId(ids, index + 1);
		// 	});
		// }
};

const addQuestionToQuiz = async (context: any, quizId: string, questionId: string): Promise<void> => {
    await QuizModel.associateQuestion(quizId, questionId);
};

const removeQuestionFromQuiz = async (context: any, quizId: string, questionId: string): Promise<void> => {
    await QuizModel.disassociateQuestion(quizId, questionId);
};

const loadUserQuestionIds = async (context: any, getUserQuestionIdsAjax: any): Promise<void> => {
    const request: any = getUserQuestionIdsAjax.generateRequest();
    await request.completes;
    const userQuestionIds: string[] = request.response.questionIds;

		context.action = {
			type: 'LOAD_USER_QUESTION_IDS',
			userQuestionIds
		};

		// TODO: add this back in once we iron out the bugs
		//
		// streamId(userQuestionIds, 0);
		//
		// function streamId(ids: string[], index: number) {
		// 	setTimeout(() => {
		// 		if (index === ids.length - 1) {
		// 			return;
		// 		}
		//
		// 		context.action = {
		// 			type: 'LOAD_USER_QUESTION_IDS',
		// 			userQuestionIds: ids.slice(0, index)
		// 		};
		//
		// 		streamId(ids, index + 1);
		// 	});
		// }
};

const loadPublicQuestionIds = async (context: any, getPublicQuestionIdsAjax: any): Promise<void> => {
    const request: any = getPublicQuestionIdsAjax.generateRequest();
    await request.completes;
    const publicQuestionIds: string[] = request.response.questionIds;

		context.action = {
			type: 'LOAD_PUBLIC_QUESTION_IDS',
			publicQuestionIds
		};

		// TODO: add this back in once we iron out the bugs
		// streamId(publicQuestionIds, 0);
		//
		// function streamId(ids: string[], index: number) {
		// 	setTimeout(() => {
		// 		if (index === ids.length - 1) {
		// 			return;
		// 		}
		//
		// 		context.action = {
		// 			type: 'LOAD_PUBLIC_QUESTION_IDS',
		// 			publicQuestionIds: ids.slice(0, index)
		// 		};
		//
		// 		streamId(ids, index + 1);
		// 	});
		// }
};

const deleteVideo = async (context: any, lessonId: string, videoId: string): Promise<void> => {
    try {
        await LessonModel.disassociateVideo(lessonId, videoId);
    } catch(error) {
        throw error;
    }
};

const saveVideo = async (context: any, lessonId: string, videoId: string, video: Video): Promise<void> => {
    try {
        const newId: string = await VideoModel.createOrUpdate(videoId, video);
        await LessonModel.associateVideo(lessonId, newId);
        if (!videoId) {
            const lessonCollaboratorUids: string[] = await LessonModel.getCollaboratorUids(lessonId);
            await VideoModel.associateCollaborators(newId, lessonCollaboratorUids);
        }

        context.action = {
            type: 'SET_CURRENT_VIDEO_ID',
            id: newId
        };
    } catch(error) {
        throw error;
    }
};

const setCurrentVideoInfo = (context: any, id: string, title: string, url: string): void => {
    context.action = {
        type: 'SET_CURRENT_VIDEO_INFO',
				currentVideo: {
					id,
					title,
					url,
					uid: '',
					collaborators: {}
				}
    };
};

const clearCurrentVideoInfo = (context: any): void => {
    context.action = {
        type: 'CLEAR_CURRENT_VIDEO_INFO'
    };
};

const loadEditLessonVideos = async (context: any, lessonId: string): Promise<void> => {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const lesson: Lesson = await LessonModel.getById(lessonId);
        const videoIds: string[] = await LessonModel.getVideoIds(lessonId);
        const videos: Video[] = await VideoModel.filterVideosByCollaborator(videoIds, lesson.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_LESSON_VIDEOS',
            videos,
            lessonId
        };
    } catch(error) {
        throw error;
    }
};

const loadViewLessonVideos = async (context: any, lessonId: string): Promise<void> => {
    try {
        const videoIds: string[] = await LessonModel.getVideoIds(lessonId);
        const videos: Video[] = await VideoModel.resolveVideoIds(videoIds);

        context.action = {
            type: 'LOAD_VIEW_LESSON_VIDEOS',
            videos,
            lessonId
        };
    } catch(error) {
        throw error;
    }
};

const loadEditCourseLessons = async (context: any, courseId: string): Promise<void> => {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const course: Course = await CourseModel.getById(courseId);
        const lessonDatasObject: { [lessonId: string]: CourseLessonData } = course.lessons;
        const lessons: CourseLessonData[] = await LessonModel.filterLessonDatasByCollaborator(lessonDatasObject, course.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_COURSE_LESSONS',
            lessons,
            courseId
        };
    } catch(error) {
        throw error;
    }
};

const loadViewCourseLessons = async (context: any, courseId: string): Promise<void> => {
    try {
        const course: Course = await CourseModel.getById(courseId);
        const lessonsArray: CourseLessonData[] = await CourseModel.courseLessonsToArray(course);
        const orderedLessons: CourseLessonData[] = await CourseModel.orderCourseLessons(lessonsArray);

        context.action = {
            type: 'LOAD_VIEW_COURSE_LESSONS',
            orderedLessons,
            courseId
        };
    } catch(error) {
        throw error;
    }
};

const createUser = async (context: any, userType: UserType, data: UserMetaData, password: string): Promise<void> => {
    try {
        await FirebaseService.createUserWithEmailAndPassword(data.email, password);
        const loggedInUser: any = await FirebaseService.logInUserWithEmailAndPassword(data.email, password);
        await UserModel.sendConfirmationEmail(loggedInUser);
        await UserModel.setUserType(loggedInUser.uid, userType);
        await UserModel.updateMetaData(loggedInUser.uid, data);
        await EmailsToUidsModel.setUidByEmail(data.email, loggedInUser.uid);
        await FirebaseService.logOutUser(); //logout so user can't do things
    } catch(error){
        throw error;
    }
};

const loginUser = async (context: any, email: string, password: string): Promise<void> => {
      try {
        await UserModel.loginUser(email, password);
        checkUserAuth(context);
      } catch(error) {
        throw error;
      }
};

const updateUserEmail = async (context: any, pastEmail: string, password: string, newEmail: string): Promise<void> => {
  try{
    const loggedInUser: any = await FirebaseService.logInUserWithEmailAndPassword(pastEmail, password);
    await UserModel.updateFirebaseUser(loggedInUser, newEmail);
    await EmailsToUidsModel.deleteUidToEmail(pastEmail);
    EmailsToUidsModel.setUidByEmail(newEmail, loggedInUser.uid);

  } catch(error) {
    throw error;
  }
};

const setUserType = async (context: any, uid: string, userType: UserType): Promise<void> => {
	await UserModel.setUserType(uid, userType)
	context.action = {
		type: 'SET_USER_TYPE',
		userType: userType
	}
};

const updateUserMetaData = async (context: any, uid: string, metaData: UserMetaData): Promise<void> => {
  try{
    await UserModel.updateMetaData(uid, metaData);
    context.action = {
      type: 'UPDATE_USER_META_DATA',
      userMetaData: metaData,
    };
  } catch(error) {
    throw error;
  }
};

const checkUserAuth = async (context: any): Promise<void> => {
  try {
    const loggedInUser: any  = await FirebaseService.getLoggedInUser();
    if(loggedInUser){
      let user = await UserModel.getById(loggedInUser.uid);
      user.metaData.uid = loggedInUser.uid; //OK because its being created here.
      const jwt: string = await loggedInUser.getToken();
      context.action = {
        type: 'CHECK_USER_AUTH',
        user,
        jwt
      };
    }
  } catch(error) {
    throw error;
  }
};

const addLesson = async (context: any, courseId: string, newLesson: Lesson, lessonPos: number, tags: string[]): Promise<void> => {
    try {
      const lessonId: string = await LessonModel.createOrUpdate(null, newLesson);
      if(tags) {
        await UtilitiesService.asyncForEach(tags, async (tag: string) => {
            await addTagToLesson(null, tag, lessonId);
        });
      }
      await CourseModel.associateLesson(courseId, lessonId, lessonPos);

      context.action = {
          type: 'ADD_LESSON',  //same as get course by id
					courseId,
					lessonId
      };

      const courseCollaboratorUids: string[] = await CourseModel.getCollaboratorUids(courseId);
      await LessonModel.associateCollaborators(lessonId, courseCollaboratorUids);
    } catch(error) {
      throw error;
    }
};

const addTagToLesson = async (context: any, tag: string, lessonId: string): Promise<void> => {
    try {
        const tagId: string = await TagModel.createOrUpdate(tag, null, lessonId, null);
        const lesson: Lesson = await LessonModel.addTag(tagId, lessonId);
        if(context) {
            context.action = {
                type: 'ADD_TAG_EDIT_LESSON',
                lesson
            };
        }
    } catch(error) {
        throw error;
    }
};

const updateLessonTags = async (lessonId: string, newTags: string[]): Promise<void> => {
    try {
        const lesson: Lesson = await LessonModel.getById(lessonId);
        const oldTagIds: string[] = lesson.tags ? Object.keys(lesson.tags || {}) : null;
        const oldTags: Tag[] = oldTagIds ? await TagModel.resolveTagIds(oldTagIds) : null;
        const oldTagNames: string[] = oldTags ? await TagModel.getTagNameArray(oldTags) : null;
        // await LessonModel.updateTags(lessonId, oldTags, oldTagNames, newTags);

    } catch(error) {
        throw error;
    }
};

// Updates the title of a lesson given a string lessonId and a new string title
const updateLessonTitle = async (lessonId: string, title: string): Promise<void> => {
    try {
        LessonModel.updateTitle(lessonId, title);
    } catch(error) {
        throw error;
    }
};

const getLessonAndTagNamesById = async (id: string): Promise<{ lesson: Lesson, tagNames: string[] }> => {
    try {
        const lesson: Lesson = await LessonModel.getById(id);
        const tagArray: string[] = lesson.tags ? Object.keys(lesson.tags || {}) : null;
        const tags: Tag[] = tagArray ? await TagModel.resolveTagIds(tagArray) : null;
        const tagNames: string[] = tags ? await TagModel.getTagNameArray(tags) : null;
        return {
            lesson,
            tagNames
        };
    } catch(error) {
        throw error;
    }
};

const getLessonById = async (context: any, id: string): Promise<Lesson> => {
    try {
      const lesson: Lesson = await LessonModel.getById(id);
      if(context) {
          context.action = {
            type: 'GET_LESSON_BY_ID',
            lesson
          }
      }

      return lesson;
    } catch(error){
      throw error;
    }
};

// TODO: @jordan should this be an action of in the TagModel?
const resolveTagIdObject = async (tags: {[tagId: string]: string}): Promise<Tag[]> => {
  try {
    const tagsAsStringArray: string[] = Object.keys(tags || {});
    const tagObjects: Tag[] = await TagModel.resolveTagIds(tagsAsStringArray);
    return tagObjects;
  } catch(error) {
    throw error;
  }
}

const addCourse = async (context: any, newCourse: Course, tags: string[]): Promise<void> => {
    try {
      const user: any = await FirebaseService.getLoggedInUser();

      const courseId: string = await CourseModel.createOrUpdate(null, newCourse);

      // if(tags) {
      //   await UtilitiesService.asyncForEach(tags, async (tag: string) => {
      //       await addTagToCourse(null, tag, courseId);
      //   });
      // }
      await addCourseCollaborator(context, courseId, user.email);

      const tempCourses: Course[] = await CourseModel.getCoursesByUser(newCourse.uid);
      const courses: Course[] = await CourseModel.resolveCourseArrayTagIds(tempCourses);
      context.action = {
          type: 'UPDATE_COURSES',
          courses
      };
    } catch(error) {
      throw error;
    }
};

const deleteCourse = async (context: any, course: Course): Promise<void> => {
  try {
    // remove associations of all collaborators
    for(const key in course.collaborators) {
      await UserModel.unshareCourseWithMe(course.collaborators[key], course.id);
    }
    // remove tag associations
    // await CourseModel.disassociateTags(course.id, course.tags);
    // delete actual course
    await CourseModel.deleteCourse(course.id);
    // refresh the view in the GUI
    const tempCourses = await CourseModel.getCoursesByUser(course.uid);
    const courses = await CourseModel.resolveCourseArrayTagIds(tempCourses);
    context.action = {
      type: 'UPDATE_COURSES',
      courses
    }
  } catch (error) {
    throw error;
  }
}

const deleteTagFromCourse = async (context: any, tag: Tag, courseId: string): Promise<void> => {
    try {
        const tagId: string = tag.id;
        await CourseModel.removeTag(tagId, courseId);
        await TagModel.removeCourse(tagId, courseId);
        const currentCourse: Course = await CourseModel.getById(courseId);
        // const courseTagNames: string[] = currentCourse.tags ? await TagModel.getTagNameArray(currentCourse.tags) : [];
        context.action = {
            type: 'SET_COURSE_VIEW_CURRENT_COURSE',
            currentCourse,
            // courseTagNames
        };
    } catch(error) {
        context.action = {
          type: 'DEFAULT_ACTION'
        };
        throw error;
    }
};

const addTagToCourse = async (context: any, tag: string, courseId: string): Promise<void> => {
    try {
        const tagId: string = await TagModel.createOrUpdate(tag, courseId, null, null);
        const currentCourse: Course = await CourseModel.addTag(tagId, courseId);
        // const courseTagNames: string[] = currentCourse.tags ? await TagModel.getTagNameArray(currentCourse.tags) : [];
        if(context) {
            context.action = {
                type: 'SET_COURSE_VIEW_CURRENT_COURSE',
                currentCourse,
                // courseTagNames
            };
        }
    } catch(error) {
        throw error;
    }
};

const getCoursesByUser = async (context: any): Promise<void> => {
    try {
      const loggedInUser: any  = await FirebaseService.getLoggedInUser(); //not sure if this is the best way to do this. The user isn't set in the ready, and this is the only way to ensure that its set?
      if(loggedInUser) {
        const courses: Course[] = await CourseModel.getCoursesByUser(loggedInUser.uid);
        // const courses: Course[] = await CourseModel.resolveCourseArrayTagIds(tempCourses);
        context.action = {
            type: 'GET_COURSES_BY_USER',
            courses
        };
      }
    } catch(error) {
      throw error;
    }
};

const getStarredCoursesByUser = async (context: any, uid: string): Promise<void> => {
    try {
        const courseIds: string[] = await UserModel.getStarredCoursesIds(uid);
        const courses: Course[] = await CourseModel.resolveCourseIds(courseIds);
        context.action = {
            type: 'SET_STARRED_COURSES',
            courses
        };
    } catch(error) {
        throw error;
    }
};

const getSharedCoursesByUser = async (context: any, uid: string): Promise<void> => {
    try {
        const courseIds: string[] = await UserModel.getSharedWithMeCoursesIds(uid);
        const courses: Course[] = await CourseModel.resolveCourseIds(courseIds);
        context.action = {
            type: 'SET_SHARED_COURSES',
            courses
        };
    } catch(error) {
        throw error;
    }
};

const getCoursesByVisibility = async (context: any, visibility: CourseVisibility, limit: number): Promise<Course[]> => {
    try {
      const courses: Course[] = await CourseModel.getAllByVisibility(visibility, limit);
      // const courses: Course[] = await CourseModel.resolveCourseArrayTagIds(tempCourses);
      context.action = {
          type: 'SET_COURSES_BY_VISIBILITY',
          visibility,
          courses
      };
      return courses;
    } catch(error) {
      throw error;
    }
};

const getCourseViewCourseById = async (context: any, id: string): Promise<void> => {
    try {
      const currentCourse: Course = await CourseModel.getById(id);
      // const courseTagNames: string[] = currentCourse.tags ? await TagModel.getTagNameArray(currentCourse.tags) : [];
      context.action = {
          type: 'SET_COURSE_VIEW_CURRENT_COURSE',
          currentCourse
          // courseTagNames
      };
    } catch(error){
      throw error;
    }
};

const deleteLesson = async (context: any, courseId: string, lessonId: string): Promise<void> => {
      try {
        await CourseModel.disassociateLesson(courseId, lessonId);
        const currentCourse: Course = await CourseModel.getById(courseId);
        context.action = {
            type: 'DELETE_LESSON',
            currentCourse,
            lessonId
        };
      } catch(error){
        throw error;
      }
};

const orderLessons = async (context: any, id: string, courseLessonsArray: CourseLessonData[]): Promise<void> => {
  try {
    await CourseModel.updateCourseLessons(id, courseLessonsArray);
  } catch(error){
    throw error;
  }
};

const updateCourseField = async (context: any, id: string, field: string, value: string | number): Promise<void> => {
    try{
      await CourseModel.updateCourseField(id, field, value);
      const currentCourse: Course = await CourseModel.getById(id);
      context.action = {
        type: 'SET_COURSE_VIEW_CURRENT_COURSE',
        currentCourse
      }
    } catch(error) {
      throw error;
    }
};

const logOutUser = async (context: any): Promise<void> => {
    await FirebaseService.logOutUser();
    window.location.href = ''; //need to reset the state instead of reloading everything.
};

// Looks through all quizzes in a course and changes their due dates if they are after
// the course due date.
const updateQuizDueDates = async (courseId: string): Promise<void> => {
  try {
    const course: Course = await CourseModel.getById(courseId);
    const lessonIds: string[] = Object.keys(course.lessons || {});
    const resolvedLessons: Lesson[] = await LessonModel.resolveLessonIds(lessonIds);
    await UtilitiesService.asyncForEach(resolvedLessons, async (lesson: Lesson) => {
      const quizIds: string[] = Object.keys(lesson.quizzes || {});
      const resolvedQuizzes: Quiz[] = await QuizModel.resolveQuizIds(quizIds);
      await UtilitiesService.asyncForEach(resolvedQuizzes, async (quiz: Quiz) => {
        if(quiz.quizQuestionSettings === undefined ||
           quiz.quizQuestionSettings.dueDate === undefined ||
           quiz.quizQuestionSettings.dueDate > course.dueDate) {
          await QuizModel.setQuizQuestionSetting(quiz.id, 'dueDate', course.dueDate);
        }
      });
    });

  } catch(error) {
    throw error;
  }
}
const reloadPublicCourses = async (context: any, courses: Course[]): Promise<void> => {
  try {
    context.action = {
      type: 'RELOAD_PUBLIC_COURSES',
      courses
    }
  } catch(error) {

  }
};

/**
 * Calls redux
 */
const getAllDisciplines = async (context: any): Promise<void> => {
  try {
    const disciplines: Discipline[] = await DisciplineModel.getAll();
    await UtilitiesService.asyncForEach(disciplines, async (discipline: Discipline) => {
      discipline.resolvedSubjects = await SubjectModel.getAllByDisciplineId(discipline.id);
      await UtilitiesService.asyncForEach(discipline.resolvedSubjects, async (subject: Subject) => {
        subject.resolvedConcepts = await ConceptModel.getAllBySubjectId(subject.id);
      });
    });

    context.action = {
      type: 'SET_DISCIPLINES',
      disciplines
    };
  } catch(error) {
    throw error;
  }
};

/**
 * This sets the chosen discipline but will resolve everything inside of it.
 */
const setChosenResolvedDiscipline = async (context: any, disciplineId: string): Promise<void> => {
  try {
    const discipline: Discipline = await DisciplineModel.getById(disciplineId);
    discipline.resolvedSubjects = await SubjectModel.getAllByDisciplineId(disciplineId);
    await UtilitiesService.asyncForEach(discipline.resolvedSubjects, async (subject: Subject) => {
      subject.resolvedConcepts = await ConceptModel.getAllBySubjectId(subject.id);
    });
    setChosenDiscipline(context, discipline);
  } catch(error) {
    throw error;
  }
};
const setChosenDiscipline = async (context: any, chosenDiscipline: Discipline): Promise<void> => {
  context.action = {
    type: 'SET_CHOSEN_DISCIPLINE',
    chosenDiscipline
  }
};

const deleteDiscipline = async (discipline: Discipline): Promise<void> => {
  try {
    await DisciplineModel.deleteDiscipline(discipline.id);
    if(discipline.subjects) {
      await UtilitiesService.asyncForEach(Object.keys(discipline.subjects), async (subjectId: string) => {
        await SubjectModel.deleteSubject(subjectId);
        //TODO delete concepts.
      });
    }


  } catch(error) {
    throw error;
  }
};

/**
 * Creates subject.
 * Adds subject Id to the discipline.
 */
const createSubject = async (context: any, disciplineId: string, subject: Subject): Promise<string> => {
  try {
    const subjectId: string = await SubjectModel.createOrUpdate(null, subject);
    await DisciplineModel.addSubject(disciplineId, subjectId);

    return subjectId;
  } catch(error) {
    throw error;
  }
};

/**
 * Sets the chosen subject and resolves everything inside of it
 */
const setChosenResolvedSubject = async (context: any, subjectId: string): Promise<void> => {
  try {
    const subject: Subject = await SubjectModel.getById(subjectId);
    subject.resolvedConcepts = await ConceptModel.getAllBySubjectId(subjectId);

    setChosenSubject(context, subject);
  } catch(error) {
    throw error;
  }
};

const setChosenSubject = (context: any, chosenSubject: Subject): void => {
  context.action = {
    type: 'SET_CHOSEN_SUBJECT',
    chosenSubject
  }
};

const deleteSubject = async (subject: Subject): Promise<void> => {
  try {
    await SubjectModel.deleteSubject(subject.id);
    await UtilitiesService.asyncForEach(Object.keys(subject.concepts), async (conceptId: string) => {
      await ConceptModel.deleteConcept(conceptId);
    });
  } catch(error) {
    throw error;
  }
};

/**
 * Creates concept.
 * Adds concept Id to the subject.
 */
const createConcept = async (context: any, concept: Concept): Promise<string> => {
  try {
    const conceptId: string = await ConceptModel.createOrUpdate(null, concept);
    await SubjectModel.addConcept(concept.subjectId, conceptId);
    return conceptId;
  } catch(error) {
    throw error;
  }
};

/**
 * Just named it resolved to be consistent. Use this to query firebase.
 */
const setChosenResolvedConcept = async (context: any, conceptId: string): Promise<void> => {
  try {
    const concept: Concept = await ConceptModel.getById(conceptId);
    setChosenConcept(context, concept);
  } catch(error) {
    throw error;
  }
}
const setChosenConcept = (context: any, chosenConcept: Concept): void => {
  context.action = {
    type: 'SET_CHOSEN_CONCEPT',
    chosenConcept
  };
};

const deleteConcept = async (concept: Concept): Promise<void> => {
  try {
    ConceptModel.deleteConcept(concept.id);
    SubjectModel.deleteConcept(concept.subjectId, concept.id);
  } catch(error) {
    throw error;
  }
};
export const Actions = {
    defaultAction,
    loginUser,
    checkUserAuth,
    deleteLesson,
    orderLessons,
    addLesson,
    createUser,
    logOutUser,
    updateUserEmail,
		setUserType,
    updateUserMetaData,
    loadEditLessonVideos,
    loadViewLessonVideos,
    setCurrentVideoInfo,
    saveVideo,
    clearCurrentVideoInfo,
    deleteVideo,
    addCourse,
    deleteCourse,
    deleteTagFromCourse,
    // addTagToCourse,
    getCoursesByUser,
    getCoursesByVisibility,
    loadUserQuestionIds,
    addQuestionToQuiz,
    loadQuizQuestionIds,
    removeQuestionFromQuiz,
    setQuizQuestionSetting,
    setQuestionSetting,
    loadQuizQuestionSettings,
    setCurrentEditQuizId,
    loadEditLessonQuizzes,
    loadViewLessonQuizzes,
    createNewQuiz,
    deleteQuiz,
    getQuiz,
    getCourseViewCourseById,
    updateLessonTags,
    updateLessonTitle,
    getLessonAndTagNamesById,
    getLessonById,
    resolveTagIdObject,
    loadPublicQuestionIds,
    starCourse,
    unstarCourse,
    getStarredCoursesByUser,
    addQuizCollaborator,
    loadQuizCollaboratorEmails,
    removeQuizCollaborator,
    getSharedCoursesByUser,
    loadCourseCollaboratorEmails,
    loadLessonCollaboratorEmails,
    loadVideoCollaboratorEmails,
    addCourseCollaborator,
    // lookupLessonTags,
    addLessonCollaborator,
    addVideoCollaborator,
    removeCourseCollaborator,
    removeLessonCollaborator,
    removeVideoCollaborator,
    updateCourseField,
    loadEditCourseLessons,
    loadViewCourseLessons,
    showMainSpinner,
    hideMainSpinner,
    updateQuizDueDates,
    reloadPublicCourses,
    getAllDisciplines,
    setChosenResolvedDiscipline,
    setChosenDiscipline,
    deleteDiscipline,
    createSubject,
    setChosenResolvedSubject,
    setChosenSubject,
    deleteSubject,
    createConcept,
    setChosenResolvedConcept,
    setChosenConcept,
    deleteConcept
  };
