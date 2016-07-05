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
    console.log('route', this.route)
    console.log('page Data', this.pageData)
    console.log('page tail', this.pageTail)
    console.log('page Active', this.pageActive)
  }
});
