import { ITreeViewItem } from "elmer-common-ui/lib/components/treeView";
import { autowired } from "elmer-ui-core";
// tslint:disable-next-line: no-implicit-dependencies
import { HtmlParse, IVirtualElement } from "elmer-virtual-dom";
import Score, { POST_MESSAGE_KEY_VALUE, TypeSCoreEvent } from "../service/SCore";
import { TypeAppMode, TypeGetCodeResult } from "./IAppModel";
import MBase from "./MBase";

export default class MUIEditor extends MBase {
    @autowired(HtmlParse)
    htmlParse: HtmlParse;

    @autowired(Score)
    private serviceCore: Score;
    init(): void {
        this.registerEvent("onStructTreeClick", this.onStructChange.bind(this));
    }
    getAppMode():TypeAppMode {
        return "UIEditor";
    }
    getProjectStruct(): any {
        const data: ITreeViewItem[] = [{
            title: "DOM",
            key: 0,
            value: "DomStruct",
            hasExpand: true,
            children: [{
                title: "Component",
                value: "DOM_Component",
                hasExpand: true,
                children: []
            }]
        }, {
            title: "Code",
            key: 1,
            value: "CodeStruct",
            hasExpand: true,
            children: []
        }];
        this.initDomStructor(data[0].children[0]);
        this.initCodeStructor(data[1]);
        return data;
    }
    initDomStructor(parentItem: ITreeViewItem): void {
        const htmlStructor = this.htmlParse.parse(this.serviceCore.codeHtml);
        let srcIndex = 0;
        const analyze = (saveData: ITreeViewItem[],vDom: IVirtualElement): void => {
            vDom.children.forEach((item:IVirtualElement, index: number): void => {
                const newTreeViewItem: ITreeViewItem = {
                    title: item.tagName,
                    key: srcIndex,
                    value: "DOM_" + item.path.join("-"),
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
        analyze(parentItem.children, htmlStructor);
    }
    initCodeStructor(parentItem: ITreeViewItem): void {
        parentItem.children.push({
            title: "Component",
            value: "JS_Component",
            children: []
        });
        parentItem.children.push({
            title: "Template",
            value: "CSS_Html",
            children: []
        });
        parentItem.children.push({
            title: "CSS",
            value: "CSS_Code",
            children: []
        });
    }
    getCode(fileName?: string): TypeGetCodeResult {
        const result: TypeGetCodeResult = {};
        if(this.isEmpty(fileName)) {
            result.language = "javascript";
            result.code = this.score.codeJavascript;
        } else {
            if(fileName === "CSS") {
                result.language = "css";
                result.code = this.score.codeCSS;
            } else if(fileName === "HTML") {
                result.language = "html";
                result.code = this.score.codeHtml;
            }
        }
        return result;
    }
    private onStructChange(event:any): void {
        switch(event.data.value) {
            case "CSS_Code": {
                this.setState({
                    codeSource: this.score.codeCSS,
                    showCodeType: "css",
                    showCode: true
                });
                break;
            }
            case "JS_Component": {
                this.setState({
                    codeSource: this.score.codeJavascript,
                    showCodeType: "javascript",
                    showCode: true
                });
                break;
            }
            case "CSS_Html": {
                this.setState({
                    codeSource: this.score.codeHtml,
                    showCodeType: "html",
                    showCode: true
                });
                break;
            }
        }
    }
}
