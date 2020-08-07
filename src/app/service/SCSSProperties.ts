import { Common } from "elmer-common";
import { Injectable } from "elmer-ui-core";

export type TypeSupportCSS = {
    className?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    borderImage?: string;
    boxSizing?: string;
    background?: string;
    value?: string;
    href?: string;
    target?: string;
};

export type TypeCssDataInfo = {
    defaultValue?: string;
    suggest?: string[];
    description?: string;
    isHumpToStr?: boolean;
};

export type TypeCssData = { [P in keyof TypeSupportCSS]: TypeCssDataInfo };

@Injectable("SCSSProperties")
export default class SCSSProperties extends Common {
    baseCss:TypeCssData = {
        className: {
            description: "设置ClassName",
            isHumpToStr: false
        },
        borderWidth: {
            defaultValue: "",
            suggest: ["none", "initial", "inherit"]
        },
        borderStyle: {
            defaultValue: "",
            suggest: ["none", "inherit", "hidden","dotted","dashed","solid","double","groove","ridge","inset","outset"]
        },
        borderColor: {
            defaultValue: "",
            suggest: ["none", "initial", "inherit"]
        },
        boxSizing: {
            defaultValue: "inherit",
            suggest: ["initial", "inherit","content-box", "border-box"],
            description: "盒子模型"
        },
        background: {
            defaultValue: "",
            description: "背景",
            suggest: ["Action_Color", "Action_Gradient", "Action_Image"],
        }
    };
    inputCss: TypeCssData = {
        value: {
            defaultValue: "",
            description: "文本框内容"
        }
    };
    aCSS: TypeCssData = {
        href: {
            defaultValue: "javascript: void(0);",
            description: "链接地址"
        }
    };
    getDomCSSAttrs(tagName: string): TypeCssData {
        const baseAttrs = JSON.parse(JSON.stringify(this.baseCss));
        switch(tagName.toLowerCase()) {
            case "input": {
                this.extend(baseAttrs, this.inputCss);
                break;
            }
            case "a": {
                this.extend(baseAttrs, this.aCSS);
                break;
            }
        }
        return baseAttrs;
    }
}
