import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class PrendusCourseView {
  public is: string;
  public courseConcepts: CourseConceptData[];
  public courseId: Course[];
  public properties: any;
  public observers: String[];
  public username: string;
  public uid: string;
  public currentCourse: Course;

  beforeRegister() {
    this.is = 'prendus-course-view';
    this.properties = {
      title: {
        type: String,
        value: 'Course Name'
      },
      courses: {
        type: Array,
        value: [{title: 'Course Title', instructor: 'Instructor Name', }]
      },
      route: {
        type: Object,
      },
      data: {
        type: Object,
      }
    };
    this.observers = [
      'viewCourse(route)',
      'viewData(data)',
    ];
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseViewCurrentCourse;
    this.courseConcepts = state.viewCourseConcepts[this.courseId];
  }
  toggle(e) {
    const collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }
  addConceptFormDone(e){
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      const newConcept = {
        creator: this.uid,
        title: this.$.conceptFormName.value,
      };
      Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  }
  sortableEnded(e){
    if(typeof e.newIndex !== 'undefined'){
      let updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
        if(this.courseConcepts[i].pos != i){
          this.courseConcepts[i].pos = i
          updateConceptPositionArray.push(this.concepts[i])
        }
      }
      Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
    }
  }

  async viewCourse() {
    if (this.data.courseId) {
        Actions.showMainSpinner(this);
        await Actions.getCourseViewCourseById(this, this.data.courseId);
        await Actions.loadViewCourseConcepts(this, this.data.courseId);
        Actions.hideMainSpinner(this);
    }
  }

  async viewData() {
    if (this.data.courseId) {
        Actions.showMainSpinner(this);
        await Actions.getCourseViewCourseById(this, this.data.courseId);
        await Actions.loadViewCourseConcepts(this, this.data.courseId);
        Actions.hideMainSpinner(this);
    }
  }
}

Polymer(PrendusCourseView);
