import {Actions} from '../../redux/actions';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {User} from '../../node_modules/prendus-services/typings/user';

class PrendusCreateAccount {
  public is: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public errorMessage: string;
  public listeners: any;
  public readonly querySelector: any;
  public createAccountEmailMessage: string;

  beforeRegister(): void {
      this.is = 'prendus-create-account';
      this.listeners =  {
        'signup-submit.tap': 'createUser'
      };
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

	enableSignup(email: string, password: string, confirmPassword: string): boolean {
		return 	email.match(ConstantsService.EMAIL_REGEX) !== null
				&&	password !== ''
				&&	confirmPassword !== ''
				&&	password === confirmPassword;
	}

	createUserOnEnter(e: any): void {
		if(e.keyCode === 13 && this.enableSignup(this.email, this.password, this.confirmPassword)) this.createUser(e);
	}

  async createUser(e: Event){
    try {
        const email = this.querySelector('#email').value;
				const password = this.querySelector('#password').value;
        const firstName = this.querySelector('#first-name').value;
        const lastName = this.querySelector('#last-name').value;
        const institution = this.querySelector('#institution').value;

        const userMetaData = {
            uid: '',
            email,
            firstName,
            lastName,
            institution
        };

        await Actions.createUser(this, userMetaData, password);

        // TODO decide on way to show a confirmation
        this.querySelector('#email-confirmation-dialog').open();
        // TODO decide on confirmation message
        this.createAccountEmailMessage =
        `Your account has been created. Please confirm your email
         address. A confirmation email has been sent to ${email}.
         You will now be redirected to the login page.`;
    }
    catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message
    }
  }

}


Polymer(PrendusCreateAccount);
