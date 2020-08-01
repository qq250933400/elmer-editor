import { Component,declareComponent } from "elmer-ui-core";

@declareComponent({
    selector: "AppRouter"
})
export default class AppRouter extends Component {
    render():any {
        return require("./views/router.html");
    }
}
