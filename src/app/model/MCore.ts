import { eAlert } from "elmer-common-ui/lib/components/dialog";
import {
    createOfficeFormTabMenu,
    createOfficeQuickButtons,
    TypeOfficeFormMenuButton,
    TypeOfficeFormTabItem,
    TypeOfficeFormTabMenuItem
} from "elmer-common-ui/lib/components/office/widget/form/TypeFormAttr";
import { ITreeViewItem } from "elmer-common-ui/lib/components/treeView";
import { autowired, ElmerDOM, ElmerServiceRequest } from "elmer-ui-core";
// tslint:disable-next-line: no-implicit-dependencies
import { HtmlParse, IVirtualElement } from "elmer-virtual-dom";
import { TypeRegisterEvent, TypeRegisterEventListener, TypeStoreRegisterEvent } from "../AppTypes";
import Score, { POST_MESSAGE_KEY_VALUE, TypeSCoreEvent } from "../service/SCore";
import createHtmlCode from "../views/create.html";
import { IAppModel, TypeAppMode } from "./IAppModel";

import { queueCallFunc } from "elmer-common";
import { showLoading } from "elmer-common-ui/lib/components";
import { commonHandler } from "../../utils/commonUtils";
import MBase from "./MBase";

export default class MMenus extends MBase {
    obj:any;
    tabMenus: TypeOfficeFormTabItem[] = [];
    htmlStructure: ITreeViewItem[] = [];

    eventListeners: TypeStoreRegisterEvent<any> = {};
    private appMode: TypeAppMode = "UIEditor";

    @autowired(Score)
    private serviceCore: Score;
    @autowired(ElmerDOM)
    private $:ElmerDOM;
    @autowired(HtmlParse)
    private htmlParse: HtmlParse;
    @autowired(ElmerServiceRequest)
    private http:ElmerServiceRequest;

    getAppMode(): TypeAppMode {
        return this.appMode;
    }
    setAppMode(mode: TypeAppMode): void {
        this.appMode = mode;
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
        this.updateProjectStruct();
        window.addEventListener("message", this.listen.bind(this));
    }
    updateProjectStruct(setState?: boolean): void {
        const data = this.getProjectStructure();
        if(setState) {
            this.setState(<any>{
                htmlStruct: data
            });
        } else {
            this.appDom.state.htmlStruct = data;
        }
    }
    getProjectStructure(): any {
        const models = this.appDom.model;
        const appMode = this.getAppMode();
        let structData:any[];
        if(models) {
            Object.keys(models).map((modelKey: string): any => {
                if(modelKey !== "core") {
                    const tmpModel:IAppModel = models[modelKey];
                    if(tmpModel.getAppMode() === appMode && typeof tmpModel["getProjectStruct"] === "function") {
                        structData = tmpModel["getProjectStruct"]();
                    }
                }
            });
        }
        return structData;
    }
    save(): void {
        this.raiseEvent("onUpdateHtml", "<div>save</div>");
    }
    callRegisterEvent(eventName: TypeRegisterEvent, args?: any[]): void {
        const listeners = this.eventListeners;
        if(listeners) {
            Object.keys(listeners).map((lisKey: string): any => {
                const listener: TypeRegisterEventListener = listeners[lisKey];
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
        const templateData = this.appDom.props.templates;
        const attrsData = {
            templates: templateData,
            choseTP: null,
        };
        const eAlertResult = eAlert({
            title: "新建项目",
            content: createHtmlCode,
            attrs: attrsData,
            events: {
                onClick: (eventObj:any) => {
                    attrsData.choseTP = eventObj.data.item;
                    eAlertResult.setData({
                        attrs: attrsData
                    });
                }
            },
            msgType: "OkCancel",
            okText: "创建",
            onBefore: (cevent:any) => {
                cevent.cancel = true;
                if(!(eAlertResult.component as any).attrs.choseTP) {
                    eAlert({
                        title: "错误",
                        message: "请选择创建项目模板",
                        iconType: "Error",
                    });
                    return;
                }
                if(this.isEmpty(eAlertResult.component.state["name"])) {
                    eAlert({
                        title: "错误",
                        message: "项目名称不能为空",
                        iconType: "Error",
                    });
                    return;
                }
                let loading = showLoading({title: "创建项目"});
                this.http.sendRequest({
                    namespace: "app",
                    endPoint: "createProject",
                    data: {
                        name: eAlertResult.component.state["name"],
                        template: {
                            code: this.getValue(eAlertResult, "component.attrs.choseTP.code"),
                            codeId: this.getValue(eAlertResult, "component.attrs.choseTP.id")
                        }
                    }
                }).then((resp) => {
                    loading.dispose();
                    loading = null;
                    if(!commonHandler(resp)) {
                        eAlertResult.hide();
                    }
                }).catch((error) => {
                    loading.dispose();
                    loading = null;
                    commonHandler(error, true);
                });
            }
        });
    }
    loadProjectInfo(): void {
        const loading = showLoading({title: "加载项目"});
        queueCallFunc([
            {
                id: "projectInfo",
                params: {},
                fn: ():any => {
                    return new Promise((resolve, reject) => {
                        this.http.sendRequest({
                            namespace: "app",
                            endPoint: "loadProject",
                            data: {
                                projectId: "{7EE30842-F858-895F-1044-8B029AAA65E2}"
                            }
                        }).then((data:any) => {
                            if(data.statusCode === 200) {
                                const info = data.data;
                                this.setState({
                                    name: info.name
                                });
                                resolve(info);
                            } else {
                                reject(data);
                            }
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }
            }
        ])
        .then(() => {
            loading.dispose();
        })
        .catch((error) => {
            loading.dispose();
            commonHandler(error.exception, true);
        });
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
