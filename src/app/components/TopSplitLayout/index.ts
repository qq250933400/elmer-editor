import { autowired, Component,ElmerDOM, IElmerMouseEvent } from "elmer-ui-core";
import "./index.less";

export default class TopSplitLayout extends Component {
    isPressed: boolean;
    mouseY: number = 0;
    buttonY: number = 0;
    topId: string;
    buttonId: string;
    bottomId: string;
    topDom:HTMLDivElement;
    buttonDom: HTMLDivElement;
    bottomDom: HTMLDivElement;

    @autowired(ElmerDOM)
    private $: ElmerDOM;

    constructor(props:any) {
        super(props);
        this.topId = this.guid();
        this.buttonId = this.guid();
        this.bottomId = this.guid();
    }
    $didMount(): void {
        this.topDom = this.dom[this.topId];
        this.buttonDom = this.dom[this.buttonId];
        this.bottomDom = this.dom[this.bottomId];
        this.buttonY = this.topDom.clientHeight;
    }
    handleOnMousePress(evt:IElmerMouseEvent): void {
        this.mouseY = evt.nativeEvent.clientY;
    }
    handleOnButtonPress(): void {
        this.isPressed = true;
    }
    handleOnMouseMove(evt:IElmerMouseEvent): void {
        if(this.isPressed) {
            const posY = evt.nativeEvent.clientY;
            const offsetY = posY - this.mouseY + this.buttonY;
            const bottomHeight = this.topDom.parentElement.clientHeight - this.buttonDom.clientHeight - offsetY;
            if(offsetY >= 0 && bottomHeight >= 0) {
                this.mouseY = posY;
                this.buttonY = offsetY;
                this.$.css(this.topDom, "height", offsetY);
                this.$.css(this.bottomDom, "height", bottomHeight);
            }
        }
    }
    handleOnMouseUp(): void {
        this.isPressed = false;
    }
    render():any {
        return require("./index.html");
    }
}
