import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

class PrendusConceptQuizContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public courseId: string;
    public quizzes: Quiz[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;
    public user: UserMetaData;
    public uid: string;
    public currentCourse: Course;
    public successMessage: string;
    public errorMessage: string;
    public jwt: string;
    public endpointDomain: string;

    beforeRegister() {
        this.is = 'prendus-concept-quiz-container';
        this.properties = {
            conceptId: {
                type: String
            },
            courseId: {
                type: String
            },
            courseEditAccess: {
              type: Boolean,
              computed: 'computeHasEditAccess(uid, currentCourse.collaborators)'
            },
        };
        this.observers = [
            'init(conceptId)'
        ];
    }

    async init() {
      if(this.conceptId) {
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
      }
      await Actions.checkUserAuth(this);
    }

    hasQuizzes(quizzes: Quiz[]) {
      return !!quizzes.length;
    }

    computeHasEditAccess(uid: string, collaborators: any) {
      return uid in collaborators;
    }

		viewQuiz(e: { model: any }) {
			const quizId: string = e.model.quiz.id;
			window.history.pushState({}, '', `courses/view-quiz/course/${this.courseId}/concept/${this.conceptId}/quiz/${quizId}`);
			this.fire('location-changed', {}, {node: window});
		}

    editQuiz(e: { model: any }) {
      e.stopPropagation();
      const quizId: string = e.model.quiz.id;
  		window.history.pushState({}, '', `courses/edit-quiz/course/${this.courseId}/concept/${this.conceptId}/quiz/${quizId}`);
      this.fire('location-changed', {}, {node: window});
    }

    async getLTILinks(e: { model: any }): void {
      e.stopPropagation();
      this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
      const courseId = this.courseId;
      const jwt = this.jwt;
      const LTIRequest = this.querySelector("#getLTIajax")
      LTIRequest.body = {
        courseId,
        jwt
      }
      const request = LTIRequest.generateRequest();
      await request.completes;
      console.log('rr', request.response)
      const LTIlink = `http://prendus.com/course/${courseId}/quiz `
      /course/:courseId/quiz/:quizId
    }

    openDeleteModal(e: any) {
      e.stopPropagation();
      this.querySelector('#confirm-delete-modal').open();
      this.quizToDelete = e.model.quiz;
    }

    async deleteQuiz(e: any) {
      this.querySelector('#confirm-delete-modal').close();
      try {
        await Actions.deleteQuiz(this, this.conceptId, this.quizToDelete);
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
        this.successMessage = '';
        this.successMessage = 'Quiz deleted.';
      } catch (error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    async addQuiz(e: Event) {
        const quizId: string = await Actions.createNewQuiz(this, this.conceptId);
        window.history.pushState({}, '', `courses/edit-quiz/course/${this.courseId}/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
    }

    mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.user = state.currentUser;
      this.uid = state.currentUser.metaData.uid;
      this.currentCourse = state.courseViewCurrentCourse;
      // determine user's edit access for each quiz
    	this.quizzes = (state.viewConceptQuizzes[this.conceptId] || []).map((quiz: Quiz) => {
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

Polymer(PrendusConceptQuizContainer);
