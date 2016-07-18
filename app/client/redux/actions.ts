import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {CourseModel} from '../models/course.model.ts';
import {ConceptModel} from '../models/concept.model.ts';
import {UserModel} from '../node_modules/prendus-services/models/user.model.ts';
import {VideoModel} from '../node_modules/prendus-services/models/video.model.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';

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
    execute: async (context, email, password) => {
        try {
          const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(email, password);
          let userData = await UserModel.getMetaDataById(loggedInUser.uid); //sets ancillary user data such as name, institution, etc.
          userData.uid = loggedInUser.uid;
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
  execute: async (context, uid, metaData) => {
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
  execute: async (context) => {
    try {
      const loggedInUser = await FirebaseService.getLoggedInUser();
      if(loggedInUser){
        let userData = await UserModel.getMetaDataById(loggedInUser.uid, 'metaData');
        userData.uid = loggedInUser.uid; //OK because its being created here.
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
  execute: async (context, courseId, newConcept, conceptsArray) => {
    try {
      console.log('actions courseId', courseId)
      const conceptId = await ConceptModel.save(null, newConcept);
      const courseUpdate = await CourseModel.createCourseConcept(courseId, conceptId)
      conceptsArray.conceptSuccess = newConcept;
      context.action = {
          type: Actions.addConcept.type,
          key: conceptId,
          pos: newConcept.pos,
          title: newConcept.title
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
      console.log('Actions get course by ID', course)
      const courseConcepts = await ConceptModel.getConceptsByCourse(course.concepts)
      console.log('courseConcepts', courseConcepts)
      context.action = {
          type: 'GET_COURSE_BY_ID',
          currentCourse: course,
          currentCourseConcepts: courseConcepts,
      }
    }catch(error){
      throw error;
    }
  }
};
const deleteConcept = {
  type: 'DELETE_CONCEPT',
  execute: async (context, key, conceptsArray) => {
      try {
        await ConceptModel.deleteConcept(key);
        //figure out how to do this.
        await ConceptModel.deleteCourseConcept(courseId, key);
        context.action = {
            type: Actions.deleteConcept.type,
            conceptKey: key,
        }
      }catch(error){
        throw error;
      }
  }
};
const orderConcepts = {
  type: 'ORDER_CONCEPTS',
  execute: async (context, conceptsArray) => {
      //thre use cases: Reorder concepts, delete a concept
      await ConceptModel.orderConcepts(conceptsArray);
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
    getCourseById,
};
