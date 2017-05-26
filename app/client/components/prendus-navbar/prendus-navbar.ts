import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';

export class PrendusNavbar extends Polymer.Element {
  public username: string;
	public isAdmin: boolean;
	public listeners: any;
	public querySelector: any;

    static get is() { return 'prendus-navbar'; }

    connectedCallback() {
        super.connectedCallback();

        Actions.checkUserAuth(this);
    }

  logOutUser(e: any): void {
    Actions.logOutUser(this);
  }

  mapStateToThis(e: StatechangeEvent): void {
      const state = e.detail.state
      this.username = state.currentUser.metaData.email;
      this.isAdmin = state.currentUser.userType === 'administrator';
  }
}

window.customElements.define(PrendusNavbar.is, PrendusNavbar);
