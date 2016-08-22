class PrendusCoursePreview {
    public is: string;
    public properties: any;

    beforeRegister() {
        this.is = 'prendus-course-preview';
        this.properties = {
            course: {
                type: Object
            }
        };
    }

    editCourse(e: any) {
      const location = `/courses/edit/${e.target.id}`
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }

    viewCourse(e: any) {
      try{
        const location = `/courses/view/${e.target.id}`
        window.history.pushState({}, '', location);
        this.fire('location-changed', {}, {node: window});
      }catch(error){
        alert(error);
      }
    }
}

Polymer(PrendusCoursePreview);
