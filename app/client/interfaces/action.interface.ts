import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';
import {Quiz} from '../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {User} from '../node_modules/prendus-services/interfaces/user.interface.ts';
import {Course} from '../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';

export interface Action {
  conceptVideos: {
      [conceptId: string]: Video[]
  };
  conceptQuizzes: {
      [quizId: string]: Quiz[]
  };
  currentConcept: {};
  concepts: {};
  currentCourse: {};
  currentConceptVideoId: string;
  currentConceptVideoTitle: string;
  currentConceptVideoUrl: string
  currentUser: User;
  courses: Course;
  courseConcepts: CourseConceptData[];
  currentEditQuizId: '';
  currentEditConceptId: '';
}
