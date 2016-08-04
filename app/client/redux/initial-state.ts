import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';

export const InitialState = {
    currentUser: {
      uid: '',
      firstName: '',
      lastName: '',
      institution: '',
      email: '',
      permissions: '',
    },
    concepts: {
    },
    currentConcept: {
    },
    courses: [],
    currentCourse: {},
    courseConcepts: [],
    conceptVideos: {},
    currentConceptVideoId: '',
    currentConceptVideoTitle: '',
    currentConceptVideoUrl: '',
    userQuestionIds: [],
    quizQuestionIds: [],
    currentEditQuestionId: '',
    quizSettings: QuestionSettings,
    currentEditQuizId: '',
    conceptQuizzes: {},
    currentEditConceptId: ''
};
