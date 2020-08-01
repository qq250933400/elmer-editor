import { Component, declareComponent, IPropCheckRule, PropTypes } from "elmer-ui-core";
import * as monacoApi from "monaco-editor/esm/vs/editor/editor.api";
import { definePropTypes, TypeCodeEditorProps, TypeCodeEditorPropsRule } from "./TypeCodeEditor";
// tslint:disable: ordered-imports
import "monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js";
import "monaco-editor/esm/vs/editor/contrib/hover/hover.js";
import "monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js";

import "monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import "monaco-editor/esm/vs/basic-languages/vb/vb.contribution";
import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution";
import "monaco-editor/esm/vs/basic-languages/scss/scss.contribution";
import "monaco-editor/esm/vs/basic-languages/css/css.contribution";
import "monaco-editor/esm/vs/basic-languages/less/less.contribution";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";
import "monaco-editor/esm/vs/basic-languages/php/php.contribution";
import "monaco-editor/esm/vs/basic-languages/swift/swift.contribution";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";
import "monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution";
import "monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution";

import "./index.less";

@declareComponent({
    selector: "code-editor"
})
export default class CodeEditor extends Component {
    static propType: TypeCodeEditorPropsRule = definePropTypes;
    uid: string;
    uDom: HTMLDivElement;
    editor: monacoApi.editor.IStandaloneCodeEditor;
    props: TypeCodeEditorProps;
    private initCode: string;
    private language: string;
    constructor(props:TypeCodeEditorProps) {
        super(props);
        this.uid = this.guid();
        this.initCode = props.code;
        this.language = props.language;
    }
    $onPropsChanged(props: TypeCodeEditorProps): void {
        if(props.code !== this.initCode) {
            this.initCode = props.code;
            if(this.editor) {
                this.editor.setValue(props.code);
            }
        }
        if(props.language !== this.language) {
            this.editor.dispose();
            this.language = props.language;
            this.editor = monacoApi.editor.create(this.uDom, {
                language: this.language,
                theme: this.props.theme,
                value: this.initCode || "",
                automaticLayout: true
            });
            this.setEventListen();
        }
    }
    $didMount(): void {
        this.uDom = this.dom[this.uid];
        this.editor = monacoApi.editor.create(this.uDom, {
            language: this.language,
            theme: this.props.theme,
            value: this.initCode || "",
            automaticLayout: true
        });
        this.setEventListen();
    }
    $dispose(): void {
        this.editor.dispose();
    }
    resetLayout(): void {
        this.editor.layout();
    }
    getCode(): string {
        return this.editor.getValue();
    }
    setCode(code: string): void {
        this.editor.setValue(code);
    }
    render():any {
        return `<div class="CodeEditor" id="{{uid}}"></div>`;
    }
    private setEventListen(): void {
        this.editor.onDidBlurEditorWidget(()=>{
            typeof this.props.onBlur === "function" && this.props.onBlur();
        });
        this.editor.onDidChangeModelContent((event) => {
            typeof this.props.onChange === "function" && this.props.onChange(event);
        });
        this.editor.onKeyDown((event) => {
            if(event.ctrlKey && event.keyCode === 49) {
                typeof this.props.onDidSave === "function" && this.props.onDidSave();
            }
        });
    }
}
