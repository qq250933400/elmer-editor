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
    constructor(props:any) {
        super(props);
        this.uid = this.guid();
    }
    $didMount(): void {
        this.uDom = this.dom[this.uid];
        this.editor = monacoApi.editor.create(this.uDom, {
            language: this.props.language,
            theme: "vs-dark"
        });
        console.log(this.props.language);
    }
    $dispose(): void {
        this.editor.dispose();
    }
    getCode(): string {
        return this.editor.getValue();
    }
    render():any {
        return `<div class="CodeEditor" id="{{uid}}"></div>`;
    }
}
