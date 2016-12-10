import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';

class PrendusViewVideoRouter {
    public is: string;
    public userFullName: string;
    public userEmail: string;

    beforeRegister() {
        this.is = 'prendus-view-video-router';
    }

    mapStateToThis(e) {
      const state = e.detail.state;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
    }
}

Polymer(PrendusViewVideoRouter);
