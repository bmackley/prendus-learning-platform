import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusLogin {
  public is: string;
  public listeners: Object;
  public loginFormToastText: string;
  public errorMessage: string;

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
      this.errorMessage = error.message;
    }
  }

  ready(){
  }
}
Polymer(PrendusLogin);
