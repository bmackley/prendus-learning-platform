import {Notification} from '../node_modules/prendus-services/typings/notification';
import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {QuestionMetaData} from '../node_modules/prendus-services/typings/question-meta-data';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {Subject} from '../node_modules/prendus-services/typings/subject';
import {LTIState} from '../node_modules/prendus-services/typings/lti-state';
import {QuestionScaffold} from '../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../node_modules/prendus-services/typings/question-scaffold-answer';
import {Assignment} from '../node_modules/prendus-services/typings/assignment';

export interface State {
	readonly notificationType: Notification;
	readonly notificationText: string;
  readonly editCourseLessons: {
    [courseId: string]: CourseLessonData[];
  };
  readonly editLessonVideos: {
    [lessonId: string]: Video[];
  };
  readonly editLessonQuizzes: {
    [lessonId: string]: Quiz[];
  };
  readonly viewCourseLessons: {
    [courseId: string]: CourseLessonData[];
  };
  readonly viewLessonVideos: {
    [lessonId: string]: Video[];
  };
  readonly viewLessonQuizzes: {
    [lessonId: string]: Quiz[];
  };
  readonly courses: Course[];
  readonly userCourses: Course[];
  readonly sharedCourses: Course[];
  readonly starredCourses: Course[];
  readonly publicCourses: Course[];
  readonly currentLesson: Lesson;
  readonly lessons: Lesson[];
  readonly courseTagNames: string[];
  readonly courseViewCurrentCourse: Course;
  readonly currentLessonVideoId: string;
  readonly currentLessonVideoTitle: string;
  readonly currentLessonVideoUrl: string;
  readonly currentUser: User;
	readonly unverifiedTeachers: User[];
	readonly verifiedTeachers: User[];
	readonly currentVideo: Video;
  readonly currentEditQuizId: string;
  readonly currentEditLessonId: string;
  readonly jwt: string;
  readonly courseCollaboratorEmails: {
    [uid: string]: {
      [courseId: string]: string[];
    };
  };
  readonly lessonCollaboratorEmails: {
    [courseId: string]: {
      [lessonId: string]: string[];
    };
  };
  readonly videoCollaboratorEmails: {
    [lessonId: string]: {
      [videoId: string]: string[];
    };
  };
  readonly quizCollaboratorEmails: {
    [lessonId: string]: {
      [quizId: string]: string[];
    };
  };
	readonly userQuestionIds: [string];
	readonly publicQuestionIds: [string];
	readonly quizQuestionIds: [string];
	readonly quizQuestionsData: QuestionMetaData[];
	readonly quizQuestionSettings: QuestionSettings;
  readonly mainViewToShow: 'routes' | 'spinner';
  readonly resultingLessons: Lesson[];
  readonly resultingCourses: Course[];
  readonly currentCourse: Course;
  readonly disciplines: Discipline[];
  readonly chosenDiscipline: Discipline;
  readonly chosenSubject: Subject;
  readonly chosenConcept: Concept;
  readonly subjects: Subject[];
  readonly concepts: Concept[];
	readonly ltiState: string;
  readonly disableNext: boolean;
  readonly currentQuestionScaffold: QuestionScaffold;
  readonly currentQuestionScaffoldExample: QuestionScaffold;
	readonly enrolledCourses: Course[];
    readonly lessonAssignments: {
        [lessonId: string]: {
            [uuid: string]: Assignment;
        };
    };
    readonly lessonLastAssignmentSaved: {
        [lessonId: string]: Assignment;
    };
	readonly questionScaffoldQuiz?: Quiz;
	readonly ltiJwt: string;
readonly questionScaffoldsToRate?: QuestionScaffold[];
}
