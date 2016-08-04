import {Quiz} from '../../node_modules/prendus-services/interfaces/quiz.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class ConceptQuizContainerComponent {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public quizzes: Quiz[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;

    beforeRegister() {
        this.is = 'prendus-concept-quiz-container';
        this.properties = {
            conceptId: {
                type: String
            }
        };
        this.observers = [
            'init(conceptId)'
        ];
    }

    async init() {
        if (this.conceptId) {
            await Actions.loadConceptQuizzes(this, this.conceptId);
        }
    }

    async addQuizClick(e: Event) {
        const quizId = await Actions.createNewQuiz(this, this.conceptId);

        window.history.pushState({}, '', `edit-quiz/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
    }

    quizRowClick(e: {
        model: any
    }) {
        const quizId = e.model.item.id;

        window.history.pushState({}, '', `edit-quiz/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.quizzes = state.conceptQuizzes[this.conceptId];
    }
}

Polymer(ConceptQuizContainerComponent);
