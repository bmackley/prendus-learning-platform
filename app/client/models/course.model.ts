import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';
import {CourseVisibility} from '../interfaces/course-visibility.type.ts';

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
const createCourseConcept = async (id: string, conceptId: string, pos: number): Promise<string> => {
  const path = `${dataPath}/${id}/concepts/`;
  const conceptData = {
    id: conceptId,
    position: pos,
  }
  await FirebaseService.push(path, conceptData);
  return id;
};
const deleteCourseConcept = async (id: string, conceptId: string) => {
    const path =  `${dataPath}/${id}/concepts/`;
    let conceptDelete = await FirebaseService.remove(conceptId);
};
const getById = async (id:string) => {
    const path = `${dataPath}/${id}`;
    const course = await FirebaseService.get(path);
    course.id = id;
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
const orderCourseConcepts = async (id: string, conceptsArray) => {
  try{
    console.log('concepts array', conceptsArray)
    const path = `${dataPath}/${id}/concepts`;
    await FirebaseService.update(path, conceptsArray)
    // for(let item in conceptsArray){
    //   const path = `${dataPath}/${conceptsArray[item].key}`;
    //   const data = conceptsArray[item];
    //   await FirebaseService.update(path, data)
    // }
  }catch(error){
    throw error;
  }
};
const deleteCourse = async (key: string) => {
    const path =  `${dataPath}/${key}`;
    let conceptDelete = await FirebaseService.remove(path);
};

const getAllByVisibility = async (visibility: CourseVisibility) => {
    const path = `${dataPath}`;

    const coursesObject = await FirebaseService.getAllBy(path, 'visibility', visibility);
    const coursesArray = Object.keys(coursesObject || {}).map((key) => {
        return Object.assign({}, coursesObject[key], {
            courseId: key
        });
    });

    return coursesArray;
};

export const CourseModel = {
    createOrUpdate,
    getById,
    getCoursesByUser,
    deleteCourse,
    createCourseConcept,
    deleteCourseConcept,
    orderCourseConcepts,
    getAllByVisibility
}
