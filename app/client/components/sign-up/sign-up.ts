Polymer({
  is: "sign-up",
  listeners: {
    'signup-submit.tap': 'specialTap'
  },
  specialTap: function(e){
    var ref = new Firebase("https://prendus.firebaseio.com/");
    ref.createUser({
      email: this.$.formEmail.value,
      password: this.$.formPassword.value
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
            break;
          default:
            alert("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  },
  properties: {

    },
  ready: function(e){
    function _submit(){
      console.log('hello world')
    }
  }
});
