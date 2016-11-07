import {Actions} from '../../redux/actions.ts';

class PrendusLanding {
  public is: string;

  beforeRegister() {
    this.is = 'prendus-landing';
  }
}
Polymer(PrendusLanding);
