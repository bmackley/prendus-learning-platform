import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {User} from '../../node_modules/prendus-services/typings/user';

class PrendusTeacherApproval {

  public is: string;
  public unverifiedTeachers: User[];
	public verifiedTeachers: User[];

  beforeRegister(): void {
    this.is = 'prendus-teacher-approval';
  }

	ready(): void {
		Actions.loadTeachers(this);
	}

	showUnverifiedTeachers(unverifiedTeachers: User[]): boolean {
		return !!unverifiedTeachers.length;
	}

	showVerifiedTeachers(verifiedTeachers: User[]): boolean {
		return !!verifiedTeachers.length;
	}

	async approveTeacher(e: any): Promise<void> {
		await Actions.setUserType(this, e.model.unverifiedTeacher.id, 'verifiedTeacher');
		Actions.loadTeachers(this);
	}

	async revokeTeacher(e: any): Promise<void> {
		await Actions.setUserType(this, e.model.verifiedTeacher.id, 'unverifiedTeacher');
		Actions.loadTeachers(this);
	}

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state
		this.unverifiedTeachers = state.unverifiedTeachers;
		this.verifiedTeachers = state.verifiedTeachers;
  }

}

Polymer(PrendusTeacherApproval);
