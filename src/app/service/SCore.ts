import { Common } from "elmer-common";

export const POST_MESSAGE_KEY_VALUE = "__POST_MESSAGE_KEY_VALUE__";

export type TypeSCoreEvent = "onReady" | "onUpdateHtml";

export default class SCore extends Common {
    codeHtml: string = "<div>example</div><button>Hello world</button><input type='text' placeholder='Please enter username'/>";
    codeCSS: string = "css";
    codeJavascript: string = "java";
}
