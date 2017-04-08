import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserType} from '../node_modules/prendus-services/typings/user-type';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';
import {Subject} from '../node_modules/prendus-services/typings/subject';
import {Concept} from '../node_modules/prendus-services/typings/concept';
export interface Action {
	type: string;
  courses: Course[];
  starredCourses: Course[];
  sharedCourses: Course[];
  lessons: CourseLessonData[];
  videos: Video[];
  quizzes: Quiz[];
<<<<<<< HEAD
  currentLesson: {};
  currentCourse: Course;
  currentLessonVideoId: string;
  currentLessonVideoTitle: string;
  currentLessonVideoUrl: string
=======
	concept: Concept;
	currentVideo: Video;
  currentCourse: Course;
>>>>>>> origin/develop
  user: User;
  courseLessons: CourseLessonData[];
  currentEditQuizId: string;
  currentEditLessonId: string;
  jwt: string;
  emails: string[];
  uid: string;
  courseId: string;
  lessonId: string;
  quizId: string;
  videoId: string;
	userQuestionIds: [string];
	publicQuestionIds: [string];
	quizQuestionIds: [string];
	quizQuestionSettings: QuestionSettings;
	visibility: string;
	userType: UserType;
  userMetaData: UserMetaData;
	lesson: Lesson;
	lessonKey: string;
	orderedLessons: CourseLessonData[];
	id: string;
	title: string;
	url: string;
	lessonsArray: Lesson[];
	coursesArray: Course[];
	disciplines: Discipline[];
	chosenDiscipline: Discipline;
	subjects: Subject[];
	chosenSubject: Subject;
	chosenConcept: Concept;
}
