
class RouterElement {
  public is: string;

  beforeRegister() {
    this.is =  "router-element";
  }
  mapStateToThis(e) {
      const state = e.detail.state;
  }
  async ready() {
  }
}
Polymer(RouterElement);
