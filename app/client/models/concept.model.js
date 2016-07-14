"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const firebase_service_ts_1 = require('../node_modules/prendus-services/services/firebase.service.ts');
const conceptPath = 'concept/';
const save = (id, data) => __awaiter(this, void 0, void 0, function* () {
    if (id) {
        const path = conceptPath + id;
        yield firebase_service_ts_1.FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = conceptPath;
        const conceptId = yield firebase_service_ts_1.FirebaseService.push(path, data);
        return conceptId;
    }
});
const getById = (id) => __awaiter(this, void 0, void 0, function* () {
    const path = conceptPath + id;
    const concept = yield firebase_service_ts_1.FirebaseService.get(path);
    return concept;
});
const getConcepts = () => __awaiter(this, void 0, void 0, function* () {
    const path = conceptPath;
    const firebaseConcepts = yield firebase_service_ts_1.FirebaseService.get(path);
    for (let key in firebaseConcepts) {
        firebaseConcepts[key].key = key;
    }
    return firebaseConcepts;
});
const deleteConcept = (key) => __awaiter(this, void 0, void 0, function* () {
    const path = conceptPath + key;
    let conceptDelete = yield firebase_service_ts_1.FirebaseService.remove(path);
});
const orderConcepts = (conceptsArray) => __awaiter(this, void 0, void 0, function* () {
    for (let item in conceptsArray) {
        const path = conceptPath + '/' + conceptsArray[item].key;
        const data = conceptsArray[item];
        yield firebase_service_ts_1.FirebaseService.update(path, data);
    }
});
exports.ConceptModel = {
    save: save,
    getById: getById,
    getConcepts: getConcepts,
    deleteConcept: deleteConcept,
    orderConcepts: orderConcepts
};
