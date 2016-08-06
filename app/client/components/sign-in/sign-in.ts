import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';

Polymer({
  is: "sign-in",
  listeners: {
    'signin-submit.tap': 'loginTap'
  },
  loginTap: async function(e){
    try{
      await Actions.loginUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);
      //Is setting things to null to clear them out the best practice?
      this.$.loginEmail.value = '';
      this.$.loginPassword.value = '';
      let location = 'createcourse'
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      this.loginFormToastText = error.message;
      this.$.loginToast.open();
    }
  },
  mapStateToThis: function(e) {

  },
  properties: {
      active: {
        type: Boolean,
        value: false,
        reflectionToAttribute: true
      },
      loading: {
        type: Boolean,
        value: false,
        notify: true,
      }
  },
  ready: function(e){
    this.$.loginToast.fitInto = this.$.toastTarget;
  }
});
