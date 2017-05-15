import {Notification} from '../node_modules/prendus-services/typings/notification';
import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {QuestionMetaData} from '../node_modules/prendus-services/typings/question-meta-data';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserType} from '../node_modules/prendus-services/typings/user-type';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {Subject} from '../node_modules/prendus-services/typings/subject';
import {LTIState} from '../node_modules/prendus-services/typings/lti-state';

export interface Action {
	type: string;
	notificationType?: Notification;
	notificationText?: string;
  courses?: Course[];
  starredCourses?: Course[];
  sharedCourses?: Course[];
  lessons?: CourseLessonData[];
  videos?: Video[];
  quizzes?: Quiz[];
  currentLesson?: {};
  currentCourse?: Course;
  currentLessonVideoId?: string;
  currentLessonVideoTitle?: string;
  currentLessonVideoUrl?: string
	concept?: Concept;
	currentVideo?: Video;
  user?: User;
	unverifiedTeachers?: User[];
	verifiedTeachers?: User[];
  courseLessons?: CourseLessonData[];
  currentEditQuizId?: string;
  currentEditLessonId?: string;
  jwt?: string;
  emails?: string[];
  uid?: string;
  courseId?: string;
  lessonId?: string;
  quizId?: string;
  videoId?: string;
	userQuestionIds?: [string];
	publicQuestionIds?: [string];
	quizQuestionIds?: [string];
	quizQuestionsData?: QuestionMetaData[];
	quizQuestionSettings?: QuestionSettings;
	visibility?: string;
	userType?: UserType;
  userMetaData?: UserMetaData;
	lesson?: Lesson;
	lessonKey?: string;
	orderedLessons?: CourseLessonData[];
	id?: string;
	title?: string;
	url?: string;
	lessonsArray?: Lesson[];
	coursesArray?: Course[];
	disciplines?: Discipline[];
	chosenDiscipline?: Discipline;
	subjects?: Subject[];
	chosenSubject?: Subject;
	chosenConcept?: Concept;
	chosenLesson?: Lesson;
	ltiState?: LTIState;
}
