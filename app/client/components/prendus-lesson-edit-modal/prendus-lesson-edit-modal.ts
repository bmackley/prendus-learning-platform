import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseLessonData} from '../../node_modules/prendus-services/typings/course-lesson-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';

class PrendusLessonNewLesson {
  public is: string;
  public properties: any;
  public lessonFormName: string;
  private lessonId: string;
  private lessonHeader: string;
  public querySelector: any;
  public errorMessage: string;
  public successMessage: string;
  public uid: string;
  public courseId: string;
  public courseLessons: Lesson[];
  // public lessonTagNames: string[];
	public fire: any;
  beforeRegister() {
    this.is = 'prendus-lesson-edit-modal';
    this.properties = {
    };
  }
  mapStateToThis(e: StatechangeEvent) {
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
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
    this.querySelector('#dialog').open();
  }
  async editLesson() {
    try {
      await Actions.updateLessonTitle(this.lessonId, this.lessonFormName);
      // await Actions.updateLessonTag   s(this.lessonId, this.lessonTagNames);
			this.fire('finish-edit-lesson', { lessonId: this.lessonId });
      this.querySelector('#dialog').close();
      this.successMessage = '';
      this.successMessage = `${this.lessonFormName} successfully edited.`;
      // this.querySelector('#lesson-tags').tags = [];
      this.lessonFormName = '';
      this.lessonId = '';
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
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
        await Actions.addLesson(this, this.courseId, newLesson, this.courseLessons.length, null);
        await Actions.loadViewCourseLessons(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Lesson added successfully';
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }
}

Polymer(PrendusLessonNewLesson);
