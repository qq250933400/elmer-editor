import { TypeSupportCodeType } from "../AppTypes";
import { TypeAppMode } from "./IAppModel";
import MBase from "./MBase";

export default class MView extends MBase {
    init(): void {
        // init views menu
        this.coreObj.addTabMenu({
            title: "视图",
            menus: [
                {
                    title: "代码",
                    buttons: [
                        {
                            title: "CSS样式",
                            icon: "icon_css",
                            id: "model.view.onShowCSS"
                        }, {
                            title: "JS脚本",
                            icon: "icon_javascript",
                            id: "model.view.onShowJs"
                        }, {
                            title: "Html代码",
                            icon: "icon_html",
                            id: "model.view.onShowHtml"
                        }
                    ]
                }, {
                    title: "窗口",
                    buttons: [
                        {
                            title: "全屏",
                            icon: "icon_fullscreen",
                            id: "model.view.onFullScreen"
                        }
                    ]
                }
            ]
        });
        this.coreObj.registerEvent("onEditorSave",this.onEditorSave, this);
    }
    getAppMode():TypeAppMode {
        return "Any";
    }
    onFullScreen(): void {
        if(this.isFullScreen()) {
            this.exitFullscreen();
        } else {
            this.launchFullscreen(document.body);
        }
    }
    onEditorSave(): void {
        const showCodeType = this.getState("showCodeType");
        const inputCode = this.getInputCode();
        if(showCodeType === "css") {
            this.score.codeCSS = inputCode;
        } else if(showCodeType === "html") {
            this.score.codeHtml = inputCode;
            this.coreObj.updateHtmlStructure();
            this.raiseEvent("onUpdateHtml", inputCode);
        } else {
            this.score.codeJavascript = inputCode;
        }
    }
    onShowCSS(event:any): void {
        const showCodeType = this.getState("showCodeType");
        const showCodeState = showCodeType === "css" ? !this.getState("showCode") : true;
        const code = this.getEditorCode("css", showCodeType, showCodeState);
        this.setTabButton(event, "css");
        this.setState({
            showCode: showCodeState,
            showCodeType: "css",
            codeSource: code,
            rightTitle: showCodeState ? "查看代码" : "预览"
        });
    }
    onShowJs(event:any): void {
        const showCodeType = this.getState("showCodeType");
        const showCodeState = showCodeType === "javascript" ? !this.getState("showCode") : true;
        const code = this.getEditorCode("javascript", showCodeType, showCodeState);
        this.setTabButton(event, "javascript");
        this.setState({
            showCode: showCodeState,
            showCodeType: "javascript",
            codeSource: code,
            rightTitle: showCodeState ? "查看代码" : "预览"
        });
    }
    onShowHtml(event:any): void {
        const showCodeType = this.getState("showCodeType");
        const showCodeState = showCodeType === "html" ? !this.getState("showCode") : true;
        const code = this.getEditorCode("html", showCodeType, showCodeState);
        this.setTabButton(event, "html");
        this.setState({
            showCode: showCodeState,
            showCodeType: "html",
            codeSource: code,
            rightTitle: showCodeState ? "查看代码" : "预览"
        });
        if(!showCodeState) {
            this.raiseEvent("onUpdateHtml", code);
            this.coreObj.updateHtmlStructure(true);
        }
    }
    private getEditorCode(codeType: TypeSupportCodeType, lastShowCodeType: TypeSupportCodeType, showCode?: boolean): any {
        if(showCode) {
            if(codeType === "css") {
                return this.score.codeCSS;
            } else if(codeType === "html") {
                return this.score.codeHtml;
            } else {
                return this.score.codeJavascript;
            }
        } else {
            const saveCode = this.getInputCode();
            if(codeType === lastShowCodeType) {
                if(codeType === "css") {
                    this.score.codeCSS = saveCode;
                } else if(codeType === "html") {
                    this.score.codeHtml = saveCode;
                } else {
                    this.score.codeJavascript = saveCode;
                }
            } else {
                if(lastShowCodeType === "css") {
                    this.score.codeCSS = saveCode;
                } else if(lastShowCodeType === "html") {
                    this.score.codeHtml = saveCode;
                } else {
                    this.score.codeJavascript = saveCode;
                }
            }
            return saveCode;
        }
    }
    private setTabButton(event:any, codeType: string): void {
        const showCodeType = this.getState("showCodeType");
        const showCodeState = showCodeType === codeType ? !this.getState("showCode") : true;
        const buttonIndex: number = this.getValue(event, "event.data.index");
        const menuIndex: number = this.getValue(event, "event.data.menuItem.key");
        const tabMenu = JSON.parse(JSON.stringify(event.tabMenu));
        const menuItem = tabMenu.menus[menuIndex];
        for(let i=0;i<menuItem.buttons.length;i++) {
            if(i === buttonIndex) {
                menuItem.buttons[i].checked = showCodeState;
            } else {
                menuItem.buttons[i].checked = false;
            }
        }
        tabMenu.menus[menuIndex] = menuItem;
        event.setMenuState(tabMenu);
    }
}
