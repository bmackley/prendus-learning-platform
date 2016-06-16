Polymer({
  is: "navbar-element",
  listeners: {

  },
  mapStateToThis: function(e) {
    console.log(e.detail.state.currentUser)
    this.username = e.detail.state.currentUser.email;
  },
  changeURL: function(e){
    console.log(e.target.id)
    let location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  },
  properties: {
      username: {
        type: String,
        value: ''
      }
    },
  ready: function(e){
  }
});
