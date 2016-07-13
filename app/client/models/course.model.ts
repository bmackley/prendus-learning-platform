import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';

const conceptPath = 'concept';
const dataPath = 'course'
const createOrUpdate = async (id: string, data: Course): Promise<string> => {
    if (id) {
        const path: string = `${dataPath}/${id}`;
        await FirebaseService.update(path, data);
        return id;
    }
    else {
        const path = dataPath;
        return await FirebaseService.push(path, data);
    }
};
const getById = async (id) => {
    const path = conceptPath + id;
    const concept = await FirebaseService.get(path);
    return concept;
};
const getConcepts = async () => {
    const path = conceptPath;
    const firebaseConcepts = await FirebaseService.get(path);
    //order the concepts based on their position
    for (let key in firebaseConcepts){
      firebaseConcepts[key].key = key;
    }
    return firebaseConcepts;
};
const getCourse = async () => {
    const path = coursePath;
    const firebaseCourse = await FirebaseService.get(path);
    return firebaseCourse;
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
    getConcepts,
    deleteConcept,
    orderConcepts
}
