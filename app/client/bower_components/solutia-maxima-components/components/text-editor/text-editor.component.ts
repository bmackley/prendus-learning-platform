class TextEditorComponent {
    public is;
    public properties;
    public originalText;

    private editor;

    beforeRegister() {
        this.is = 'solutia-maxima-text-editor';
        this.properties = {
            originalText: {
                type: String,
                observer: 'setText'
            }
        };
    }

    ready() {
        this.initEditor();
    }

    initEditor() {
        // this.editor = new Quill(this.$.editor, {
        //     theme: 'snow'
        // });
        // this.editor.addModule('toolbar', {
        //     container: this.$.toolbar
        // });
        // this.editor.addModule('image-tooltip');
        this.editor = new Quill(this.$.editor, {
            modules: {
                toolbar: {
                    container: this.$.toolbar
                },
                'image-tooltip': true
            },
            theme: 'snow'
        });
    }

    setText(newValue, oldValue) {
        this.editor.setHTML(newValue);
    }

    getText() {
        return this.editor.getHTML();
    }

    showHTML() {
        console.log(this.getText());
    }
}

Polymer(TextEditorComponent);
