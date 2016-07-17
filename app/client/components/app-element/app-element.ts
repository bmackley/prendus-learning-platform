// <reference path="../../node_modules/prendus-services/typings/custom.d.ts" />
// <reference path="../../node_modules/prendus-services/typings/polymer/polymer.d.ts" />

import {rootReducer} from '../../redux/reducers.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
// FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(e){
    console.log('app element')
    var initialState = {
        temp: 'initial temp'
    };
    this.rootReducer = rootReducer;
  }
});
