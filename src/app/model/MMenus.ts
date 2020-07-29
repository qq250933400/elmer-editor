import { Common } from "elmer-common";
import { createOfficeFormTabMenu, createOfficeQuickButtons } from "elmer-common-ui/lib/components/office/widget/form/TypeFormAttr";

export default class MMenus extends Common {
    obj:any;
    tabMenus: any[] = [];
    constructor(obj:any) {
        super();
        this.obj = obj;
        this.tabMenus = createOfficeFormTabMenu([
            {
                title: "文件",
                menus: [{
                    title: "存储",
                    buttons: [
                        {
                            title: "保存",
                            icon: "icon_save"
                        }, {
                            title: "导出",
                            icon: "icon_export"
                        }
                    ]
                }]
            }
        ]);
    }
}
