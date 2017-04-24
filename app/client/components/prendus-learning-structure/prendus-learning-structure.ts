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
	public editingIds: string[];
  public properties: any;

  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
    // this.properties = {
    //   chosenConcept: {
    //     observer: 'change'
    //   },
    //   chosenSubject: {
    //     observer: 'change'
    //   },
    //   chosenDiscipline: {
    //     observer: 'change'
    //   }
    // };
  }

  async ready(): Promise<void> {
		this.editingIds = [];
    // await here so when the dom loads, the disciplines will already be loaded.
    await Actions.getAllDisciplines(this);
  }

	/**
	 * Tells an item whether or not it is being edited
	 */
	editing(id: string): boolean {
		if(!this.editingIds) return false;
		return this.editingIds.indexOf(id) !== -1;
	}

  /**
   * Toggles editing an item
   */
  async toggleEdit(e: any): Promise<void> {
		this.successMessage = '';
		// discipline
		if(e.model.discipline) {
			if(!this.chosenDiscipline) this.changeDiscipline(e);
			const id: string = e.model.discipline.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.discipline.title;
				const updatedDiscipline: Discipline = {
					...this.chosenDiscipline,
					title
				}
				await Actions.updateDiscipline(this, updatedDiscipline);
				this.successMessage = `Discipline ${title} updated.`;
				removeFromEditing(this, id);
			}
			else addToEditing(this, id);
			// subject
		} else if(e.model.subject) {
			if(!this.chosenSubject) this.changeSubject(e);
			const id: string = e.model.subject.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.subject.title;
				const updatedSubject: Subject = {
					...this.chosenSubject,
					title
				}
				await Actions.updateSubject(this, this.chosenDiscipline, updatedSubject);
				this.successMessage = `Subject ${title} updated.`;
				removeFromEditing(this, id);
			}
			else addToEditing(this, id);
			// concept
		} else if(e.model.concept) {
			if(!this.chosenConcept) this.changeConcept(e);
			const id: string = e.model.concept.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.concept.title;
				const updatedConcept: Concept = {
					...e.model.concept,
					title
				}
				this.successMessage = `Concept ${title} updated.`;
				removeFromEditing(this, id);
			}
			else addToEditing(this, id);
		}

		/**
		 * Add the ID to the array of IDs being edited
		 */
		function addToEditing(context: PrendusLearningStructure, id: string) {
			context.editingIds = [
				...context.editingIds,
				id
			];
		}

		/**
		 * Remove the ID from the array of IDs being edited
		 */
		function removeFromEditing(context: PrendusLearningStructure, id: string) {
			context.editingIds = context.editingIds.filter((element: string) => element !== id);
		}
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
      await Actions.updateDiscipline(this, newDiscipline);

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
  changeDiscipline(e: any): void {
    const discipline: Discipline = e.model.discipline;
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
      await Actions.addDiscipline(this, title);
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
      const title: string = this.querySelector('#edit-subject-name').value;
      const newSubject: Subject = {
        ...this.chosenSubject,
        title
      }

      await Actions.updateSubject(this, this.chosenDiscipline, this.chosenSubject);
      this.refreshPaperListbox('subject-paper-listbox');
      this.successMessage = '';
      this.successMessage = 'Subject updated';

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the pencil
   * right next to a chosen subject.
   */
  editSubject(): void {
    this.querySelector('#edit-subject-name').value = this.chosenSubject.title;
    this.querySelector('#edit-subject').open();

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
  changeSubject(e: any): void {
    try {
      const subject: Subject = e.model.subject;
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
        subjectId: this.chosenSubject.id
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
  changeConcept(e: any): void {
    try {
      const concept: Concept = e.model.concept;
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
  }

}

Polymer(PrendusLearningStructure);
