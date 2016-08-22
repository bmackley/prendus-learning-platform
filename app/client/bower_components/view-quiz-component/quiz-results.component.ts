import {AnswerDetails} from './interfaces/answer-details.ts';
import {StatechangeEvent} from './interfaces/statechange-event.ts';

class QuizResultsComponent {
    public is: string;
    public finalGrade: number;
    public answerDetails: AnswerDetails;

    beforeRegister() {
        this.is = 'prendus-quiz-results';
    }

    getIndex(index: number) {
        return index + 1;
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.finalGrade = state.finalGrade;
        this.answerDetails = state.answerDetails;
    }
}

Polymer(QuizResultsComponent);
