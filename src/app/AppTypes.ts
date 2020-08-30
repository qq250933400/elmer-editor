export type TypeSupportCodeType = "css" | "javascript" | "html";

export type TypeAppState = {
    showCode?: boolean;
    showCodeType?: TypeSupportCodeType;
    codeSource?: string;
    previewLink?: string;
    rightTitle?: string;
    leftTitle?: string;
    htmlStruct?: any;
    cssAttrs?: any;
    htmlAttrs?: any;
    eventAttrs?: any;
    date?: string;
    name?: string;
};

export type TypeRegisterEvent = "onEditorBlur" | "onEditorChange" | "onEditorSave" | "onStructTreeClick";

export type TypeRegisterEventListener = {
    eventName: TypeRegisterEvent;
    callback?: Function;
    appMode?: string;
    this?: any;
};
export type TypeStoreRegisterEvent<T> = {[P in keyof T]: TypeRegisterEventListener};
