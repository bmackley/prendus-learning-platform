import {Actions} from '../../redux/actions';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {User} from '../../node_modules/prendus-services/typings/user';

class PrendusCreateAccount {
  public is: string;
  public errorMessage: string;
  public listeners: any;
  public readonly querySelector: any;
  public createCourseEmailMessage: string;
  beforeRegister() {
      this.is = 'prendus-create-account';
      this.listeners =  {
        'signup-submit.tap': 'createUser',
        'continueToLogin.tap': 'closeDialog'
      };
  }

	createUserKeydown(e: any) {
		if(e.keyCode === 13) this.createUser(e);
	}

  async createUser(e: Event){
    try {
        const email = this.querySelector('#formEmail').value;
        const firstName = this.querySelector('#firstName').value;
        const lastName = this.querySelector('#lastName').value;
        const institution = this.querySelector('#institution').value;
        const password = this.querySelector('#formPassword').value;
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
  closeDialog() {
      this.querySelector('#email-confirmation-dialog').close();
  }
}


Polymer(PrendusCreateAccount);
