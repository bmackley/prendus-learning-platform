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
