import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class ConceptComponent {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];
  public conceptData: Concept;
  public selected: number;

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
      try{
        const path = `concepts/${this.conceptId}`
        const concept = await FirebaseService.get(path); //Am I doing this right? I feel like this was pretty smart on my part. Keeps the title scoped to just the concept component - AKA Dont want redux on this
        this.title = concept.title;
      }catch(error){
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

Polymer(ConceptComponent);
