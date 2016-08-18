import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class LoginComponent {
  public is: string;
  public listeners: Object;
  public loginFormToastText: string;

  beforeRegister() {
    this.is = 'prendus-login',
    this.listeners =  {
      'signin-submit.tap': 'loginTap'
    }
  }

  async loginTap(e: any){
    try{
      await Actions.loginUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);
      this.$.loginEmail.value = '';
      this.$.loginPassword.value = '';
      let location = 'courses/home'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      this.loginFormToastText = error.message;
      this.$.loginToast.open();
    }
  }

  ready(){
    console.log('sign in')
    this.$.loginToast.fitInto = this.$.toastTarget;
  }
}
Polymer(LoginComponent);
