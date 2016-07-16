import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';

const dataPath = 'concept';
const save = async (id: string, data: Concept): Promise<string> => {
    if (id) {
        const path = `${dataPath}/${id}`;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = dataPath;
        //figure out what happens when an error is returned
        const conceptId =  await FirebaseService.push(path, data);
        return conceptId;
    }
};
const getById = async (id) => {
    const path = `${dataPath}/${id}`
    const concept = await FirebaseService.get(path);
    return concept;
};
const getConceptsByCourse = async (courseConceptList) => {
  //loop through all the concepts in the courseConceptList
  let courseConcepts = [];
  for(key in courseConceptList){
    const path = `${dataPath}/${key}`
    const firebaseConcepts = await FirebaseService.get(path);
    //order the concepts based on their position
    for (let key in firebaseConcepts){
      courseConcepts[key] = firebaseConcepts[key]
      courseConcepts[key].key = key;
    }
  }
  return courseConcepts;
};
const deleteConcept = async (key: string) => {
    const path = `${dataPath}/${key}`;
    let conceptDelete = await FirebaseService.remove(path);
};
const orderConcepts = async (conceptsArray) => {
    for(let item in conceptsArray){
      const path = `${dataPath}/${conceptsArray[item].key}`;
      const data = conceptsArray[item];
      await FirebaseService.update(path, data)
    }
};

export const ConceptModel = {
    save,
    getById,
    getConceptsByCourse,
    deleteConcept,
    orderConcepts
}
