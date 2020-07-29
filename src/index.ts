import { ElmerUI, WindowResizeListen } from "elmer-ui-core";
import "./app/App";
import "./codeEditor/index";
import "./style/index.less";
// // dd
window.onload = ()=> {
    const ui = new ElmerUI();
    const indexData = {
        num1:11,
        num2:33,
        exProps: {
            title: "linke",
            before: "sdd"
        }
    };
    typeof window["debug"] === "function" && window["debug"](false);
    let wResizeListen = new WindowResizeListen();
    let htmlCode = require("./app/views/index.html");
    wResizeListen.listen();
    // tslint:disable-next-line:no-console
    console.time("ElmerRender");
    ui.render(document.getElementById("app"), "<eui-app />", indexData);
    htmlCode = null;
    wResizeListen = null;
    // tslint:disable-next-line:no-console
    console.timeEnd("ElmerRender");
};
