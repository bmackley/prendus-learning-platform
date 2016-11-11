import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';
import {Quiz} from '../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';
import {UserMetaData} from '../node_modules/prendus-services/interfaces/user-meta-data.interface.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';

export interface State {
    editCourseConcepts: {
        [courseId: string]: CourseConceptData[]
    };
    editConceptVideos: {
        [conceptId: string]: Video[]
    };
    editConceptQuizzes: {
        [conceptId: string]: Quiz[]
    };
    viewCourseConcepts: {
        [courseId: string]: CourseConceptData[]
    };
    viewConceptVideos: {
        [conceptId: string]: Video[]
    };
    viewConceptQuizzes: {
        [conceptId: string]: Quiz[]
    };
    courses: Course[];
    userCourses: Course[];
    sharedCourses: Course[];
    starredCourses: Course[];
    publicCourses: Course[];
    currentConcept: {};
    concepts: {};
    courseViewCurrentCourse: Course;
    courseEditCurrentCourse: Course;
    currentConceptVideoId: string;
    currentConceptVideoTitle: string;
    currentConceptVideoUrl: string
    currentUser: {
      metaData: UserMetaData
    };
    currentEditQuizId: '';
    currentEditConceptId: '';
    jwt: string;
    courseCollaboratorEmails: {
        [uid: string]: {
            [courseId: string]: string[];
        };
    };
    conceptCollaboratorEmails: {
        [courseId: string]: {
            [conceptId: string]: string[];
        };
    };
    videoCollaboratorEmails: {
        [conceptId: string]: {
            [videoId: string]: string[];
        };
    };
    quizCollaboratorEmails: {
        [conceptId: string]: {
            [quizId: string]: string[];
        };
    };
    mainViewToShow: 'routes' | 'spinner';
}
