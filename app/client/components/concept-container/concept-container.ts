import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class ConceptComponent {
  public is: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];

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
      console.log(this.conceptId)
    }
  }
  ready() {
    console.log('Hallelejuah!')
  }
}

Polymer(ConceptComponent);
