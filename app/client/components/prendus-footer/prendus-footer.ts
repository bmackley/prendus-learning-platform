import {Actions} from '../../redux/actions';

class PrendusFooter {
  public is: string;
  public fire: any;

  beforeRegister(): void {
    this.is = 'prendus-footer';
  }

  getYear(): number {
    const currentDate: Date = new Date();
    return currentDate.getFullYear();
  }

}

Polymer(PrendusFooter);
