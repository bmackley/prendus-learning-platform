import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';
import {SubjectsModel} from '../../node_modules/prendus-services/models/subjects-model';
import {DisciplineModel} from '../../node_modules/prendus-services/models/discipline-model';
import {Discipline} from '../../node_modules/prendus-services/typings/discipline';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusLearningStructure {
  public is: string;
  public subjects: string[] = [];
  public querySelector: any;
  public chosenSubject: string;
  public gradeLevels: string[];
  public subtopics: string[];
  public disciplines: Discipline[];
  public chosenDiscipline: Discipline;
  public successMessage: string;
  public errorMessage: string;
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

  /**
   * Called when the user clicks the pencil
   */
  editDiscipline(): void {
    this.querySelector('#edit-discipline-name').value = this.chosenDiscipline.title;
    this.querySelector('#edit-discipline').open();
  }

  /**
   * Called when the user clicks DONE in the edit-discipline-modal
   */
  async editDisciplineDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#edit-discipline-name').value;
      const id: string = this.querySelector('#edit-discipline').disciplineId;
      const newDiscipline: Discipline = {
        ...this.chosenDiscipline,
        title
      };
      await DisciplineModel.createOrUpdate(id, newDiscipline);
      await Actions.getAllDisciplines(this);
      Actions.setChosenDiscipline(this, newDiscipline);

      // This is a hack so that the selected item will be updated.
      const paperListBox = this.querySelector('#discipline-paper-listbox');
      paperListBox.selectPrevious();
      paperListBox.selectNext();

      this.successMessage = '';
      this.successMessage = 'Discipline updated.';
    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the trashcan next to the discipline.
   */
  async deleteDiscipline(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
        this.errorMessage = '';
        this.errorMessage = 'How the heck did you get here?';
      } else {
        await DisciplineModel.deleteDiscipline(this.chosenDiscipline.id);
        await Actions.getAllDisciplines(this);
        Actions.setChosenDiscipline(this, null);
        const paperListBox = this.querySelector('#discipline-paper-listbox');
        paperListBox.select(-1);

        this.successMessage = '';
        this.successMessage = 'Discipline deleted.';
      }
    } catch(error) {
      console.error(error.message);
    }
  }
  /**
   * Called when the user changes a discipline in the select list of disciplines.
   */
  disciplineChange(e: any): void {
    const discipline: Discipline = e.model.item;
    Actions.setChosenDiscipline(this, discipline);
  }

  /**
   * Called when the user clicks the button ADD DISCIPLINE
   */
  newDiscipline(): void {
     this.querySelector('#new-discipline-name').value = '';
    this.querySelector('#new-discipline').open();
  }

  /**
   * Called when the user clicks done in the new-discipline modal.
   */
  async newDisciplineDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#new-discipline-name').value;
      const id: string = await DisciplineModel.createOrUpdate(null, {
        title
      });
      await Actions.getAllDisciplines(this);
      this.successMessage = '';
      this.successMessage = 'Discipline added';
    } catch(error) {
      console.error(error);
    }
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.disciplines = state.disciplines;
    this.chosenDiscipline = state.chosenDiscipline ? state.chosenDiscipline : null;
  }


}

Polymer(PrendusLearningStructure);
