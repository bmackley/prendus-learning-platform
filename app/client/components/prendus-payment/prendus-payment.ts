import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusPayment {
  public is: string;
  public subTotal: number;
  public tax: number;
  public total: number;
  public name: string;
  public cardNumber: string;
  public expiration: any;
  public cvc: string;
  beforeRegister(): void {
    this.is = 'prendus-payment';

  }

  ready(): void {
    this.subTotal = 25;
    this.tax = 4;
    this.total = this.subTotal + this.tax;
    this.name = 'Matt Crowder';
    this.cardNumber = '4242424242424242';
    this.expiration = '4/18';
    this.cvc = '082';
  }

  submit(): void {
    if(this.name && this.cardNumber && this.expiration && this.cvc) {
      console.log('name ', this.name);
      console.log('cardNumber ', this.cardNumber);
      console.log('expiration ', this.expiration);
      console.log('cvc ', this.cvc);
      const obj = {
        name: this.name,
        cardNumber: this.cardNumber,
        expiration: this.expiration,
        cvc: this.cvc
      };
      fetch('http://localhost:5000/api/payment', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: UtilitiesService.prepareUrl(obj, false)
      })
      .then(json)
      .then( (data) => {
        console.log('data ', data)
      })
      .catch( (error) => {
        console.error('request failed ', error)
      });
    }
    function json(response: any) {
      return response.json();
    }
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusPayment);
