import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Actions} from '../../redux/actions';

class PrendusViewQuizRouter {
    public is: string;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;

    beforeRegister() {
        this.is = 'prendus-view-quiz-router';
    }

    changeRoute(e){
      console.log('e', e)
      let location = 'courses/home'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }

    quizSubmissionStarted() {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished() {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e) {
      const state = e.detail.state;

      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
    }
}

Polymer(PrendusViewQuizRouter);
