import {Actions} from '../../redux/actions.ts';

class CollaboratorMenuComponent {
    public is: string;

    beforeRegister() {
        this.is = 'prendus-collaborator-menu-content';
    }

    ready() {
        this.collaboratorEmails = ['monkey'];
    }

    async addCollaboratorClick() {
        try {
            const email = this.querySelector('#collaboratorInput').value;
            //await Actions.addQuizCollaborator(this, this.querySelector('#getUidByEmailAjax'), this.endpointDomain, this.quizId, email);
            //await Actions.loadCollaboratorEmails(this, this.querySelector('#getEmailsByIdsAjax'), this.quizId, this.endpointDomain, this.jwt);
        }
        catch(error) {
            alert(error);
        }
    }

    async removeCollaboratorClick(e) {
        try {
            const email = e.model.item;
            //await Actions.removeQuizCollaborator(this, this.querySelector('#getUidByEmailAjax'), this.endpointDomain, this.quizId, email);
            //await Actions.loadCollaboratorEmails(this, this.querySelector('#getEmailsByIdsAjax'), this.quizId, this.endpointDomain, this.jwt);
        }
        catch(error) {
            alert(error);
        }
    }
}

Polymer(CollaboratorMenuComponent);
