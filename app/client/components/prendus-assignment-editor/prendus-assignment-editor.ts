import {Assignment} from '../../node_modules/prendus-services/typings/assignment';

class PrendusAssignmentEditor {
    public is: string;
    public properties: any;
    public querySelector: any;
    public dispatchEvent: any;
    public lessonId: string;
    public assignment: Assignment;

    beforeRegister() {
        this.is = 'prendus-assignment-editor';
        this.properties = {
            lessonId: {
                type: String
            },
            assignment: {
                type: Object
            }
        };
    }

    open() {
        this.querySelector('#assignmentDialog').open();
    }

    save(e: Event) {
        const assignment: Assignment = {
            id: this.assignment ? this.assignment.id : null,
            lessonId: this.assignment ? this.assignment.lessonId : this.lessonId,
            uid: this.assignment ? this.assignment.uid : 'NOT_IMPLEMENTED',
            title: this.querySelector('#titleInput').value,
            taxonomies: {}
        };

        this.dispatchEvent(new CustomEvent('saveclick', {
            detail: {
                assignment
            }
        }));
    }
}

Polymer(PrendusAssignmentEditor);
