import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {State} from '../typings/state';

export const InitialState: State = {
    mainViewToShow: 'routes',
    lessons: {
    },
    currentLesson: {
    },
    courses: [],
    editCourseLessons: {},
    viewCourseLessons: {},
    editLessonVideos: {},
    viewLessonVideos: {},
    currentLessonVideoId: '',
    currentLessonVideoTitle: '',
    currentLessonVideoUrl: '',
    concepts: [],
    courseViewCurrentCourse: {
			id: '',
			uid: '',
			title: '',
			dueDate: 0,
			concepts: {},
			tags: {},
			collaborators: {},
			userStars: {},
			description: '',
			visibility: 'public'
		},
		courseTagNames: [],
    viewCourseConcepts: {},
    editConceptVideos: {},
    viewConceptVideos: {},
    currentUser: {
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
		currentVideo: {
			id: '',
			title: '',
			url: '',
			uid: '',
			collaborators: {}
		},
    userQuestionIds: [],
    publicQuestionIds: [],
    quizQuestionIds: [],
    quizQuestionSettings: {},
    currentEditQuizId: '',
    editLessonQuizzes: {},
    viewLessonQuizzes: {},
    currentEditLessonId: '',
    editConceptQuizzes: {},
    viewConceptQuizzes: {},
    currentEditConceptId: '',
		userCourses: [],
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    lessonCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
