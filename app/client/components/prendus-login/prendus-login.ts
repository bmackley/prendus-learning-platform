import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {User} from '../../node_modules/prendus-services/interfaces/user.interface.ts';
class PrendusLogin {
  public is: string;
  public listeners: any;
  public errorMessage: string;
  public successMessage: string;
  public querySelector: any;
  public fire: any;
  beforeRegister() {
    this.is = 'prendus-login',
    this.listeners =  {
      'signin-submit.tap': 'loginTap'
    }
  }
  sendResetEmailTrigger() {
    this.querySelector('#forgotPasswordModal').open()
  }
  async login(e: any) {
    try {
      const loginEmail: string = this.querySelector('#loginEmail').value;
      const loginPassword: string = this.querySelector('#loginPassword').value;
      await Actions.loginUser(this, loginEmail, loginPassword);

      // use any since this is a firebase generated object
      const firebaseObject: any = await FirebaseService.getLoggedInUser();
      const uid: string = firebaseObject.uid;
      Actions.getCoursesByUser(this);
      Actions.getStarredCoursesByUser(this, uid);
      Actions.getSharedCoursesByUser(this, uid);
      const location: string = 'courses/home'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  createAccount() {
      const location: string = 'signup';
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
  }

  loginTap(e: any) {
    this.login(e);
  }

  loginKeydown(e: any) {
    //allows user to login by pressing enter
    const enterKeyCode: number = 13;
    if(e.keyCode === enterKeyCode) this.login(e);
  }

  async sendResetEmail(e: any) {
    e.preventDefault();

    const emailReset: string = this.querySelector('#resetPasswordEmail').value;
    try {
      await FirebaseService.sendPasswordResetEmail(emailReset);
      this.querySelector('#forgotPasswordModal').close();
      this.successMessage = '';
      this.successMessage = 'Password sent';
    } catch(error){
      this.querySelector('#forgotPasswordModal').close();
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusLogin);
