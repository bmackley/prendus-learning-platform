import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {PaymentInfo} from '../../node_modules/prendus-services/typings/payment-info';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';

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
  public querySelector: any;
  beforeRegister(): void {
    this.is = 'prendus-payment';
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
  random(min: number, max: number): number {
    return Math.round(((Math.random() * (max - min)) + min) * 100) / 100;
  }
  submit(): void {
    //TODO check if valid
    if(!this.email.match(ConstantsService.EMAIL_REGEX)) {
      this.errorMessage = '';
      this.errorMessage = 'Please enter a valid email';
    } else if(this.email && this.name && this.cardNumber && this.expiration && this.cvc) {
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
      fetch('http://localhost:5000/api/payment', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: UtilitiesService.prepareUrl(paymentInfo, false)
      }).then((response) => {
        return response.json();
      }).then((data: any) => {
        if(200 <= data.status && data.status < 300) {
          this.successMessage = '';
          this.successMessage = 'Payment complete.';
        } else {
          throw new Error(data.errorMessage);
        }
      }).catch((error: string) => {
        console.error('request failed ', error)
        this.errorMessage = '';
        this.errorMessage = 'Payment failed';
      });
    }
  }

  open(): void {
    this.querySelector('#dialog').open();
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusPayment);
