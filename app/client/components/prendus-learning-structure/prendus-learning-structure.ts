import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';
import {SubjectsModel} from '../../node_modules/prendus-services/models/subjects-model';

export class PrendusLearningStructure {
  public is: string;
  public subjects: string[];
  public querySelector: any;
  public chosenSubject: string;
  public gradeLevels: string[];
  public subtopics: string[];

  //discipline
    // ?id
    // title
    // subjectid[]
    // ?conceptid[]
  //subject
    // ?id
    // title
    // conceptid[]
    // ?disciplineId
  //concept
    // ?id
    // title
    // ?disciplineid
    // ?subjectid
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

  /**
   * Called when done is tapped in the new subject dialog
   */
  async newSubjectDone(e: any): Promise<void> {
    console.log(this.newSubjectName);
    const newSubjectName: string = this.querySelector('#new-subject-name');
    await SubjectsModel.createOrUpdate(null, newSubjectName);
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

  newGradeLevel(e: any): void {
    this.querySelector('#new-grade-level').open();
  }

  newSubtopic(e: any): void {
    this.querySelector('#new-subtopic').open();
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
