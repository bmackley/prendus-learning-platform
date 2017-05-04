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
    public querySelector: any;
    public addEventListener: any;
    public title: string;
    public url: string;

    beforeRegister() {
        this.is = 'prendus-video-editor';
        this.properties = {
            lessonId: {
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
        this.addEventListener('mousedown', (e: any) => {
            e.stopPropagation();
        });

        //TODO you might need this in the future
        // this.addEventListener('mousemove', (e) => {
        //     e.stopPropagation();
        // });
    }

    openCollaboratorsModal(e: any): void {
      this.querySelector('#collaborators-modal').open();
    }

    saveVideo(): void {
        const title = this.querySelector('#titleInput').value;
        const url = this.querySelector('#urlInput').value;

        this.fire('save', {
            title,
            url
        }, {
            bubbles: false
        });
    }

    deleteVideo(): void {
        this.fire('delete', {

        }, {
            bubbles: false
        });
    }

    updateTitle(): void {
        this.title = this.$.titleInput.value;
    }

    updateUrl(): void {
        this.url = this.$.urlInput.value;
    }

    indicateSaved(): void {
        this.$.savedToast.open();
    }

		pause(): void {
			this.querySelector('prendus-video-viewer').pause();
		}
}

Polymer(PrendusVideoEditor);
