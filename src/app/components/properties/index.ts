import { Component, declareComponent, getUI, IElmerEvent, IElmerKeyboardEvent, IPropCheckRule, PropTypes } from "elmer-ui-core";
import "./index.less";

type TypePropertiesProps = {
    data?: any;
    isHumpToStr?: boolean;
};

type TypePropertiesPropsRule = {[P in keyof TypePropertiesProps]?: IPropCheckRule };

type TypeDropdownUI = {
    visible?: boolean;
    parent?: HTMLDivElement;
    onClick?: Function;
    onChange?: Function;
    onKeydown?(event:IElmerEvent): void;
    render?(): any;
    show?(parent?:HTMLElement): void;
    hide?(): void;
    setData?(data:any, refresh?: boolean): void;
};

@declareComponent({
    selector: "property-editor"
})
export default class PropertiesComponent extends Component {
    static propType: TypePropertiesPropsRule = {
        data: {
            description: "定义属性",
            rule: PropTypes.any.isRequired
        },
        isHumpToStr: {
            description: "是否将属性name转换成-链接",
            defaultValue: false,
            rule: PropTypes.bool
        }
    };
    state: any = {
        data: {},
        focusData: {},
        showSuggest: false,
        suggestClickEvent: false
    };
    props: TypePropertiesProps;
    dropdownUI: TypeDropdownUI = {
        render: ():any => {
            return `<ul et:keydown="onKeydown">
                <li em:for="let sug in this.listData" et:click="onClick" data-attr="{{attr.index}}"><span>{{sug}}</span></li>
            </ul>`;
        },
        show(parent?:HTMLElement): void {
            if(parent) {
                parent.appendChild(this.parent);
            }
            this.visible = true;
            this.parent.style.display="block";
        },
        hide(): void {
            this.visible = false;
            this.parent.style.display="none";
        },
        onClick(evt:IElmerEvent): void {
            const sug = evt.data.sug;
            evt.nativeEvent.cancelBubble = true;
            evt.nativeEvent.stopPropagation();
            this.hide();
            typeof this.onChange === "function" && this.onChange(sug);
        },
        onKeydown(event:IElmerEvent): void {
            event.nativeEvent.cancelBubble = true;
            console.log("keydown");
        }
    };
    dropdownRender: any;
    constructor(props:TypePropertiesProps) {
        super(props);
        const ui = getUI();
        this.state.data = this.convertAttrs(props.data);
        this.dropdownUI.parent = document.createElement("div");
        this.dropdownUI.parent.className = "properties-editor-suggest";
        // this.dropdownRender = ui.render(this.dropdownUI.parent, this.dropdownUI.render(), this.dropdownUI);
    }
    onBodyClick(): void {
        this.setState({
            showSuggest: false
        });
    }
    handleOnInputClick(evt:IElmerEvent): void {
        evt.nativeEvent.cancelBubble = true;
        evt.nativeEvent.stopPropagation();
        if(!this.state.suggestClickEvent) {
            this.setState({
                showSuggest: true
            });
        } else {
            this.state.suggestClickEvent = false;
        }
    }
    handleOnInputKeydown(evt:IElmerKeyboardEvent): void {
        if(!this.dropdownUI.visible && evt.nativeEvent.keyCode !== undefined) {
            evt.nativeEvent.cancelBubble = true;
            evt.nativeEvent.stopPropagation();
        }
    }
    onSuggestClick(evt:IElmerEvent): void {
        const sug = evt.data.sug;
        const index = evt.dataSet.attr;
        const oldData = JSON.parse(JSON.stringify(this.state.data));
        evt.nativeEvent.cancelBubble = true;
        evt.nativeEvent.stopPropagation();
        oldData[index].defaultValue = sug;
        this.setState({
            data: oldData,
            showSuggest: false,
            suggestClickEvent: true
        }, true);
    }
    handleOnLineFocus(evt:IElmerEvent): void {
        evt.nativeEvent.cancelBubble = true;
        this.setState({
            focusData: evt.data.attr
        });
        // this.dropdownUI.setData({
        //     listData: evt.data.attr.suggest
        // });
    }
    $onPropsChanged(props: TypePropertiesProps): void {
        if(JSON.stringify(this.state.data) !== JSON.stringify(props.data)) {
            this.setState({
                data: this.convertAttrs(props.data)
            });
        }
    }
    render(): any {
        return require("./index.html");
    }
    $dispose(): void {
        if(this.dropdownRender) {
            this.dropdownRender.dispose();
            this.dropdownUI.parent = null;
            delete this.dropdownUI.parent;
        }
    }
    private convertAttrs(attrData: any): any[] {
        const resultData = [];
        if(attrData) {
            Object.keys(attrData).map((attrKey, index: number) => {
                const newItemData = {
                    name: attrKey,
                    defaultValue: attrData[attrKey].defaultValue,
                    description: attrData[attrKey].description,
                    suggest: attrData[attrKey].suggest || [],
                    index
                };
                const autoConvert = attrData[attrKey].isHumpToStr === undefined || attrData[attrKey].isHumpToStr;
                if(this.props.isHumpToStr && autoConvert) {
                    newItemData.name = this.humpToStr(attrKey);
                }
                resultData.push(newItemData);
            });
        }
        return resultData;
    }
}
