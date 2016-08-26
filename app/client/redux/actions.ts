import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {CourseModel} from '../node_modules/prendus-services/models/course.model.ts';
import {ConceptModel} from '../node_modules/prendus-services/models/concept.model.ts';
import {CourseConceptData} from '../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {UserModel} from '../node_modules/prendus-services/models/user.model.ts';
import {VideoModel} from '../node_modules/prendus-services/models/video.model.ts';
import {QuizModel} from '../node_modules/prendus-services/models/quiz.model.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';
import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';
import {CourseVisibility} from '../node_modules/prendus-services/interfaces/course-visibility.type.ts';
import {UserMetaData} from '../node_modules/prendus-services/interfaces/user-meta-data.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';
import {EmailsToUidsModel} from '../node_modules/prendus-services/models/emails-to-uids.model.ts';
import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';

const showMainSpinner = (context: any) => {
    context.action = {
        type: 'SHOW_MAIN_SPINNER'
    };
};

const hideMainSpinner = (context: any) => {
    context.action = {
        type: 'HIDE_MAIN_SPINNER'
    };
};

const loadCourseCollaboratorEmails = async (context: any, uid: string, courseId: string) => {

    try {
        const uids = await CourseModel.getCollaboratorUids(courseId);

        await FirebaseService.set(`security/${uid}/collaboratorSecurityInfo`, {
            collection: CourseModel.dataPath,
            id: courseId
        });
        const emails = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_COURSE_COLLABORATOR_EMAILS',
            emails,
            uid
        };

        const conceptIds = await CourseModel.getConceptIds(courseId);
        conceptIds.forEach((conceptId) => {
            loadConceptCollaboratorEmails(context, courseId, conceptId);
        });
    }
    catch(error) {
        throw error;
    }
};

const loadConceptCollaboratorEmails = async (context: any, courseId: string, conceptId: string) => {
    try {
        const user = await FirebaseService.getLoggedInUser();

        const uids = await ConceptModel.getCollaboratorUids(conceptId);

        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: ConceptModel.dataPath,
            id: conceptId
        });
        const emails = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_CONCEPT_COLLABORATOR_EMAILS',
            emails,
            courseId
        };

        const videoIds = await ConceptModel.getVideoIds(conceptId);
        videoIds.forEach((videoId) => {
            loadVideoCollaboratorEmails(context, conceptId, videoId);
        });

        const quizIds = await ConceptModel.getQuizIds(conceptId);
        quizIds.forEach((quizId) => {
            loadQuizCollaboratorEmails(context, conceptId, quizId);
        });
    }
    catch(error) {
        throw error;
    }
};

const loadVideoCollaboratorEmails = async (context: any, conceptId: string, videoId: string) => {

    try {
        const user = await FirebaseService.getLoggedInUser();

        const uids = await VideoModel.getCollaboratorUids(videoId);

        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: VideoModel.dataPath,
            id: videoId
        });
        const emails = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_VIDEO_COLLABORATOR_EMAILS',
            emails,
            conceptId
        };
    }
    catch(error) {
        throw error;
    }
};

const loadQuizCollaboratorEmails = async (context: any, conceptId: string, quizId: string) => {

    try {
        const user = await FirebaseService.getLoggedInUser();

        const uids = await QuizModel.getCollaboratorUids(quizId);

        await FirebaseService.set(`security/${user.uid}/collaboratorSecurityInfo`, {
            collection: QuizModel.dataPath,
            id: quizId
        });
        const emails = await UserModel.getEmailsByIds(uids);

        context.action = {
            type: 'SET_QUIZ_COLLABORATOR_EMAILS',
            emails,
            conceptId
        };
    }
    catch(error) {
        throw error;
    }
};

const addCourseCollaborator = async (context: any, courseId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await CourseModel.associateCollaborator(courseId, uid);
        await UserModel.shareCourseWithMe(uid, courseId);
    }
    catch(error) {
        throw error;
    }
};

const addConceptCollaborator = async (context: any, conceptId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await ConceptModel.associateCollaborator(conceptId, uid);
        await UserModel.shareConceptWithMe(uid, conceptId);
    }
    catch(error) {
        throw error;
    }
};

const addVideoCollaborator = async (context: any, videoId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await VideoModel.associateCollaborator(videoId, uid);
        await UserModel.shareVideoWithMe(uid, videoId);
    }
    catch(error) {
        throw error;
    }
};

const addQuizCollaborator = async (context: any, quizId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await QuizModel.associateCollaborator(quizId, uid);
        await UserModel.shareQuizWithMe(uid, quizId);
    }
    catch(error) {
        throw error;
    }
};

const removeCourseCollaborator = async (context: any, courseId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await CourseModel.disassociateCollaborator(courseId, uid);
        await UserModel.unshareCourseWithMe(uid, courseId);
    }
    catch(error) {
        throw error;
    }
};

const removeConceptCollaborator = async (context: any, conceptId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await ConceptModel.disassociateCollaborator(conceptId, uid);
    }
    catch(error) {
        throw error;
    }
};

const removeVideoCollaborator = async (context: any, videoId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await VideoModel.disassociateCollaborator(videoId, uid);
    }
    catch(error) {
        throw error;
    }
};

const removeQuizCollaborator = async (context: any, quizId: string, email: string) => {
    try {
        const uid = await EmailsToUidsModel.getUidByEmail(email);

        if (!uid) {
            throw 'The user does not exist';
        }

        await QuizModel.disassociateCollaborator(quizId, uid);
    }
    catch(error) {
        throw error;
    }
};

const starCourse = async (context: any, courseId: string) => {
    const user = await FirebaseService.getLoggedInUser();

    await CourseModel.associateUserStar(courseId, user.uid);
    await UserModel.starCourse(user.uid, courseId);

    context.action = {
        type: 'STAR_COURSE'
    };
};

const unstarCourse = async (context: any, courseId: string) => {
    const user = await FirebaseService.getLoggedInUser();

    await CourseModel.disassociateUserStar(courseId, user.uid);
    await UserModel.unstarCourse(user.uid, courseId);

    context.action = {
        type: 'UNSTAR_COURSE'
    };
};

const getQuiz = async (quizId: string) => {
    const quiz = await QuizModel.getById(quizId);

    return quiz;
};

const updateQuizTitle = async (quizId: string, title: string) => {
    await QuizModel.updateTitle(quizId, title);
};

const createNewQuiz = async (context: any, conceptId: string) => {
    const user = await FirebaseService.getLoggedInUser();
    const uid: string = user.uid;

    const quizId = await QuizModel.createOrUpdate(null, {
        id: null,
        uid,
        title: `Untitled Quiz`,
        private: false,
        quizSettings: {
            answerFeedback: true,
            showAnswer: true,
            showHint: true,
            showCode: true,
            graded: false,
            showConfidenceLevel: true,
            allowGeneration: true
        },
        questions: {},
        collaborators: {}
    });
    await ConceptModel.associateQuiz(conceptId, quizId);

    const conceptCollaboratorUids = await ConceptModel.getCollaboratorUids(conceptId);
    await QuizModel.associateCollaborators(quizId, conceptCollaboratorUids);

    return quizId;
};

const loadEditConceptQuizzes = async (context: any, conceptId: string) => {
    const user = await FirebaseService.getLoggedInUser();
    const concept = await ConceptModel.getById(conceptId);

    const quizzIds = await ConceptModel.getQuizIds(conceptId);
    const quizzes = await QuizModel.filterQuizzesByCollaborator(quizzIds, concept.uid, user.uid);

    context.action = {
        type: 'LOAD_EDIT_CONCEPT_QUIZZES',
        conceptId,
        quizzes
    };
};

const loadViewConceptQuizzes = async (context: any, conceptId: string) => {
    const quizzIds = await ConceptModel.getQuizIds(conceptId);
    const quizzes = await QuizModel.resolveQuizIds(quizzIds);

    context.action = {
        type: 'LOAD_VIEW_CONCEPT_QUIZZES',
        conceptId,
        quizzes
    };
};

const setCurrentEditQuizId = (context: any, quizId: string) => {
    context.action = {
        type: 'SET_CURRENT_EDIT_QUIZ_ID',
        quizId
    };
};

const loadQuizSettings = async (context: any, quizId: string) => {
    const quizSettings: QuestionSettings = await QuizModel.getQuizSettings(quizId);

    context.action = {
        type: 'LOAD_QUIZ_SETTINGS',
        quizSettings
    };
};

const setQuizSetting = async (context: any, quizId: string, settingName: string, value: number | boolean) => {
    await QuizModel.setQuizSetting(quizId, settingName, value);
};

const setQuestionSetting = async (context: any, quizId: string, questionId: string, settingName: string, value: number | boolean) => {
    await QuizModel.setQuestionSetting(quizId, questionId, settingName, value);
};

const loadQuizQuestionIds = async (context: any, quizId: string) => {
    const quizQuestionIds = await QuizModel.getQuestionIds(quizId);

    context.action = {
        type: 'LOAD_QUIZ_QUESTION_IDS',
        quizQuestionIds
    };
};

const addQuestionToQuiz = async (context: any, quizId: string, questionId: string) => {
    await QuizModel.associateQuestion(quizId, questionId);
};

const removeQuestionFromQuiz = async (context: any, quizId: string, questionId: string) => {
    await QuizModel.disassociateQuestion(quizId, questionId);
};

const loadUserQuestionIds = async (context: any, getUserQuestionIdsAjax: any) => {
    const request = getUserQuestionIdsAjax.generateRequest();
    await request.completes;

    const userQuestionIds = request.response.questionIds;

    context.action = {
        type: 'LOAD_USER_QUESTION_IDS',
        userQuestionIds
    };
};

const loadPublicQuestionIds = async (context: any, getPublicQuestionIdsAjax: any) => {
    const request = getPublicQuestionIdsAjax.generateRequest();
    await request.completes;

    const publicQuestionIds = request.response.questionIds;

    context.action = {
        type: 'LOAD_PUBLIC_QUESTION_IDS',
        publicQuestionIds
    };
};

const deleteVideo = async (context: any, conceptId: string, videoId: string) => {
    try {
        await ConceptModel.disassociateVideo(conceptId, videoId);
    }
    catch(error) {
        throw error;
    }
};

const saveVideo = async (context: any, conceptId: string, videoId: string, video: Video) => {
    try {
        const newId = await VideoModel.createOrUpdate(videoId, video);
        await ConceptModel.associateVideo(conceptId, newId);

        if (!videoId) {
            const conceptCollaboratorUids = await ConceptModel.getCollaboratorUids(conceptId);
            await VideoModel.associateCollaborators(newId, conceptCollaboratorUids);
        }

        context.action = {
            type: 'SET_CURRENT_VIDEO_ID',
            id: newId
        };
    }
    catch(error) {
        throw error;
    }
};

const setCurrentVideoInfo = (context: any, id: string, title: string, url: string) => {
    context.action = {
        type: 'SET_CURRENT_VIDEO_INFO',
        id,
        title,
        url
    };
};

const clearCurrentVideoInfo = (context: any) => {
    context.action = {
        type: 'CLEAR_CURRENT_VIDEO_INFO'
    };
};

const loadEditConceptVideos = async (context: any, conceptId: string) => {
    try {
        const user = await FirebaseService.getLoggedInUser();
        const concept = await ConceptModel.getById(conceptId);

        const videoIds = await ConceptModel.getVideoIds(conceptId);
        const videos = await VideoModel.filterVideosByCollaborator(videoIds, concept.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_CONCEPT_VIDEOS',
            videos,
            conceptId
        };
    }
    catch(error) {
        throw error;
    }
};

const loadViewConceptVideos = async (context: any, conceptId: string) => {
    try {
        const videoIds = await ConceptModel.getVideoIds(conceptId);
        const videos = await VideoModel.resolveVideoIds(videoIds);

        context.action = {
            type: 'LOAD_VIEW_CONCEPT_VIDEOS',
            videos,
            conceptId
        };
    }
    catch(error) {
        throw error;
    }
};

const loadEditCourseConcepts = async (context: any, courseId: string) => {
    try {
        const user = await FirebaseService.getLoggedInUser();

        const course = await CourseModel.getById(courseId);
        const conceptDatasObject = course.concepts;

        const concepts = await ConceptModel.filterConceptDatasByCollaborator(conceptDatasObject, course.uid, user.uid);

        context.action = {
            type: 'LOAD_EDIT_COURSE_CONCEPTS',
            concepts,
            courseId
        };
    }
    catch(error) {
        throw error;
    }
};

const loadViewCourseConcepts = async (context: any, courseId: string) => {
    try {
        const course = await CourseModel.getById(courseId);
        const conceptDatasObject = course.concepts;

        const concepts = Object.keys(conceptDatasObject || {}).map((conceptDataId) => conceptDatasObject[conceptDataId]);

        context.action = {
            type: 'LOAD_VIEW_COURSE_CONCEPTS',
            concepts,
            courseId
        };
    }
    catch(error) {
        throw error;
    }
};

const createUser = {
  type: 'CREATE_USER',
  execute: async (context: any, data: UserMetaData, password: string) => {
    try {
      const success = await FirebaseService.createUserWithEmailAndPassword(data.email, password);
      const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(data.email, password);
      await UserModel.updateMetaData(loggedInUser.uid, data);
      await EmailsToUidsModel.setUidByEmail(data.email, loggedInUser.uid);
      data.email = loggedInUser.email
      context.action = {
        type: Actions.createUser.type,
        currentUser: data,
      };
    }catch(error){
      throw error;
    }
  }
};
const loginUser = {
    type: 'LOGIN_USER',
    execute: async (context: any, email: string, password: string) => {
        try {
          const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(email, password);
          let user = await UserModel.getById(loggedInUser.uid); //sets ancillary user data such as name, institution, etc.
          user.metaData.uid = loggedInUser.uid;
          const courses = await CourseModel.getCoursesByUser(loggedInUser.uid);
          context.action = {
            type: Actions.loginUser.type,
            courses: courses,
            user
          };
        }catch(error){
          throw error;
        }
    }
};
const updateUserEmail = {
  type: 'UPDATE_USER_PROFILE',
  execute: async (context: any, pastEmail: string, password: string, newEmail: string) => {
    try{
      const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(pastEmail, password);
      await UserModel.updateFirebaseUser(loggedInUser, newEmail);
    }catch(error){
      throw error;
    }
  }
};
const updateUserMetaData = {
  type: 'UPDATE_USER_META_DATA',
  execute: async (context: any, uid: string, metaData: UserMetaData) => {
    try{
      await UserModel.updateMetaData(uid, metaData);
      context.action = {
        type: Actions.updateUserMetaData.type,
        user: metaData,
      };
    }catch(error){
      throw error;
    }
  }
};
const checkUserAuth = {
  type: 'CHECK_USER_AUTH',
  execute: async (context: any) => {
    try {
      const loggedInUser = await FirebaseService.getLoggedInUser();
      if(loggedInUser){
        let user = await UserModel.getById(loggedInUser.uid);
        user.metaData.uid = loggedInUser.uid; //OK because its being created here.
        const jwt = await loggedInUser.getToken();
        context.action = {
          type: Actions.checkUserAuth.type,
          user,
          jwt
        };
      }
    }catch(error){
      throw error;
    }
  }
};
const addConcept = {
  type: 'ADD_CONCEPT',
  execute: async (context: any, courseId: string, newConcept: Concept, conceptPos: number) => {
    try {
      const conceptId = await ConceptModel.save(null, newConcept);
      await CourseModel.associateConcept(courseId, conceptId, conceptPos);
      const course = await CourseModel.getById(courseId);
      const conceptsArray = await CourseModel.courseConceptsToArray(course);
      const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
      course.concepts = orderedConcepts;
      context.action = {
          type: 'ADD_CONCEPT',  //same as get course by id
          currentCourse: course
      };

      const courseCollaboratorUids = await CourseModel.getCollaboratorUids(courseId);
      await ConceptModel.associateCollaborators(conceptId, courseCollaboratorUids);
    }catch(error){
      throw error;
    }
  }
};

const getConceptById = {
  type: 'GET_CONCEPT_BY_ID',
  execute: async (context: any, id: string) => {
    try {
      const concept = await ConceptModel.getById(id);
      context.action = {
        type: Actions.getConceptById.type,
        concept: concept,
      }
    }catch(error){
      throw error;
    }
  }
};

const addCourse = {
  type: 'ADD_COURSE',
  execute: async (context: any, newCourse: Course) => {
      try {
        const courseId = await CourseModel.createOrUpdate(null, newCourse);
        const courses = await CourseModel.getCoursesByUser(newCourse.uid);
        context.action = {
            type: Actions.addCourse.type,
            courses: courses,
        }
      }catch(error){
        throw error;
      }
  }
};
const getCoursesByUser = {
  execute: async (context: any) => {
    try {
      const loggedInUser = await FirebaseService.getLoggedInUser(); //not sure if this is the best way to do this. The user isn't set in the ready, and this is the only way to ensure that its set?
      if(loggedInUser){
        const courses = await CourseModel.getCoursesByUser(loggedInUser.uid);
        context.action = {
            type: 'GET_COURSES_BY_USER',
            courses: courses
        };
      }
    }catch(error){
      throw error;
    }
  }
};

const getStarredCoursesByUser = async (context: any, uid: string) => {
    try {
        const courseIds = await UserModel.getStarredCoursesIds(uid);
        const courses = await CourseModel.resolveCourseIds(courseIds);

        context.action = {
            type: 'SET_STARRED_COURSES',
            courses
        };
    }
    catch(error) {
        throw error;
    }
};

const getSharedCoursesByUser = async (context: any, uid: string) => {
    try {
        const courseIds = await UserModel.getSharedWithMeCoursesIds(uid);
        const courses = await CourseModel.resolveCourseIds(courseIds);

        context.action = {
            type: 'SET_SHARED_COURSES',
            courses
        };
    }
    catch(error) {
        throw error;
    }
};

const getCoursesByVisibility = async (context: any, visibility: CourseVisibility) => {

    const courses = await CourseModel.getAllByVisibility(visibility);

    context.action = {
        type: 'SET_COURSES_BY_VISIBILITY',
        visibility,
        courses
    };
};

const getCourseById = {
  execute: async (context: any, id: string) => {
    try {
      const course = await CourseModel.getById(id);
    //   const conceptsArray = await CourseModel.courseConceptsToArray(course);
    //   const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
    //   course.concepts = orderedConcepts;
      context.action = {
          type: 'GET_COURSE_BY_ID',
          currentCourse: course
      };
    }catch(error){
      throw error;
    }
  }
};
const deleteConcept = {
  execute: async (context: any, courseId: string, conceptId: string) => {
      try {
        await CourseModel.disassociateConcept(courseId, conceptId);
        const course = await CourseModel.getById(courseId);
        // const conceptsArray = await CourseModel.courseConceptsToArray(course);
        // const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
        // course.concepts = orderedConcepts;
        context.action = {
            type: 'GET_COURSE_BY_ID',
            currentCourse: course
        };
      }catch(error){
        throw error;
      }
  }
};
const orderConcepts = {
  type: 'ORDER_CONCEPTS',
  execute: async (context: any, id: string, courseConceptsArray: Concept[]) => {
    try{
      console.log('concepts array', courseConceptsArray);
      await CourseModel.updateCourseConcepts(id, courseConceptsArray);
    }catch(error){
      throw error;
    }
  }
};

const updateCourseField = async (context: any, id: string, field: string, value: string) => {
    try{
      console.log('actions context', context)
      console.log('actions id', id)
      console.log('actions field', field)
      console.log('actions value', value)
      await CourseModel.updateCourseField(id, field, value);
      const course = await CourseModel.getById(id);
    //   const conceptsArray = await CourseModel.courseConceptsToArray(course);
    //   const orderedConcepts = CourseModel.orderCourseConcepts(conceptsArray);
    //   course.concepts = orderedConcepts;
      context.action = {
        type: 'GET_COURSE_BY_ID',
        currentCourse: course
      }
    }catch(error){
      throw error;
    }
};

const logOutUser = {
  type: 'LOGOUT_USER',
  execute: async (context: any) => {
    await FirebaseService.logOutUser();
    context.action = {
      type: Actions.logOutUser.type,
    }
  }
};

export const Actions = {
    loginUser,
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
    getCoursesByUser,
    getCoursesByVisibility,
    loadUserQuestionIds,
    addQuestionToQuiz,
    loadQuizQuestionIds,
    removeQuestionFromQuiz,
    setQuizSetting,
    setQuestionSetting,
    loadQuizSettings,
    setCurrentEditQuizId,
    loadEditConceptQuizzes,
    loadViewConceptQuizzes,
    createNewQuiz,
    updateQuizTitle,
    getQuiz,
    getCourseById,
    getConceptById,
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
    addConceptCollaborator,
    addVideoCollaborator,
    removeCourseCollaborator,
    removeConceptCollaborator,
    removeVideoCollaborator,
    updateCourseField,
    loadEditCourseConcepts,
    loadViewCourseConcepts,
    showMainSpinner,
    hideMainSpinner
};
