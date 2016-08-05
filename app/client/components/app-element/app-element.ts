
import {rootReducer} from '../../redux/reducers.ts';

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(e){
    this.rootReducer = rootReducer;
  }
});
