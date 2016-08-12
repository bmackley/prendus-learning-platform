import {Actions} from '../../redux/actions.ts';

export class SignupComponent {
  public is: string;
  public signUpToastText: string;

  beforeRegister() {
    this.is = 'sign-up';
  }
  listeners: {
    'signup-submit.tap': 'specialTap'
  }
  specialTap =  async (e: any) =>{
    const userData = {
      //get this to go through the actions.
      email: this.$.formEmail.value,
      firstName: this.$.firstName.value,
      lastName: this.$.lastName.value,
      institution: this.$.institution.value,
    }
    try {
        await Actions.createUser.execute(this, userData, this.$.formPassword.value);
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
