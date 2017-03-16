import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {State} from '../../typings/state';

class PrendusConceptContainer {
  public is: string;
  public title: string;
  public properties: any;
  public conceptId: string;
  public observers: string[];
  public lessonData: Lesson;
  public selected: number;
  public errorMessage: string;
  public tags: Tag[];
  public querySelector: any;

  beforeRegister(): void {
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

  async init(): Promise<void> {
    if (this.conceptId) {
      try {
        const concept = await Actions.getConceptById(null, this.conceptId);
        this.title = concept.title;
        if(concept.tags) {
          this.tags = await Actions.resolveTagIdObject(concept.tags);
        }
      } catch(error) {
        this.errorMessage = error.message;
      }
    }
  }

  toggle(e: any): void {
    const collapseTarget = (e.target.id);
    this.querySelector('.conceptToggle').toggle();
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.lessonData = state.currentLesson;
  }

  ready(): void {
    this.selected = 0;
  }
}

Polymer(PrendusConceptContainer);
