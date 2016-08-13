import {Actions} from '../../redux/actions.ts';
import {UserMetaData} from '../../node_modules/prendus-services/interfaces/user-meta-data.interface.ts'
import {User} from '../../node_modules/prendus-services/interfaces/user.interface.ts'

class SignupComponent {
  public is: string;
  public signUpToastText: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public institution: string;

  beforeRegister() {
    this.is = 'sign-up';
  }
  listeners: {
    'signup-submit.tap': 'specialTap'
  }
  specialTap =  async (e: any) =>{
    this.email = this.$.formEmail.value;
    this.firstName = this.$.firstName.value;
    this.lastName = this.$.lastName.value;
    this.institution = this.$.institution.value;
    const userMetaData = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      institution: this.institution,
    }
    try {
        await Actions.createUser.execute(this, userMetaData, this.$.formPassword.value);
        this.$.formEmail.value = '';
        this.$.formPassword.value = '';
        this.$.retypePassword.value = ''
        this.$.firstName.value = '';
        this.$.lastName.value = '';
        this.$.institution.value= '';
        //This will change as we update the site.
        let location = 'courses/';
        window.history.pushState({}, '', location);
        this.fire('location-changed', {}, {node: window});
    }
    catch(error) {
      this.signUpToastText = error;
      this.$.signUpToast.open();
    }
  }
  ready (e){
    this.$.signUpToast.fitInto = this.$.toastTarget;
  }
}
Polymer(SignupComponent);
