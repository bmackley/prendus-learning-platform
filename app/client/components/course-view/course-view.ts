import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';

export class CourseViewComponent {
  public is: string;
  public courseConcepts: CourseConceptData[];
  public courseId: Course[];
  public properties: any;
  public observers: String[];
  public username: string;
  public uid: string;
  public currentCourse: Course;

  beforeRegister() {
    this.is = 'course-view';
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

  mapStateToThis(e) {
    const state = e.detail.state;
    this.courseId = state.currentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.currentCourse;
    this.courseConcepts = this.currentCourse.concepts;
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
  viewCourse() {
    if(this.data.courseId){
      console.log('getting view informtion')
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  }
  viewData() {
    if(this.data.courseId){
      console.log('getting data information in view')
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  }
  ready(){
  }
}
Polymer(CourseViewComponent);
