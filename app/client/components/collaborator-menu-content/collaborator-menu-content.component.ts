import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {DOMRepeatEvent} from '../../node_modules/prendus-services/interfaces/dom-repeat-event.interface.ts';

class CollaboratorMenuComponent {
    public is: string;
    public collaboratorEmails: string[];
    public querySelector: any;
    public course: boolean;
    public observers: string[];

    beforeRegister() {
        this.is = 'prendus-collaborator-menu-content';
        this.properties = {
            courseId: {
                type: String
            },
            conceptId: {
                type: String
            },
            videoId: {
                type: String
            },
            quizId: {
                type: String
            }
        };
        this.observers = [
            'initCourse(courseId)',
            'initConcept(conceptId)',
            'initVideo(videoId)',
            'initQuiz(quizId)'
        ];
    }

    async initCourse(courseId: string) {
        // if (this.quiz) {
        //     Actions.loadQuizCollaboratorEmails(this);
        //
        //     return;
        // }
    }

    async initConcept(conceptId: string) {
        // if (this.quiz) {
        //     Actions.loadQuizCollaboratorEmails(this);
        //
        //     return;
        // }
    }

    async initVideo(videoId: string) {
        // if (this.quiz) {
        //     Actions.loadQuizCollaboratorEmails(this);
        //
        //     return;
        // }
    }

    async initQuiz(quizId: string) {
        Actions.loadQuizCollaboratorEmails(this, );
    }

    async addCollaboratorClick(e: Event) {
        try {
            const email = this.querySelector('#collaboratorInput').value;
            //await Actions.addQuizCollaborator(this, this.querySelector('#getUidByEmailAjax'), this.endpointDomain, this.quizId, email);
            //await Actions.loadCollaboratorEmails(this, this.querySelector('#getEmailsByIdsAjax'), this.quizId, this.endpointDomain, this.jwt);
        }
        catch(error) {
            alert(error);
        }
    }

    async removeCollaboratorClick(e: DOMRepeatEvent) {
        try {
            const email = e.model.item;
            //await Actions.removeQuizCollaborator(this, this.querySelector('#getUidByEmailAjax'), this.endpointDomain, this.quizId, email);
            //await Actions.loadCollaboratorEmails(this, this.querySelector('#getEmailsByIdsAjax'), this.quizId, this.endpointDomain, this.jwt);
        }
        catch(error) {
            alert(error);
        }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.collaboratorEmails = state.collaboratorEmails;
    }
}

Polymer(CollaboratorMenuComponent);
