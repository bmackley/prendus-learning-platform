import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {DOMRepeatEvent} from '../../node_modules/prendus-services/typings/dom-repeat-event';
import {State} from '../../typings/state';

class PrendusCollaboratorModal {
    public is: string;
    public collaboratorEmails: string[];
    public newCollaboratorEmail: string;
		public successMessage: string;
		public errorMessage: string;
    public querySelector: any;
    public course: boolean;
    public observers: string[];
    public uid: string;
    public courseId: string;
    public conceptId: string;
    public videoId: string;
    public quizId: string;
    public properties: any;

    beforeRegister(): void {

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
                type: Boolean
            }
        };
        this.observers = [
            'initCourse(uid, courseId, course)',
            'initConcept(courseId, conceptId, concept)',
            'initVideo(conceptId, videoId, video)',
            'initQuiz(conceptId, quizId, quiz)'
        ];
    }

    async open(): Promise<void> {
      this.querySelector('#modal').open();
    }

    async initCourse(uid: string, courseId: string, course: boolean): Promise<void> {
        try {
            await Actions.loadCourseCollaboratorEmails(this, uid, courseId);
        } catch(error) {
            console.error(error);
        }
    }

    async initConcept(courseId: string, conceptId: string, concept: boolean): Promise<void> {
        try {
            await Actions.loadConceptCollaboratorEmails(this, courseId, conceptId);
        } catch(error) {
            console.error(error);
        }
    }

    async initVideo(conceptId: string, videoId: string, video: boolean): Promise<void> {
        try {
            await Actions.loadVideoCollaboratorEmails(this, conceptId, videoId);
        } catch(error) {
            console.error(error);
        }
    }

    async initQuiz(conceptId: string, quizId: string, quiz: boolean): Promise<void> {
        try {
            await Actions.loadQuizCollaboratorEmails(this, conceptId, quizId);
        } catch(error) {
            console.error(error);
        }
    }

		canAddCollaborator(newCollaboratorEmail: string): boolean {
			// use RegEx to validate that the user actually entered a valid email address
			return newCollaboratorEmail.match(ConstantsService.EMAIL_REGEX) !== null;
		}

		addCollaboratorIfEnter(e: any): void {
			if(e.keyCode === 13) this.addCollaborator(e);
		}

    async addCollaborator(e: Event): Promise<void> {
        try {
            if (this.uid && this.courseId) {
                await Actions.addCourseCollaborator(this, this.courseId, this.newCollaboratorEmail);
                await Actions.loadCourseCollaboratorEmails(this, this.uid, this.courseId);
            }

            if (this.courseId && this.conceptId) {
                await Actions.addConceptCollaborator(this, this.conceptId, this.newCollaboratorEmail);
                await Actions.loadConceptCollaboratorEmails(this, this.courseId, this.conceptId);
            }

            if (this.conceptId && this.videoId) {
                await Actions.addVideoCollaborator(this, this.videoId, this.newCollaboratorEmail);
                await Actions.loadVideoCollaboratorEmails(this, this.conceptId, this.videoId);
            }

            if (this.conceptId && this.quizId) {
                await Actions.addQuizCollaborator(this, this.quizId, this.newCollaboratorEmail);
                await Actions.loadQuizCollaboratorEmails(this, this.conceptId, this.quizId);
            }
        } catch(error) {
            console.error(error);
						this.errorMessage = '';
						this.errorMessage = 'Could not add collaborator.';
						return;
        }
				this.newCollaboratorEmail = '';
				this.successMessage = '';
				this.successMessage = 'Collaborator added successfully.'
    }

    async removeCollaborator(e: DOMRepeatEvent): Promise<void> {
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
        } catch(error) {
            console.error(error);
        }
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state: State = e.detail.state;
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
