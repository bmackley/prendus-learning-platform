import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {State} from '../typings/state';

export const InitialState: State = {
    mainViewToShow: 'routes',
    concepts: [],
    courses: [],
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
        }
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
    editConceptQuizzes: {},
    viewConceptQuizzes: {},
    currentEditConceptId: '',
		userCourses: [],
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    conceptCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
