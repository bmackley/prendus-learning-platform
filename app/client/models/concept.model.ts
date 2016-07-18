import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';

const dataPath = 'concepts';
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
const getConceptsByCourse = async (courseConcepts: Concept) => {
  //loop through all the concepts in the courseConceptList
  try{
    let courseConceptsList = [];
    for(let key in courseConcepts){
      console.log('concept key', key)
      const firebaseConcept = await getById(key);
      console.log(firebaseConcept);
      courseConceptsList.push(firebaseConcept)
    }
    console.log('course concpets list', courseConceptsList)
    return courseConceptsList;
  }catch(error){
    throw error;
  }
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
const conceptsObjectToArray = (conceptsObject: Concept) => {
  console.log('conceptsObject', conceptsObject)
  console.log('conceptsObject Keys', Object.keys(conceptsObject))
  var conceptsArray = Object.keys(conceptsObject).map(function (key) {return conceptsObject[key]});
  // const conceptsArray2 = Object.keys(conceptsObject || {}).map((key) => {
  //   return Object.assign({}, conceptsObject[key], {
  //     id: key
  //   });
  // });
  return conceptsArray;
}

export const ConceptModel = {
    save,
    getById,
    getConceptsByCourse,
    deleteConcept,
    orderConcepts,
    conceptsObjectToArray,
}
