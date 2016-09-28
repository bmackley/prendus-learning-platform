import {Actions} from '../../redux/actions.ts';
import {UserMetaData} from '../../node_modules/prendus-services/interfaces/user-meta-data.interface.ts'
import {User} from '../../node_modules/prendus-services/interfaces/user.interface.ts'

class PrendusCreateAccount {
  public is: string;
  public errorMessage: string;
  public listeners: any;
  public readonly querySelector: any;

  beforeRegister() {
    this.is = 'prendus-create-account';
    this.listeners =  {
      'signup-submit.tap': 'createUser'
    };
  }

  openTermsOfService(){
    this.querySelector('#terms-of-service-modal').open()
    // const location = '/terms-of-service';
    // window.history.pushState({}, '', location);
    // this.fire('location-changed', {}, {node: window});
  }

  async createUser(e: Event){
    try {
        const email = this.querySelector('#formEmail').value;
        const firstName = this.querySelector('#firstName').value;
        const lastName = this.querySelector('#lastName').value;
        const institution = this.querySelector('#institution').value;
        const password = this.querySelector('#formPassword').value;

        const userMetaData = {
          uid: '',
          email,
          firstName,
          lastName,
          institution
        };

        await Actions.createUser(this, userMetaData, password);
        clearForm(this);
        redirectHome(this);
    }
    catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message
    }

    function clearForm(context: any) {
        context.querySelector('#formEmail').value = '';
        context.querySelector('#formPassword').value = '';
        context.querySelector('#retypePassword').value = ''
        context.querySelector('#firstName').value = '';
        context.querySelector('#lastName').value = '';
        context.querySelector('#institution').value= '';
    }

    function redirectHome(context: any) {
        const location = '';
        window.history.pushState({}, '', location);
        context.fire('location-changed', {}, {node: window});
    }
  }
}

Polymer(PrendusCreateAccount);
