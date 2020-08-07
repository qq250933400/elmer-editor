import { Common } from "elmer-common";
import { Injectable } from "elmer-ui-core/lib/inject/injectable";

export const POST_MESSAGE_KEY_VALUE = "__POST_MESSAGE_KEY_VALUE__";

export type TypeSCoreEvent = "onReady" | "onUpdateHtml";

@Injectable("SCore")
export default class SCore extends Common {
    codeHtml: string = `<div>
    <i>example</i>
    <span>ABB</span>
</div>
<button>Hello world</button>
<input type='text' placeholder='Please enter username'/>`;
    codeCSS: string = "css";
    codeJavascript: string = "java";
}
