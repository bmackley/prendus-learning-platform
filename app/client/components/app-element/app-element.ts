import {rootReducer} from '/../../redux/reducers.ts';

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
