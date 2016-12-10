import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface';
import {DOMRepeatEvent} from '../../node_modules/prendus-services/interfaces/dom-repeat-event.interface';

class PrendusCollaboratorModal {
    public is: string;
    public collaboratorEmails: string[];
    public querySelector: any;
    public course: boolean;
    public observers: string[];
    public uid: string;
    public courseId: string;
    public conceptId: string;
    public videoId: string;
    public quizId: string;
    public properties: any;

    beforeRegister() {

        this.is = 'prendus-collaborator-modal';
        this.properties = {
            uid: {
                type: String
            },
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
            'initCourse(uid, courseId, course)',
            'initConcept(courseId, conceptId, concept)',
            'initVideo(conceptId, videoId, video)',
            'initQuiz(conceptId, quizId, quiz)'
        ];
    }

    open() {
      this.querySelector('paper-dialog').open();
    }

    async initCourse(uid: string, courseId: string, course: boolean) {
        try {
            await Actions.loadCourseCollaboratorEmails(this, uid, courseId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initConcept(courseId: string, conceptId: string, concept: boolean) {
        try {
            await Actions.loadConceptCollaboratorEmails(this, courseId, conceptId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initVideo(conceptId: string, videoId: string, video: boolean) {
        try {
            await Actions.loadVideoCollaboratorEmails(this, conceptId, videoId);
        }
        catch(error) {
            alert(error);
        }
    }

    async initQuiz(conceptId: string, quizId: string, quiz: boolean) {
        try {
            await Actions.loadQuizCollaboratorEmails(this, conceptId, quizId);
        }
        catch(error) {
            alert(error);
        }
    }

    async addCollaborator(e: Event) {
        try {
            const email = this.querySelector('#collaboratorInput').value;
            if (this.uid && this.courseId) {
                await Actions.addCourseCollaborator(this, this.courseId, email);
                await Actions.loadCourseCollaboratorEmails(this, this.uid, this.courseId);
            }

            if (this.courseId && this.conceptId) {
                await Actions.addConceptCollaborator(this, this.conceptId, email);
                await Actions.loadConceptCollaboratorEmails(this, this.courseId, this.conceptId);
            }

            if (this.conceptId && this.videoId) {
                await Actions.addVideoCollaborator(this, this.videoId, email);
                await Actions.loadVideoCollaboratorEmails(this, this.conceptId, this.videoId);
            }

            if (this.conceptId && this.quizId) {
                await Actions.addQuizCollaborator(this, this.quizId, email);
                await Actions.loadQuizCollaboratorEmails(this, this.conceptId, this.quizId);
            }
        }
        catch(error) {
            alert(error);
        }
    }

    async removeCollaborator(e: DOMRepeatEvent) {
        try {
            const email = e.model.item;

            if (this.uid && this.courseId) {
                await Actions.removeCourseCollaborator(this, this.courseId, email);
                await Actions.loadCourseCollaboratorEmails(this, this.uid, this.courseId);
            }

            if (this.courseId && this.conceptId) {
                await Actions.removeConceptCollaborator(this, this.conceptId, email);
                await Actions.loadConceptCollaboratorEmails(this, this.courseId, this.conceptId);
            }

            if (this.conceptId && this.videoId) {
                await Actions.removeVideoCollaborator(this, this.videoId, email);
                await Actions.loadVideoCollaboratorEmails(this, this.conceptId, this.videoId);
            }

            if (this.conceptId && this.quizId) {
                await Actions.removeQuizCollaborator(this, this.quizId, email);
                await Actions.loadQuizCollaboratorEmails(this, this.conceptId, this.quizId);
            }
        }
        catch(error) {
            alert(error);
        }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        if (this.uid && this.courseId) {
            this.collaboratorEmails = state.courseCollaboratorEmails[this.uid] && state.courseCollaboratorEmails[this.uid][this.courseId];
        }

        if (this.courseId && this.conceptId) {
            this.collaboratorEmails = state.conceptCollaboratorEmails[this.courseId] && state.conceptCollaboratorEmails[this.courseId][this.conceptId];
        }

        if (this.conceptId && this.videoId) {
            this.collaboratorEmails = state.videoCollaboratorEmails[this.conceptId] && state.videoCollaboratorEmails[this.conceptId][this.videoId];
        }

        if (this.conceptId && this.quizId) {
            this.collaboratorEmails = state.quizCollaboratorEmails[this.conceptId] && state.quizCollaboratorEmails[this.conceptId][this.quizId];
        }
    }
}

Polymer(PrendusCollaboratorModal);
