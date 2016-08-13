import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class ProfileComponent {
  public is: string;
  public firstName: string;
  public lastName: string;
  public institution: string;
  public pastEmail: string;
  public email: string;
  public uid: string;
  public updateProfileSuccessToastText: string;
  public updateProfileErrorToastText: string;

  beforeRegister() {
    this.is = 'profile-element';
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
  async changeProfile(e) {
    if(this.$.updateEmail.value != this.pastEmail){
      this.$.confirmEmailChange.open();
    }else{
      const submitValue = {
        firstName: this.$.firstName.value,
        lastName: this.$.lastName.value,
        institution: this.$.institution.value,
      }
      try{
        await Actions.updateUserMetaData.execute(this, this.uid, submitValue);
        this.updateProfileSuccessToastText = 'Profile Successfully Updated';
        this.$.updateProfileSuccessToast.open();
      }
      catch(error){
        this.updateProfileErrorToastText = error.message;
        this.$.updateProfileErrorToast.open();
      }
    }

  }
  async closeOverlay(e) {
    if(e.detail.confirmed === true){
      try {
        const submitValue = {
          firstName: this.$.firstName.value,
          lastName: this.$.lastName.value,
          institution: this.$.institution.value,
          email:  this.$.updateEmail.value,
        }
        await Actions.updateUserEmail.execute(this, this.pastEmail, this.$.changeEmailPassword.value, submitValue.email);
        await Actions.updateUserMetaData.execute(this, this.uid, submitValue);
        this.updateProfileSuccessToastText = 'Profile & Email Updated Successfully';
        this.$.updateProfileSuccessToast.open();
      }catch(error){
        this.updateProfileErrorToastText = error.message;
        this.$.updateProfileErrorToast.open();
      }
    }
    this.$.changeEmailPassword.value = ''; //need to clear the form
  }
  properties: {
  }
  ready(e){
    this.$.updateProfileErrorToast.fitInto = this.$.toastTarget;
    this.$.updateProfileSuccessToast.fitInto = this.$.toastTarget;
  }
}

Polymer(ProfileComponent);
