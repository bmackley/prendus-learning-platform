import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {UserModel} from '../../node_modules/prendus-services/models/user.model.ts';

class ViewVideoRouterComponent {
    public is: string;
    public userFullName: string;
    public userEmail: string;

    beforeRegister() {
        this.is = 'prendus-view-video-router';
    }

    async ready() {
        const user = await FirebaseService.getLoggedInUser();
        const userMetaData = await UserModel.getMetaDataById(user.uid);

        this.userFullName = `${userMetaData.firstName} ${userMetaData.lastName}`;
        this.userEmail = user.email;
    }
}
Polymer(ViewVideoRouterComponent);
