import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';

const conceptPath = 'concept/';
const coursePath = 'course/'
const save = async (id: any, data: {}) => {
    if (id) {
        const path = conceptPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = conceptPath;
        //figure out what happens when an error is returned
        const newConcept =  await FirebaseService.push(path, data);
        return newConcept;
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
    save,
    getById,
    getConcepts,
    deleteConcept,
    orderConcepts
}
