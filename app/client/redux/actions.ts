import {FirebaseService} from '../node_modules/prendus-services/firebase.service.ts'
import {CourseModel} from '../models/course.model.ts'
import {ConceptModel} from '../models/concept.model.ts'
import {UserModel} from '../models/user.model.ts'

const createUser = {
  type: 'CREATE_USER',
  execute: async (context, data) => {
    try {
      const success = await FirebaseService.createUserWithEmailAndPassword(data.email, data.password);
      const loggedInUser = await FirebaseService.logInUserWithEmailAndPassword(data.email, data.password);
      const userSuccess = await UserModel.saveMetaData(data);
      userSuccess.email = loggedInUser.email
      context.action = {
        type: Actions.createUser.type,
        currentUser: userSuccess,
      };
    }catch(error){
      throw error;
    }
  }
};
const loginUser = {
    type: 'SET_CURRENT_USER',
    execute: async (context, email, password) => {
        try {
          const success = await FirebaseService.logInUserWithEmailAndPassword(email, password);
          const userData = await UserModel.getById(success.uid); //sets ancillary user data such as name, institution, etc.
          console.log('actions userData', userData)
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
const updateUser = {
  type: 'UPDATE_USER',
  execute: async (context, userData) => {
    console.log('Actions update user', userData)
    const userSuccess = await UserModel.saveMetaData(userData);
    try{
      context.action = {
        type: Actions.updateUser.type,
        user: userSuccess,
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
      console.log('Check User Auth Actions')
      const success = await FirebaseService.getLoggedInUser();
      console.log('success', success.uid)
      const userData = await UserModel.getById(success.uid);
      console.log('userData', userData)
      context.action = {
        type: Actions.checkUserAuth.type,
        email: success.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        institution: userData.institution,
      };
    }catch(error){
      context.action = {
        type: Actions.displayError.type,
        error: error,
      };
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
          context.action = {
            type: Actions.displayError.type,
            error: error,
          };
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
          context.action = {
            type: Actions.displayError.type,
            error: error,
          };
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
          context.action = {
            type: Actions.displayError.type,
            error: error,
          };
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
    updateUser,
    setURL,
};
