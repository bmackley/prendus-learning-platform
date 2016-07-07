import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "profile-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    //this.currentUser = e.detail.state.currentUser
    this.firstName = e.detail.state.currentUser.firstName;
    this.lastName = e.detail.state.currentUser.lastName;
    this.institution = e.detail.state.currentUser.institution;
    this.pastEmail = e.detail.state.currentUser.email;
    this.email = e.detail.state.currentUser.email;
  },
  changeProfile: async function(e) {
    if(this.$.updateEmail.value != this.pastEmail){
      this.$.confirmEmailChange.open();
    }else{
      let submitValue = {
        firstName: this.$.firstName.value,
        lastName: this.$.lastName.value,
        institution: this.$.institution.value,
        email:  this.$.updateEmail.value,
      }
      try{
        await Actions.updateUser.execute(this, submitValue);
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
      let submitValue = {
        firstName: this.$.firstName.value,
        lastName: this.$.lastName.value,
        institution: this.$.institution.value,
        email:  this.$.updateEmail.value,
        runEmail: true,
      }
      try{
        await Actions.updateUser.execute(this, submitValue);
        this.updateProfileSuccessToastText = 'Profile Updated Successfully';
        this.$.updateProfileSuccessToast.open();
      }
      catch(error){
        this.updateProfileErrorToastText = error.message;
        this.$.updateProfileErrorToast.open();
      }
    }
  },
  properties: {
  },

  ready: function(e){
    this.$.updateProfileErrorToast.fitInto = this.$.toastTarget;
    this.$.updateProfileSuccessToast.fitInto = this.$.toastTarget;
    // this.$.form.addEventListener('iron-form-presubmit', function(event) {
    //   event.preventDefault();
    // });
  }
});
