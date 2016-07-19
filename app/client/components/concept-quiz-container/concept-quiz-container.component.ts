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
            await Actions.setCurrentEditConceptId(this, this.conceptId);
            await Actions.loadConceptQuizzes(this, this.conceptId);
        }
    }

    addQuizClick(e: Event) {
        Actions.setCurrentEditQuizId(this, null);
        //TODO change the url programmatically
    }

    quizRowClick(e: {
        model: any
    }) {
        const id = e.model.item.id;

        Actions.setCurrentEditQuizId(this, id);
        //TODO change the url programmatically
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.quizzes = state.conceptQuizzes[this.conceptId];
    }
}

Polymer(ConceptQuizContainerComponent);
