import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {DOMRepeatEvent} from '../../node_modules/prendus-services/interfaces/dom-repeat-event.interface.ts';

class CollaboratorMenuComponent {
    public is: string;
    public collaboratorEmails: string[];
    public querySelector: any;
    public course: boolean;
    public observers: string[];
    public courseId: string;
    public conceptId: string;
    public videoId: string;
    public quizId: string;

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
        try {
            await Actions.loadCourseCollaboratorEmails(this, courseId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initConcept(conceptId: string) {
        try {
            await Actions.loadConceptCollaboratorEmails(this, conceptId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initVideo(videoId: string) {
        try {
            await Actions.loadVideoCollaboratorEmails(this, videoId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initQuiz(quizId: string) {
        try {
            await Actions.loadQuizCollaboratorEmails(this, quizId);
        }
        catch(error) {
            alert(error);
        }
    }

    async addCollaboratorClick(e: Event) {
        try {
            const email = this.querySelector('#collaboratorInput').value;

            if (this.courseId) {
                await Actions.addCourseCollaborator(this, this.courseId, email);
                await Actions.loadCourseCollaboratorEmails(this, this.courseId);
            }

            if (this.conceptId) {
                await Actions.addConceptCollaborator(this, this.conceptId, email);
                await Actions.loadConceptCollaboratorEmails(this, this.conceptId);
            }

            if (this.videoId) {
                await Actions.addVideoCollaborator(this, this.videoId, email);
                await Actions.loadVideoCollaboratorEmails(this, this.videoId);
            }

            if (this.quizId) {
                await Actions.addQuizCollaborator(this, this.quizId, email);
                await Actions.loadQuizCollaboratorEmails(this, this.quizId);
            }
        }
        catch(error) {
            alert(error);
        }
    }

    async removeCollaboratorClick(e: DOMRepeatEvent) {
        try {
            const email = e.model.item;

            if (this.courseId) {
                await Actions.removeCourseCollaborator(this, this.courseId, email);
                await Actions.loadCourseCollaboratorEmails(this, this.courseId);
            }

            if (this.conceptId) {
                await Actions.removeConceptCollaborator(this, this.conceptId, email);
                await Actions.loadConceptCollaboratorEmails(this, this.conceptId);
            }

            if (this.videoId) {
                await Actions.removeVideoCollaborator(this, this.videoId, email);
                await Actions.loadVideoCollaboratorEmails(this, this.videoId);
            }

            if (this.quizId) {
                await Actions.removeQuizCollaborator(this, this.quizId, email);
                await Actions.loadQuizCollaboratorEmails(this, this.quizId);
            }
        }
        catch(error) {
            alert(error);
        }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        if (this.courseId) {
            this.collaboratorEmails = state.courseCollaboratorEmails;
        }

        if (this.conceptId) {
            this.collaboratorEmails = state.conceptCollaboratorEmails;
        }

        if (this.videoId) {
            this.collaboratorEmails = state.videoCollaboratorEmails;
        }

        if (this.quizId) {
            this.collaboratorEmails = state.quizCollaboratorEmails;
        }
    }
}

Polymer(CollaboratorMenuComponent);
