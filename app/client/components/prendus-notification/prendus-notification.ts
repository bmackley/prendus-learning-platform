import {Actions} from '../../redux/actions.ts';

class PrendusNotification {
  public is: string;
  public username: string;
  public message: string;
  public properties: any;
  public toastText: string;
  public observers: String[];
  public errorMessage: string;

  beforeRegister() {
    this.is = 'prendus-notification';
    this.properties = {
        message: {
          type: String,
        },
        errorMessage: {
          type: String,
          observer: 'showErrorMessage'
        }
    }
  }
  showErrorMessage(){
    if(this.errorMessage){
      this.toastText = this.errorMessage;
      this.querySelector('#errorToastContainer').open();
    }
  }
  mapStateToThis(e) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }
  ready(){
  }
}
Polymer(PrendusNotification);
