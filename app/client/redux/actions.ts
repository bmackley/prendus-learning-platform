import {FirebaseService} from '../node_modules/prendus-services/services/firebase-service';
import {CourseModel} from '../node_modules/prendus-services/models/course-model';
import {ConceptModel} from '../node_modules/prendus-services/models/concept-model';
import {CourseConceptData} from '../node_modules/prendus-services/typings/course-concept-data';
import {UserModel} from '../node_modules/prendus-services/models/user-model';
import {VideoModel} from '../node_modules/prendus-services/models/video-model';
import {TagModel} from '../node_modules/prendus-services/models/tag-model';
import {QuizModel} from '../node_modules/prendus-services/models/quiz-model';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {QuizVisibility} from '../node_modules/prendus-services/typings/quiz-visibility';
import {QuestionModel} from '../node_modules/prendus-services/models/question-model';
import {Course} from '../node_modules/prendus-services/typings/course';
import {Tag} from '../node_modules/prendus-services/typings/tag';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {CourseVisibility} from '../node_modules/prendus-services/typings/course-visibility';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {User} from '../node_modules/prendus-services/typings/user';
import {EmailsToUidsModel} from '../node_modules/prendus-services/models/emails-to-uids-model';
import {Video} from '../node_modules/prendus-services/typings/video';
import {ExecuteAsyncInOrderService} from '../node_modules/prendus-services/services/execute-async-in-order-service';
import {UtilitiesService} from '../node_modules/prendus-services/services/utilities-service';
import {SubjectsModel} from '../node_modules/prendus-services/models/subjects-model';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {DisciplinesModel} from '../node_modules/prendus-services/models/discipline-model';

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

const initSubTopics = async (context: any, courseId: string, subject: string): Promise<void> => {
  try {
    const tempSubject: string = courseId ? await CourseModel.getAttribute('subject', courseId) : subject;
    const subtopics: string[] = await SubjectsModel.getSubtopics(tempSubject);
    context.action = {
      type: 'SET_SUBTOPICS',
      subtopics
    }
  } catch(error) {
    throw error;
  }
};
const initGradeLevelsBySubjectName = async (context: any, subject: string): Promise<void> => {
  try {
    const gradeLevels: string[] = await SubjectsModel.getGradeLevels(subject);
    context.action = {
      type: 'SET_GRADE_LEVELS',
      gradeLevels,
      subject
    };
  } catch(error) {
    throw error;
  }
};
const initGradeLevels = async (context: any, courseId: string): Promise<void> => {
  try {

  } catch(error) {
    throw error;
  }
};

const initSubjects = async (context: any, courseId: string): Promise<void> => {
  try {
    const subjects: string[] = await SubjectsModel.getSubjectValues();
    const subject: string = await CourseModel.getAttribute('subject', courseId);
    const selectedSubjectIndex: number = subjects.indexOf(subject);
    context.action = {
      type: 'SET_SUBJECTS',
      subjects,
      selectedSubjectIndex
    };
  } catch(error) {
    throw error;
  }
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

        const conceptIds: string[] = await CourseModel.getConceptIds(courseId);
        conceptIds.forEach((conceptId) => {
            loadConceptCollaboratorEmails(context, courseId, conceptId);
        });
    } catch(error) {
        throw error;
    }
	}
};

const loadConceptCollaboratorEmails = async (context: any, courseId: string, conceptId: string): Promise<void> => {

	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const uids: string[] = await ConceptModel.getCollaboratorUids(conceptId);
        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: ConceptModel.dataPath,
            id: conceptId
        });
        const emails: string[] = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_CONCEPT_COLLABORATOR_EMAILS',
            emails,
            courseId,
            conceptId
        };

        const videoIds: string[] = await ConceptModel.getVideoIds(conceptId);
        videoIds.forEach((videoId) => {
            loadVideoCollaboratorEmails(context, conceptId, videoId);
        });

        const quizIds: string[] = await ConceptModel.getQuizIds(conceptId);
        quizIds.forEach((quizId) => {
            loadQuizCollaboratorEmails(context, conceptId, quizId);
        });
    } catch(error) {
        throw error;
    }
	}
};

const loadVideoCollaboratorEmails = async (context: any, conceptId: string, videoId: string): Promise<void> => {

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
              conceptId,
              videoId
          };
      } catch(error) {
          throw error;
      }
		}
};

const loadQuizCollaboratorEmails = async (context: any, conceptId: string, quizId: string): Promise<void> => {

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
            conceptId,
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

const addConceptCollaborator = async (context: any, conceptId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await ConceptModel.associateCollaborator(conceptId, uid);
        await UserModel.shareConceptWithMe(uid, conceptId);
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

const removeConceptCollaborator = async (context: any, conceptId: string, email: string): Promise<void> => {
	ExecuteAsyncInOrderService.execute(operation);

	async function operation(): Promise<void> {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        await FirebaseService.set(`security/${user.uid}/emailToUidSecurityInfo/encodedEmail`, btoa(email));
        const uid: string = await EmailsToUidsModel.getUidByEmail(email);
        if (!uid) {
            throw 'The user does not exist';
        }
        await ConceptModel.disassociateCollaborator(conceptId, uid);
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

const createNewQuiz = async (context: any, conceptId: string): Promise<string> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const uid: string = user.uid;
    // TODO: Create public courses and enforce payment before creation of a private course
    const quizId: string = await QuizModel.createOrUpdate(null, {
        id: null,
        uid,
        title: `Untitled Quiz`,
        visibility: 'public',
        quizQuestionSettings: {
            answerFeedback: true,
            showAnswer: false,
            showHint: true,
            showCode: true,
            graded: false,
            showConfidenceLevel: false,
            allowGeneration: true
        },
        questions: {},
        collaborators: {}
    });
    await ConceptModel.associateQuiz(conceptId, quizId);

    const conceptCollaboratorUids: string[] = await ConceptModel.getCollaboratorUids(conceptId);
    await QuizModel.associateCollaborators(quizId, conceptCollaboratorUids);

    return quizId;
};

const deleteQuiz = async (context: any, conceptId: string, quiz: Quiz): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const concept: Concept = await ConceptModel.getById(conceptId);
    const quizIds: string[] = await ConceptModel.getQuizIds(conceptId);
    const quizzes: Quiz[] = await QuizModel.filterQuizzesByCollaborator(quizIds, concept.uid, user.uid);

    // disassociate concept and questions
    await ConceptModel.disassociateQuiz(conceptId, quiz.id);
    for(let key in quiz.questions) {
      await QuizModel.disassociateQuestion(quiz.id, key);
    }
    // delete from database
    await QuizModel.deleteQuiz(quiz.id);
}

const loadEditConceptQuizzes = async (context: any, conceptId: string): Promise<void> => {
    const user: any = await FirebaseService.getLoggedInUser();
    const concept: Concept = await ConceptModel.getById(conceptId);

    const quizIds: string[] = await ConceptModel.getQuizIds(conceptId);
    const quizzes: Quiz[] = await QuizModel.filterQuizzesByCollaborator(quizIds, concept.uid, user.uid);

    context.action = {
        type: 'LOAD_EDIT_CONCEPT_QUIZZES',
        conceptId,
        quizzes
    };
};

const loadViewConceptQuizzes = async (context: any, conceptId: string): Promise<void> => {
    const quizIds: string[] = await ConceptModel.getQuizIds(conceptId);
    const quizzes: Quiz[] = await QuizModel.resolveQuizIds(quizIds);

    context.action = {
        type: 'LOAD_VIEW_CONCEPT_QUIZZES',
        conceptId,
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

const deleteVideo = async (context: any, conceptId: string, videoId: string): Promise<void> => {
    try {
        await ConceptModel.disassociateVideo(conceptId, videoId);
    } catch(error) {
        throw error;
    }
};

const saveVideo = async (context: any, conceptId: string, videoId: string, video: Video): Promise<void> => {
    try {
        const newId: string = await VideoModel.createOrUpdate(videoId, video);
        await ConceptModel.associateVideo(conceptId, newId);
        if (!videoId) {
            const conceptCollaboratorUids: string[] = await ConceptModel.getCollaboratorUids(conceptId);
            await VideoModel.associateCollaborators(newId, conceptCollaboratorUids);
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
        id,
        title,
        url
    };
};

const clearCurrentVideoInfo = (context: any): void => {
    context.action = {
        type: 'CLEAR_CURRENT_VIDEO_INFO'
    };
};

const loadEditConceptVideos = async (context: any, conceptId: string): Promise<void> => {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const concept: Concept = await ConceptModel.getById(conceptId);
        const videoIds: string[] = await ConceptModel.getVideoIds(conceptId);
        const videos: Video[] = await VideoModel.filterVideosByCollaborator(videoIds, concept.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_CONCEPT_VIDEOS',
            videos,
            conceptId
        };
    } catch(error) {
        throw error;
    }
};

const loadViewConceptVideos = async (context: any, conceptId: string): Promise<void> => {
    try {
        const videoIds: string[] = await ConceptModel.getVideoIds(conceptId);
        const videos: Video[] = await VideoModel.resolveVideoIds(videoIds);

        context.action = {
            type: 'LOAD_VIEW_CONCEPT_VIDEOS',
            videos,
            conceptId
        };
    } catch(error) {
        throw error;
    }
};

const loadEditCourseConcepts = async (context: any, courseId: string): Promise<void> => {
    try {
        const user: any = await FirebaseService.getLoggedInUser();
        const course: Course = await CourseModel.getById(courseId);
        const conceptDatasObject = course.concepts;
        const concepts: CourseConceptData[] = await ConceptModel.filterConceptDatasByCollaborator(conceptDatasObject, course.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_COURSE_CONCEPTS',
            concepts,
            courseId
        };
    } catch(error) {
        throw error;
    }
};

const loadViewCourseConcepts = async (context: any, courseId: string): Promise<void> => {
    try {
        const course: Course = await CourseModel.getById(courseId);
        const conceptsArray: CourseConceptData[] = await CourseModel.courseConceptsToArray(course);
        const orderedConcepts: CourseConceptData[] = await CourseModel.orderCourseConcepts(conceptsArray);

        context.action = {
            type: 'LOAD_VIEW_COURSE_CONCEPTS',
            orderedConcepts,
            courseId
        };
    } catch(error) {
        throw error;
    }
};

const createUser = async (context: any, data: UserMetaData, password: string): Promise<void> => {
    try {
        await FirebaseService.createUserWithEmailAndPassword(data.email, password);
        const loggedInUser: any = await FirebaseService.logInUserWithEmailAndPassword(data.email, password);
        UserModel.sendConfirmationEmail(loggedInUser);
        UserModel.updateMetaData(loggedInUser.uid, data);
        EmailsToUidsModel.setUidByEmail(data.email, loggedInUser.uid);
        FirebaseService.logOutUser(); //logout so user can't do things
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

const addConcept = async (context: any, courseId: string, newConcept: Concept, conceptPos: number) => {
    try {
      const conceptId: string = await ConceptModel.createOrUpdate(null, newConcept);

      await CourseModel.associateConcept(courseId, conceptId, conceptPos);
      const course: Course = await CourseModel.getById(courseId);
      const conceptsArray: CourseConceptData[] = await CourseModel.courseConceptsToArray(course);
      const orderedConcepts: CourseConceptData[] = await CourseModel.orderCourseConcepts(conceptsArray);
      course.concepts = orderedConcepts;

      context.action = {
          type: 'ADD_CONCEPT'  //same as get course by id
      };

      const courseCollaboratorUids: string[] = await CourseModel.getCollaboratorUids(courseId);
      await ConceptModel.associateCollaborators(conceptId, courseCollaboratorUids);
    } catch(error) {
      throw error;
    }
};

const addTagToConcept = async (context: any, tag: string, conceptId: string): Promise<void> => {
    try {
        const tagId: string = await TagModel.createOrUpdate(tag, null, conceptId, null);
        const concept: Concept = await ConceptModel.addTag(tagId, conceptId);
        if(context) {
            context.action = {
                type: 'ADD_TAG_EDIT_CONCEPT',
                concept
            };
        }
    } catch(error) {
        throw error;
    }
};

const updateConceptTags = async (conceptId: string, newTags: string[]): Promise<void> => {
    try {
        const concept: Concept = await ConceptModel.getById(conceptId);
        const oldTagIds: string[] = concept.tags ? Object.keys(concept.tags || {}) : null;
        const oldTags: Tag[] = oldTagIds ? await TagModel.resolveTagIds(oldTagIds) : null;
        const oldTagNames: string[] = oldTags ? await TagModel.getTagNameArray(oldTags) : null;
        // await ConceptModel.updateTags(conceptId, oldTags, oldTagNames, newTags);

    } catch(error) {
        throw error;
    }
};

// Updates the title of a concept given a string conceptId and a new string title
const updateConceptTitle = async (conceptId: string, title: string): Promise<void> => {
    try {
        ConceptModel.updateTitle(conceptId, title);
    } catch(error) {
        throw error;
    }
};

const getConceptAndTagNamesById = async (id: string): Promise<{ concept: Concept, tagNames: string[] }> => {
    try {
        const concept: Concept = await ConceptModel.getById(id);
        const tagArray: string[] = concept.tags ? Object.keys(concept.tags || {}) : null;
        const tags: Tag[] = tagArray ? await TagModel.resolveTagIds(tagArray) : null;
        const tagNames: string[] = tags ? await TagModel.getTagNameArray(tags) : null;
        return {
            concept,
            tagNames
        };
    } catch(error) {
        throw error;
    }
};

const getConceptById = async (context: any, id: string): Promise<Concept> => {
    try {
      const concept: Concept = await ConceptModel.getById(id);
      if(context) {
          context.action = {
            type: 'GET_CONCEPT_BY_ID',
            concept
          }
      }

      return concept;
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
          type: 'ADD_COURSE',
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
      type: 'DELETE_COURSE',
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
            type: 'DELETE_TAG_EDIT_COURSE',
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

// const addTagToCourse = async (context: any, tag: string, courseId: string): Promise<void> => {
//     try {
//         const tagId: string = await TagModel.createOrUpdate(tag, courseId, null, null);
//         const currentCourse: Course = await CourseModel.addTag(tagId, courseId);
//         const courseTagNames: string[] = currentCourse.tags ? await TagModel.getTagNameArray(currentCourse.tags) : [];
//         if(context) {
//             context.action = {
//                 type: 'ADD_TAG_EDIT_COURSE',
//                 currentCourse,
//                 courseTagNames
//             };
//         }
//     } catch(error) {
//         throw error;
//     }
// };
//
// const lookupConceptTags = async (context: any, tags: string[]): Promise<void> => {
//     try {
//         const tagObjects : Tag[] = await TagModel.getByNames(tags);
//         const conceptsArray : Concept[] = await TagModel.getConceptsInTags(tagObjects);
//         context.action = {
//             type: 'LOOKUP_CONCEPT_TAGS',
//             conceptsArray
//         }
//         // It's better to allow the redux action to take place so that the concepts listed
//         // in the search concepts page will be empty.
//         if(conceptsArray === null) {
//             throw new Error("No concepts match these tags");
//         }
//     } catch(error) {
//         throw error;
//     }
// };
//
// const lookupCourseTags = async (context: any, tag: string): Promise<void> => {
//     try {
//         const tagObject: Tag = await TagModel.getByName(tag);
//         // TODO: this will change with infinite scrolling.
//         const maxAmountOfCoursesToDisplay: number = 9;
//         const coursesArray : Course[] = tagObject ? await TagModel.getCoursesInTags([tagObject], maxAmountOfCoursesToDisplay) : null;
//         context.action = {
//             type: 'SET_COURSE_TAGS',
//             coursesArray
//         };
//         // It's better to allow the redux action to take place so that the courses listed
//         // in the search courses page will be empty.
//         if(!coursesArray) {
//             throw new Error("No courses match this tag");
//         }
//     } catch(error) {
//         throw error;
//     }
//
// };

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
          currentCourse,
          // courseTagNames
      };
    } catch(error){
      throw error;
    }
};

const deleteConcept = async (context: any, courseId: string, conceptId: string): Promise<void> => {
      try {
        await CourseModel.disassociateConcept(courseId, conceptId);
        const currentCourse: Course = await CourseModel.getById(courseId);
        context.action = {
            type: 'DELETE_CONCEPT',
            currentCourse
        };
      } catch(error){
        throw error;
      }
};

const orderConcepts = async (context: any, id: string, courseConceptsArray: CourseConceptData[]): Promise<void> => {
  try {
    await CourseModel.updateCourseConcepts(id, courseConceptsArray);
  } catch(error){
    throw error;
  }
};

const updateCourseField = async (context: any, id: string, field: string, value: string | number): Promise<void> => {
    try{
      await CourseModel.updateCourseField(id, field, value);
      const course: Course = await CourseModel.getById(id);
      context.action = {
        type: 'GET_COURSE_BY_ID',
        currentCourse: course
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
    const conceptIds: string[] = Object.keys(course.concepts || {});
    const resolvedConcepts: Concept[] = await ConceptModel.resolveConceptIds(conceptIds);
    await UtilitiesService.asyncForEach(resolvedConcepts, async (concept: Concept) => {
      const quizIds: string[] = Object.keys(concept.quizzes || {});
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
    const disciplines: Discipline[] = await DisciplinesModel.getAll();
    context.action = {
      type: 'SET_DISCIPLINES',
      disciplines
    };
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
export const Actions = {
    defaultAction,
    loginUser,
    initSubjects,
    initSubTopics,
    initGradeLevelsBySubjectName,
    initGradeLevels,
    checkUserAuth,
    deleteConcept,
    orderConcepts,
    addConcept,
    createUser,
    logOutUser,
    updateUserEmail,
    updateUserMetaData,
    loadEditConceptVideos,
    loadViewConceptVideos,
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
    loadEditConceptQuizzes,
    loadViewConceptQuizzes,
    createNewQuiz,
    deleteQuiz,
    getQuiz,
    getCourseViewCourseById,
    getConceptById,
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
    loadConceptCollaboratorEmails,
    loadVideoCollaboratorEmails,
    addCourseCollaborator,
    // lookupConceptTags,
    // lookupCourseTags,
    addConceptCollaborator,
    addVideoCollaborator,
    removeCourseCollaborator,
    removeConceptCollaborator,
    removeVideoCollaborator,
    updateCourseField,
    loadEditCourseConcepts,
    loadViewCourseConcepts,
    showMainSpinner,
    hideMainSpinner,
    updateQuizDueDates,
    reloadPublicCourses,
    getAllDisciplines,
    setChosenDiscipline
  };
