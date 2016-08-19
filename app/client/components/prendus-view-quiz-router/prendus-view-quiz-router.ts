import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {UserModel} from '../../node_modules/prendus-services/models/user.model.ts';

class ViewQuizRouterComponent {
    public is: string;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;

    beforeRegister() {
        this.is = 'prendus-view-quiz-router';
    }

    mapStateToThis(e) {
      const state = e.detail.state;

      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
    }
}

Polymer(ViewQuizRouterComponent);
