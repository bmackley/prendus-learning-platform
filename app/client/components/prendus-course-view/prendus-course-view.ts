import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusCourseView {
  public is: string;
  public courseConcepts: CourseConceptData[];
  public currentCourse: Course;
	public collaboratorEmails: string[];
  public courseTagNames: string[];
  public courseTags: Tag[];
  public courseId: string;
  public properties: any;
  public observers: string[];
  public username: string;
  public uid: string;
  public successMessage: string;
  public errorMessage: string;
  public querySelector: any;
  public editingTitle: boolean;
  public editingDescription: boolean;
  public listeners: any;
  public data: any;
  beforeRegister() {
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
      hasEditAccess: {
        type: Boolean,
        computed: 'computeHasEditAccess(uid, currentCourse.collaborators)'
      },
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
      'edit-concept': 'openEditConceptDialog'
    };
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseViewCurrentCourse;
    this.courseTags = state.courseViewCurrentCourse.tags;
    this.courseTagNames = state.courseTagNames;
    this.courseConcepts = state.viewCourseConcepts[this.courseId];
		this.collaboratorEmails = state.courseCollaboratorEmails[this.uid] && state.courseCollaboratorEmails[this.uid][this.courseId];
  }

  openEditConceptDialog(e: any): void {
    const conceptId: string = e.detail.conceptId;
    this.querySelector('#add-concept-dialog').edit(conceptId);
  }

	openDueDateModal(e: any): void {
    this.querySelector('#due-date-modal').open();
  }

  openCollaboratorsModal(e: any): void {
    this.querySelector('#collaborators-modal').open();
  }

  computeHasEditAccess(uid: string, collaborators: any): boolean {
    return uid in collaborators;
  }

	formatCollaboratorEmails(emails: string[]) {
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
    this.editingTitle = !this.editingTitle;
  }

  toggleEditDescription(e: any): void {
    this.editingDescription = !this.editingDescription;
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
        this.successMessage = '';
        this.successMessage = 'Last day of course has been updated';
      }

    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

  // For showTagsTitle and showTagsView you have to pass in the course
  // object instead of course.tags.length, if course.tags is null or
  // undefined, then you are trying to call length on a null object.
  // Also, in the HTML it will not execute these functions if one of
  // the parameters is null.
  showTagsTitle(course: Course, hasEditAccess: boolean): boolean {
    // Since this is an or, it will try to return the course.tags
    // object instead of a boolean that is checking if it's undefined.
    return course.tags !== undefined || hasEditAccess;
  }

  showTagsView(course: Course, hasEditAccess: boolean): boolean {
    return course.tags && !hasEditAccess;
  }

  async onAdd(e: any): Promise<void> {
    try {
      const tag: string = e.detail.tag;
      await Actions.addTagToCourse(this, tag, this.courseId);
      this.successMessage = '';
      this.successMessage = `${tag} added successfully.`;
      Actions.getCoursesByUser(this);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  async onRemove(e: any): Promise<void> {
    try {
      const tag: Tag = this.courseTags[e.detail.index];
      if(tag) {
        await Actions.deleteTagFromCourse(this, tag, this.courseId);
        this.successMessage = '';
        this.successMessage = `${tag.name} removed successfully.`;
        Actions.getCoursesByUser(this);
      }

    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  toggle(e: any): void {
    const collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }

  async viewCourse(): Promise<void> {
    try {
      if (this.data.courseId) {
          Actions.showMainSpinner(this);
          await Actions.getCourseViewCourseById(this, this.data.courseId);
          await Actions.loadViewCourseConcepts(this, this.data.courseId);
          Actions.hideMainSpinner(this);
      }
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

  getLTILinks(): void {
    console.log('LTI Links3')
  }

  addConcept(e: any): void {
    this.querySelector('#add-concept-dialog').open();
  }

  async sortableEnded(e: any): Promise<void> { //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined') {
      let updateConceptPositionArray: CourseConceptData[] = [];
      for(let i:number = 0, len: number = this.courseConcepts.length; i< len; i++) {
        updateConceptPositionArray.push(this.courseConcepts[i]);
        if(this.courseConcepts[i].position != i) {
          updateConceptPositionArray[i].position = i;
        }
      }
      try {
        await Actions.orderConcepts(this, this.courseId, updateConceptPositionArray);
        this.successMessage = '';
        this.successMessage = 'Concept ordered successfully';
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }

  async attributeChanged(e: any): Promise<void> {
    try {
      if(typeof e.target !== 'undefined' ) {
        const value = e.target.value;
        const attribute = e.target.name;
        await Actions.updateCourseField(this, this.courseId, attribute, value);
        await Actions.getCourseViewCourseById(this, this.courseId);
        this.successMessage = '';
        this.successMessage = `${attribute} has been updated`;
      }
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusCourseView);
