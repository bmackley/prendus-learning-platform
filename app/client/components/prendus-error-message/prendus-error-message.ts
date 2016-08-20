import {Actions} from '../../redux/actions.ts';

class PrendusErrorMessage {
  public is: string;
  public username: string;
  public message: string;
  public properties: any;
  public toastText: any;
  public observers: String[];

  beforeRegister() {
    this.is = 'prendus-error-message';
    this.properties = {
        message: {
          type: String
        }
        success: {
          type: Boolean
        }
    }
    this.observers = [
      'setMessage(message)',
    ];
  }
  setMessage(){
    console.log(this.message);
    this.toastText = this.message;
  }
  mapStateToThis(e) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }
  ready(){
    this.$.toastContainer.fitInto = this.$.toastTarget;
  }
}
Polymer(PrendusErrorMessage);
