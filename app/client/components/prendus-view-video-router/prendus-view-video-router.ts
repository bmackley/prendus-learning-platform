import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';

class PrendusViewVideoRouter extends Polymer.Element {
    public userFullName: string;
    public userEmail: string;

    static get is() { return 'prendus-view-video-router'; }

    mapStateToThis(e: CustomEvent) {
      const state = e.detail.state;

      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
    }
}

window.customElements.define(PrendusViewVideoRouter.is, PrendusViewVideoRouter);
