import {Video} from '../../node_modules/prendus-services/interfaces/video.interface.ts';
import {Actions} from '../../redux/actions.ts';

class ConceptVideoContainerComponent {
    public is: string;
    public properties;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;

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

    async init() {
        if (this.conceptId) {
            await Actions.loadConceptVideos(this, this.conceptId);
        }
    }

    videoRowClick(e) {
        const id = e.model.item.id;
        const title = e.model.item.title;
        const url = e.model.item.url;

        Actions.setCurrentVideoInfo(this, id, title, url);

        this.$.editVideoDialog.open();
    }

    async saveVideo(e) {
        const title = e.detail.title;
        const url = e.detail.url;

        const video: Video = {
            title,
            url,
            conceptId: this.conceptId
        };

        await Actions.saveVideo(this, this.currentVideoId, video);
        this.$.videoEditor.indicateSaved();
        await Actions.loadConceptVideos(this, this.conceptId);
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.videos = state.conceptVideos;
        this.currentVideoId = state.currentConceptVideoId;
        this.currentVideoTitle = state.currentConceptVideoTitle;
        this.currentVideoUrl = state.currentConceptVideoUrl;
    }
}

Polymer(ConceptVideoContainerComponent);
