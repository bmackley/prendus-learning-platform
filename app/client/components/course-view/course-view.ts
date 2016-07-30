import {Actions} from '../../redux/actions.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
is: "course-view",
listeners: {

},
// //mapStateToThis works with event changes.  If it changes somewhere else in the app, it will update here.
mapStateToThis: function(e) {
  console.log(e.detail.state)
  const state = e.detail.state;
    this.courseConcepts = [];
    this.courseId = e.detail.state.currentCourse.id;
    this.startDate = e.detail.state.currentCourse.startDate;
    this.endDate = e.detail.state.currentCourse.endDate;
    this.username = e.detail.state.currentUser.email;
    this.uid = e.detail.state.currentUser.uid;
    if(e.detail.state.courseConcepts){
      for(let key in e.detail.state.courseConcepts){
        console.log('concept key', state.courseConcepts[key].id)
        this.push('courseConcepts', state.courseConcepts[key])
      }
    }
},
toggle: function(e) {
  let collapseTarget = (e.target.id);
  this.querySelector('#Concept' + collapseTarget).toggle();
},
addConceptFormDone: function(e){
  e.preventDefault();
  if(this.$.conceptFormName.value){
    this.querySelector('#addDialog').close();
    let newConcept = {
      creator: this.uid,
      title: this.$.conceptFormName.value,
    };
    Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
  }
},
sortableEnded: function(e){
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
},
properties: {
    subdomain: {
      type: Object
    },
    title: {
      type: String,
      value: 'Course Name'
    },
    courses: {
      type: Array,
      value: [{title: 'Course Title', instructor: 'Instructor Name', startDate: {month: new Date().getMonth(), day: new Date().getDate(), year: new Date().getFullYear()}, endDate: Date.now()}]
    },
  },
ready: function(e){
  // FirebaseService.init("AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY", "prendus.firebaseapp.com", "https://prendus.firebaseio.com", "prendus.appspot.com", "Prendus");
  //Doesn't work yet Actions.getCourse.execute(this)
  //Actions.getConcepts.execute(this);
}
});
