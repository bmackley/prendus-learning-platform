import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
  is: "profile-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    this.firstName = e.detail.state.currentUser.firstName;
    this.lastName = e.detail.state.currentUser.lastName;
    this.institution = e.detail.state.currentUser.institution;
    this.pastEmail = e.detail.state.currentUser.email;
    this.email = e.detail.state.currentUser.email;
    this.uid = e.detail.state.currentUser.uid;
  },
  changeProfile: async function(e) {
    if(this.$.updateEmail.value != this.pastEmail){
      this.$.confirmEmailChange.open();
    }else{
      let submitValue = {
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

  },
  closeOverlay: async function(e){
    if(e.detail.confirmed === true){
      try {
        let submitValue = {
          firstName: this.$.firstName.value,
          lastName: this.$.lastName.value,
          institution: this.$.institution.value,
          email:  this.$.updateEmail.value,
        }
        console.log('password on form', this.$.changeEmailPassword.value)
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
  },
  properties: {
  },

  ready: function(e){
    this.$.updateProfileErrorToast.fitInto = this.$.toastTarget;
    this.$.updateProfileSuccessToast.fitInto = this.$.toastTarget;
  }
});
