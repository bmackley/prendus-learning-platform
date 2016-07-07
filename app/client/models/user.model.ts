import {FirebaseService} from '../node_modules/prendus-services/firebase.service.ts'

const userPath = 'users/';
const save = async (id: string, data: any): Promise<void> => {
    if (id) {
        const path = userPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = userPath;
        //figure out what happens when an error is returned
        const newConcept =  await FirebaseService.push(path, data);
        return newConcept;
    }
};
const saveMetaData = async (data: {}): Promise<void> => {
  const loggedInUser = await FirebaseService.getLoggedInUser(); //Not sure if we should do this here, or somewhere else
  //Save
  if(data.runEmail){
    console.log('in the users model running the email')
    try{
      const msg = await FirebaseService.updateUserProfile(loggedInUser, data.email)
    }catch(error){
      console.log('in the user model throwing the error')
      throw error;
    }
  }
  if(data.password){
    delete data.password;
  }
  const newPath = `${userPath}${loggedInUser.uid}/metaData`;
  console.log('users path', newPath)
  try{
    FirebaseService.set(newPath, data)
    return data;
  }catch(error){
    throw error;
  }
};

const getById = async (id) : Promise<void> => {
    const path = `${userPath}${id}/metaData`
    console.log('getbyidusersath', path)
    const userData = await FirebaseService.get(path);
    return userData;
};
const getUsers = async () => {
    const path = userPath;
};

export const UserModel = {
    save,
    getById,
    getUsers,
    saveMetaData,
}
