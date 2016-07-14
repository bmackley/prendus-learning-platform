import {FirebaseService} from '../node_modules/prendus-services/services/firebase.service.ts';
import {Concept} from '../node_modules/prendus-services/interfaces/concept.interface.ts';

const conceptPath = 'concept/';
const save = async (id: string, data: Concept): Promise<string> => {
    if (id) {
        const path = conceptPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = conceptPath;
        //figure out what happens when an error is returned
        const conceptId =  await FirebaseService.push(path, data);
        return conceptId;
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
const deleteConcept = async (key: string) => {
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

export const ConceptModel = {
    save,
    getById,
    getConcepts,
    deleteConcept,
    orderConcepts
}
