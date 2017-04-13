import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {Tag} from '../../node_modules/prendus-services/typings/tag';

export class PrendusLessonContainerEdit {
  public is: string;
  public title: string;
  public properties: any;
  public lessonId: string;
  public courseId: string;
  public observers: string[];
  public selected: number;
  public successMessage: string;
  public errorMessage: string;
  public querySelector: any;
  public tags: Tag[];
  public fire: any;

  beforeRegister(): void {
    this.is = 'prendus-lesson-container-edit';
    this.properties = {
      lessonId: {
          type: String
      }
    };
    this.observers = [
        'init(lessonId)'
    ];
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
        this.errorMessage = '';
        this.errorMessage = error.message;
      }

    }
  }

  editLesson(e: any): void {
		e.stopPropagation();
    this.fire('edit-lesson', { lessonId: this.lessonId });
  }

  openCollaboratorsModal(e: any): void {
    e.stopPropagation();
    this.querySelector('#collaborators-modal').open();
  }

  toggle(e: any): void {
    this.querySelector('#collapsible-section').toggle();
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
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
      this.successMessage = '';
      this.successMessage = 'Lesson deleted successfully';
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }
  ready(): void {
    this.selected = 0;
  }
}

Polymer(PrendusLessonContainerEdit);
