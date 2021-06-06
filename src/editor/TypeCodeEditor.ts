import { PropTypes } from "elmer-ui-core";

export type TypeCodeEditorProps = {
    language: string;
    code?: string;
    onBlur?: Function;
    onChange?: Function;
    onDidSave?: Function;
    theme?: string;
};

export type TypeCodeEditorPropsRule = {[P in keyof TypeCodeEditorProps]?: any};

export const definePropTypes: TypeCodeEditorPropsRule = {
    language: {
        description: "支持的代码语言",
        defaultValue: "javascript",
        rule: PropTypes.oneValueOf(["mysql","java","javascript","typescript","vb","xml","scss","css","less","html","sql","php","swift","python","markdown","yaml"]).isRequired
    },
    code: {
        description: "设置代码",
        defaultValue: "",
        rule: PropTypes.string
    },
    onBlur: {
        description: "失去焦点",
        rule: PropTypes.func
    },
    onDidSave: {
        description: "快捷键保存事件",
        rule: PropTypes.func
    },
    onChange: {
        description: "输入内容变化事件",
        rule: PropTypes.func
    },
    theme: {
        description: "编辑框主题",
        defaultValue: "",
        rule: PropTypes.string
    }
};
