import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {UserType} from '../../node_modules/prendus-services/typings/user-type';

export class PrendusProfile {
  public is: string;
	public userType: UserType;
  public firstName: string;
  public lastName: string;
  public institution: string;
  public pastEmail: string;
  public email: string;
  public password: string;
  public uid: string;
  public metaData: UserMetaData;
  public updateProfileSuccessToastText: string;
  public updateProfileErrorToastText: string;
  public errorMessage: string;
  public successMessage: string;
  public querySelector: any;

  beforeRegister(): void {
    this.is = 'prendus-profile';
  }

	ready(): void {
		this.querySelector('#updateProfileErrorToast').fitInto = this.querySelector('#toastTarget');
		this.querySelector('#updateProfileSuccessToast').fitInto = this.querySelector('#toastTarget');
		Actions.defaultAction(this);
	}

	getUserTypeText(userType: UserType): string {
		switch(userType) {
			case 'student':
				return 'Student';
			case 'unverifiedTeacher':
				return 'Unverified teacher';
			case 'verifiedTeacher':
				return 'Verified teacher';
			case 'administrator':
				return 'Administrator'
			default:
				return 'an unknown user type...';
		}
	}

	showTeacherSelection(userType: UserType): boolean {
		return userType === 'student' || userType === 'unverifiedTeacher';
	}

	showTeacherNote(userType: UserType): boolean {
		return userType === 'unverifiedTeacher';
	}

  async changeProfile(e: any): Promise<void> {
    if(this.querySelector('#updateEmail').value != this.pastEmail) {
      this.querySelector('#enter-password').open();
    } else {
      const submitValue: UserMetaData = {
        uid: this.uid,
        firstName: this.querySelector('#firstName').value,
        lastName: this.querySelector('#lastName').value,
        institution: this.querySelector('#institution').value,
        email: this.email
      }
      try {
				// only attempt to change the user type if the user is allowed to
				if(this.userType === 'student' || this.userType === 'unverifiedTeacher') {
					await Actions.setUserType(this, this.uid, this.userType);
				}
        await Actions.updateUserMetaData(this, this.uid, submitValue);
        this.successMessage = '';
        this.successMessage = 'Profile Updated Successfully';
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }

	enableConfirmEmail(password: string): boolean {
		return password.length >= 6;
	}

	confirmIfEnter(e: any): void {
		if(e.keyCode === 13 && this.enableConfirmEmail(this.password)) this.changeEmail();
	}

	async changeEmail(): Promise<void> {
		this.querySelector('#enter-password').close();
		try {
			const submitValue: UserMetaData = {
				uid: this.uid,
				firstName: this.querySelector('#firstName').value,
				lastName: this.querySelector('#lastName').value,
				institution: this.querySelector('#institution').value,
				email:  this.querySelector('#updateEmail').value,
			};
			await Actions.updateUserEmail(this, this.pastEmail, this.querySelector('#password').value, submitValue.email);
			await Actions.updateUserMetaData(this, this.uid, submitValue);
			this.successMessage = '';
			this.successMessage = 'Account updated successfully.';
		} catch(error) {
			this.errorMessage = '';
			this.errorMessage = 'Could not update account.  Please try again later.';
			console.error(error);
		}
		// clear password form
		this.password = '';
	}

  submitKeydown(e: any): void {
    if(e.keyCode === 13) this.changeProfile(e);
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state = e.detail.state;
		this.userType = state.currentUser.userType;
		this.firstName = state.currentUser.metaData.firstName;
		this.lastName = state.currentUser.metaData.lastName;
		this.institution = state.currentUser.metaData.institution;
		this.pastEmail = state.currentUser.metaData.email;
		this.email = state.currentUser.metaData.email;
		this.uid = state.currentUser.metaData.uid;
		this.metaData = state.currentUser.metaData;
	}
}

Polymer(PrendusProfile);
