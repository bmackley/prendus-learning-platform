import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {Tag} from '../../node_modules/prendus-services/typings/tag';

export class PrendusConceptContainerEdit {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public courseId: string;
  public observers: string[];
  public selected: number;
  public successMessage: string;
  public errorMessage: string;
  public querySelector: any;
  public tags: Tag[];
  public fire: any;

  beforeRegister(): void {
    this.is = 'prendus-concept-container-edit';
    this.properties = {
      conceptId: {
          type: String
      }
    };
    this.observers = [
        'init(conceptId)'
    ];
  }

  async init(): Promise<void> {
    if (this.conceptId) {
      try {
        const concept: Concept = await Actions.getConceptById(null, this.conceptId);
        this.title = concept.title;
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }

    }
  }

  editItem(e: any): void {
    this.fire("edit-concept", { conceptId: this.conceptId});
  }

  openCollaboratorsModal(e: any): void {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }

  toggle(e: any): void {
    this.querySelector('#collapsible-section').toggle();
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
  }

  deleteItem(e: any): void {
    e.stopPropagation();
    this.querySelector('#delete-confirm-modal').open();
  }

  async completeDelete(): Promise<void> {
    this.querySelector('#delete-confirm-modal').close();
    try {
      await Actions.deleteConcept(this, this.courseId, this.conceptId);
      await Actions.loadViewCourseConcepts(this, this.courseId);
      this.successMessage = '';
      this.successMessage = 'Concept deleted successfully';
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }
  ready(): void {
    this.selected = 0;
  }
}

Polymer(PrendusConceptContainerEdit);
