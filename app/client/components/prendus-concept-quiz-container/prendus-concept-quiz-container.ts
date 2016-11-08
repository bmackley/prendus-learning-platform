import {Quiz} from '../../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusConceptQuizContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public courseId: string;
    public quizzes: Quiz[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;

    beforeRegister() {
        this.is = 'prendus-concept-quiz-container';
        this.properties = {
            conceptId: {
                type: String
            },
            courseId: {
                type: String
            }
        };
        this.observers = [
            'init(conceptId)'
        ];
    }

    async init() {
        if (this.conceptId) {
            await Actions.loadViewConceptQuizzes(this, this.conceptId);
        }
    }

    viewQuiz(e: { model: any }) {
        const quizId = e.model.quiz.id;
        window.history.pushState({}, '', `courses/view-quiz/course/asdf/quiz/${quizId}/quiz-session-id/asdf`);
        this.fire('location-changed', {}, {node: window});
    }

    editQuiz(e: { model: any }) {
        e.stopPropagation();
        const quizId = e.model.quiz.id;
        window.history.pushState({}, '', `courses/edit-quiz/course/asdf/quiz/${quizId}/quiz-session-id/asdf`);
        this.fire('location-changed', {}, {node: window});
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;
console.log(state);
        this.quizzes = state.viewConceptQuizzes[this.conceptId];
    }
}

Polymer(PrendusConceptQuizContainer);
