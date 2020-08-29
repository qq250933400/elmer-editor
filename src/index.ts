import { ElmerUI, WindowResizeListen } from "elmer-ui-core";
import "./app/App";
import "./app/AppLogin";
import "./app/AppRouter";
import "./app/state/reducers";
import "./codeEditor/index";
import "./config/service";
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
    let wResizeListen = new WindowResizeListen();
    let htmlCode = require("./app/views/index.html");
    wResizeListen.listen();
    // tslint:disable-next-line:no-console
    console.time("ElmerRender");
    ui.render(document.getElementById("app"), "<eui-app-router />", indexData);
    htmlCode = null;
    wResizeListen = null;
    // tslint:disable-next-line:no-console
    console.timeEnd("ElmerRender");
};
