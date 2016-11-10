import {Quiz} from '../../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {User} from '../../node_modules/prendus-services/interfaces/user.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

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
    public user: User;
    public successMessage: string;
    public errorMessage: string;

    beforeRegister() {
        this.is = 'prendus-concept-quiz-container';
        this.properties = {
            conceptId: {
                type: String
            },
            courseId: {
                type: String
            }
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

    viewQuiz(e: { model: any }) {
        const quizId = e.model.quiz.id;
        window.history.pushState({}, '', `courses/view-quiz/course/asdf/quiz/${quizId}/quiz-session-id/asdf`);
        this.fire('location-changed', {}, {node: window});
    }

    editQuiz(e: { model: any }) {
        e.stopPropagation();
        const quizId = e.model.quiz.id;
        window.history.pushState({}, '', `courses/edit-quiz/course/asdf/quiz/${quizId}/quiz-session-id/asdf`);
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
        await Actions.deleteQuiz(this, this.conceptId, this.quizToDelete);
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
        this.successMessage = '';
        this.successMessage = 'Quiz deleted.';
      } catch (error: any) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    async addQuiz(e: Event) {
        const quizId = await Actions.createNewQuiz(this, this.conceptId);
        window.history.pushState({}, '', `courses/edit-quiz/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
    }

    mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.user = state.currentUser;
      this.quizzes = state.viewConceptQuizzes[this.conceptId];
      // determine if the user has edit access
      if(this.quizzes) {
        for(let quiz of this.quizzes) {
          if(   quiz.uid === this.uid
            ||  quiz.collaborators
            &&  quiz.collaborators[this.user.metaData.uid])
            quiz.hasEditAccess = true;
          }
      }
    }
}

Polymer(PrendusConceptQuizContainer);
