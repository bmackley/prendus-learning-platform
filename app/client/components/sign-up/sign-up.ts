Polymer({
  is: "sign-up",
  listeners: {
    'signup-submit.tap': 'specialTap'
  },
  specialTap: function(e){
    Actions.createUser.execute(this, this.$.formEmail.value, this.$.formPassword.value);
  },
  properties: {

  },
  mapStateToThis: function(e) {

  },
  ready: function(e){
    function _submit(){
      console.log('hello world')
    }
  }
});
