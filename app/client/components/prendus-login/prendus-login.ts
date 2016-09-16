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
      'signin-submit.tap': 'loginTap',
    }
  }
  sendResetEmailTrigger(){
    this.querySelector('#forgotPasswordModal').open()
  }
  async login(e: any){
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
  loginTap(e: any) {
    this.login(e);
  }
  loginKeydown(e: any) {
    if(e.keyCode === 13) this.login(e);
  }
  async sendResetEmail(e: any){
    e.preventDefault();
    const emailReset = this.querySelector('#resetPasswordEmail').value
    try{
      await FirebaseService.sendPasswordResetEmail(this.querySelector('#resetPasswordEmail').value)
      this.querySelector('#forgotPasswordModal').close()
      this.successMessage = '';
      this.successMessage = 'Password sent. Check your inbox for a '
    }catch(error){
      this.querySelector('#forgotPasswordModal').close()
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusLogin);
