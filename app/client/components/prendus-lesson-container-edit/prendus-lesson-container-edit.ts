import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {Tag} from '../../node_modules/prendus-services/typings/tag';

export class PrendusLessonContainerEdit extends Polymer.Element {
  public title: string;
  public lessonId: string;
  public courseId: string;
  public selected: number;
  public querySelector: any;
  public tags: Tag[];

  static get is() { return 'prendus-lesson-container-edit'; }
  static get properties() {
      return {
        lessonId: {
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
        const lesson: Lesson = await Actions.getLessonById(null, this.lessonId);
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

  editLesson(e: any): void {
		e.stopPropagation();
    this.dispatchEvent(new CustomEvent('edit-lesson', {
        detail: {
            lessonId: this.lessonId
        }
    }));
  }

  openCollaboratorsModal(e: any): void {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }

  toggle(e: any): void {
    this.querySelector('#collapsible-section').toggle();
  }

  openDeleteModal(e: any): void {
    e.stopPropagation();
    this.querySelector('#delete-confirm-modal').open();
  }

  async completeDelete(): Promise<void> {
    this.querySelector('#delete-confirm-modal').close();
    try {
      await Actions.deleteLesson(this, this.courseId, this.lessonId);
      await Actions.loadViewCourseLessons(this, this.courseId);
			Actions.showNotification(this, 'success', 'Lesson deleted successfully');
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error deleting lesson');
			console.error(error);
    }

  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
  }
}

Polymer(PrendusLessonContainerEdit);
