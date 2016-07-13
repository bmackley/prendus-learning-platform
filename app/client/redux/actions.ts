import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {CourseModel} from '../models/course.model.ts';
import {ConceptModel} from '../models/concept.model.ts';
import {UserModel} from '../node_modules/prendus-services/models/user.model.ts';
import {VideoModel} from '../node_modules/prendus-services/models/video.model.ts';

const saveVideo = async (context, id: string, video: Video) => {
    const newId = await VideoModel.createOrUpdate(id, video);

    context.action = {
        type: 'SET_CURRENT_VIDEO_ID',
        id: newId
    };
};

const setCurrentVideoInfo = (context, id: string, title: string, url: string) => {
    context.action = {
        type: 'SET_CURRENT_VIDEO_INFO',
        id,
        title,
        url
    };
};

const loadConceptVideos = async (context, conceptId: string) => {
    const videos = await VideoModel.getAllByConcept(conceptId);

    context.action = {
        type: 'LOAD_CONCEPT_VIDEOS',
        videos: videos
    };
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
          console.log('in the action throwing the error')
          throw error;
        }
    }
};
const updateUserEmail = {
  type: 'UPDATE_USER_PROFILE',
  execute: async (context, pastEmail, password, newEmail) => {
    try{
      console.log('actions password', password)
      const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(pastEmail, password);
      console.log('loggedInUser', loggedInUser)
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
        console.log('userData', userData)
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
    execute: async (context, newConcept, conceptsArray) => {
        try {
          const conceptSuccess = await ConceptModel.save(null, newConcept);
          conceptsArray.conceptSuccess = newConcept;
          context.action = {
              type: Actions.addConcept.type,
              key: conceptSuccess,
              pos: newConcept.pos,
              title: newConcept.title
          }
        }catch(error){
          console.log('add concept error ', error)
          throw error;
        }
    }
};
const getConcepts = {
    type: 'GET_CONCEPTS',
    execute: async (context) => {
        try {
          const modelConcepts = await ConceptModel.getConcepts();
          console.log(modelConcepts)
          context.action = {
              type: Actions.getConcepts.type,
              concepts: modelConcepts,
          }
        }catch(error){
          console.log('get concepts error ', error)
          throw error;
        }
    }
};
const getCourse = {
    type: 'GET_COURSE',
    execute: async (context) => {
        try {
          const modelCourse = await ConceptModel.getCourse();
          console.log('model course', modelCourse)
          context.action = {
              type: Actions.getCourse.type,
              course: modelCourse,
          }
        }catch(error){
          console.log('get Course error ', error)
          throw error;
        }
    }
};
const setURL = {
    type: 'SET_URL',
    execute: async (context, URL) => {
      context.action = {
        type: Actions.getCourse.type,
        URL: URL,
      }
    }
};
const deleteConcept = {
    type: 'DELETE_CONCEPT',
    execute: async (context, key, conceptsArray) => {
        try {
          await ConceptModel.deleteConcept(key);
          context.action = {
              type: Actions.deleteConcept.type,
              conceptKey: key,
          }
        }catch(error){
          context.action = {
            type: Actions.displayError.type,
            error: error,
          };
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
      console.log('logging the user out')
      await FirebaseService.logOutUser();
      console.log('user has been logged out actions')
      context.action = {
        type: Actions.logOutUser.type,
        user: '',
      }
    }
};
const displayError = {
    type: 'DISPLAY_ERROR',
};

export const Actions = {
    loginUser,
    checkUserAuth,
    setConcepts,
    getConcepts,
    deleteConcept,
    orderConcepts,
    addConcept,
    displayError,
    createUser,
    logOutUser,
    updateUserEmail,
    updateUserMetaData,
    loadConceptVideos,
    setCurrentVideoInfo,
    saveVideo
};
