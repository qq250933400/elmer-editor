import { Common } from "elmer-common";
import { autowired, ElmerDOM } from "elmer-ui-core";
import SCore, { POST_MESSAGE_KEY_VALUE, TypeSCoreEvent } from "../../service/SCore";

export default class AppCanvasModel extends Common {
    private htmlCode: string;
    @autowired(ElmerDOM)
    private $:ElmerDOM;

    private dom: any;
    private score: SCore;
    constructor(dom:any) {
        super();
        this.dom = dom;
        window.addEventListener("message", this.listen.bind(this));
    }
    init(): void {
        this.score = this.dom.service.core;
        this.raiseEvent("onReady");
    }
    dispose(): void {
        window.removeEventListener("message", this.listen.bind(this));
    }
    raiseEvent(eventName: string, data?: any): void {
        if(window.parent && typeof window.parent.postMessage === "function") {
            window.parent.postMessage({
                type: POST_MESSAGE_KEY_VALUE,
                eventName,
                data
            }, null);
        }
    }
    getRenderHtmlCode(): string {
        return `<div class="UIEditorPreview">${this.htmlCode}</div>`;
    }
    private updateComponent(): void {
        this.dom.setState({}, true);
    }
    private listen(event:any): void {
        const msgData = event.data || {};
        if(msgData.type === POST_MESSAGE_KEY_VALUE) {
            const eventName:TypeSCoreEvent = msgData.eventName;
            switch(eventName) {
                case "onUpdateHtml": {
                    this.htmlCode = msgData.data;console.log(this.htmlCode);
                    this.updateComponent();
                    break;
                }
            }
        }
    }
}
