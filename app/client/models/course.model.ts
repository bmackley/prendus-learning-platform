import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';

const conceptsPath = 'concepts';
const dataPath = 'courses'
const createOrUpdate = async (id: string, data: Course): Promise<string> => {
    if (id) {
      const path = `${dataPath}/${id}`;
      await FirebaseService.update(path, data);
      return id;
    }
    else {
      const path = dataPath;
      console.log('dataPath', dataPath)
      return await FirebaseService.push(path, data);
    }
};
const createCourseConcept = async (id: string, conceptId: string): Promise<string> => {
  const path = `${dataPath}/${id}/concepts/`;
  await FirebaseService.push(path, conceptId);
  return id;
};
const deleteCourseConcept = async (id: string, conceptId: string) => {
    const path =  `${dataPath}/${id}/concepts/`;
    let conceptDelete = await FirebaseService.remove(conceptId);
};
const getById = async (id) => {
    const path = `${dataPath}/${id}`;
    const course = await FirebaseService.get(path);
    course.id = id;
    console.log('course model course', course)
    return course;
};
const getCoursesByUser = async (uid: string) => {
    const path = dataPath;
    const firebaseCourses = await FirebaseService.getAllBy(path, 'creator', uid);
    const firebaseCoursesArray = Object.keys(firebaseCourses || {}).map(key => {
      return Object.assign({}, firebaseCourses[key], {
          id: key,
      });
    });
    return firebaseCoursesArray;
};
const deleteCourse = async (key: string) => {
    const path =  `${dataPath}/${key}`;
    let conceptDelete = await FirebaseService.remove(path);
};

export const CourseModel = {
    createOrUpdate,
    getById,
    getCoursesByUser,
    deleteCourse,
    createCourseConcept,
    deleteCourseConcept
}
