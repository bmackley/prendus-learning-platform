import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';

Polymer({
  is: "sign-in",
  listeners: {
    'signin-submit.tap': 'loginTap'
  },
  loginTap: function(e){
    Actions.setCurrentUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);
  },
  mapStateToThis: function(e) {
    console.log('sign in mapstate s', e.detail)
    if(e.detail.state.error.message){
      this.loginFormToastText = e.detail.state.error.message;
      this.$.loginToast.open();
      const cards = document.querySelector("paper-card");
      console.log('DisplayError')
      console.log(e.detail.state.error.message)
    }
    else{
      let location = 'createcourse'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }
  },
  properties: {

    },
  ready: function(e){
    this.$.loginToast.fitInto = this.$.toastTarget;
  }
});
