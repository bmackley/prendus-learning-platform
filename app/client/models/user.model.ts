import {FirebaseService} from '../node_modules/prendus-services/firebase.service.ts'

const userPath = 'users/';
const save = async (data) => {
    let userEmail = '';
    let userFirstName = '';
    let userData = {
      firstName: data.firstName,
      lastName: data.lastName,
    }
    if(data.email){
      console.log('there is an email change')
      userEmail = data.email;
      userData.email = data.email
    }
    if(data.firstName){
      console.log('there is a firstName change')
      userFirstName = data.firstName;
    }
    const loggedInUser = await FirebaseService.getLoggedInUser();
    console.log('Modle UID', loggedInUser.uid)
    const uid = await FirebaseService.updateUserProfile(loggedInUser, userFirstName, userEmail)

    const newPath = userPath + loggedInUser.uid;
    console.log('users path', newPath)
    FirebaseService.set(newPath, data)
};

const getById = async (id) => {
    const path = userPath + id;
    const concept = await FirebaseService.get(path);
    return concept;
};
const getUsers = async () => {
    const path = userPath;
};

export const UserModel = {
    save,
    getById,
    getUsers,
}
