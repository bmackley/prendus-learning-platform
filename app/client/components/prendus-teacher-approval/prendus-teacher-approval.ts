import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {User} from '../../node_modules/prendus-services/typings/user';

class PrendusTeacherApproval extends Polymer.Element {
  public unverifiedTeachers: User[];
  public verifiedTeachers: User[];

    static get is() { return 'prendus-teacher-approval'; }

    connectedCallback() {
        super.connectedCallback();

        Actions.loadTeachers(this);
    }

	showUnverifiedTeachers(unverifiedTeachers: User[]): boolean {
		return !!unverifiedTeachers.length;
	}

	showVerifiedTeachers(verifiedTeachers: User[]): boolean {
		return !!verifiedTeachers.length;
	}

	async approveTeacher(e: any): Promise<void> {
		await Actions.setUserType(e.model.unverifiedTeacher.id, 'verifiedTeacher');
		Actions.loadTeachers(this);
	}

	async revokeTeacher(e: any): Promise<void> {
		await Actions.setUserType(e.model.verifiedTeacher.id, 'unverifiedTeacher');
		Actions.loadTeachers(this);
	}

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;

	this.unverifiedTeachers = state.unverifiedTeachers;
	this.verifiedTeachers = state.verifiedTeachers;
  }

}

window.customElements.define(PrendusTeacherApproval.is, PrendusTeacherApproval);
