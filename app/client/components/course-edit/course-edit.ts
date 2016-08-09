import {Actions} from '../../redux/actions.ts';

export class CourseEditComponent {
  public is: string;
  public title: string;
  public courseConcepts: string[];
  public courseId: string;
  public username: string;
  public uid: string;
  public date: Date;
  public startDate: Date;
  public endDate: Date;
  beforeRegister() {
    this.is = 'course-edit';
  }
  mapStateToThis(e) {
    const state = e.detail.state;
    this.title = state.currentCourse.title;
    this.courseConcepts = [];
    this.courseId = state.currentCourse.id;
    this.startDate = state.currentCourse.startDate;
    this.endDate = state.currentCourse.endDate;
    this.username = state.currentUser.email;
    this.uid = state.currentUser.uid;
    if(state.courseConcepts){
      for(let key in state.courseConcepts){
        this.push('courseConcepts', state.courseConcepts[key])
      }
    }
  };
  addConcept(e){
    addDialog.open();
  };
  openStartDatePicker(e){
    this.querySelector('#selectStartDate').open();
  };
  openEndDatePicker(e){
    this.querySelector('#selectEndDate').open();
  };
  dismissStartDatepicker(e){
    console.log('start datepicker', e.target.id)
    console.log(this)
    console.log(this.date)
  };
  dismissEndDatepicker(e){
    console.log('end datepicker', e.target.id)
    console.log(this.date)
  };
  deleteItem(e){
    const conceptsArray = this.concepts;
    Actions.deleteConcept.execute(this, e.target.id, conceptsArray);
  };
  toggle(e) {
    let collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  };
  addConceptFormDone(e){
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      let newConcept = {
        creator: this.uid,
        title: this.$.conceptFormName.value,
      };
      Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  };
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
  };
  properties: {
      subdomain: {
        type: Object
      },
      route: {
        type: Object,
        observer: 'getCourse'
      },
  };
  getCourse(){
    if(this.data.courseId){
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  };
}

Polymer(CourseEditComponent);
