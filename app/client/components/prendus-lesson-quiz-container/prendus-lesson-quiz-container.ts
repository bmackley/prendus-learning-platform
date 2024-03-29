import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';
// squish TypeScript errors
declare let window: any;

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
    public jwt: string;
    public endpointDomain: string;
    public ltiLink: string;
    public ltiQuizId: string;
    public secret: string; //need to place this somewhere more secure. Course settings perhaps? We need to finish course settings first if we're gonig to put it there.
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
      const quizOrigin: QuizOrigin = 'LEARNING_PLATFORM';
      const queryParams: any = {
        quizOrigin
      };
      window.history.pushState({}, '', `courses/view-quiz/course/${this.courseId}/quiz/${quizId}${UtilitiesService.prepareUrl(queryParams, true)}`);
			this.fire('location-changed', {}, {node: window});
		}

    editQuiz(e: any) {
      e.stopPropagation();
      const quizId: string = e.model.quiz.id;
  		window.history.pushState({}, '', `courses/edit-quiz/course/${this.courseId}/lesson/${this.lessonId}/quiz/${quizId}`);
      this.fire('location-changed', {}, {node: window});
    }

    async getLTILinks(e: any): Promise<void> {
      // Start the server
      e.stopPropagation();
      this.ltiQuizId = e.target.parentElement.dataQuiz;
      this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
      const courseId: string = this.courseId;
      const lessonId: string = this.lessonId;
      const jwt: string = this.jwt;
      const LTIRequest = this.querySelector("#getLTIajax");
      LTIRequest.body = {
        courseId,
        jwt
      }
      const request = LTIRequest.generateRequest();
      await request.completes;
      this.secret = request.response.secret;
      const env = window['PRENDUS_ENV'];
      if(env === 'development') {
        this.ltiLink = `http://localhost:5000/api/lti/course/${this.courseId}/quiz/${this.ltiQuizId}`;
      } else {
        this.ltiLink = `https://prenduslearning.com/api/lti/course/${this.courseId}/quiz/${this.ltiQuizId}`;
      }
      this.querySelector('#quiz-lti-links-modal').open()
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
				Actions.showNotification(this, 'success', 'Quiz deleted successfully.');
      } catch (error) {
				Actions.showNotification(this, 'error', 'Error deleting quiz.');
				console.error(error);
      }
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
      this.jwt = state.jwt;
    }
}

Polymer(PrendusLessonQuizContainer);
