class QuizResultsComponent {
    public is: string;
    public finalGrade: number;
    public answerDetails;

    beforeRegister() {
        this.is = 'prendus-quiz-results';
    }

    getIndex(index: number) {
        return index + 1;
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.finalGrade = state.finalGrade;
        this.answerDetails = state.answerDetails;
    }
}

Polymer(QuizResultsComponent);
