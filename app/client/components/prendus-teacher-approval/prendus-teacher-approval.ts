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

	async approveTeacher(e: any): Promise<void> {
		await Actions.approveTeacher(this, e.model.unverifiedTeacher.id);
		Actions.loadTeachers(this);
	}

	async revokeTeacher(e: any): Promise<void> {
		await Actions.revokeTeacher(this, e.model.verifiedTeacher.id);
		Actions.loadTeachers(this);
	}

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state
		this.unverifiedTeachers = state.unverifiedTeachers;
		this.verifiedTeachers = state.verifiedTeachers;
  }

}

Polymer(PrendusTeacherApproval);
