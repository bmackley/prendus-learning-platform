import {Actions} from '../../redux/actions';
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
  public createCourseEmailMessage: string;

  beforeRegister(): void {
      this.is = 'prendus-create-account';
      this.listeners =  {
        'signup-submit.tap': 'createUser',
        'continueToLogin.tap': 'closeDialog'
      };
  }

	hardValidateEmail(): void {
		const emailElement: any = this.querySelector('#email');
		emailElement.validate();
	}

	softValidateEmail(): void {
		const emailElement: any = this.querySelector('#email');
		if(this.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) !== null) emailElement.invalid = false;
	}

	hardValidatePassword(): void {
		const confirmPasswordElement: any = this.querySelector('#confirm-password');
		if(this.password !== this.confirmPassword) confirmPasswordElement.invalid = true;
	}

	softValidatePassword(): void {
		const confirmPasswordElement: any = this.querySelector('#confirm-password');
		if(this.password === this.confirmPassword) confirmPasswordElement.invalid = false;
	}

	enableSignup(email: string, password: string, confirmPassword: string): boolean {
		return 	email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) !== null
				&&	password !== ''
				&&	confirmPassword !== ''
				&&	password === confirmPassword;
	}

	createUserOnEnter(e: any): void {
		if(e.keyCode === 13) this.createUser(e);
	}

  async createUser(e: Event){
    try {
        const email = this.querySelector('#email').value;
				const password = this.querySelector('#password').value;
        const firstName = this.querySelector('#firstName').value;
        const lastName = this.querySelector('#lastName').value;
        const institution = this.querySelector('#institution').value;
        //TODO verify passwords match
        const userMetaData = {
            uid: '',
            email,
            firstName,
            lastName,
            institution
        };

        await Actions.createUser(this, userMetaData, password);

        //TODO decide on way to show a confirmation
        this.querySelector('#email-confirmation-dialog').open();
        //TODO decide on confirmation message
        this.createCourseEmailMessage =
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
