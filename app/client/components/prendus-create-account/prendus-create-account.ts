import {Actions} from '../../redux/actions';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {UserType} from '../../node_modules/prendus-services/typings/user-type';
import {User} from '../../node_modules/prendus-services/typings/user';

class PrendusCreateAccount {
  public is: string;
  public userType: UserType;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public properties: any;
  public readonly querySelector: any;
  public createAccountEmailMessage: string;

  beforeRegister(): void {
      this.is = 'prendus-create-account';
			this.properties = {
				userType: {
					type: String,
					value: ''
				}
			}
  }

	showTeacherNote(userType: UserType): boolean {
		return userType === 'unverifiedTeacher';
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

	hardValidatePassword(): void {
		const passwordElement: any = this.querySelector('#password');
		passwordElement.validate();
	}

	softValidatePassword(): void {
		const passwordElement: any = this.querySelector('#password');
		if(this.password.length >= 6) passwordElement.invalid = false;
	}

	hardValidateConfirmPassword(): void {
		const confirmPasswordElement: any = this.querySelector('#confirm-password');
		if(this.password !== this.confirmPassword) confirmPasswordElement.invalid = true;
	}

	softValidateConfirmPassword(): void {
		const confirmPasswordElement: any = this.querySelector('#confirm-password');
		if(this.password === this.confirmPassword) confirmPasswordElement.invalid = false;
	}

	enableSignup(userType: string, email: string, password: string, confirmPassword: string): boolean {
		return	userType !== ''
				&&	email.match(ConstantsService.EMAIL_REGEX) !== null
				&&	password !== ''
				&&	confirmPassword !== ''
				&&	password === confirmPassword;
	}

	createUserOnEnter(e: any): void {
		if(e.keyCode === 13 && this.enableSignup(this.userType, this.email, this.password, this.confirmPassword)) this.createUser(e);
	}

  async createUser(e: Event){
    try {
        const userMetaData: UserMetaData = {
            uid: '',
            email: this.email,
            firstName: '',
            lastName: '',
            institution: ''
      	};

        await Actions.createUser(this, this.userType, userMetaData, this.password);

        // TODO decide on way to show a confirmation
        this.querySelector('#email-confirmation-dialog').open();
        // TODO decide on confirmation message
        this.createAccountEmailMessage =
        `Your account has been created.  A confirmation email has been sent to
				${this.email}. Please click on the link in the email to confirm your email
				address.`;
    }
    catch(error) {
			Actions.showNotification(this, 'error', 'Error creating user.');
			console.error(error);
    }
  }

}


Polymer(PrendusCreateAccount);
