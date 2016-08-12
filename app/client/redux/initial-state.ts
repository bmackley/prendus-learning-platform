import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';
import {State} from '../interfaces/state.interface.ts';

export const InitialState: State = {
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
    publicQuestionIds: [],
    quizQuestionIds: [],
    quizSettings: QuestionSettings,
    currentEditQuizId: '',
    conceptQuizzes: {},
    currentEditConceptId: ''
};
