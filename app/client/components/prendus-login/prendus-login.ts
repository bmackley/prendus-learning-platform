import {Actions} from '../../redux/actions';
import {rootReducer} from '../../redux/reducers';
import {StatechangeEvent} from '../../typings/statechange-event';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';

class PrendusLogin {
  public is: string;
  public email: string;
  public password: string;
  public listeners: any;
  public errorMessage: string;
  public successMessage: string;
  public querySelector: any;
  public fire: any;

  beforeRegister(): void {
    this.is = 'prendus-login'
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
      const location: string = 'courses/home'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

	openResetPasswordDialog(): void {
		this.querySelector('#reset-password-dialog').open()
	}

  async sendResetEmail(e: any) {
    e.preventDefault();

    const emailReset: string = this.querySelector('#resetPasswordEmail').value;
    try {
      await FirebaseService.sendPasswordResetEmail(emailReset);
      this.querySelector('#reset-password-dialog').close();
      this.successMessage = '';
      this.successMessage = 'Password sent';
    } catch(error){
      this.querySelector('#reset-password-dialog').close();
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusLogin);
