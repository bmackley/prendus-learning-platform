import {Video} from '../../node_modules/prendus-services/interfaces/video.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {VideoEditorComponent} from '../video-editor/video-editor.component.ts';

class ConceptVideoContainerComponentEdit {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;
    public $: {
        editVideoDialog: any,
        videoEditor: VideoEditorComponent
    };

    beforeRegister() {
        this.is = 'prendus-concept-video-container-edit';
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

    addVideoClick(e: Event) {
        Actions.clearCurrentVideoInfo(this);
        this.$.editVideoDialog.open();
    }

    videoRowClick(e: {
        model: any
    }) {
        const id = e.model.item.id;
        const title = e.model.item.title;
        const url = e.model.item.url;

        Actions.setCurrentVideoInfo(this, id, title, url);

        this.$.editVideoDialog.open();
    }

    async saveVideo(e: {
        detail: any
    }) {
        const title = e.detail.title;
        const url = e.detail.url;

        const video: Video = {
            title,
            url,
            conceptId: this.conceptId
        };

        await Actions.saveVideo(this, this.currentVideoId, video);
        this.$.videoEditor.indicateSaved();
        Actions.setCurrentVideoInfo(this, this.currentVideoId, title, url);
        await Actions.loadConceptVideos(this, this.conceptId);
    }

    async deleteVideo(e: Event) {
        this.$.editVideoDialog.close();
        await Actions.deleteVideo(this, this.currentVideoId);
        await Actions.loadConceptVideos(this, this.conceptId);
        Actions.clearCurrentVideoInfo(this);
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.videos = state.conceptVideos[this.conceptId];
        this.currentVideoId = state.currentConceptVideoId;
        this.currentVideoTitle = state.currentConceptVideoTitle;
        this.currentVideoUrl = state.currentConceptVideoUrl;
    }
}

Polymer(ConceptVideoContainerComponentEdit);
