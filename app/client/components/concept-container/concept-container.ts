import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

export class ConceptComponent {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];
  public conceptData: Concept;

  beforeRegister() {
    this.is = 'concept-container';
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
      console.log('concept-container ', concept)
      this.title = concept.title;
      // await Actions.getConceptById.execute(this, this.conceptId);
    }
  }
  toggle(e: any) {
    let collapseTarget = (e.target.id);
    console.log('collapseTarget', collapseTarget)
    console.log('concept id', this.conceptId)
    this.querySelector('.conceptToggle').toggle();
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.conceptData = state.currentConcept;
    console.log('conceptData')
  }
  ready() {
    console.log('Hallelejuah!')
  }
}

Polymer(ConceptComponent);
