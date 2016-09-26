import {Actions} from '../../redux/actions.ts';

class PrendusLanding {
  public is: string;

  beforeRegister() {
    this.is = 'prendus-landing';
  }
  changeURL(e: any){
    const location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }
}
Polymer(PrendusLanding);
