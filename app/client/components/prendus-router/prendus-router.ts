
class PrendusRouter {
  public is: string;

  beforeRegister() {
    this.is =  "prendus-router";
  }
  mapStateToThis(e) {
      const state = e.detail.state;
  }
  async ready() {
  }
}
Polymer(PrendusRouter);
