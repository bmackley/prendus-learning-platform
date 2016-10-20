import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

export class PrendusConceptContainerEdit {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];
  public conceptData: Concept;
  public selected: number;

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
      // pass null to not fire a redux action
      const concept = await Actions.getConceptById(null, this.conceptId); 
      this.title = concept.title;
      this.tags = concept.tags;
    }
  }
  openCollaboratorsModal(e) {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }
  toggle(e: any) {
    this.querySelector('#collapsible-section').toggle();
  }
  deleteItem(e: any) {
    e.stopPropagation();
    // this.querySelector('#deleteConfirm').open();
    // Actions.deleteConcept.execute(this, this.courseId, e.target.id);
    // Actions.loadCourseConcepts(this, this.data.courseId);
    alert('Unable to delete concept (not implemented)');
  }
  ready() {
    this.selected = 0;
  }
}

Polymer(PrendusConceptContainerEdit);
