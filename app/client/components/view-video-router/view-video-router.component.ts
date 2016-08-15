import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {UserModel} from '../../node_modules/prendus-services/models/user.model.ts';

class ViewVideoRouterComponent {
    public is: string;
    public userFullName: string;
    public userEmail: string;

    beforeRegister() {
        this.is = 'prendus-view-video-router';
    }

    mapStateToThis(e) {
      const state = e.detail.state;
      this.userFullName = `${state.currentUser.firstName} ${state.currentUser.lastName}`;
      this.userEmail = state.currentUser.email;
    }
}
Polymer(ViewVideoRouterComponent);
