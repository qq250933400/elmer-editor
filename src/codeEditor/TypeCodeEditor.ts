import { IPropCheckRule, PropTypes } from "elmer-ui-core";

export type TypeCodeEditorProps = {
    language: string
};

export type TypeCodeEditorPropsRule = {[P in keyof TypeCodeEditorProps]?: IPropCheckRule};

export const definePropTypes: TypeCodeEditorPropsRule = {
    language: {
        description: "支持的代码语言",
        defaultValue: "javascript",
        rule: PropTypes.oneValueOf(["mysql","java","javascript","typescript","vb","xml","scss","css","less","html","sql","php","swift","python","markdown","yaml"]).isRequired
    }
};
