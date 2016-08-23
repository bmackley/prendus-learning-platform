import {Actions} from '../../redux/actions.ts';

class PrendusNotification {
  public is: string;
  public username: string;
  public message: string;
  public properties: any;
  public toastText: string;
  public observers: String[];
  public errorMessage: string;
  public successMessage: string;

  beforeRegister() {
    this.is = 'prendus-notification';
    this.properties = {
        successMessage: {
          type: String,
          observer: 'showSuccessMessage'
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
  showSuccessMessage(){
    if(this.successMessage){
      this.toastText = this.successMessage;
      this.querySelector('#successToastContainer').open();
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
