import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';
import {SubjectsModel} from '../../node_modules/prendus-services/models/subjects-model';
import {DisciplinesModel} from '../../node_modules/prendus-services/models/discipline-model';
import {Discipline} from '../../node_modules/prendus-services/typings/discipline';

export class PrendusLearningStructure {
  public is: string;
  public subjects: string[] = [];
  public querySelector: any;
  public chosenSubject: string;
  public gradeLevels: string[];
  public subtopics: string[];
  public disciplines: Discipline[];
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
    Actions.getAllDisciplines(this);
  }

  async subjectChange(e: any) {
    const subject: string = e.model.item;

    await Actions.initGradeLevelsBySubjectName(this, subject);
    await Actions.initSubTopics(this, null, subject);
  }

  newGradeLevel(e: any): void {
    this.querySelector('#new-grade-level').open();
  }

  newSubtopic(e: any): void {
    this.querySelector('#new-subtopic').open();
  }

  disciplineChange(): void {

  }

  newDiscipline(): void {
    console.log('new discipline')
    this.querySelector('#new-discipline').open();
  }
  async newDisciplineDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#new-discipline-name').value;
      const id: string = await DisciplinesModel.createOrUpdate(null, {
        title
      });
      console.log('id ', id);

    } catch(error) {
      console.error(error);
    }

  }
  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.disciplines = state.disciplines;
  }


}

Polymer(PrendusLearningStructure);
