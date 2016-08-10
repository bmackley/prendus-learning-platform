import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class LoginComponent {
  public is: string;
  public loginFormToastText: string;
  beforeRegister() {
    this.is = 'sign-in';
  }
  listeners: {
    'signin-submit.tap': 'loginTap'
  }
  loginTap =  async (e: any) => {
    try{
      await Actions.loginUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);
      this.$.loginEmail.value = '';
      this.$.loginPassword.value = '';
      let location = 'createcourse'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      this.loginFormToastText = error.message;
      this.$.loginToast.open();
    }
  }
  properties: {
  }
  ready(){
    this.$.loginToast.fitInto = this.$.toastTarget;
  }
}
Polymer(LoginComponent);
