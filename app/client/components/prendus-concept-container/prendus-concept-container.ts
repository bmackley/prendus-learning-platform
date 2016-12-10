import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';

class PrendusConceptContainer {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];
  public conceptData: Concept;
  public selected: number;
  public errorMessage: string;
  public tags: string[];
  beforeRegister() {
    this.is = 'prendus-concept-container';
    this.properties = {
      conceptId: {
          type: String
      },
      courseId: {
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
        const concept = await Actions.getConceptById(null, this.conceptId);
        this.title = concept.title;
        this.tags = concept.tags;
      } catch(error) {
        this.errorMessage = error.message;
      }
    }
  }

  toggle(e: any) {
    const collapseTarget = (e.target.id);
    this.querySelector('.conceptToggle').toggle();
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.conceptData = state.currentConcept;
  }
  ready(){
    this.selected = 0;
  }
}

Polymer(PrendusConceptContainer);
