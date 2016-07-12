import {FirebaseService} from '../node_modules/prendus-services/firebase.service.ts'
import {UserMetaData} from '../node_modules/prendus-services/interfaces/user-meta-data.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';


const dataPath = 'users/';
const save = async (userPath: string, data: User) => {
  try{
    if (userPath) {
      const path = dataPath + userPath;
      await FirebaseService.update(path, data);
      return data;
    }
    else {
      const path = dataPath;
      const newUser =  await FirebaseService.push(path, data);
      return newUser;
    }
  }catch(error){
    throw error;
  }
};
const saveFirebaseUser = async (loggedInUser: any, email: string) => {
  try{
    await FirebaseService.updateUserProfile(loggedInUser, email)
  }catch(error){
    throw error;
  }
};
const saveMetaData = async (userID: string, data: UserMetaData) => {
  try{
    const newPath = `${dataPath}${userID}/metaData`;
    FirebaseService.update(newPath, data)
    return data;
  }catch(error){
    throw error;
  }
};

const getById = async (id: string, path: string) => {
  try{
    const newPath = `${dataPath}${id}/${path}`
    const userData = await FirebaseService.get(newPath);
    return userData;
  }catch(error){
    throw error;
  }
};

export const UserModel = {
    save,
    saveFirebaseUser,
    saveMetaData,
    getById,
}
