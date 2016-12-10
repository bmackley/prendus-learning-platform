import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service';
import {Actions} from '../../redux/actions';

class PrendusEditQuizRouter {
    public is: string;
    public selected: number;
    public jwt: string;
    public currentEditQuestionId: string;
    public conceptId: string;
    public quizId: string;
    public properties: any;

    beforeRegister() {
        this.is = 'prendus-edit-quiz-router';
    }

    async ready() {
        this.selected = 0;
    }

    mapStateToThis(e: any) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }
}

Polymer(PrendusEditQuizRouter);
