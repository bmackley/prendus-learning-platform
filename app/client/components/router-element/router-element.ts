Polymer({
  is: "router-element",
  mapStateToThis: function(e) {
    if(e.detail.state.URL){
      console.log('Redux URL', e.detail.state.URL);
    }
  },
  properties: {
    },
  ready: function(e){
  }
});
