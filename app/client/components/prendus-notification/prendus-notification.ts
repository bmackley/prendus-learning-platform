class PrendusNotification {
  public is: string;
  public username: string;
  public message: string;
  public properties: any;
  public toastText: string;
  public errorMessage: string;
  public successMessage: string;
  public querySelector: any;

  beforeRegister() {
    this.is = 'prendus-notification';
    this.properties = {
        successMessage: {
          type: String,
          observer: 'showSuccessMessage'
        },
        errorMessage: {
          type: String,
          observer: 'showErrorMessage'
        }
    }
  }

  showErrorMessage() {
    if(this.errorMessage) {
      this.toastText = this.errorMessage;
      this.querySelector('#errorToastContainer').open();
    }
  }

  showSuccessMessage() {
    if(this.successMessage) {
      this.toastText = this.successMessage;
      this.querySelector('#successToastContainer').open();
    }
  }

}

Polymer(PrendusNotification);
