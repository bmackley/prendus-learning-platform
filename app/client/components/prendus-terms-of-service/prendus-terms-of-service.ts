
class PrendusTermsOfService {
  public is: string;

  beforeRegister() {
    this.is = 'prendus-terms-of-service';
  }
}
addEventListener('WebComponentsReady', function() {
  Polymer(PrendusTermsOfService);
})
