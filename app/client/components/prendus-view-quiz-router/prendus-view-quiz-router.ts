import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusViewQuizRouter {
    public is: string;
		public uid: string;
		public courseId: string;
		public conceptId: string;
		public quizId: string;
		public observers: any;
		public hasEditAccess: boolean;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;
    public fire: any;
    public data: any;

    ready(): void {
      Actions.defaultAction(this);
    }

    beforeRegister(): void {
      this.is = 'prendus-view-quiz-router';
			this.observers = [
				'updateEditAccess(data)'
			]
    }

		async updateEditAccess(data: any) {
			const quiz: Quiz = await Actions.getQuiz(data.quizId);
			this.hasEditAccess = this.uid in quiz.collaborators;
		}

    quizSubmissionStarted(): void {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished(): void {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: StatechangeEvent): void {
      const state = e.detail.state;
			this.uid = state.currentUser.metaData.uid;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
    }
}

Polymer(PrendusViewQuizRouter);
