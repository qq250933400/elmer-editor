import "elmer-common-ui/lib/components";
import { Component, declareComponent, IElmerEvent } from "elmer-ui-core";
import { TypeAppState } from "./AppTypes";
import TopSplitLayout from "./components/TopSplitLayout";
import MAttributes from "./model/MAttributes";
import MCore from "./model/MCore";
import MViews from "./model/MView";
import SCore from "./service/SCore";
import SCSSProperties from "./service/SCSSProperties";
import { mapStateToProps } from "./state/action";

// tslint:disable: ordered-imports
import "./components/AppCanvas";
import "./components/properties";
import "./style/index.less";
import "elmer-common-ui/lib/style/app.less";

type TypeAppModel = {
    core: MCore,
    view: MViews,
    attributes: MAttributes
};
type TypeAppService = {
    core: SCore;
    css: SCSSProperties;
};

@declareComponent({
    selector: "app",
    model: {
        core: MCore,
        view: MViews,
        attributes: MAttributes
    },
    service: {
        core: SCore,
        css: SCSSProperties
    },
    connect: {
        mapStateToProps
    },
    components: [
        {
            selector: "TopSplitLayout",
            component: TopSplitLayout
        }
    ]
})
export default class App extends Component {
    model: TypeAppModel;
    service: TypeAppService;
    state: TypeAppState = {
        showCode: false,
        rightTitle: "预览",
        leftTitle: "项目管理",
        codeSource: "<div>Demo</div>"
    };
    iframeId: string;
    iframe: any;
    formAppId: string;
    editorId: string;
    editor: any;
    $inject(): void {
        this.iframeId = this.guid();
        this.formAppId = this.guid();
        this.editorId = this.guid();(<any>this.state).demoCode = (<any>this.props).demoCode;
        Object.keys(this.model).map((modelKey:string) => {
            typeof this.model[modelKey].afterInit === "function" && typeof this.model[modelKey].afterInit();
        });
        console.log(this.props," ++++++  ");
    }
    $willReceiveProps(props:any): void {
        console.log("willReceiveProps", props);
    }
    $dispose(): void {
        Object.keys(this.model).map((modelKey:string) => {
            typeof this.model[modelKey].dispose === "function" && typeof this.model[modelKey].dispose();
        });
    }
    $didMount(): void {
        const formApp = this.dom[this.formAppId];
        this.iframe = formApp.dom[this.iframeId];
        Object.keys(this.model).map((modelKey:string) => {
            typeof this.model[modelKey].setIframe === "function" && typeof this.model[modelKey].setIframe(this.iframe);
        });
    }
    $didUpdate(): void {
        if(this.state.showCode) {
            console.log("------didUpdate------");
            const formApp = this.dom[this.formAppId];
            this.editor = formApp.dom[this.editorId];
        } else {
            this.editor = null;
        }
    }
    handleOnSplitLayoutChange(): void {
        if(this.editor) {
            this.editor.resetLayout();
        }
    }
    onOfficeFormClick(evt:IElmerEvent): void {
        const id:string = evt.data.id;
        const callback  = this.getValue(this, id);
        if(typeof callback === "function") {
            const objId = id.replace(/\.[0-9a-z]{1,}$/i,"");
            const obj = this.getValue(this, objId);
            callback.apply(obj, [evt]);
        } else {
            // tslint:disable-next-line: no-console
            console.log("do not support this button event: ", id);
        }
    }
    onEditorDidSave(): void {
        this.model.core.callRegisterEvent("onEditorSave");
    }
    onStructTreeClick(evt:any): void {
        this.model.core.callRegisterEvent("onStructTreeClick", [evt]);
    }
    render():any {
        return require("./views/index.html");
    }
}
