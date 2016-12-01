import {QuestionSettings} from '../node_modules/prendus-services/interfaces/question-settings.interface';
import {State} from '../interfaces/state.interface';

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
            institution: '',
            uid: ''
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
    quizQuestionSettings: {},
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
