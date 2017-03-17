import {Actions} from '../../redux/actions';

class PrendusFooter {
  public is: string;
  public fire: any;
	public route: any;

  beforeRegister(): void {
    this.is = 'prendus-footer';
  }

  getYear(): number {
    const currentDate: Date = new Date();
    return currentDate.getFullYear();
  }

	/**
	 * Don't show the footer on the homepage; it's a pain with the iron-list
	 */
	showFooter(page: string): boolean {
		return page !== '';
	}

}

Polymer(PrendusFooter);
