import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {StatechangeEvent} from '../../typings/statechange-event';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {State} from '../../typings/state';
import {LTIState} from '../../node_modules/prendus-services/typings/lti-state';
import {Action} from '../../typings/action';
class PrendusLogin {
  public is: string;
  public email: string;
  public password: string;
	public resetPasswordEmail: string;
  public listeners: any;
  public querySelector: any;
  public fire: any;
  public ltiState: LTIState;
  public action: Action;

  beforeRegister(): void {
    this.is = 'prendus-login'
  }

  ready(): void {
    // Call default action since this is lazy loaded
    Actions.defaultAction(this);
  }

	// each input has a hard validation for when focus is lost and a soft validation
	// for when the user is typing (to be responsive but not obnoxious)

	hardValidateEmail(): void {
		const emailElement: any = this.querySelector('#email');
		emailElement.validate();
	}

	softValidateEmail(): void {
		const emailElement: any = this.querySelector('#email');
		if(this.email.match(ConstantsService.EMAIL_REGEX) !== null) emailElement.invalid = false;
	}

	enableLogIn(email: string, password: string): boolean {
		return 	email.match(ConstantsService.EMAIL_REGEX) !== null
				&&	password.length >= 6;
	}

	loginOnEnter(e: any) {
		if(e.keyCode === 13 && this.enableLogIn(this.email, this.password)) this.login();
	}

  async login() {
    try {
      await Actions.loginUser(this, this.email, this.password);
      // use any since this is a firebase generated object
      const firebaseUser: any = await FirebaseService.getLoggedInUser();
      const uid: string = firebaseUser.uid;
      Actions.getCoursesByUser(this);
      Actions.getStarredCoursesByUser(this, uid);
      Actions.getSharedCoursesByUser(this, uid);
      if(!this.ltiState && localStorage.getItem('ltiState')) {
        const ltiState: LTIState = JSON.parse(localStorage.getItem('ltiState'));
        this.action = Actions.setLtiState(ltiState);
      }
      const location: string = this.ltiState ? `courses/view-quiz/course/${this.ltiState.courseId}/lesson/${this.ltiState.lessonId}/quiz/${this.ltiState.quizId}/quiz-origin/${this.ltiState.quizOrigin}/user-full-name/${this.ltiState.userFullName}/user-id/${this.ltiState.userId}/consumer-key/${this.ltiState.consumerKey}/user-email/${this.ltiState.userEmail}` : 'courses/home';
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error logging in.');
			console.error(error);
    }
  }

	openResetPasswordDialog(): void {
		this.querySelector('#reset-password-dialog').open()
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
		this.querySelector('#reset-password-dialog').close();
    try {
      await FirebaseService.sendPasswordResetEmail(this.resetPasswordEmail);
			Actions.showNotification(this, 'success', 'Password reset link sent.');
    } catch(error) {
			Actions.showNotification(this, 'error', 'Could not send password reset email.  Check to make sure the email address you entered is correct.');
			console.error(error);
    }
		this.resetPasswordEmail = '';
		this.querySelector('#reset-password-email').invalid = false;
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.ltiState = state.ltiState;
    this.email = this.ltiState ? this.ltiState.userEmail : this.email;
  }
}

Polymer(PrendusLogin);
