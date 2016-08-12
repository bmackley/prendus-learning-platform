import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {CourseModel} from '../node_modules/prendus-services/models/course.model.ts';
import {ConceptModel} from '../node_modules/prendus-services/models/concept.model.ts';
import {UserModel} from '../node_modules/prendus-services/models/user.model.ts';
import {VideoModel} from '../node_modules/prendus-services/models/video.model.ts';
import {QuizModel} from '../node_modules/prendus-services/models/quiz.model.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';

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
        conceptId,
        title: '',
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
        questions: {}
    });

    return quizId;
};

const loadConceptQuizzes = async (context: any, conceptId: string) => {
    const quizzes = await QuizModel.getAllByConcept(conceptId);

    context.action = {
        type: 'LOAD_CONCEPT_QUIZZES',
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
    const quizQuestionIds = await QuizModel.getAllQuestionIds(quizId);

    context.action = {
        type: 'LOAD_QUIZ_QUESTION_IDS',
        quizQuestionIds
    };
};

const addQuestionToQuiz = async (context: any, quizId: string, questionId: string) => {
    await QuizModel.addQuestion(quizId, questionId);
};

const removeQuestionFromQuiz = async (context: any, quizId: string, questionId: string) => {
    await QuizModel.removeQuestion(quizId, questionId);
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

const deleteVideo = async (context, id: string) => {
    try {
        await VideoModel.removeById(id);
    }
    catch(error) {
        throw error;
    }
};

const saveVideo = async (context, id: string, video: Video) => {
    try {
        const newId = await VideoModel.createOrUpdate(id, video);

        context.action = {
            type: 'SET_CURRENT_VIDEO_ID',
            id: newId
        };
    }
    catch(error) {
        throw error;
    }
};

const setCurrentVideoInfo = (context, id: string, title: string, url: string) => {
    context.action = {
        type: 'SET_CURRENT_VIDEO_INFO',
        id,
        title,
        url
    };
};

const clearCurrentVideoInfo = (context) => {
    context.action = {
        type: 'CLEAR_CURRENT_VIDEO_INFO'
    };
};

const loadConceptVideos = async (context, conceptId: string) => {
    try {
        const videos = await VideoModel.getAllByConcept(conceptId);

        context.action = {
            type: 'LOAD_CONCEPT_VIDEOS',
            videos,
            conceptId
        };
    }
    catch(error) {
        throw error;
    }
};

const createUser = {
  type: 'CREATE_USER',
  execute: async (context, data, password) => {
    try {
      const success = await FirebaseService.createUserWithEmailAndPassword(data.email, password);
      const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(data.email, password);
      await UserModel.updateMetaData(loggedInUser.uid, data);
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
          let userData = await UserModel.getById(loggedInUser.uid); //sets ancillary user data such as name, institution, etc.
          userData.metaData.uid = loggedInUser.uid;
          context.action = {
            type: Actions.loginUser.type,
            currentUser : userData,
          };
        }catch(error){
          throw error;
        }
    }
};
const updateUserEmail = {
  type: 'UPDATE_USER_PROFILE',
  execute: async (context, pastEmail, password, newEmail) => {
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
  execute: async (context, uid: string, metaData) => {
    await UserModel.updateMetaData(uid, metaData);
    try{
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
        let userData = await UserModel.getById(loggedInUser.uid);
        userData.metaData.uid = loggedInUser.uid; //OK because its being created here.
        context.action = {
          type: Actions.checkUserAuth.type,
          currentUser: userData,
        };
      }
    }catch(error){
      throw error;
    }
  }
};
const setConcepts = {
    type: 'SET_CONCEPTS',
    execute: async (context, newConcept) => {
      try {
        const conceptSuccess = await ConceptModel.save(null, newConcept);
        context.action = newConcept;
      }catch(error){
        throw error;
      }
    }
};
const addConcept = {
  type: 'ADD_CONCEPT',
  execute: async (context, courseId, newConcept, conceptPos: number) => {
    try {
      const conceptId = await ConceptModel.save(null, newConcept);
      const courseUpdate = await CourseModel.createCourseConcept(courseId, conceptId, conceptPos)
      const course = await CourseModel.getById(courseId);
      context.action = {
          type: 'ADD_CONCEPT',  //same as get course by id
          currentCourse: course,
      }
    }catch(error){
      throw error;
    }
  }
};
const getConcepts = {
  type: 'GET_CONCEPTS',
  execute: async (context) => {
    // try {
    //   const modelConcepts = await ConceptModel.getConcepts();
    //   context.action = {
    //       type: Actions.getConcepts.type,
    //       concepts: modelConcepts,
    //   }
    // }catch(error){
    //   throw error;
    // }
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
        let savedCourse = Object.assign({}, newCourse);
        savedCourse.courseId = courseId;
        context.action = {
            type: Actions.addCourse.type,
            newCourse: savedCourse,
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
            courses: courses,
        }
      }
    }catch(error){
      throw error;
    }
  }
};
const getCourseById = {
  execute: async (context: any, id: string) => {
    try {
      const course = await CourseModel.getById(id);
      const conceptsArray = await CourseModel.courseConceptsToArray(course);
      const orderedCourse = CourseModel.orderCourseConcepts(course, conceptsArray);
      console.log('course', course)
      console.log('ordered Course', orderedCourse)
      context.action = {
          type: 'GET_COURSE_BY_ID',
          currentCourse: orderedCourse,
          //currentCourseConcepts: courseConcepts,
      }
    }catch(error){
      throw error;
    }
  }
};
const deleteConcept = {
  type: 'DELETE_CONCEPT',
  execute: async (context: any, id: string, conceptId: string) => {
      try {
        //await ConceptModel.deleteConcept(key);
        //figure out how to do this.
        console.log('in the delete concept')
        console.log('course id', id)
        console.log('concept id', conceptId)
        await CourseModel.deleteCourseConcept(id, conceptId);
        const course = await CourseModel.getById(id);
        console.log('this is the course', course)
        context.action = {
            type: 'GET_COURSE_BY_ID',
            currentCourse: course,
            //currentCourseConcepts: courseConcepts,
        }
      }catch(error){
        throw error;
      }
  }
};
const orderConcepts = {
  type: 'ORDER_CONCEPTS',
  execute: async (context: any, id: string, courseConceptsArray) => {
    try{
      console.log('Order Concepts')
      await CourseModel.updateCourseConcepts(id, courseConceptsArray);
    }catch(error){
      throw error;
    }
  }
};
const logOutUser = {
  type: 'LOGOUT_USER',
  execute: async (context) => {
    //Need to come up with a list of things to clear with the logout. Maybe have a clear everything function?
    await FirebaseService.logOutUser();
    context.action = {
      type: Actions.logOutUser.type,
      user: '',
    }
  }
};

export const Actions = {
    loginUser,
    checkUserAuth,
    setConcepts,
    getConcepts,
    deleteConcept,
    orderConcepts,
    addConcept,
    createUser,
    logOutUser,
    updateUserEmail,
    updateUserMetaData,
    loadConceptVideos,
    setCurrentVideoInfo,
    saveVideo,
    clearCurrentVideoInfo,
    deleteVideo,
    addCourse,
    getCoursesByUser,
    loadUserQuestionIds,
    addQuestionToQuiz,
    loadQuizQuestionIds,
    removeQuestionFromQuiz,
    setQuizSetting,
    setQuestionSetting,
    loadQuizSettings,
    setCurrentEditQuizId,
    loadConceptQuizzes,
    createNewQuiz,
    updateQuizTitle,
    getQuiz,
    getCourseById,
    getConceptById,
    loadPublicQuestionIds
};
