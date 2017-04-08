import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {State} from '../typings/state';

export const InitialState: State = {
    mainViewToShow: 'routes',
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/develop
    currentUser: {
        metaData: {
            email: '',
            firstName: '',
            lastName: '',
            institution: '',
            uid: ''
<<<<<<< HEAD
        },
        starredCourses: {},
        sharedWithMeCourses: {},
        sharedWithMeLessons: {},
        sharedWithMeVideos: {},
        sharedWithMeQuizzes: {}
=======
        }
>>>>>>> origin/develop
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
<<<<<<< HEAD
    editLessonQuizzes: {},
    viewLessonQuizzes: {},
    currentEditLessonId: '',
=======
    editConceptQuizzes: {},
    viewConceptQuizzes: {},
    currentEditConceptId: '',
		userCourses: [],
>>>>>>> origin/develop
    publicCourses: [],
    starredCourses: [],
    sharedCourses: [],
    courseCollaboratorEmails: {},
    lessonCollaboratorEmails: {},
    videoCollaboratorEmails: {},
    quizCollaboratorEmails: {}
};
