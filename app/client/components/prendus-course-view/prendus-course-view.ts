import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {CourseLessonData} from '../../node_modules/prendus-services/typings/course-lesson-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {LessonModel} from '../../node_modules/prendus-services/models/lesson-model';
import {State} from '../../typings/state';

export class PrendusCourseView {
  public is: string;
  public courseLessons: CourseLessonData[];
  public currentCourse: Course;
	public collaboratorEmails: string[];
  public courseTagNames: string[];
  public courseTags: Tag[];
  public courseId: string;
	public courseLoaded: boolean;
  public properties: any;
  public observers: string[];
  public username: string;
  public uid: string;
  public querySelector: any;
  public editingTitle: boolean;
  public editingDescription: boolean;
  public listeners: any;
  public data: any;
  public hasEditAccess: boolean;
  public numberOfPublicCoursesLoaded: number;

  beforeRegister(): void {
    this.is = 'prendus-course-view';
    this.properties = {
      title: {
        type: String,
        value: 'Course Name'
      },
      route: {
        type: Object,
      },
      data: {
        type: Object,
      },
      //TODO this will come back once collaborators are back!
      // hasEditAccess: {
      //   type: Boolean,
      //   computed: 'computeHasEditAccess(uid)'
      // },
      editingTitle: {
        type: Boolean,
        value: false
      },
      editingDescription: {
        type: Boolean,
        value: false
      }
    };
    this.observers = [
      'viewCourse(route)',
      'viewCourse(data)'
    ];
    this.listeners = {
      'edit-lesson': 'openEditLessonDialog',
			'finish-edit-lesson': 'reloadLesson'
    };
  }
	reloadLesson(e: any): void {
		this.querySelector(`#lesson${e.detail.lessonId}`).init();
	}

  openEditLessonDialog(e: any): void {
    const lessonId: string = e.detail.lessonId;
    this.querySelector('#add-lesson-dialog').edit(lessonId);
  }

	openDueDateModal(e: any): void {
    this.querySelector('#due-date-modal').open();
  }

  openCollaboratorsModal(e: any): void {
    this.querySelector('#collaborators-modal').open();
  }

  //TODO this will be called when collaborators are back
  // computeHasEditAccess(uid: string, collaborators: any): boolean {
  //   return uid in collaborators;
  // }

	formatCollaboratorEmails(emails: string[]): string {
		return emails
			// TODO: figure out why there are null collaborator emails and remove this
			.filter((value: string, index: number, array: string[]) => {
				return value !== null;
			})
			.reduce((accum: string, value: string, index: number) => {
				return value + (index > 0 ? ',' : '') + '';
		}, '');
	}

  toggleEditTitle(e: any): void {
		if(this.querySelector('#course-title').invalid) return;
    this.editingTitle = !this.editingTitle;
		if(this.editingTitle) this.querySelector('#course-title').focus();
  }

  toggleEditDescription(e: any): void {
		if(this.querySelector('#course-description').invalid) return;
    this.editingDescription = !this.editingDescription;
		if(this.editingDescription) this.querySelector('#course-description').focus();
  }

	getEditIcon(editStatus: boolean): string {
		return editStatus ? 'check' : 'create';
	}

	makePrettyDate(dateString: string): string {
		if(!dateString || dateString === null) return 'No due date set.';
		const date: Date = new Date(dateString);
		const prettyDate: string = `${[	'Sunday',
																		'Monday',
																		'Tuesday',
																		'Wednesday',
																		'Thursday',
																		'Friday',
																		'Saturday'][date.getDay()]},
																${[	'January',
																		'February',
																		'March',
																		'April',
																		'May',
																		'June',
																		'July',
																		'August',
																		'September',
																		'October',
																		'November',
																		'December'][date.getMonth()]}
																${date.getDate()},
																${date.getFullYear()}`
		return prettyDate;
	}

  displayDate(date: string): Date {
    // Set due date at the current date if the course has no due date yet.
    return date ? new Date(date) : new Date();
  }

  async dueDateChanged(): Promise<void> {
    try {
      const newDate: Date = this.querySelector('#due-date').date;
      const UTCDate: number = UtilitiesService.dateToUTCNumber(newDate);
      const currentDate: number = this.currentCourse.dueDate;
      // paper-date-picker does not have an event listener for date change. So every
      // time a user clicks anywhere on the calendar, this function is called. To avoid
      // a firebase action, we compare the currentDate in firebase to the new UTCDate.
      if(currentDate !== UTCDate) {
				this.querySelector('#due-date-modal').close();
        // Date has changed
        await Actions.updateCourseField(this, this.courseId, 'dueDate', UTCDate);
        await Actions.updateQuizDueDates(this.courseId);
				Actions.showNotification(this, 'success', 'Last day of course has been updated.');
      }

    } catch(error) {
			Actions.showNotification(this, 'error', 'Error changing due date.');
      console.error(error);
    }

  }

  /**
   * For showTagsTitle and showTagsView you have to pass in the course
   * object instead of course.tags.length, if course.tags is null or
   * undefined, then you are trying to call length on a null object.
   * Also, in the HTML it will not execute these functions if one of
   * the parameters is null.
   */
  showTagsTitle(course: Course, hasEditAccess: boolean): boolean {
    // Since this is an or, it will try to return the course.tags
    // object instead of a boolean that is checking if it's undefined.
    return course.tags !== undefined || hasEditAccess;
  }

  showTagsView(course: Course, hasEditAccess: boolean): boolean {
    return course.tags && !hasEditAccess;
  }

  toggle(e: any): void {
    const collapseTarget = (e.target.id);
    this.querySelector('#lesson' + collapseTarget).toggle();
  }

  async viewCourse(): Promise<void> {
    try {
      if (this.data && this.data.courseId) {
          Actions.showMainSpinner(this);
          await Actions.getCourseViewCourseById(this, this.data.courseId);
          Actions.hideMainSpinner(this);
          await Actions.loadViewCourseLessons(this, this.data.courseId);
					this.courseLoaded = true;
      }
    } catch(error) {
			this.courseLoaded = false;
			Actions.showNotification(this, 'error', 'Error loading course.');
      console.error(error);
    }
		Actions.hideMainSpinner(this);
  }

  getLTILinks(): void {
    console.log('LTI Links3')
  }

  addLesson(e: any): void {
    this.querySelector('#add-lesson-dialog').open();
  }

  async sortableEnded(e: any): Promise<void> { //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined') {
      let updateLessonPositionArray: CourseLessonData[] = [];
      for(let i:number = 0, len: number = this.courseLessons.length; i< len; i++) {
        updateLessonPositionArray.push(this.courseLessons[i]);
        if(this.courseLessons[i].position != i) {
          updateLessonPositionArray[i].position = i;
        }
      }
      try {
        await Actions.orderLessons(this, this.courseId, updateLessonPositionArray);
				Actions.showNotification(this, 'success', 'Lesson ordered successfully.');
      } catch(error) {
				Actions.showNotification(this, 'error', 'Error sorting lessons.');
        console.error(error);
      }
    }
  }

  async attributeChanged(e: any): Promise<void> {
    try {
      if(typeof e.target !== 'undefined' && !e.target.invalid) {
        const value = e.target.value;
				if(value === '') return;
        const attribute = e.target.name;
        await Actions.updateCourseField(this, this.courseId, attribute, value);
        await Actions.getCourseViewCourseById(this, this.courseId);

        // It would probably be a good idea to only reload the course that was updated,
        // but for now this will do.
        Actions.getCoursesByUser(this);
        Actions.getStarredCoursesByUser(this, this.uid);
        if(this.numberOfPublicCoursesLoaded) {
            // This probably is not the most efficient way to reload the front page courses.
            // Ideally we would reload the one course that got updated. But for now this will do.
            Actions.getCoursesByVisibility(this, 'public', this.numberOfPublicCoursesLoaded);
        }
				Actions.showNotification(this, 'success', `Course ${attribute} has been updated`);
      }
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error updating course.');
      console.error(error)
    }
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.currentCourse = state.courseViewCurrentCourse;
    this.uid = state.currentUser.metaData.uid;
    //TODO this will be gone once collaborators are back!!
    this.hasEditAccess = this.currentCourse && this.currentCourse.uid === this.uid;
    // this.courseTags = state.courseViewCurrentCourse.tags;
    this.courseTagNames = state.courseTagNames;
    this.courseLessons = state.viewCourseLessons[this.courseId];
		this.collaboratorEmails = state.courseCollaboratorEmails[this.uid] && state.courseCollaboratorEmails[this.uid][this.courseId];
    this.numberOfPublicCoursesLoaded = state.publicCourses ? state.publicCourses.length : this.numberOfPublicCoursesLoaded;
  }
}

Polymer(PrendusCourseView);
