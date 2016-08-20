import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {DOMRepeatEvent} from '../../node_modules/prendus-services/interfaces/dom-repeat-event.interface.ts';

class PrendusCollaboratorMenuContent {
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
            course: {
                type: Boolean
            },
            conceptId: {
                type: String
            },
            concept: {
                type: Boolean
            },
            videoId: {
                type: String
            },
            video: {
                type: Boolean
            },
            quizId: {
                type: String
            },
            quiz: {
                type: String
            }
        };
        this.observers = [
            'initCourse(courseId, course)',
            'initConcept(courseId, conceptId, concept)',
            'initVideo(conceptId, videoId, video)',
            'initQuiz(conceptId, quizId, quiz)'
        ];
    }

    async initCourse(courseId: string, course: boolean) {
        try {
            await Actions.loadCourseCollaboratorEmails(this, courseId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initConcept(courseId: string, conceptId: string, concept: boolean) {
        try {
            await Actions.loadConceptCollaboratorEmails(this, conceptId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initVideo(conceptId: string, videoId: string, video: boolean) {
        try {
            await Actions.loadVideoCollaboratorEmails(this, videoId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initQuiz(conceptId: string, quizId: string, quiz: boolean) {
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

        if (this.uid && this.courseId) {
            this.collaboratorEmails = state.courseCollaboratorEmails[this.uid];
        }

        if (this.courseId && this.conceptId) {
            this.collaboratorEmails = state.conceptCollaboratorEmails[this.courseId];
        }

        if (this.conceptId && this.videoId) {
            this.collaboratorEmails = state.videoCollaboratorEmails[this.conceptId];
        }

        if (this.conceptId && this.quizId) {
            this.collaboratorEmails = state.quizCollaboratorEmails[this.conceptId];
        }
    }
}

Polymer(PrendusCollaboratorMenuContent);
