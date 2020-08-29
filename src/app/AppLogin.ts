import "elmer-common-ui/lib/desktop/styles/desktop.less";
import "elmer-common-ui/lib/desktop/widget/login";
import { Component, declareComponent } from "elmer-ui-core";

@declareComponent({
    selector: "editorLogin"
})
export default class EditorLogin extends Component {
    id: string = "appLogin";
    render(): any {
        return `<div class="applogin" style="height: 100%;"><eui-app-login id="{{id}}" help="{{true}}" loginApiEndPoint="axxx"/></div>`;
    }
}
