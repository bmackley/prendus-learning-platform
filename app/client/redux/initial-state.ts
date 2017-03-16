import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {State} from '../typings/state';

export const InitialState: State = {
    mainViewToShow: 'routes',
    lessons: {
    },
    currentLesson: {
    },
    courses: [],
    courseViewCurrentCourse: {},
    editCourseLessons: {},
    viewCourseLessons: {},
    editLessonVideos: {},
    viewLessonVideos: {},
    currentLessonVideoId: '',
    currentLessonVideoTitle: '',
    currentLessonVideoUrl: '',
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
        sharedWithMeLessons: {},
        sharedWithMeVideos: {},
        sharedWithMeQuizzes: {}
    },
    userQuestionIds: [],
    publicQuestionIds: [],
    quizQuestionIds: [],
    quizQuestionSettings: {},
    currentEditQuizId: '',
    editLessonQuizzes: {},
    viewLessonQuizzes: {},
    currentEditLessonId: '',
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    lessonCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
