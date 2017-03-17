import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../node_modules/prendus-services/typings/course-lesson-data';
import {Lesson} from '../node_modules/prendus-services/typings/lesson';

export interface Action {
	type: string;
  courses: Course[];
  starredCourses: Course[];
  sharedCourses: Course[];
  lessons: CourseLessonData[];
  videos: Video[];
  quizzes: Quiz[];
  currentLesson: {};
  currentCourse: Course;
  currentLessonVideoId: string;
  currentLessonVideoTitle: string;
  currentLessonVideoUrl: string
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
  userMetaData: UserMetaData;
	lesson: Lesson;
	lessonKey: string;
	orderedLessons: CourseLessonData[];
	id: string;
	title: string;
	url: string;
	lessonsArray: Lesson[];
	coursesArray: Course[];
}
