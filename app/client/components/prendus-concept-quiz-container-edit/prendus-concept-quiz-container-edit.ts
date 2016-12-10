import {Quiz} from '../../node_modules/prendus-services/interfaces/quiz.interface';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface';

class PrendusConceptQuizContainerEdit {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public quizzes: Quiz[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;

    beforeRegister() {
        this.is = 'prendus-concept-quiz-container-edit';
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
            await Actions.loadEditConceptQuizzes(this, this.conceptId);
        }
    }

    async addQuizClick(e: Event) {
        const quizId = await Actions.createNewQuiz(this, this.conceptId);

        window.history.pushState({}, '', `courses/edit-quiz/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});

        await Actions.loadEditConceptQuizzes(this, this.conceptId);
    }

    quizRowClick(e: {
        model: any
    }) {
        const quizId = e.model.item.id;

        window.history.pushState({}, '', `courses/edit-quiz/concept/${this.conceptId}/quiz/${quizId}`);
        this.fire('location-changed', {}, {node: window});
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.quizzes = state.editConceptQuizzes[this.conceptId];
    }
}

Polymer(PrendusConceptQuizContainerEdit);
