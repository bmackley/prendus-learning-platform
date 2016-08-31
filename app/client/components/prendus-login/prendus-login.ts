import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class PrendusLogin {
  public is: string;
  public listeners: Object;
  public loginFormToastText: string;
  public errorMessage: string;
  public successMessage: string;

  beforeRegister() {
    this.is = 'prendus-login',
    this.listeners =  {
      'signin-submit.tap': 'loginTap'
    }
  }
  sendResetEmailTrigger(){
    this.querySelector('#forgotPasswordModal').open()
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
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  sendResetEmail(e: any){
    e.preventDefault();
    const emailReset = this.querySelector('#resetPasswordEmail').value
    try{
      FirebaseService.sendPasswordResetEmail(this.querySelector('#resetPasswordEmail').value)
      this.querySelector('#forgotPasswordModal').close()
      this.successMessage = '';
      this.successMessage = 'Password sent. Check your inbox for a '
    }catch(error){
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}
addEventListener('WebComponentsReady', function() {
  Polymer(PrendusLogin);
})
