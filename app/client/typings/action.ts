import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
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
  currentConcept: {};
  currentCourse: Course;
  currentConceptVideoId: string;
  currentConceptVideoTitle: string;
  currentConceptVideoUrl: string
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
