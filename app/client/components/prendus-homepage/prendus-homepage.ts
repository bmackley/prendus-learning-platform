import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';


class PrendusHomepage {
    public is: string;
    public publicCourses: Course[];

    beforeRegister() {
        this.is = 'prendus-homepage';
    }

    async ready() {
        await Actions.getCoursesByVisibility(this, 'public');
    }

    viewCourse(e: any) {
        const courseId = e.model.item.courseId;

        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async starCourse(e: any) {
        const courseId = e.model.item.courseId;

        await Actions.starCourse(this, courseId);
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
