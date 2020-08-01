export type TypeSupportCodeType = "css" | "javascript" | "html";

export type TypeAppState = {
    showCode?: boolean;
    showCodeType?: TypeSupportCodeType;
    codeSource?: string;
    previewLink?: string;
    rightTitle?: string;
    leftTitle?: string;
    htmlStruct?: any;
};

export type TypeRegisterEvent = "onEditorBlur" | "onEditorChange" | "onEditorSave";
export type TypeRegisterEventListener = {
    eventName: TypeRegisterEvent;
    callback?: Function;
    this?: any;
};
export type TypeStoreRegisterEvent<T> = {[P in keyof T]: TypeRegisterEventListener};