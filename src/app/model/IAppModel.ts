export type TypeAppMode = "Any" | "UIEditor" | "AnimationEditor";
export type TypeAppLifeCycle = "initTabMenu" | "onAppMenuClick";

export interface IAppModel {
    init?(): void;
    getAppMode(): TypeAppMode;
    registerLifeCycleMethod(appMode: TypeAppMode ,lifeCycleType: TypeAppLifeCycle, callback: Function): void;
}
