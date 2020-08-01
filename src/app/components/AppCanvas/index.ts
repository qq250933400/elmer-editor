import { Component, declareComponent } from "elmer-ui-core";
import SCore from "../../service/SCore";
import CanvasModel from "./AppCanvasModel";

type TypeAppCanvasModel = {
    app: CanvasModel
};

@declareComponent({
    selector: "UiEditorCanvas",
    model: {
        app: CanvasModel
    },
    service: {
        core: SCore
    }
})
export default class AppCanvas extends Component {
    model: TypeAppCanvasModel;
    $inject(): void {
        this.model.app.init();
    }
    render():any {
        return this.model.app.getRenderHtmlCode();
    }
}
