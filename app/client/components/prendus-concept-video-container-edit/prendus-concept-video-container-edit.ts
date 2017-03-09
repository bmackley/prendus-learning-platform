import {Video} from '../../node_modules/prendus-services/typings/video';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';

class PrendusConceptVideoContainerEdit {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;
		public $: any;

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
            await Actions.loadEditConceptVideos(this, this.conceptId);
        }
    }

		hasVideos(videos: Video[]) {
			return !!videos.length;
		}

    addVideo(e: Event) {
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

        const user = await FirebaseService.getLoggedInUser();

        const video: Video = {
            id: null,
            uid: user.uid,
            title,
            url,
            collaborators: {}
        };

        await Actions.saveVideo(this, this.conceptId, this.currentVideoId, video);
        this.$.videoEditor.indicateSaved();
        Actions.setCurrentVideoInfo(this, this.currentVideoId, title, url);
        await Actions.loadEditConceptVideos(this, this.conceptId);
    }

    async deleteVideo(e: Event) {
        this.$.editVideoDialog.close();
        await Actions.deleteVideo(this, this.conceptId, this.currentVideoId);
        await Actions.loadEditConceptVideos(this, this.conceptId);
        Actions.clearCurrentVideoInfo(this);
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.videos = state.editConceptVideos[this.conceptId];
        this.currentVideoId = state.currentVideo.id;
        this.currentVideoTitle = state.currentVideo.title;
        this.currentVideoUrl = state.currentVideo.url;
    }
}

Polymer(PrendusConceptVideoContainerEdit);
