import {Actions} from '../../redux/actions';

class PrendusFooter {
  public is: string;

  beforeRegister() {
    this.is = 'prendus-footer';
  }
  changeURL(e: any){
    const location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }
}

Polymer(PrendusFooter);
