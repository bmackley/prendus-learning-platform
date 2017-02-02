import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusViewQuizRouter {
    public is: string;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;

    ready(): void {
      Actions.defaultAction(this);
    }

    beforeRegister(): void {
        this.is = 'prendus-view-quiz-router';
    }

    changeRoute(e): void {
      console.log('e', e)
      let location = 'courses/home'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }

    quizSubmissionStarted(): void {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished(): void {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: StatechangeEvent): void {
      const state = e.detail.state;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
    }
}

Polymer(PrendusViewQuizRouter);
