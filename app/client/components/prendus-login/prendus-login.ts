import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {StatechangeEvent} from '../../typings/statechange-event';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {State} from '../../typings/state';
import {Action} from '../../typings/action';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';

class PrendusLogin extends Polymer.Element {
  public email: string;
  public password: string;
	public resetPasswordEmail: string;
  public listeners: any;
  public querySelector: any;
  public ltiState: string;
  public action: Action;

  static get is() { return 'prendus-login'; }

  connectedCallback() {
      super.connectedCallback();

      // Call default action since this is lazy loaded
      Actions.defaultAction(this);
  }

	// each input has a hard validation for when focus is lost and a soft validation
	// for when the user is typing (to be responsive but not obnoxious)

	hardValidateEmail(): void {
		const emailInput: any = this.shadowRoot.querySelector('#emailInput');
		emailInput.validate();
	}

	softValidateEmail(): void {
		const emailInput: any = this.shadowRoot.querySelector('#emailInput');
        const email = emailInput.value;

        if(email.match(ConstantsService.EMAIL_REGEX) !== null) emailInput.invalid = false;
	}

	enableLogIn(email: string, password: string): boolean {
		return 	email.match(ConstantsService.EMAIL_REGEX) !== null
				&&	password.length >= 6;
	}

	loginOnEnter(e: any) {
        const email = this.shadowRoot.querySelector('#emailInput').value;
        const password = this.shadowRoot.querySelector('#passwordInput').value;
		if(e.keyCode === 13 && this.enableLogIn(email, password)) this.login();
	}

  async login() {
    try {
        const email = this.shadowRoot.querySelector('#emailInput').value;
        const password = this.shadowRoot.querySelector('#passwordInput').value;

        console.dir(this.shadowRoot.querySelector('#emailInput'));

        console.log(email);
        console.log(password);

      await Actions.loginUser(this, email, password);
      // use any since this is a firebase generated object
      const firebaseUser: any = await FirebaseService.getLoggedInUser();
      const uid: string = firebaseUser.uid;
      Actions.getCoursesByUser(this);
      Actions.getStarredCoursesByUser(this, uid);
      Actions.getSharedCoursesByUser(this, uid);
      this.action = Actions.checkLtiState(this.ltiState);
      if(this.ltiState) {
        window.history.pushState({}, '', this.ltiState);
      } else {
        const location: string = 'courses/home';
        window.history.pushState({}, '', location);
      }

      this.dispatchEvent(new CustomEvent('location-changed', {
          detail: {
              node: window
          }
      }));
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error logging in.');
			console.error(error);
    }
  }

	openResetPasswordDialog(): void {
		this.shadowRoot.querySelector('#reset-password-dialog').open()
	}

	enableResetPassword(resetPasswordEmail: string): boolean {
		return resetPasswordEmail.match(ConstantsService.EMAIL_REGEX) !== null;
	}

	resetPasswordOnEnter(e: any): void {
		if(e.keyCode === 13) {
			if(this.enableResetPassword(this.resetPasswordEmail)) this.sendResetEmail(e);
			else e.preventDefault();
		}
	}

  async sendResetEmail(e: any): Promise<void> {
    e.preventDefault();
		this.shadowRoot.querySelector('#reset-password-dialog').close();
    try {
      await FirebaseService.sendPasswordResetEmail(this.resetPasswordEmail);
			Actions.showNotification(this, 'success', 'Password reset link sent.');
    } catch(error) {
			Actions.showNotification(this, 'error', 'Could not send password reset email.  Check to make sure the email address you entered is correct.');
			console.error(error);
    }
		this.resetPasswordEmail = '';
		this.shadowRoot.querySelector('#reset-password-email').invalid = false;
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.ltiState = state.ltiState;
  }
}

window.customElements.define(PrendusLogin.is, PrendusLogin);
