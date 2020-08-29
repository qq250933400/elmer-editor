import "elmer-common-ui/lib/desktop/app/login";
import { Component,declareComponent } from "elmer-ui-core";
import appReducer from "./state/reducers";

@declareComponent({
    selector: "AppRouter"
})
export default class AppRouter extends Component {
    reducerObj:any = {
        app: appReducer
    };
    testData = {
        title: "demo",
        age: 11
    }
    render():any {
        return require("./views/router.html");
    }
}
