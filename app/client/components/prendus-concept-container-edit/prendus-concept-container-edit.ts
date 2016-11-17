import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
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
  public tags: string[];
  public fire: any;
  beforeRegister() {
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
  async init() {
    if (this.conceptId) {
      try {
        const concept: Concept = await Actions.getConceptById(null, this.conceptId);
        this.title = concept.title;
        this.tags = concept.tags;
      } catch(error) {
        this.errorMessage = error.message;
      }

    }
  }
  editItem(e: any) {
    this.fire("edit-concept", { conceptId: this.conceptId});
  }
  openCollaboratorsModal(e: any) {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }
  toggle(e: any) {
    this.querySelector('#collapsible-section').toggle();
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
  }
  deleteItem(e: any) {
    e.stopPropagation();
    this.querySelector('#delete-confirm-modal').open();
  }
  async completeDelete(){
    this.querySelector('#delete-confirm-modal').close();
    try{
      await Actions.deleteConcept(this, this.courseId, this.conceptId);
      await Actions.loadEditCourseConcepts(this, this.courseId);
      this.successMessage = '';
      this.successMessage = 'Concept Deleted Successfully'
    }catch(error){
      this.errorMessage = error.message;
    }
  }
  ready() {
    this.selected = 0;
  }
}

Polymer(PrendusConceptContainerEdit);
