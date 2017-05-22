import {Assignment} from '../../node_modules/prendus-services/typings/assignment';
import {Taxonomy} from '../../node_modules/prendus-services/typings/taxonomy';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {ConceptModel} from '../../node_modules/prendus-services/models/concept-model';

interface StateChangeAction {
    readonly taxonomies?: {
        [uuid: string]: Taxonomy;
    };
    readonly showLearningStructureComponent?: boolean;
    readonly concepts?: Concept[];
}

class PrendusAssignmentEditor {
    public is: string;
    public properties: any;
    public querySelector: any;
    public dispatchEvent: any;
    public lessonId: string;
    public assignment: Assignment;
    public concepts: Concept[];
    public taxonomies: {
        [uuid: string]: Taxonomy;
    };
    public showLearningStructureComponent: boolean;
    public selectConceptButtonText: 'Close' | 'Select Concept';

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
        const concepts: Concept[] = await conceptsFromTaxonomies(newValue && newValue.taxonomies ? Object.values(newValue.taxonomies) : []);
        this.stateChange({
            taxonomies: newValue ? newValue.taxonomies : null,
            concepts
        });
    }

    selectConceptTap() {
        this.stateChange({
            showLearningStructureComponent: !this.showLearningStructureComponent
        });
    }

    async deleteConceptTap(e) {
        const conceptIdToDelete: string = e.model.item.id;
        const taxonomyIdToDelete: string = Object.entries(this.taxonomies).filter((taxonomyEntry: [string, Taxonomy]) => taxonomyEntry[1].concept === conceptIdToDelete)[0][0];

        // This is how you delete a property with object spread
        const {[taxonomyIdToDelete]: _, ...newTaxonomies} = this.taxonomies;
        const newConcepts = await conceptsFromTaxonomies(Object.values(newTaxonomies));

        this.stateChange({
            taxonomies: newTaxonomies,
            concepts: newConcepts
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
        const newTaxonomies = {
            ...this.taxonomies,
            [uuid]: newTaxonomy
        };
        const newConcepts = await conceptsFromTaxonomies(Object.values(newTaxonomies));

        this.stateChange({
            taxonomies: newTaxonomies,
            concepts: newConcepts,
            showLearningStructureComponent: false
        });
    }

    //TODO this is a foreshadowing of how we will handle local state changes in the future
    stateChange(stateChangeAction: StateChangeAction) {
        this.taxonomies = stateChangeAction.taxonomies || this.taxonomies;
        this.concepts = stateChangeAction.concepts || this.concepts;
        this.showLearningStructureComponent = stateChangeAction.showLearningStructureComponent;
        this.selectConceptButtonText = this.showLearningStructureComponent ? 'Close' : 'Select Concept';
    }
}

Polymer(PrendusAssignmentEditor);

async function conceptsFromTaxonomies(taxonomies: Taxonomy[]): Promise<Concept[]> {
    const conceptIds: string[] = taxonomies.map((taxonomy: Taxonomy) => taxonomy ? taxonomy.concept : null);
    const concepts: Concept[] = await UtilitiesService.asyncMap(conceptIds, async (conceptId: string) => {
        const concept: Concept = await ConceptModel.getById(conceptId);
        return concept;
    });
    return concepts;
}
