import { TypeSupportCodeType } from "../AppTypes";
import { TypeAppMode, TypeGetCodeResult } from "./IAppModel";
import MBase from "./MBase";

export default class MView extends MBase {
    init(): void {
        // init views menu
        this.coreObj.addTabMenu({
            title: "视图",
            menus: [{
                    title: "窗口",
                    buttons: [
                        {
                            title: "代码",
                            icon: "icon_code",
                            id: "model.view.onShowCode"
                        },
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
            this.coreObj.updateProjectStruct(true);
            this.raiseEvent("onUpdateHtml", inputCode);
        } else {
            this.score.codeJavascript = inputCode;
        }
    }
    onShowCode(event:any): void {
        const showCodeState = !this.getState("showCode");
        const buttonIndex: number = this.getValue(event, "event.data.index");
        const menuIndex: number = this.getValue(event, "event.data.menuItem.key");
        const tabMenu = JSON.parse(JSON.stringify(event.tabMenu));
        const menuItem = tabMenu.menus[menuIndex];
        const codeResult: TypeGetCodeResult = showCodeState ? this.callbyName<TypeGetCodeResult>("getCode", null) : null;
        for(let i=0;i<menuItem.buttons.length;i++) {
            if(i === buttonIndex) {
                menuItem.buttons[i].checked = showCodeState;
                break;
            }
        }
        tabMenu.menus[menuIndex] = menuItem;
        event.setMenuState(tabMenu);
        this.setState({
            showCode: showCodeState,
            showCodeType: codeResult ? codeResult.language : "javascript",
            codeSource: codeResult ? codeResult.code : "",
            rightTitle: showCodeState ? "查看代码" : "预览"
        });
    }
}
