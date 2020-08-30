// tslint:disable-next-line: no-implicit-dependencies
import { IVirtualElement } from "elmer-virtual-dom";
import { TypeSupportCodeType } from "../AppTypes";

export type TypeGetCodeResult = {
    language?: TypeSupportCodeType;
    code?: string;
};

export type TypeAppMode = "Any" | "UIEditor" | "AnimationEditor";
export type TypeAppLifeCycle = "initTabMenu" | "onAppMenuClick";

export interface IAppModel {
    init?(): void;
    getAppMode(): TypeAppMode;
    getProjectStruct?(): IVirtualElement[];
    getCode?(): TypeGetCodeResult;
    registerLifeCycleMethod(appMode: TypeAppMode ,lifeCycleType: TypeAppLifeCycle, callback: Function): void;
}
