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
    public lessonId: string;
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
            lessonId: {
                type: String
            },
            lesson: {
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
            'initLesson(courseId, lessonId, lesson)',
            'initVideo(lessonId, videoId, video)',
            'initQuiz(lessonId, quizId, quiz)'
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

    async initLesson(courseId: string, lessonId: string, lesson: boolean): Promise<void> {
        try {
            await Actions.loadLessonCollaboratorEmails(this, courseId, lessonId);
        } catch(error) {
            console.error(error);
        }
    }

    async initVideo(lessonId: string, videoId: string, video: boolean): Promise<void> {
        try {
            await Actions.loadVideoCollaboratorEmails(this, lessonId, videoId);
        } catch(error) {
            console.error(error);
        }
    }

    async initQuiz(lessonId: string, quizId: string, quiz: boolean): Promise<void> {
        try {
            await Actions.loadQuizCollaboratorEmails(this, lessonId, quizId);
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

            if (this.courseId && this.lessonId) {
                await Actions.addLessonCollaborator(this, this.lessonId, this.newCollaboratorEmail);
                await Actions.loadLessonCollaboratorEmails(this, this.courseId, this.lessonId);
            }

            if (this.lessonId && this.videoId) {
                await Actions.addVideoCollaborator(this, this.videoId, this.newCollaboratorEmail);
                await Actions.loadVideoCollaboratorEmails(this, this.lessonId, this.videoId);
            }

            if (this.lessonId && this.quizId) {
                await Actions.addQuizCollaborator(this, this.quizId, this.newCollaboratorEmail);
                await Actions.loadQuizCollaboratorEmails(this, this.lessonId, this.quizId);
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

            if (this.courseId && this.lessonId) {
                await Actions.removeLessonCollaborator(this, this.lessonId, email);
                await Actions.loadLessonCollaboratorEmails(this, this.courseId, this.lessonId);
            }

            if (this.lessonId && this.videoId) {
                await Actions.removeVideoCollaborator(this, this.videoId, email);
                await Actions.loadVideoCollaboratorEmails(this, this.lessonId, this.videoId);
            }

            if (this.lessonId && this.quizId) {
                await Actions.removeQuizCollaborator(this, this.quizId, email);
                await Actions.loadQuizCollaboratorEmails(this, this.lessonId, this.quizId);
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

        if (this.courseId && this.lessonId) {
            this.collaboratorEmails = state.lessonCollaboratorEmails[this.courseId] && state.lessonCollaboratorEmails[this.courseId][this.lessonId];
        }

        if (this.lessonId && this.videoId) {
            this.collaboratorEmails = state.videoCollaboratorEmails[this.lessonId] && state.videoCollaboratorEmails[this.lessonId][this.videoId];
        }

        if (this.lessonId && this.quizId) {
            this.collaboratorEmails = state.quizCollaboratorEmails[this.lessonId] && state.quizCollaboratorEmails[this.lessonId][this.quizId];
        }
    }
}

Polymer(PrendusCollaboratorModal);
