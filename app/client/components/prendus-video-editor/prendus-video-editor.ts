export class PrendusVideoEditor {
    public is: string;
    public properties: any;
    public videoId: string;
    public $: {
        savedToast: any,
        titleInput: any,
        urlInput: any
    };
    public fire: any;
    public title: string;
    public url: string;

    beforeRegister() {
        this.is = 'prendus-video-editor';
        this.properties = {
            conceptId: {
                type: String
            },
            videoId: {
                type: String
            },
            title: {
                type: String,
                notify: true
            },
            url: {
                type: String,
                notify: true
            }
        };
    }

    ready() {
        this.$.savedToast.fitInto = this;
        this.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });

        //TODO you might need this in the future
        // this.addEventListener('mousemove', (e) => {
        //     e.stopPropagation();
        // });
    }

    openCollaboratorsModal(e) {
      this.querySelector('#collaborators-modal').open();
      console.log("it worked");
    }

    saveVideo() {
        const title = this.$.titleInput.value;
        const url = this.$.urlInput.value;

        this.fire('save', {
            title,
            url
        }, {
            bubbles: false
        });
    }

    deleteVideo() {
        this.fire('delete', {

        }, {
            bubbles: false
        });
    }

    updateTitle() {
        this.title = this.$.titleInput.value;
    }

    updateUrl() {
        this.url = this.$.urlInput.value;
    }

    indicateSaved() {
        this.$.savedToast.open();
    }
}

Polymer(PrendusVideoEditor);
