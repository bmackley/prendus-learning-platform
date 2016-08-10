
import {rootReducer} from '../../redux/reducers.ts';

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(){
    this.rootReducer = rootReducer;
  }
});
