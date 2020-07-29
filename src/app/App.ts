import "elmer-common-ui/lib/components";
import { Component, declareComponent } from "elmer-ui-core";
import MMenus from "./model/MMenus";
import "./style/index.less";

type TypeAppModel = {
    menus: MMenus
};

@declareComponent({
    selector: "app",
    model: {
        menus: MMenus
    }
})
export default class App extends Component {
    model: TypeAppModel;
    $inject(): void {
        console.log(this.model.menus);
    }
    render():any {
        return require("./views/index.html");
    }
}
