import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';

class PrendusLessonQuizContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public lessonId: string;
    public courseId: string;
    public quizzes: Quiz[];
		public quizToDelete: Quiz;
    public uid: string;
    public currentCourse: Course;
    public successMessage: string;
    public errorMessage: string;
		public fire: any;
		public querySelector: any;
    public courseEditAccess: boolean

    beforeRegister() {
        this.is = 'prendus-lesson-quiz-container';
        this.properties = {
            lessonId: {
                type: String
            },
            courseId: {
                type: String
            },
            //TODO this will be back once collaborators are taken out
            // courseEditAccess: {
            //   type: Boolean,
            //   computed: 'computeHasEditAccess(uid, currentCourse.collaborators)'
            // },
        };
        this.observers = [
            'init(lessonId)'
        ];
    }

    async init() {
      if(this.lessonId) {
        await Actions.loadViewLessonQuizzes(this, this.lessonId);
      }
      await Actions.checkUserAuth(this);
    }

    hasQuizzes(quizzes: Quiz[]) {
      return !!quizzes.length;
    }

    //TODO this will be called once collaborators are back
    // computeHasEditAccess(uid: string, collaborators: any) {
    //   return uid in collaborators;
    // }

		viewQuiz(e: any) {

      const quizId: string = e.model.quiz.id;
      window.history.pushState({}, '', `courses/view-quiz/course/${this.courseId}/lesson/${this.lessonId}/quiz/${quizId}`);
			this.fire('location-changed', {}, {node: window});
		}

    editQuiz(e: any) {
      e.stopPropagation();
      const quizId: string = e.model.quiz.id;
  		window.history.pushState({}, '', `courses/edit-quiz/course/${this.courseId}/lesson/${this.lessonId}/quiz/${quizId}`);
      this.fire('location-changed', {}, {node: window});
    }

    openDeleteModal(e: any) {
      e.stopPropagation();
      this.querySelector('#confirm-delete-modal').open();
      this.quizToDelete = e.model.quiz;
    }

    async deleteQuiz(e: any) {
      this.querySelector('#confirm-delete-modal').close();
      try {
        await Actions.deleteQuiz(this, this.lessonId, this.quizToDelete);
        await Actions.loadViewLessonQuizzes(this, this.lessonId);
        this.successMessage = '';
        this.successMessage = 'Quiz deleted.';
      } catch (error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    async addQuiz(e: Event) {
        const quizId: string = await Actions.createNewQuiz(this, this.lessonId);
        window.history.pushState({}, '', `courses/edit-quiz/course/${this.courseId}/lesson/${this.lessonId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
        await Actions.loadViewLessonQuizzes(this, this.lessonId);
    }

    mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.uid = state.currentUser.metaData.uid;
      this.currentCourse = state.courseViewCurrentCourse;
      //TODO take this out once collaborators are back
      this.courseEditAccess = this.currentCourse && this.currentCourse.uid === this.uid;
      // determine user's edit access for each quiz
    	this.quizzes = (state.viewLessonQuizzes[this.lessonId] || []).map((quiz: Quiz) => {
    		if(quiz.uid === this.uid
    			||  quiz.collaborators
    			&&  quiz.collaborators[this.uid]) {
    				return Object.assign({}, quiz, {
    					hasEditAccess: true
    				});
    			}
                return quiz;
    	});
    }
}

Polymer(PrendusLessonQuizContainer);
