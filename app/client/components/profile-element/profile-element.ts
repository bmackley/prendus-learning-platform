import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "profile-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    this.firstName = e.detail.state.currentUser.firstName;
    this.lastName = e.detail.state.currentUser.lastName;
    this.email = e.detail.state.currentUser.email;
    console.log('sign in mapstate s', e.detail)
    if(e.detail.state.error.message){
      this.loginFormToastText = e.detail.state.error.message;
      this.$.loginToast.open();
      const cards = document.querySelector("paper-card");
      console.log('DisplayError')
      console.log(e.detail.state.error.message)
    }
  },
  changeProfile: function(e) {
    console.log(e)
    console.log(this.$.firstName.value)
    console.log(this.$.lastName.value)
    console.log(this.$.updateEmail.value)

    let submitValue = {
      firstName: this.$.firstName.value,
      lastName: this.$.lastName.value,
    }
    if(this.$.updateEmail.value != this.email){
      submitValue.email =  this.$.updateEmail.value
    }
    Actions.updateUser.execute(this, submitValue)
  },
  properties: {
  },

  ready: function(e){
    // this.$.form.addEventListener('iron-form-presubmit', function(event) {
    //   event.preventDefault();
    //   console.log(this.$.form.getAttribute('action'))
    // });
  }
});
