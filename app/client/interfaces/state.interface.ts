import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';
import {Quiz} from '../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';

export interface State {
    courseConcepts: {
        [courseId: string]: CourseConceptData[]
    };
    conceptVideos: {
        [conceptId: string]: Video[]
    };
    conceptQuizzes: {
        [conceptId: string]: Quiz[]
    };
    courses: Course[];
    currentConcept: {};
    concepts: {};
    currentCourse: Course;
    currentConceptVideoId: string;
    currentConceptVideoTitle: string;
    currentConceptVideoUrl: string
    currentUser: User;
    currentEditQuizId: '';
    currentEditConceptId: '';
    jwt: string;
    courseCollaboratorEmails: {
        [uid: string]: string[];
    };
    conceptCollaboratorEmails: {
        [courseId: string]: string[];
    };
    videoCollaboratorEmails: {
        [conceptId: string]: string[];
    };
    quizCollaboratorEmails: {
        [conceptId: string]: string[];
    };
}
