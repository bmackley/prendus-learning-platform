import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';


export class PrendusLearningStructure {
  public is: string;
  public subjects: string[];
  public querySelector: any;
  public chosenSubject: string;
  public gradeLevels: string[];
  public subtopics: string[];

  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
  }

  async ready(): Promise<void> {
    await Actions.initSubjects(this, null);
  }

  async subjectChange(e: any) {
    const subject: string = e.model.item;

    await Actions.initGradeLevelsBySubjectName(this, subject);
    await Actions.initSubTopics(this, null, subject);
  }

  newSubject(e: any): void {
    this.querySelector('#new-subject').open();

    console.log('new subject');
  }

  deleteGradeLevel(e: any): void {
    const gradeLevel: string = e.model.item;
    console.log('gradeLevel ', gradeLevel);
    console.log('delete item!');
    console.log('chosenSubject ', this.chosenSubject);
  }

  deleteSubtopic(e: any): void {
    const subtopic: string = e.model.item;
    console.log('gradeLevel ', subtopic);
    console.log('delete item!');
    console.log('chosenSubject ', this.chosenSubject);
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.subjects = state.subjects;
    this.gradeLevels = state.gradeLevels;
    this.chosenSubject = state.subject;
    this.subtopics = state.subtopics;
  }


}

Polymer(PrendusLearningStructure);
