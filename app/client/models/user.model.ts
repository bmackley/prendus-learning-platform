import {FirebaseService} from '../node_modules/prendus-services/firebase.service.ts'

const userPath = 'users/';
const save = async (id: string, data: any) => {
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
const saveMetaData = async (data: {}) => {
    const loggedInUser = await FirebaseService.getLoggedInUser(); //Not sure if we should do this here, or somewhere else
    //Save
    // if(data.email){
    //   const uid = await FirebaseService.updateUserProfile(loggedInUser, userEmail)
    //   console.log(uid);
    // }
    //Get logged in user here, or do it

    const newPath = `${userPath}${loggedInUser.uid}/metaData`;
    console.log('users path', newPath)
    FirebaseService.set(newPath, data)
};

const getById = async (id) => {
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
