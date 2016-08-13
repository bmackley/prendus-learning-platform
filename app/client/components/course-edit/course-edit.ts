import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';

class CourseEditComponent {
  public is: string;
  public properties: any;
  public observers: String[];
  public title: string;
  public courseConcepts: string[];
  public currentCourse: Course;
  public courseId: string;
  public username: string;
  public uid: string;
  public date: Date;
  public startDate: Date;
  public endDate: Date;
  public route: any;
  public data: any;

  beforeRegister() {
    this.is = 'course-edit';
    this.properties = {
        route: {
          type: Object,
        },
        data: {
          type: Object,
        },
    }
    this.observers = [
      'getCourse(route)',
      'getData(data)',
    ];
  }

  getCourse(){
    console.log('getting course')
    console.log('getting route', this.route)
    if(this.data.courseId){
      console.log('getting course')
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  }

  getData(){
    console.log('getting data')
    console.log('getting data info', this.data)
    if(this.data.courseId){
      console.log('getting data', this.data)
    }
  }

  mapStateToThis(e) {
    const state = e.detail.state;
    this.courseId = state.currentCourse.id;
    this.startDate = state.currentCourse.startDate;
    this.endDate = state.currentCourse.endDate;
    console.log('course edit', state.currentUser)
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.currentCourse;
    this.courseConcepts = this.currentCourse.concepts;
  }

  addConcept(e){
    addDialog.open();
  }

  openStartDatePicker(e){
    this.querySelector('#selectStartDate').open();
  }

  openEndDatePicker(e){
    this.querySelector('#selectEndDate').open();
  }

  deleteItem(e){
    Actions.deleteConcept.execute(this, this.courseId, e.target.id);
  }

  toggle(e) {
    let collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }

  addConceptFormDone(e){
    console.log('in here')
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      const newConcept = {
        uid: this.uid,
        title: this.$.conceptFormName.value,
      };
      Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  }

  sortableEnded(e){ //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined'){
      const updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
        if(this.courseConcepts[i].position != i){
          this.courseConcepts[i].position = i
          updateConceptPositionArray.push(this.courseConcepts[i])
        }
      }
      Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
    }
  }
  ready() {
  }
}

Polymer(CourseEditComponent);
