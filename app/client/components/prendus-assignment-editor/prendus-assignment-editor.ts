import {Assignment} from '../../node_modules/prendus-services/typings/assignment';
import {Taxonomy} from '../../node_modules/prendus-services/typings/taxonomy';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

class PrendusAssignmentEditor {
    public is: string;
    public properties: any;
    public querySelector: any;
    public dispatchEvent: any;
    public lessonId: string;
    public assignment: Assignment;
    public conceptTitles: string[];
    public taxonomies: {
        [uuid: string]: Taxonomy;
    };
    public showLearningStructureComponent: boolean;
    public selectConceptButtonText: string;

    beforeRegister() {
        this.is = 'prendus-assignment-editor';
        this.properties = {
            lessonId: {
                type: String
            },
            assignment: {
                type: Object,
                observer: 'assignmentSet'
            }
        };
    }

    ready() {
        this.stateChange({
            selectConceptButtonText: 'Select Concept'
        });
    }

    open() {
        this.querySelector('#assignmentDialog').open();
    }

    save(e: Event) {
        const assignment: Assignment = {
            id: this.assignment ? this.assignment.id : null,
            lessonId: this.assignment ? this.assignment.lessonId : this.lessonId,
            uid: this.assignment ? this.assignment.uid : 'NOT_IMPLEMENTED',
            title: this.querySelector('#titleInput').value,
            taxonomies: this.taxonomies || {}
        };

        this.dispatchEvent(new CustomEvent('saveclick', {
            detail: {
                assignment
            }
        }));
    }

    async assignmentSet(newValue: Assignment, oldValue: Assignment) {
        const conceptIds = Object.values(newValue ? newValue.taxonomies : {}).map((taxonomy: Taxonomy) => taxonomy.concept);
        const conceptTitles = await UtilitiesService.asyncMap(conceptIds, async (conceptId: string) => {
            const concept: Concept = await FirebaseService.get(`concepts/${conceptId}`);
            return concept.title;
        });

        this.stateChange({
            taxonomies: newValue ? newValue.taxonomies : null,
            conceptTitles
        });
    }

    selectConceptTap() {
        this.stateChange({
            showLearningStructureComponent: !this.showLearningStructureComponent,
            selectConceptButtonText: 'Close'
        });
    }

    async addTap() {
        const learningStructureComponent = this.querySelector(`#learningStructureComponent`);
        const uuid: string = UtilitiesService.createUUID();
        const newTaxonomy: Taxonomy = {
            discipline: learningStructureComponent.chosenDiscipline.id,
            subject: learningStructureComponent.chosenSubject.id,
            concept: learningStructureComponent.chosenConcept.id
        };
        const newTaxonomies = this.taxonomies ? {
            ...this.taxonomies,
            [uuid]: newTaxonomy
        } : {
            [uuid]: newTaxonomy
        };
        const newConceptIds = Object.values(newTaxonomies).map((taxonomy: Taxonomy) => taxonomy.concept);
        const newConceptTitles = await UtilitiesService.asyncMap(newConceptIds, async (conceptId: string) => {
            const concept: Concept = await FirebaseService.get(`concepts/${conceptId}`);
            return concept.title;
        });

        this.stateChange({
            taxonomies: newTaxonomies,
            conceptTitles: newConceptTitles,
            showLearningStructureComponent: false
        });
    }

    //TODO this is a foreshadowing of how we will handle local state changes in the future
    stateChange(stateChangeAction: StateChangeAction) {
        this.taxonomies = stateChangeAction.taxonomies || this.taxonomies;
        this.conceptTitles = stateChangeAction.conceptTitles || this.conceptTitles;
        this.showLearningStructureComponent = stateChangeAction.showLearningStructureComponent;
        this.selectConceptButtonText = stateChangeAction.selectConceptButtonText || this.selectConceptButtonText;
    }
}

Polymer(PrendusAssignmentEditor);
