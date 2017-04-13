import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';
import {SubjectModel} from '../../node_modules/prendus-services/models/subject-model';
import {DisciplineModel} from '../../node_modules/prendus-services/models/discipline-model';
import {Discipline} from '../../node_modules/prendus-services/typings/discipline';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {Subject} from '../../node_modules/prendus-services/typings/subject';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {ConceptModel} from '../../node_modules/prendus-services/models/concept-model';

export class PrendusLearningStructure {
  public is: string;
  public querySelector: any;
  public disciplines: Discipline[];
  public chosenDiscipline: Discipline;
  public successMessage: string;
  public errorMessage: string;
  public subjects: Subject[];
  public chosenSubject: Subject;
  public concepts: Concept[];
  public chosenConcept: Concept;
  public uid: string;
  public properties: any;

  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
    this.properties = {
      chosenConcept: {
        observer: 'change'
      },
      chosenSubject: {
        observer: 'change'
      },
      chosenDiscipline: {
        observer: 'change'
      }
    };
  }

  async ready(): Promise<void> {
    // await here so when the dom loads, the disciplines will already be loaded.
    await Actions.getAllDisciplines(this);
  }

  /**
   * This idea with this function is that if the subject is null, then nothing
   * should be selected in the paper list box, same goes for discipline and
   * concept. Unfortunately, paper-list-box will not deselect something
   * when it becomes null.
   */
  change(): void {

    if(!this.chosenConcept) {
      this.removePaperListBoxSelection('concept-paper-listbox')
    }

    if(!this.chosenSubject) {
      this.removePaperListBoxSelection('subject-paper-listbox');
    }

    if(!this.chosenDiscipline) {
      this.removePaperListBoxSelection('discipline-paper-listbox');
    }

  }

  /**
   * Called when the user clicks the pencil next to the discipline list box
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
      const id: string = this.chosenDiscipline.id;
      const newDiscipline: Discipline = {
        ...this.chosenDiscipline,
        title
      };
      await DisciplineModel.createOrUpdate(id, newDiscipline);
      await Actions.getAllDisciplines(this);
      Actions.setChosenDiscipline(this, newDiscipline);

      this.refreshPaperListbox('discipline-paper-listbox');
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
      await Actions.deleteDiscipline(this, this.chosenDiscipline);
      this.successMessage = '';
      this.successMessage = 'Discipline deleted.';
    } catch(error) {
      console.error('error while deleting discipline ', error);
    }
  }
  /**
   * Called when the user changes a discipline in the select list of disciplines.
   */
  disciplineChange(e: any): void {
    const discipline: Discipline = e.model.item;
    // The discipine subjects should already be resolved so we gucci
    Actions.setChosenDiscipline(this, discipline);
    Actions.setChosenSubject(this, null);
    Actions.setChosenConcept(this, null);
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
      await Actions.setChosenResolvedDiscipline(this, id);
      Actions.setChosenSubject(this, null);
      Actions.setChosenConcept(this, null);
      this.selectLastElementInPaperListBox('discipline-paper-listbox');

      this.successMessage = '';
      this.successMessage = 'Discipline added';
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Since paperListBox is called multiple times, I decided
   * to create a getter function so that if we change the id,
   * you only have to change it in one spot in the TS.
   * I specifically chose not to put a type because there is no
   * paper-listbox type.
   */
  private getDisciplinePaperListBox() {
    const paperListBox = this.querySelector('#discipline-paper-listbox');
    return paperListBox;
  }

  /**
   * Called when the user clicks ADD SUBJECT
   */
  newSubject(): void {
    this.querySelector('#new-subject-name').value = '';
    this.querySelector('#new-subject').open();
  }

  /**
   * Called when the user clicks DONE in the
   * new subject modal.
   */
  async newSubjectDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#new-subject-name').value;
      const newSubject: Subject = {
        title,
        disciplineId: this.chosenDiscipline.id
      };
      await Actions.createSubject(this, this.chosenDiscipline.id, newSubject);

      this.selectLastElementInPaperListBox('subject-paper-listbox');

      this.successMessage = '';
      this.successMessage = 'Subject set.';

    } catch(error) {
      console.error(error.message);
    }


  }

  /**
   * Called when the user clicks DONE in the
   * edit subject modal
   */
  async editSubjectDone(): Promise<void> {
    try {
      if(!this.chosenSubject) {
        console.error('somehow the user is trying to edit an undefined subject');
      } else {
        const title: string = this.querySelector('#edit-subject-name').value;
        const newSubject: Subject = {
          ...this.chosenSubject,
          title
        }

        await SubjectModel.createOrUpdate(newSubject.id, newSubject);
        Actions.getAllDisciplines(this);
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        Actions.setChosenResolvedSubject(this, newSubject.id);
        // This is a hack so that the selected item will be updated.
        const paperListBox = this.getSubjectPaperListBox();
        paperListBox.selectPrevious();
        paperListBox.selectNext();

        this.successMessage = '';
        this.successMessage = 'Subject updated';
      }

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the pencil
   * right next to a chosen subject.
   */
  editSubject(): void {
    if(!this.chosenSubject) {
      console.error('The user is somehow editing a subject when it isn\'t defined..');
    } else {
      this.querySelector('#edit-subject-name').value = this.chosenSubject.title;
      this.querySelector('#edit-subject').open();
    }

  }

  /**
   * Called when the user clicks the trashcan
   * right next to a chosen subject
   */
  async deleteSubject(): Promise<void> {
    try {

      await Actions.deleteSubject(this, this.chosenDiscipline, this.chosenSubject);
      this.successMessage = '';
      this.successMessage = 'Subject deleted';
    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user chooses a subject in the dom.
   */
  subjectChange(e: any): void {
    try {
      const subject: Subject = e.model.item;
      Actions.setChosenSubject(this, subject);
      Actions.setChosenConcept(this, null);
    } catch(error) {
      console.error(error);
    }
  }

  private getSubjectPaperListBox() {
    const subjectListBox = this.querySelector('#subject-paper-listbox');
    return subjectListBox;
  }

  /**
   * Called when the user clicks ADD CONCEPT
   */
  newConcept(): void {
    this.querySelector('#new-concept-name').value = '';
    this.querySelector('#new-concept').open();
  }

  /**
   * Called when the user clicks DONE in the
   * new concept modal.
   */
  async newConceptDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#new-concept-name').value;
      const newConcept: Concept = {
        title,
        subjectId: this.chosenSubject.id,
        uid: this.uid //TODO this is temporary!!!!!!!!!!!! Delete this once concepts are fully moved over to lessons!!!!
      };
      await Actions.createConcept(this, this.chosenDiscipline, this.chosenSubject, newConcept);

      this.selectLastElementInPaperListBox('concept-paper-listbox');

      this.successMessage = '';
      this.successMessage = 'Concept set.';

    } catch(error) {
      console.error(error);
    }
  }


  /**
   * Called when the user clicks DONE in the
   * edit concept modal
   */
  async editConceptDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#edit-concept-name').value;
      const newConcept: Concept = {
        ...this.chosenConcept,
        title
      };

      await Actions.updateConcept(this, this.chosenDiscipline, this.chosenSubject, newConcept);
      this.refreshPaperListbox('concept-paper-listbox');
      this.successMessage = '';
      this.successMessage = 'Concept updated';

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the pencil
   * right next to a chosen concept.
   */
  editConcept(): void {
    this.querySelector('#edit-concept-name').value = this.chosenConcept.title;
    this.querySelector('#edit-concept').open();
  }

  /**
   * Called when the user clicks the trashcan
   * right next to a chosen concept
   */
  async deleteConcept(): Promise<void> {
    try {
      await Actions.deleteConcept(this, this.chosenDiscipline, this.chosenSubject, this.chosenConcept);
      this.successMessage = '';
      this.successMessage = 'Concept deleted';
    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user chooses a concept in the dom.
   */
  conceptChange(e: any): void {
    try {
      const concept: Concept = e.model.item;
      Actions.setChosenConcept(this, concept);
    } catch(error) {
      console.error(error);
    }

  }

  removePaperListBoxSelection(id: string): void {
    try {
      const paperListBox = this.querySelector(`#${id}`);
      if(paperListBox) {
        paperListBox.select(-1);
      }

    } catch(error) {
      throw error;
    }
  }

  selectLastElementInPaperListBox(id: string): void {
    const paperListBox = this.querySelector(`#${id}`);
    paperListBox.select(paperListBox.items.length - 1);
  }

  refreshPaperListbox(id: string): void {
    try {
      const paperListBox = this.querySelector(`#${id}`);
      if(paperListBox) {
        // only do things if the paperListBox is rendered in the dom.
          if(paperListBox.items.length === 1) {
            // checks to see if there is only one thing in the paper listbox,
            // if there is then select -1 then 0 because selectPrevious then
            // selectNext won't do the trick
            paperListBox.select(-1);
            paperListBox.select(0);
          } else {
            paperListBox.selectPrevious();
            paperListBox.selectNext();
          }
      }
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Called when the discipline-paper-listbox is clicked
   */
  checkIfNoDisciplines(): void {
    if(!this.disciplines || this.disciplines.length === 0) {
      this.errorMessage = '';
      this.errorMessage = 'There are no disciplines yet!';
    }
  }

  /**
   * Called when the subject-paper-listbox is clicked
   */
  checkIfNoSubjects(): void {
    if(!this.subjects || this.subjects.length === 0) {
      this.errorMessage = '';
      this.errorMessage = 'There are no subjects on the selected discipline yet!';
    }
  }

  /**
   * Called when the concept-paper-listbox is clicked
   */
  checkIfNoConcepts(): void {
    if(!this.concepts || this.concepts.length === 0) {
      this.errorMessage = '';
      this.errorMessage = 'There are no concepts on the selected subject yet!';
    }
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.disciplines = state.disciplines;
    this.chosenDiscipline = state.chosenDiscipline;
    this.subjects = state.chosenDiscipline ? state.chosenDiscipline.resolvedSubjects : null;
    this.chosenSubject = state.chosenDiscipline ? state.chosenSubject : null;
    this.concepts = state.chosenSubject ? state.chosenSubject.resolvedConcepts : null;
    this.chosenConcept = state.chosenSubject ? state.chosenConcept : null;
    this.uid = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.uid : null;
  }


}

Polymer(PrendusLearningStructure);
