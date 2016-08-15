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
    try{
      console.log('in the deleteCourseConcept')
      const path =  `${dataPath}/${id}/concepts/${conceptId}/`;
      return await FirebaseService.remove(path);
    }catch(error){
      throw error;
    }
};
const getById = async (id:string) => {
    const path = `${dataPath}/${id}`;
    const course = await FirebaseService.get(path);
    course.id = id;
    return course;
};
const getCoursesByUser = async (uid: string) => {
    const path = dataPath;
    const firebaseCourses = await FirebaseService.getAllBy(path, 'uid', uid);
    const firebaseCoursesArray = Object.keys(firebaseCourses || {}).map(key => {
      return Object.assign({}, firebaseCourses[key], {
          id: key,
      });
    });
    return firebaseCoursesArray;
};
const courseConceptsToArray = (course: Course) => {
  let courseConceptsArray = Object.keys(course.concepts || {}).map(key => {
    return Object.assign({}, course.concepts[key], {
        key: key,
    });
  });
  console.log('courseConcepts Array', courseConceptsArray)
  return courseConceptsArray;
}
const orderCourseConcepts = (course: Course, courseConcepts: Concept) => {
  function compare(a: any,b: any) {
    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  }
  courseConcepts.sort(compare);
  course.concepts = courseConcepts;
  return course;
}
const updateCourseConcepts = async (id:string, conceptArray: Concept) => {
  console.log(conceptArray);
  try{
    for(let key in conceptArray){
      const path =  `${dataPath}/${id}/concepts/${conceptArray[key].key}`;
      await FirebaseService.update(path, conceptArray[key]);
    }
    return;
  }catch(error){
    throw error;
  }

}
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
    deleteCourseConcept,
    orderCourseConcepts,
    updateCourseConcepts,
    courseConceptsToArray
}
