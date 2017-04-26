import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {User} from '../../node_modules/prendus-services/typings/user';
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
  public querySelectorAll: any;
  public disciplines: Discipline[];
  public chosenDiscipline: Discipline;
  public successMessage: string;
  public errorMessage: string;
  public subjects: Subject[];
  public chosenSubject: Subject;
  public concepts: Concept[];
  public chosenConcept: Concept;
	public editingIds: string[];
	public deleteEvent: any;
	public itemType: string;
	public itemName: string;
	public isAdmin: boolean;
  public properties: any;
  public updateStyles: any;

  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
  }

  async ready(): Promise<void> {
		this.editingIds = [];
		this.disciplines = null;
		this.subjects = null;
		this.concepts = null;
    // await here so when the dom loads, the disciplines will already be loaded.
    await Actions.getAllDisciplines(this);
  }

	showNoDisciplines(disciplines: Discipline[]): boolean {
		return disciplines && disciplines.length === 0;
	}

	showNoSubjects(subjects: Subject[]): boolean {
		return subjects && subjects.length === 0;
	}

	showNoConcepts(concepts: Concept[]): boolean {
		return concepts && concepts.length === 0;
	}

	// TODO: optimize the adding so the user sees the new item box right away

	/**
	 * Add a blank discipline in edit mode to the discipline column
	 */
	async addDiscipline(e: any): Promise<void> {
		await Actions.createDiscipline(this, '');
		// new discipline will be set to chosenDiscipline
		this.addToEditing(this, this.chosenDiscipline.id);
	}

	/**
	 * Add a blank discipline in edit mode to the discipline column
	 */
	async addSubject(e: any): Promise<void> {
		const newSubject: Subject = {
			title: '',
			disciplineId: this.chosenDiscipline.id
		};
		await Actions.createSubject(this, this.chosenDiscipline.id, newSubject);
		// new subject will be set to chosenSubject
		this.addToEditing(this, this.chosenSubject.id);
	}

	/**
	 * Add a blank discipline in edit mode to the discipline column
	 */
	async addConcept(e: any): Promise<void> {
		const newConcept: Concept = {
			title: '',
			subjectId: this.chosenSubject.id
		};
		await Actions.createConcept(this, this.chosenDiscipline, this.chosenSubject, newConcept);
		// new subject will be set to chosenConcept
		this.addToEditing(this, this.chosenConcept.id);
	}

	/**
	 * Change the currently selected item
	 */
	changeItem(e: any): void {
		// discipline
		if(e.model.discipline) {
			const discipline: Discipline = e.model.discipline;
			// clear all disciplines of selections
			for(let item of this.querySelectorAll('#disciplines .column-item')) {
				item.removeAttribute('selected');
			}
			// clear all subjects of selections
			for(let item of this.querySelectorAll('#subjects .column-item')) {
				item.removeAttribute('selected');
			}
			this.querySelector(`#discipline${discipline.id}`).setAttribute('selected', '');
	    Actions.setChosenDiscipline(this, discipline);
	    Actions.setChosenSubject(this, null);
	    Actions.setChosenConcept(this, null);
		// subject
		} else if (e.model.subject) {
			const subject: Subject = e.model.subject;
			// clear all subjects of selections
			for(let item of this.querySelectorAll('#subjects .column-item')) {
				item.removeAttribute('selected');
			}
			// clear all concepts of selections
			for(let item of this.querySelectorAll('#concepts .column-item')) {
				item.removeAttribute('selected');
			}
			this.querySelector(`#subject${subject.id}`).setAttribute('selected', '');
	    Actions.setChosenSubject(this, subject);
	    Actions.setChosenConcept(this, null);
		// concept
		} else if (e.model.concept) {
			const concept: Concept = e.model.concept;
			// clear all concepts of selections
			for(let item of this.querySelectorAll('#concepts .column-item')) {
				item.removeAttribute('selected');
			}
			this.querySelector(`#concept${concept.id}`).setAttribute('selected', '');
	    Actions.setChosenConcept(this, concept);
		}
		// update the custom property styles used for paper-input
		this.updateStyles();
	}

	/**
	 * Tells an item whether or not it is being edited
	 */
	editing(id: string): boolean {
		if(!this.editingIds) return false;
		return this.editingIds.indexOf(id) !== -1;
	}

	/**
	 * Gets the correct icon for the edit button
	 */
	 getEditIcon(id: string): string {
		 return this.editing(id) ? 'check' : 'create';
	 }

  /**
   * Toggles editing an item
   */
  async toggleEdit(e: any): Promise<void> {
		this.successMessage = '';
		// discipline
		if(e.model.discipline) {
			const id: string = e.model.discipline.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.discipline.title;
				// use model for the discipline because it may not be selected
				const updatedDiscipline: Discipline = {
					...e.model.discipline,
					title
				}
				await Actions.updateDiscipline(this, updatedDiscipline);
				this.successMessage = `Discipline ${title} updated.`;
				this.removeFromEditing(this, id);
			}
			else this.addToEditing(this, id);
			// subject
		} else if(e.model.subject) {
			const id: string = e.model.subject.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.subject.title;
				// use model for the subject because it may not be selected
				const updatedSubject: Subject = {
					...e.model.subject,
					title
				}
				await Actions.updateSubject(this, this.chosenDiscipline, updatedSubject);
				this.successMessage = `Subject ${title} updated.`;
				this.removeFromEditing(this, id);
			}
			else this.addToEditing(this, id);
			// concept
		} else if(e.model.concept) {
			const id: string = e.model.concept.id;
			// if editing
			if(this.editingIds.indexOf(id) !== -1) {
				// update in database
				const title = e.model.concept.title;
				// use model for the concept because it may not be selected
				const updatedConcept: Concept = {
					...e.model.concept,
					title
				}
				await Actions.updateConcept(this, this.chosenDiscipline, this.chosenSubject, updatedConcept);
				this.successMessage = `Concept ${title} updated.`;
				this.removeFromEditing(this, id);
			}
			else this.addToEditing(this, id);
		}
		this.changeItem(e);
  }

	/**
	* Add the ID to the array of IDs being edited
	*/
	addToEditing(context: PrendusLearningStructure, id: string) {
		context.editingIds = [
			...context.editingIds,
			id
		];
	}

	/**
	* Remove the ID from the array of IDs being edited
	*/
	removeFromEditing(context: PrendusLearningStructure, id: string) {
		context.editingIds = context.editingIds.filter((element: string) => element !== id);
	}

	/**
	 * Open the delete dialog so the user can confirm deletion
	 */
	openDeleteDialog(e: any): void {
		// save the delete event so we can get to the model later
		this.deleteEvent = e;
		// discipline
		if(e.model.discipline) {
			this.itemType = 'discipline';
			this.itemName = e.model.discipline.title;
		// subject
		} else if (e.model.subject) {
			this.itemType = 'subject';
			this.itemName = e.model.subject.title;
		// concept
		} else if (e.model.concept) {
			this.itemType = 'concept';
			this.itemName = e.model.concept.title;
		}
		this.querySelector('#delete-dialog').open();
	}

	/**
	 * Delete an item from the learning structure
	 */
	async deleteItem(): Promise<void> {
		this.successMessage = '';
		const e = this.deleteEvent;
		// discipline
		if(e.model.discipline) {
			await Actions.deleteDiscipline(this, e.model.discipline);
			this.successMessage = `Discipline ${e.model.discipline.title} deleted.`;
		// subject
		} else if (e.model.subject) {
			await Actions.deleteSubject(this, this.chosenDiscipline, e.model.subject);
			this.successMessage = `Subject ${e.model.subject.title} deleted.`;
		// concept
		} else if (e.model.concept) {
			await Actions.deleteConcept(this, this.chosenDiscipline, this.chosenSubject, e.model.concept);
			this.successMessage = `Concept ${e.model.concept.title} deleted.`;
		}
	}

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
		this.isAdmin = state.currentUser.userType === 'administrator';
    this.disciplines = state.disciplines;
    this.chosenDiscipline = state.chosenDiscipline;
    this.subjects = state.chosenDiscipline ? state.chosenDiscipline.resolvedSubjects : null;
    this.chosenSubject = state.chosenDiscipline ? state.chosenSubject : null;
    this.concepts = state.chosenSubject ? state.chosenSubject.resolvedConcepts : null;
    this.chosenConcept = state.chosenSubject ? state.chosenConcept : null;
  }

}

Polymer(PrendusLearningStructure);
