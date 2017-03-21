import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {Subject} from '../node_modules/prendus-services/typings/subject';
import {Concept} from '../node_modules/prendus-services/typings/concept';

export interface State {
    editCourseLessons: {
        [courseId: string]: CourseLessonData[]
    };
    editLessonVideos: {
        [lessonId: string]: Video[]
    };
    editLessonQuizzes: {
        [lessonId: string]: Quiz[]
    };
    viewCourseLessons: {
        [courseId: string]: CourseLessonData[]
    };
    viewLessonVideos: {
        [lessonId: string]: Video[]
    };
    viewLessonQuizzes: {
        [lessonId: string]: Quiz[]
    };
    courses: Course[];
    userCourses: Course[];
    sharedCourses: Course[];
    starredCourses: Course[];
    publicCourses: Course[];
    currentLesson: Lesson;
    lessons: {};
    courseTagNames: string[];
    courseViewCurrentCourse: Course;
    currentLessonVideoId: string;
    currentLessonVideoTitle: string;
    currentLessonVideoUrl: string
    currentUser: {
      metaData: UserMetaData
    };
    currentEditQuizId: string;
    currentEditLessonId: string;
    jwt: string;
    courseCollaboratorEmails: {
        [uid: string]: {
            [courseId: string]: string[];
        };
    };
    lessonCollaboratorEmails: {
        [courseId: string]: {
            [lessonId: string]: string[];
        };
    };
    videoCollaboratorEmails: {
        [lessonId: string]: {
            [videoId: string]: string[];
        };
    };
    quizCollaboratorEmails: {
        [lessonId: string]: {
            [quizId: string]: string[];
        };
    };
		userQuestionIds: [string];
		publicQuestionIds: [string];
		quizQuestionIds: [string];
		quizQuestionSettings: QuestionSettings;
    mainViewToShow: 'routes' | 'spinner';
    resultingLessons: Lesson[];
    resultingCourses: Course[];
    currentCourse: Course;
    disciplines: Discipline[];
    chosenDiscipline: Discipline;
    chosenSubject: Subject;
    chosenConcept: Concept;
    subjects: Subject[];
    concepts: Concept[];
}
