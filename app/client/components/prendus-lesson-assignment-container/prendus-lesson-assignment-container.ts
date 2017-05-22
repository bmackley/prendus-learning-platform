import {State} from '../../typings/state';
import {Assignment} from '../../node_modules/prendus-services/typings/assignment';
import {Action} from '../../typings/action';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import * as Actions from '../../redux/actions';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {Course} from '../../node_modules/prendus-services/typings/course';

class PrendusLessonAssignmentContainer {
    public is: string;
    public properties: any;
    public assignments: Assignment[];
    public courseId: string;
    public lessonId: string;
    public action: Action;
    public querySelector: any;
    public lastAssignmentSaved: Assignment;
    public uid: string;
    public course: Course;
    public hasCourseEditAccess: boolean;

    beforeRegister() {
        this.is = 'prendus-lesson-assignment-container';
        this.properties = {
            lessonId: {
                type: String
            },
            courseId: {
                type: String
            }
        };
    }

    async ready() {
        await Actions.Actions.checkUserAuth(this);
        this.course = await CourseModel.getById(this.courseId);
        this.action = await Actions.loadLessonAssignments(this.lessonId);
    }

    addAssignmentClick(e: Event) {
        this.action = {
            type: 'SET_LESSON_LAST_ASSIGNMENT_SAVED',
            lessonId: this.lessonId,
            assignment: null
        };
        this.querySelector('#assignmentEditor').open();
    }

    editAssignmentClick(e: any) {
        e.stopPropagation();
        e.preventDefault();

        const item: Assignment = e.model.item;
        this.querySelector(`#assignmentEditor-${item.id}`).open();
    }

    async saveAssignment(e: CustomEvent) {
        Actions.Actions.checkUserAuth(this);
        const assignment: Assignment = {
            ...e.detail.assignment,
            uid: this.uid
        };
        const savedAssignment = await saveAssignment(assignment);
        this.action = {
            type: 'SET_LESSON_LAST_ASSIGNMENT_SAVED',
            lessonId: this.lessonId,
            assignment: savedAssignment
        };
        this.action = await Actions.loadLessonAssignments(this.lessonId);

        //TODO doing this here because I belive GraphQL will fundamentally change the way we do Models
        async function saveAssignment(assignment: Assignment) {
            if (assignment.id) {
                await FirebaseService.set(`assignments/${assignment.id}`, assignment);
                return assignment;
            }
            else {
                const id: string = await FirebaseService.push(`assignments`, assignment);
                const assignmentWithId = {
                    ...assignment,
                    id
                };
                await FirebaseService.set(`assignments/${id}`, assignmentWithId);
                return assignmentWithId
            }
        }
    }

    hasAssignments(assignments: Assignment[]): boolean {
        return assignments ? assignments.length !== 0 : true;
    }

    getAssignmentEditAccess(assignment: Assignment) {
        return assignment.uid === this.uid;
    }

    stateChange(e: CustomEvent) {
        const state: State = e.detail.state;

        this.assignments = Object.values(state.lessonAssignments[this.lessonId] || {});
        this.lastAssignmentSaved = state.lessonLastAssignmentSaved[this.lessonId];
        this.uid = state.currentUser.metaData.uid;
        this.hasCourseEditAccess = this.course && state.currentUser.metaData.uid === this.course.uid;
    }
}

Polymer(PrendusLessonAssignmentContainer);
