import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {UserMetaData} from '../../node_modules/prendus-services/interfaces/user-meta-data.interface.ts'
export class PrendusProfile {
  public is: string;
  public firstName: string;
  public lastName: string;
  public institution: string;
  public pastEmail: string;
  public email: string;
  public uid: string;
  public updateProfileSuccessToastText: string;
  public updateProfileErrorToastText: string;
  public errorMessage: string;
  public successMessage: string;
  public querySelector: any;

  beforeRegister() {
    this.is = 'prendus-profile';
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.firstName = state.currentUser.metaData.firstName;
    this.lastName = state.currentUser.metaData.lastName;
    this.institution = state.currentUser.metaData.institution;
    this.pastEmail = state.currentUser.metaData.email;
    this.email = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
  }
  async changeProfile(e: any) {
    if(this.querySelector('#updateEmail').value != this.pastEmail){
      this.querySelector('#confirmEmailChange').open();
    }else{
      const submitValue: UserMetaData = {
        uid: this.uid,
        firstName: this.querySelector('#firstName').value,
        lastName: this.querySelector('#lastName').value,
        institution: this.querySelector('#institution').value,
        email: this.email
      }
      try{
        await Actions.updateUserMetaData(this, this.uid, submitValue);
        this.successMessage = '';
        this.successMessage = 'Profile Updated Successfully';
      }
      catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

  }
  async closeOverlay(e: any) {
    if(e.detail.confirmed === true){
      try {
        const submitValue: UserMetaData = {
          uid: this.uid,
          firstName: this.querySelector('#firstName').value,
          lastName: this.querySelector('#lastName').value,
          institution: this.querySelector('#institution').value,
          email:  this.querySelector('#updateEmail').value,
        }
        Actions.showMainSpinner(this);
        Actions.updateCollaborations(this.pastEmail)
        //remove collaborations
        await Actions.updateUserEmail(this, this.pastEmail, this.querySelector('#changeEmailPassword').value, submitValue.email);
        await Actions.updateUserMetaData(this, this.uid, submitValue);
        Actions.hideMainSpinner(this);
        this.successMessage = '';
        this.successMessage = 'Profile & Email Updated Successfully';
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
    this.querySelector('#changeEmailPassword').value = ''; //need to clear the form
  }
  submitKeydown(e: any){
    if(e.keyCode === 13) this.changeProfile(e);
  }
  ready(){
    this.querySelector('#updateProfileErrorToast').fitInto = this.querySelector('#toastTarget');
    this.querySelector('#updateProfileSuccessToast').fitInto = this.querySelector('#toastTarget');
  }
}

Polymer(PrendusProfile);
