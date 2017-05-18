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
    //TODO set these to real numbers and get rid of hard coded things once our price point is set
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

  /**
   * TODO this function will be deleted once price point is set
   */
  random(min: number, max: number): number {
    return Math.round(((Math.random() * (max - min)) + min) * 100) / 100;
  }

  async submit(): Promise<void> {
    // Disable button to prevent user from clicking this a ton of times
    this.querySelector('#pay-button').disabled = true;
    try {
      const expiration: string = this.querySelector('#expiration').value;
      const expirationMonth: number = parseInt(expiration.split('/')[0]);
      const expirationYear: number = parseInt(expiration.split('/')[1]);
      const name: string = this.querySelector('#name').value;
      const email: string = this.querySelector('#email').value;
      const cardNumber: string = this.querySelector('#card').value;
      const cvc: string = this.querySelector('#cvc').value;

      // Do validations here so they're more descriptive for user
      // Stripe does backend validation for us as well.
      if(this.querySelector('#expiration').invalid) {
        Actions.showNotification(this, 'error', 'Please enter a valid expiration');
      } else if(this.querySelector('#cvc').invalid) {
        Actions.showNotification(this, 'error', 'Please enter a valid cvc');
      } else if(this.querySelector('#card').invalid) {
        // TODO this will work when this PR is merged
        // https://github.com/PolymerElements/gold-cc-input/pull/57
        Actions.showNotification(this, 'error', 'Please enter a valid card number');
      } else if(!email.match(ConstantsService.EMAIL_REGEX)) {
        Actions.showNotification(this, 'error', 'Please enter a valid email');
      } else if(email && name && cardNumber && expiration && cvc) {
        const user = await FirebaseService.getLoggedInUser();
        const paymentInfo: PaymentInfo = {
          name,
          cardNumber,
          expiration,
          cvc,
          subTotal: this.subTotal,
          tax: this.tax,
          total: this.total,
          email,
          courseId: this.courseId,
          jwt: this.jwt
        };
        const response = await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/payment/pay`, {
          method: 'post',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: UtilitiesService.prepareUrl(paymentInfo, false)
        });
        const responseBody = await response.json();
        if(200 <= responseBody.status && responseBody.status < 300) {
          Actions.showNotification(this, 'success', 'Payment complete.');
          // TODO Somehow make it more apparent that the payment was successful
          // Could we use a timeout? currently the notification doesn't display.
          this.querySelector('#dialog').close();
          location.reload();
        } else {
          throw new Error(responseBody.errorMessage);
        }

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
