import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';

export class PrendusNavbar {
  public is: string;
  public username: string;
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
  }

	toggleMenuWithKeyboard(e: any): void {
		if(e.keyCode === 13 || e.keyCode === 32) {
			e.preventDefault();
			this.toggleMenu(e);
		}
	}

  toggleMenu(e: any): void {
		this.querySelector('#menu-name-button').blur();
		this.querySelector('#menu-icon-button').blur();
		this.querySelector('#menu-items').toggle();
  }

  logOutUser(e: any): void {
    Actions.logOutUser(this);
  }
}

Polymer(PrendusNavbar);
