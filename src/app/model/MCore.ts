import {
    createOfficeFormTabMenu,
    createOfficeQuickButtons,
    TypeOfficeFormMenuButton,
    TypeOfficeFormTabItem,
    TypeOfficeFormTabMenuItem
} from "elmer-common-ui/lib/components/office/widget/form/TypeFormAttr";
import { ITreeViewItem } from "elmer-common-ui/lib/components/treeView";
import { autowired, ElmerDOM } from "elmer-ui-core";
import { HtmlParse, IVirtualElement } from "elmer-virtual-dom";
import { TypeRegisterEvent, TypeRegisterEventListener, TypeStoreRegisterEvent } from "../AppTypes";
import Score, { POST_MESSAGE_KEY_VALUE, TypeSCoreEvent } from "../service/SCore";

import { TypeAppMode } from "./IAppModel";
import MBase from "./MBase";

export default class MMenus extends MBase {
    obj:any;
    tabMenus: TypeOfficeFormTabItem[] = [];
    htmlStructure: ITreeViewItem[] = [];

    eventListeners: TypeStoreRegisterEvent<any> = {};

    @autowired(Score)
    private serviceCore: Score;
    @autowired(ElmerDOM)
    private $:ElmerDOM;
    @autowired(HtmlParse)
    private htmlParse: HtmlParse;

    getAppMode(): TypeAppMode {
        return "Any";
    }

    dispose(): void {
        window.removeEventListener("message", this.listen.bind(this));
    }
    addTabMenu(menuItem: TypeOfficeFormTabItem): void {
        this.tabMenus.push(menuItem);
    }
    addTabMenuItem(item: TypeOfficeFormTabMenuItem, tabIndex: number): void {
        if(tabIndex >=0 && tabIndex < this.tabMenus.length) {
            this.tabMenus[tabIndex].menus.push(item);
        } else {
            // tslint:disable-next-line: no-console
            console.error("Add new tabmenu fail, the tabIndex is out of range");
        }
    }
    addTabMenuButton(button:TypeOfficeFormMenuButton, tabIndex: number, menuIndex: number): void {
        if(tabIndex >=0 && tabIndex < this.tabMenus.length) {
            const menus = this.tabMenus[tabIndex].menus;
            if(menuIndex >=0 && menuIndex < menus.length) {
                menus[menuIndex].buttons.push(button);
            } else {
                // tslint:disable-next-line: no-console
                console.error("add new menu button fail, the tabIndex is out of range");
            }
        } else {
            // tslint:disable-next-line: no-console
            console.error("add new tabmenu fail, the tabIndex is out of range");
        }
    }
    init(): void {
        this.tabMenus = createOfficeFormTabMenu([
            {
                title: "编辑",
                menus: [{
                    title: "文件",
                    buttons: [
                        {
                            title: "新建",
                            icon: "icon_create",
                            id: "model.core.create"
                        },
                        {
                            title: "保存",
                            icon: "icon_save",
                            id: "model.core.save"
                        }, {
                            title: "导出",
                            icon: "icon_export"
                        }
                    ]
                }]
            }
        ]);
        this.updateHtmlStructure();
        window.addEventListener("message", this.listen.bind(this));
    }
    updateHtmlStructure(setState?: boolean): void {
        const htmlStructor = this.htmlParse.parse(this.serviceCore.codeHtml);
        const data: ITreeViewItem[] = [{
            title: "Root",
            key: 0,
            value: "Root",
            hasExpand: true,
            children: []
        }];
        let srcIndex = 0;
        const analyze = (saveData: ITreeViewItem[],vDom: IVirtualElement): void => {
            vDom.children.forEach((item:IVirtualElement, index: number): void => {
                const newTreeViewItem: ITreeViewItem = {
                    title: item.tagName,
                    key: srcIndex,
                    value: item.path.join("-"),
                    hasExpand: item.children.length > 0 && !(item.children.length === 1 && item.children[0].tagName === "text"),
                    children: []
                };
                srcIndex += 1;
                saveData.push(newTreeViewItem);
                if(item.children.length > 0) {
                    if((item.children.length === 1 && item.children[0].tagName !== "text") || item.children.length > 1) {
                        saveData[saveData.length - 1].hasExpand = false;
                        analyze(newTreeViewItem.children, item);
                    }
                }
            });
        };
        analyze(data[0].children, htmlStructor);
        if(setState) {
            this.setState(<any>{
                htmlStruct: data
            });
        } else {
            this.appDom.state.htmlStruct = data;
        }
    }
    save(): void {
        this.raiseEvent("onUpdateHtml", "<div>save</div>");
    }
    callRegisterEvent(eventName: TypeRegisterEvent, args?: any[]): void {
        const listeners = this.eventListeners;
        if(listeners) {
            Object.keys(listeners).map((lisKey: string): any => {
                const listener: TypeRegisterEventListener​​ = listeners[lisKey];
                if(listener.eventName === eventName && typeof listener.callback === "function") {
                    if(this.isArray(args)) {
                        listener.callback.apply(listener.this, args);
                    } else {
                        listener.callback.call(listener.this);
                    }
                }
            });
        }
    }
    create(event:any): void {
        console.log(event);
    }
    private listen(event:any): void {
        const msgData = event.data || {};
        if(msgData.type === POST_MESSAGE_KEY_VALUE) {
            const eventName: TypeSCoreEvent = msgData.eventName;
            switch(eventName) {
                case "onReady": {
                    this.raiseEvent("onUpdateHtml", this.score.codeHtml);
                    break;
                }
            }
        }
    }
}
