import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseConceptData} from '../node_modules/prendus-services/typings/course-concept-data';

export interface Action {
	type: string;
  courses: Course[];
  starredCourses: Course[];
  sharedCourses: Course[];
  concepts: CourseConceptData[];
  videos: Video[];
  quizzes: Quiz[];
	concept: Concept;
	currentVideo: Video;
  currentCourse: Course;
  user: User;
  courseConcepts: CourseConceptData[];
  currentEditQuizId: string;
  currentEditConceptId: string;
  jwt: string;
  emails: string[];
  uid: string;
  courseId: string;
  conceptId: string;
  quizId: string;
  videoId: string;
	userQuestionIds: [string];
	publicQuestionIds: [string];
	quizQuestionIds: [string];
	quizQuestionSettings: QuestionSettings;
	visibility: string;
  userMetaData: UserMetaData;
}
