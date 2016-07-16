import {Actions} from '../../redux/actions.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
is: "course-edit",
listeners: {

},
// //mapStateToThis works with event changes.  If it changes somewhere else in the app, it will update here.
mapStateToThis: function(e) {

    this.concepts = []
    this.username = e.detail.state.currentUser.email;
    if(e.detail.state.concepts){
      for(let key in e.detail.state.concepts){
        this.push('concepts', e.detail.state.concepts[key])
      }
      function compare(a,b) {
        if (a.pos < b.pos)
          return -1;
        if (a.pos > b.pos)
          return 1;
        return 0;
      }
      this.concepts.sort(compare);
    }
},
addConcept: function(e){
  addDialog.open();
},
DatePicker: function(e){
  selectDate.open();
},
dismissDatepicker: function(e){
  console.log(this.date)
},
deleteItem: function(e){
  const conceptsArray = this.concepts;
  Actions.deleteConcept.execute(this, e.target.id, conceptsArray);
},
toggle: function(e) {
  let collapseTarget = (e.target.id);
  this.querySelector('#Concept' + collapseTarget).toggle();
},
addConceptFormDone: function(e){
  e.preventDefault();
  if(this.$.conceptFormName.value){
    //close the dialog form if there has already been an input
    addDialog.close();
    let newConcept = {
      title: this.$.conceptFormName.value,
      pos: this.concepts.length,
    }
    Actions.addConcept.execute(this, newConcept, this.concepts);
  }
},
sortableEnded: function(e){
  if(typeof e.newIndex !== 'undefined'){
    let updateConceptPositionArray = [];
    for(let i = 0, len = this.concepts.length; i < len; i++ ){
      if(this.concepts[i].pos != i){
        this.concepts[i].pos = i
        updateConceptPositionArray.push(this.concepts[i])
      }
    }
    Actions.orderConcepts.execute(this, updateConceptPositionArray);
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
  setTimeout(()=>{
    console.log(this.subdomain)
  }, 5000);
  // FirebaseService.init("AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY", "prendus.firebaseapp.com", "https://prendus.firebaseio.com", "prendus.appspot.com", "Prendus");
  //Doesn't work yet Actions.getCourse.execute(this)
  Actions.getConcepts.execute(this);
}
});