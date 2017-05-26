import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../../node_modules/prendus-services/typings/course-lesson-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';

class PrendusLessonEditModal extends Polymer.Element {
  public lessonFormName: string;
  private lessonId: string;
  private lessonHeader: string;
  public querySelector: any;
  public uid: string;
  public courseId: string;
  public courseLessons: Lesson[];
  // public lessonTagNames: string[];

  static get is() { return 'prendus-lesson-edit-modal'; }

  mapStateToThis(e: StatechangeEvent) {
      //TODO I do not think that the statement below is true, look into this
    //this needs to be here so the actions will fire (this does not have a context unless the mapStateToThis function is here)
  }

  open() {
    this.querySelector('#dialog').open();
    this.lessonHeader = 'Add a Lesson to the Course';
    this.lessonFormName = '';
  }

  clearValues() {
    this.lessonId = null;
  }
  async edit(lessonId: string) {
    this.lessonHeader = 'Edit lesson';
    this.lessonId = lessonId;
    try {
      const lessonAndTagNames: { lesson: Lesson, tagNames: string[] } = await Actions.getLessonAndTagNamesById(this.lessonId);
      const lesson: Lesson = lessonAndTagNames.lesson;
      // const tagNames: string[] = lessonAndTagNames.tagNames;
      this.lessonFormName = lesson.title;
      // this.lessonTagNames = tagNames ? tagNames : [];
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error loading lesson');
			console.error(error);
    }
    this.querySelector('#dialog').open();
  }
  async editLesson() {
    try {
      await Actions.updateLessonTitle(this.lessonId, this.lessonFormName);
      // await Actions.updateLessonTag   s(this.lessonId, this.lessonTagNames);
            this.dispatchEvent(new CustomEvent('finish-edit-lesson', {
                detail: {
                    lessonId: this.lessonId
                }
            }));

      this.querySelector('#dialog').close();
			Actions.showNotification(this, 'success', `${this.lessonFormName} successfully edited.`);
      // this.querySelector('#lesson-tags').tags = [];
      this.lessonFormName = '';
      this.lessonId = '';
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error editing lesson');
			console.error(error);
    }

  }

	updateLessonIfEnter(e: any): void {
		if(e.keyCode === 13) this.updateLesson(e);
	}

  async updateLesson(e: any) {
    e.preventDefault();
    this.lessonFormName = this.querySelector('#lesson-name').value;
    if(this.lessonFormName && this.lessonId) {
      this.editLesson();
      return;
    }
    if(this.lessonFormName) {
      this.querySelector('#dialog').close();
      const newLesson: any = {
        uid: this.uid,
        title: this.lessonFormName
      };
      try {
        await Actions.addLesson(this, this.courseId, newLesson, this.courseLessons ? this.courseLessons.length : 0, null);
        await Actions.loadViewCourseLessons(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Lesson added successfully';
      } catch(error) {
        console.error('error during adding a lesson ', error);
        this.errorMessage = '';
        this.errorMessage = 'Something went wrong while adding the lesson';
      }
    }
  }
}

window.customElements.define(PrendusLessonEditModal.is, PrendusLessonEditModal);
