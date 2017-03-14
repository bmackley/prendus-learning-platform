import {Video} from '../node_modules/prendus-services/typings/video';
import {Quiz} from '../node_modules/prendus-services/typings/quiz';
import {QuestionSettings} from '../node_modules/prendus-services/typings/question-settings';
import {User} from '../node_modules/prendus-services/typings/user';
import {UserMetaData} from '../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../node_modules/prendus-services/typings/course';
import {CourseConceptData} from '../node_modules/prendus-services/typings/course-concept-data';
import {Concept} from '../node_modules/prendus-services/typings/concept';
import {Discipline} from '../node_modules/prendus-services/typings/discipline';

export interface Action {
	type: string;
  courses: Course[];
  starredCourses: Course[];
  sharedCourses: Course[];
  concepts: CourseConceptData[];
  videos: Video[];
  quizzes: Quiz[];
  currentConcept: Concept;
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
	quizQuestionSettings: QuestionSettings;
	visibility: string;
  userMetaData: UserMetaData;
  subjects: string[];
  selectedSubjectIndex: number;
  subtopics: string[];
  concept: Concept;
  publicQuestionIds: string[];
  quizQuestionIds: string[];
  userQuestionIds: string[];
  gradeLevels: string[];
  selectedGradeLevelIndex: number;
  subject: string;
	disciplines: Discipline[];
	chosenDiscipline: Discipline;
	id: string;
	orderedConcepts: CourseConceptData[];
	title: string;
	url: string;
}
