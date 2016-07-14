import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';

const conceptPath = 'concepts';
const dataPath = 'courses'
const createOrUpdate = async (id: string, data: Course): Promise<string> => {
    if (id) {
      console.log('hello id')
      const path = `${dataPath}/${id}`;
      await FirebaseService.update(path, data);
      return id;
    }
    else {
      console.log('hello new')
      const path = dataPath;
      console.log('dataPath', dataPath)
      return await FirebaseService.push(path, data);
    }
};
const getById = async (id) => {
    const path = conceptPath + id;
    const concept = await FirebaseService.get(path);
    return concept;
};
const getCoursesByUser = async (uid: string) => {
  //Maybe in the future look into loggin the courses into the user object. For now, not going to worry about it.
  // const userCoursesPath = `users/${id}/courses`
  // const firebaseUserCourses = FirebaseService.get(userCoursesPath);
  // console.log('firebase user courses', firebaseUserCourses);
    const path = dataPath;
    const firebaseCourses = await FirebaseService.getAllBy(path, 'creator', uid);
    const firebaseCoursesArray = Object.keys(firebaseCourses || {}).map(key => firebaseCourses[key])
    return firebaseCoursesArray;
};
const deleteConcept = async (key) => {
    const path = conceptPath + key;
    let conceptDelete = await FirebaseService.remove(path);
};
const orderConcepts = async (conceptsArray) => {
    for(let item in conceptsArray){
      const path = conceptPath + '/' + conceptsArray[item].key;
      const data = conceptsArray[item];
      await FirebaseService.update(path, data)
    }
};

export const CourseModel = {
    createOrUpdate,
    getById,
    getCoursesByUser,
    deleteConcept,
    orderConcepts
}
