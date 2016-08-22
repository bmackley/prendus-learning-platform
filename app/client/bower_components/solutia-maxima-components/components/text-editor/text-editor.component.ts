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
            },
            placeholder: {
                type: String,
                observer: 'placeholderSet'
            }
        };
    }

    ready() {
        this.initEditor();
    }

    initEditor() {
        this.editor = new Quill(this.querySelector('#editor'), {
            modules: {
                toolbar: this.querySelector('#toolbar')
            },
            theme: 'snow'
        });
    }

    placeholderSet(newValue: string, oldValue: string) {
        this.editor.root.dataset.placeholder = newValue;
    }

    setText(newValue: string, oldValue: string) {
        this.editor.pasteHTML(newValue);
    }

    getText() {
        return this.querySelector('.ql-editor').innerHTML;
    }
}

Polymer(TextEditorComponent);
