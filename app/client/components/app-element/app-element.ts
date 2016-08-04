// <reference path="../../node_modules/prendus-services/typings/custom.d.ts" />
// <reference path="../../node_modules/prendus-services/typings/polymer/polymer.d.ts" />

import {rootReducer} from '../../redux/reducers.ts';

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(e){
    this.rootReducer = rootReducer;
  }
});
