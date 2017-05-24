import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';

export class PrendusNavbar {
  public is: string;
  public username: string;
	public isAdmin: boolean;
	public listeners: any;
	public querySelector: any;

  beforeRegister(): void {
    this.is = 'prendus-navbar';
  }

	ready(): void {
		Actions.checkUserAuth(this);
	}

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state
    this.username = state.currentUser.metaData.email;
		this.isAdmin = state.currentUser.userType === 'administrator';
  }

  logOutUser(e: any): void {
    Actions.logOutUser(this);
  }
}

Polymer(PrendusNavbar);
