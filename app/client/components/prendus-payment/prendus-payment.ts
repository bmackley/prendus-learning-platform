import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {PaymentInfo} from '../../node_modules/prendus-services/typings/payment-info';
export class PrendusPayment {
  public is: string;
  public subTotal: number;
  public tax: number;
  public total: number;
  public name: string;
  public cardNumber: string;
  public expiration: string;
  public cvc: string;
  public email: string;
  public successMessage: string;
  public errorMessage: string;

  beforeRegister(): void {
    this.is = 'prendus-payment';

  }
  random(min: number, max: number): number {
    return Math.round(((Math.random() * (max - min)) + min) * 100) / 100;
  }
  ready(): void {
    this.subTotal = this.random(1, 100);
    this.email = 'mcrowder65@gmail.com';
    this.tax = Math.round((this.subTotal * .075) * 100) / 100;
    this.total = Math.round((this.subTotal + this.tax) * 100) / 100;
    this.name = 'Matt Crowder';
    this.cardNumber = '4242424242424242';
    this.expiration = '4/18';
    this.cvc = '082';
  }

  submit(): void {
    //TODO check if valid
    if(this.email && this.name && this.cardNumber && this.expiration && this.cvc) {

      const paymentInfo: PaymentInfo = {
        name: this.name,
        cardNumber: this.cardNumber,
        expiration: this.expiration,
        cvc: this.cvc,
        subTotal: this.subTotal,
        tax: this.tax,
        total: this.total,
        email: this.email
      };
      console.log('paymentInfo ', paymentInfo);
      fetch('http://localhost:5000/api/payment', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: UtilitiesService.prepareUrl(paymentInfo, false)
      })
      .then((response) => {
        return response.json();
      })
      .then( (data) => {
        console.log('data ', data)
        this.successMessage = '';
        this.successMessage = 'Payment complete.';
      })
      .catch( (error) => {
        console.error('request failed ', error)
        this.errorMessage = '';
        this.errorMessage = 'Payment failed!';
      });
    }
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusPayment);
