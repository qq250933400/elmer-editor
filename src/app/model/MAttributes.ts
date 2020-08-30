import { ITreeViewItem } from "elmer-common-ui/lib/components/treeView";
import { autowired, IElmerEvent } from "elmer-ui-core";
import SCSSProperties from "../service/SCSSProperties";
import { TypeAppMode } from "./IAppModel";
import MBase from "./MBase";

export default class MAttributes extends MBase {
    @autowired(SCSSProperties)
    private serviceCSS: SCSSProperties;
    init(): void {
        this.registerEvent("onStructTreeClick", (event:IElmerEvent): void => {
            this.updateAttributes(event);
        }, this);
    }
    getAppMode():TypeAppMode {
        return "UIEditor";
    }
    updateAttributes(event:IElmerEvent): void {
        const itemData:ITreeViewItem = event.data;
        if(/^DOM_/.test(itemData.value)) {
            if(itemData.value === "DOM_Component") {
                this.setState({
                    cssAttrs: {
                        className: {
                            defaultValue: "blueTheme"
                        }
                    }
                }, true);
            } else {
                const cssAttrs = this.serviceCSS.getDomCSSAttrs(itemData.title);
                this.setState({
                    cssAttrs
                }, true);
            }
        }
    }
}
