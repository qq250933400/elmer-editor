import { ITreeViewItem } from "elmer-common-ui/lib/components/treeView";
import { autowired, IElmerEvent } from "elmer-ui-core";
import SCSSProperties from "../service/SCSSProperties";
import MBase from "./MBase";

export default class MAttributes extends MBase {
    @autowired(SCSSProperties)
    private serviceCSS: SCSSProperties;
    init(): void {
        this.registerEvent("onStructTreeClick", (event:IElmerEvent): void => {
            this.updateAttributes(event);
        }, this);
    }
    updateAttributes(event:IElmerEvent): void {
        const itemData:ITreeViewItem = event.data;
        if(itemData.key === 0 && itemData.title === "Root") {
            this.setState({
                cssAttrs: {}
            }, true);
        } else {
            const cssAttrs = this.serviceCSS.getDomCSSAttrs(itemData.title);
            this.setState({
                cssAttrs
            }, true);
        }
    }
}
