import {Video} from '../../node_modules/prendus-services/interfaces/video.interface.ts';
import {Actions} from '../../redux/actions.ts';

class ConceptVideoContainerComponent {
    public is: string;
    public properties;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];

    beforeRegister() {
        this.is = 'prendus-concept-video-container';
        this.properties = {
            conceptId: {
                type: String
            }
        };
        this.observers = [
            'init(conceptId)'
        ];
    }

    init() {
        console.log('init called')
        if (this.conceptId) {
            Actions.loadConceptVideos(this, this.conceptId);
        }
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.videos = state.conceptVideos;
    }
}

Polymer(ConceptVideoContainerComponent);
