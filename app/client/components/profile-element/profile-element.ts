import {Actions} from '../../redux/actions.ts';

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
    console.log('sign in mapstate s', e.detail)
    if(e.detail.state.error.message){
      this.updateProfileToastText = e.detail.state.error.message
      this.$.updateProfileToast.open();
    }
  },
  changeProfile: function(e) {
    console.log(e)
    console.log(this.$.firstName.value)
    console.log(this.$.lastName.value)
    console.log('form email', this.$.updateEmail.value)
    console.log('saved email', this.email)

    let submitValue = {
      firstName: this.$.firstName.value,
      lastName: this.$.lastName.value,
      institution: this.$.institution.value,
      email:  this.$.updateEmail.value,
    }
    if(this.$.updateEmail.value != this.pastEmail){
      //Do a confirmation box
      console.log('email is different')
      this.$.confirmEmailChange.open();
      console.log('canceled', this.$.confirmEmailChange.canceled);
    }else{
      submitValue.email = '';
      Actions.updateUser.execute(this, submitValue);
    }

  },
  closeOverlay: function(e){
    console.log('closeOverlay e', e);
    console.log('Confirmed', e.detail.confirmed);
    if(e.detail.confirmed === true){
      console.log('firstName', this.$.firstName.value)
      let submitValue = {
        firstName: this.$.firstName.value,
        lastName: this.$.lastName.value,
        institution: this.$.institution.value,
        email:  this.$.updateEmail.value,
      }
      Actions.updateUser.execute(this, submitValue)
    }
    console.log('cancelled', e.detail.canceled);
  },
  properties: {
  },

  ready: function(e){
    this.$.updateProfileToast.fitInto = this.$.toastTarget;
    // this.$.form.addEventListener('iron-form-presubmit', function(event) {
    //   event.preventDefault();
    //   console.log(this.$.form.getAttribute('action'))
    // });
  }
});
