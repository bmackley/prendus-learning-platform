
class PrendusExample {
  public is: string;

  beforeRegister() {
    this.is = 'prendus-privacy-policy';
  }
}
addEventListener('WebComponentsReady', function() {
  Polymer(PrendusExample);
})
