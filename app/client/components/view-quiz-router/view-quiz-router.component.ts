import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {UserModel} from '../../node_modules/prendus-services/models/user.model.ts';

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
        const userMetaData = await UserModel.getMetaDataById(user.uid);

        this.jwt = await user.getToken();
        this.userFullName = `${userMetaData.firstName} ${userMetaData.lastName}`;
        this.userEmail = user.email;
    }
}

Polymer(ViewQuizRouterComponent);
