import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';
import {Quiz} from '../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';

export interface Action {
  courses: Course[];
  concepts: CourseConceptData[];
  videos: Video[];
  quizzes: Quiz[];
  currentConcept: {};
  currentCourse: {};
  currentConceptVideoId: string;
  currentConceptVideoTitle: string;
  currentConceptVideoUrl: string
  user: User;
  courseConcepts: CourseConceptData[];
  currentEditQuizId: '';
  currentEditConceptId: '';
  jwt: string;
  emails: string[];
  uid: string;
  courseId: string;
  conceptId: string;
}
