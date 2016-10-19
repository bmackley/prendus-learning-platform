import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

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
      const path = `concepts/${this.conceptId}`
      const concept = await FirebaseService.get(path);
      await Actions.getConceptById(this, this.conceptId);
      this.title = concept.title;
    }
  }
  openCollaboratorsModal(e) {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }
  toggle(e: any) {
    this.querySelector('#collapsible-section').toggle();
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseEditCurrentCourse.id;
  }
  deleteItem(e: any) {
    e.stopPropagation();
    this.querySelector('#deleteConfirm').open();
  }
  async completeDelete(){
    this.querySelector('#deleteConfirm').close();
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
