import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {State} from '../../typings/state';

class PrendusLessonContainer extends Polymer.Element {
  public title: string;
  public lessonId: string;
  public lessonData: Lesson;
  public selected: number;
  public tags: Tag[];
  public querySelector: any;

  static get is() { return 'prendus-lesson-container'; }
  static get properties() {
      return {
        lessonId: {
            type: String
        },
        courseId: {
            type: String
        }
      };
  }
  static get observers() {
      return [
          'init(lessonId)'
      ];
  }

  constructor() {
      super();

      this.selected = 0;
  }

  async init(): Promise<void> {
    if (this.lessonId) {
      try {
        const lesson = await Actions.getLessonById(null, this.lessonId);
        this.title = lesson.title;
        if(lesson.tags) {
          this.tags = await Actions.resolveTagIdObject(lesson.tags);
        }
      } catch(error) {
				Actions.showNotification(this, 'error', 'Error loading lesson');
				console.error(error);
      }
    }
  }

  toggle(e: any): void {
    const collapseTarget = (e.target.id);
    this.querySelector('.lessonToggle').toggle();
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.lessonData = state.currentLesson;
  }
}

window.customElements.define(PrendusLessonContainer.is, PrendusLessonContainer);
