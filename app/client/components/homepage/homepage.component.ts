import {Course} from '../../interfaces/course.interface.ts';
import {Actions} from '../../redux/actions.ts';

class HomepageComponent {
    public is: string;
    public publicCourses: Course[];

    beforeRegister() {
        this.is = 'prendus-homepage';
    }

    async ready() {
        await Actions.getCoursesByVisibility(this, 'public');
    }

    viewCourse(e) {
        const courseId = e.model.item.courseId;

        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async starCourse(e) {
        const courseId = e.model.item.courseId;

        await Actions.starCourse(this, courseId);
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.publicCourses = state.publicCourses;
    }
}

Polymer(HomepageComponent);
