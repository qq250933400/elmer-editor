import { Common } from "elmer-common";
import { TypeAppState, TypeRegisterEvent, TypeStoreRegisterEvent } from "../AppTypes";
import SCore, { POST_MESSAGE_KEY_VALUE, TypeSCoreEvent } from "../service/SCore";
import { IAppModel, TypeAppLifeCycle, TypeAppMode } from "./IAppModel";
import MCore from "./MCore";

export default abstract class MBase extends Common implements IAppModel {
    appDom: any;
    coreObj:MCore;
    iframe: HTMLIFrameElement;
    score: SCore;

    constructor(appVirtualDom:any) {
        super();
        this.appDom = appVirtualDom;
    }
    getAppMode(): TypeAppMode {
        throw new Error("Method not implemented.");
    }
    registerLifeCycleMethod(appMode: TypeAppMode, lifeCycleType: TypeAppLifeCycle, callback: Function): void {
        throw new Error("Method not implemented.");
    }
    setIframe(iframeDom:HTMLIFrameElement): void {
        this.iframe = iframeDom;
    }
    setState(state:TypeAppState, refresh?: boolean): void {
        this.appDom.setState(state, refresh);
    }
    getState(stateKey: string):any {
        return this.getValue(this.appDom.state, stateKey);
    }
    raiseEvent(eventName: TypeSCoreEvent, data:any): void {
        if(this.iframe) {
            this.iframe.contentWindow.postMessage({
                type: POST_MESSAGE_KEY_VALUE,
                appMode: this.getAppMode(),
                eventName,
                data
            }, null);
        }
    }
    getInputCode(): string {
        return this.appDom.editor.getCode();
    }
    registerEvent(eventName: TypeRegisterEvent, callback:Function, thisObj?: any): void {
        const eventId = this.guid();
        this.coreObj.eventListeners[eventId] = {
            eventName,
            appMode: (<any>this).getAppMode(),
            callback,
            this: thisObj
        };
    }
    getEventListeners<T>(): TypeStoreRegisterEvent<T> {
        return this.coreObj.eventListeners;
    }
    callbyName<T>(methodName: string, ...args:any[]): T {
        const models = this.appDom.model;
        const appMode = models.core.getAppMode();
        let structData:any;
        if(models) {
            Object.keys(models).map((modelKey: string): any => {
                if(modelKey !== "core") {
                    const tmpModel:IAppModel = models[modelKey];
                    if(tmpModel.getAppMode() === appMode && typeof tmpModel[methodName] === "function") {
                        structData = tmpModel[methodName].apply(tmpModel, args);
                    }
                }
            });
        }
        return structData;
    }
    /**
     * 在Comonent初始化model以后触发的事件，不需要重写当前方法
     */
    protected afterInit(): void {
        this.appDom.state.previewLink = this.getDisplayLink();
        this.coreObj = this.appDom.model.core;
        this.score = this.appDom.service.core;
        typeof this["init"] === "function" && this["init"]();
    }
    private getDisplayLink(): string {
        let url = location.href;
        url = url.replace(/\#[\s\S]{1,}/,"");
        return url + "#/editor/canvas";
    }
}
