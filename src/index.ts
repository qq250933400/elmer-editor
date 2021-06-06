import { ElmerUI } from "elmer-ui-core";
import EditorApp from "./editor/app";
import "./style/index.less";

// // dd
window.onload = ()=> {
    const ui = new ElmerUI();
    const indexData = {
        render:() => "<EditorApp />"
    };
    ui.render(document.getElementById("app"), indexData, {
        components: {
            EditorApp
        }
    });
};
