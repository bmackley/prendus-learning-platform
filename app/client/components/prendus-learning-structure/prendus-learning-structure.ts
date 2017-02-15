import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';


export class PrendusLearningStructure {
  public is: string;
  public subjects: string[];
  public querySelector: any;
  
  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
  }

  async ready(): Promise<void> {
    await Actions.initSubjects(this, null);
  }

  newSubject(e: any): void {
    this.querySelector('#new-subject').open();
    console.log('new subject');
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.subjects = state.subjects;
  }


}

Polymer(PrendusLearningStructure);
