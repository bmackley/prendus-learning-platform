import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class ViewQuizRouterComponent {
    public is: string;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;
    public quizSessionId: string;

    beforeRegister() {
        this.is = 'prendus-view-quiz-router';
    }

    async ready() {
        const user = await FirebaseService.getLoggedInUser();
        this.jwt = await user.getToken();
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.userFullName = `${state.currentUser.firstName} ${state.currentUser.lastName}`;
        this.userEmail = state.currentUser.email;
    }
}

Polymer(ViewQuizRouterComponent);
