class CodeEditorComponent {
    public is;
    public properties;

    private codeMirrorInstance;

    beforeRegister() {
        this.is = 'solutia-maxima-code-editor';
        this.properties = {
            originalCode: {
                type: String,
                observer: 'setText'
            }
        };
    }

    ready() {
        this.initEditor();
    }

    initEditor() {
        const codeMirrorTextarea = this.$.smCodeMirrorTextarea;
        this.codeMirrorInstance = CodeMirror.fromTextArea(codeMirrorTextarea, {
            mode: 'javascript',
            lineNumbers: true,
            gutters: ['CodeMirror-lint-markers'],
            lint: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: true
        });
        this.codeMirrorInstance.setSize('auto', '400px');

        setTimeout(() => {
            this.codeMirrorInstance.refresh();
        });
    }

    setText(newValue, oldValue) {
        this.codeMirrorInstance.setValue(newValue);
    }

    getText() {
        return this.codeMirrorInstance.getValue();
    }
}

Polymer(CodeEditorComponent);
