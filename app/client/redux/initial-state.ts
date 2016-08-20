import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';
import {State} from '../interfaces/state.interface.ts';

export const InitialState: State = {
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
    currentUser: {
        authorizedQuestions: {},
        authorizedQuizzes: {},
        metaData: {
            email: '',
            firstName: '',
            lastName: '',
            institution: ''
        },
        starredCourses: {},
        sharedWithMeCourses: {},
        sharedWithMeConcepts: {},
        sharedWithMeVideos: {},
        sharedWithMeQuizzes: {}
    },
    userQuestionIds: [],
    publicQuestionIds: [],
    quizQuestionIds: [],
    quizSettings: {},
    currentEditQuizId: '',
    conceptQuizzes: {},
    currentEditConceptId: '',
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    conceptCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
