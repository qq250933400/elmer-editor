import { Component, declareComponent } from "elmer-ui-core";
import SCore from "../../service/SCore";
import { mapDispatchToProps, mapStateToProps } from "../../state/action";
import CanvasModel from "./AppCanvasModel";

type TypeAppCanvasModel = {
    app: CanvasModel
};

type TypeAppCanvasProps = {
    actionUpdateDemoCount: Function;
    demoCount: number;
};

type TypeAppCanvasState = {
    demoCount: number;
};

@declareComponent({
    selector: "UiEditorCanvas",
    model: {
        app: CanvasModel
    },
    service: {
        core: SCore
    },
    connect: {
        mapStateToProps,
        mapDispatchToProps
    }
})
export default class AppCanvas extends Component<TypeAppCanvasProps, TypeAppCanvasState> {
    model: TypeAppCanvasModel;
    $inject(): void {
        this.state.demoCount = this.props.demoCount;
        this.model.app.init();
    }
    $willReceiveProps(props:TypeAppCanvasProps): void {
        this.setState({
            demoCount: props.demoCount
        });
    }
    onClick(): void {
        this.props.actionUpdateDemoCount(this.state.demoCount + 1);
    }
    render():any {
        return this.model.app.getRenderHtmlCode();
    }
}
