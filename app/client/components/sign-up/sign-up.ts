import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "sign-up",
  listeners: {
    'signup-submit.tap': 'specialTap'
  },
  specialTap: async function(e){
    const userData = {
      //get this to go through the actions.
      email: this.$.formEmail.value,
      password: this.$.formPassword.value,
      firstName: this.$.firstName.value,
      lastName: this.$.lastName.value,
      institution: this.$.institution.value,
    }
    try {
        await Actions.createUser.execute(this, userData);
        this.$.formEmail.value = '';
        this.$.formPassword.value = '';
        this.$.retypePassword.value = ''
        this.$.firstName.value = '';
        this.$.lastName.value = '';
        this.$.institution.value= '';
        //This will change as we update the site.
        let location = 'createcourse';
        window.history.pushState({}, '', location);
        this.fire('location-changed', {}, {node: window});
    }
    catch(error) {
      this.signUpToastText = error;
      this.$.signUpToast.open();
    }
  },
  properties: {

  },
  mapStateToThis: function(e) {

  },
  ready: function(e){
    this.$.signUpToast.fitInto = this.$.toastTarget;
  }
});
