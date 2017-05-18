import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {PaymentInfo} from '../../node_modules/prendus-services/typings/payment-info';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {State} from '../../typings/state';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';

class PrendusPayment {
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
  public properties: any;
  public courseId: string;
  public jwt: string;
  public course: Course;

  beforeRegister(): void {
    this.is = 'prendus-payment';
    this.properties = {
      courseId: {
        type: String,
        observer: 'courseIdSet'
      }
    };
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

  async courseIdSet(): Promise<void> {
    await Actions.getCourseViewCourseById(this, this.courseId);
  }

  random(min: number, max: number): number {
    return Math.round(((Math.random() * (max - min)) + min) * 100) / 100;
  }

  async submit(): Promise<void> {
    this.querySelector('#pay-button').disabled = true;
    try {
      const expirationMonth: number = parseInt(this.expiration.split('/')[0]);
      const expirationYear: number = parseInt(this.expiration.split('/')[1]);


      if(this.querySelector('#expiration').invalid) {
        Actions.showNotification(this, 'error', 'Please enter a valid expiration');
      } else if(this.querySelector('#cvc').invalid) {
        Actions.showNotification(this, 'error', 'Please enter a valid cvc');
      } else if(this.querySelector('#card').invalid) {
        // TODO this will work when this PR is merged
        // https://github.com/PolymerElements/gold-cc-input/pull/57
        Actions.showNotification(this, 'error', 'Please enter a valid card number');
      } else if(!this.email.match(ConstantsService.EMAIL_REGEX)) {
        Actions.showNotification(this, 'error', 'Please enter a valid email');
      } else if(this.email && this.name && this.cardNumber && this.expiration && this.cvc) {
        const user = await FirebaseService.getLoggedInUser();
        const paymentInfo: PaymentInfo = {
          name: this.name,
          cardNumber: this.cardNumber,
          expiration: this.expiration,
          cvc: this.cvc,
          subTotal: this.subTotal,
          tax: this.tax,
          total: this.total,
          email: this.email,
          courseId: this.courseId,
          jwt: this.jwt
        };
        await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/payment/pay`, {
          method: 'post',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: UtilitiesService.prepareUrl(paymentInfo, false)
        }).then((response) => {
          return response.json();
        }).then((data: any) => {
          if(200 <= data.status && data.status < 300) {
            Actions.showNotification(this, 'success', 'Payment complete.');
          } else {
            throw new Error(data.errorMessage);
          }
          this.querySelector('#dialog').close();
        }).catch((error: string) => {
          console.error('request failed ', error)
          Actions.showNotification(this, 'error', 'Payment failed');

        });
      }

    } catch(error) {
      console.error('error while processing payment ', error);
      Actions.showNotification(this, 'error', 'Something went wrong while processing your payment...')
    }
    this.querySelector('#pay-button').disabled = false;
  }

  open(): void {
    this.querySelector('#dialog').open();
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.jwt = state.jwt;
    this.course = state.courseViewCurrentCourse;
  }
}

Polymer(PrendusPayment);
