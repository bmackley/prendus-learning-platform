import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface.ts';
import {State} from '../interfaces/state.interface.ts';

export const InitialState: State = {
    mainViewToShow: 'routes',
    concepts: {
    },
    currentConcept: {
    },
    courses: [],
    courseEditCurrentCourse: {},
    courseViewCurrentCourse: {},
    editCourseConcepts: {},
    viewCourseConcepts: {},
    editConceptVideos: {},
    viewConceptVideos: {},
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
    editConceptQuizzes: {},
    viewConceptQuizzes: {},
    currentEditConceptId: '',
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    conceptCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
