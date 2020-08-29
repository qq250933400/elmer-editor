import { StaticCommon } from "elmer-common";
export const ACTION_UPDATE_PROJECT_TEMPLATE = "ACTION_UPDATE_PROJECT_TEMPLATE";
export const ACTION_UPDATE_DEMO_COUNT = "ACTION_UPDATE_DEMO_COUNT";

export const actionUpdateDemoCount = (count:number) => ({
    type: ACTION_UPDATE_DEMO_COUNT,
    data: count
});

export const mapStateToProps = (state) => {
    return {
        templates: StaticCommon.getValue(state,"app.templates"),
        demoCount: StaticCommon.getValue(state,"app.demo.count"),
    };
};

export const mapDispatchToProps = (dispatch:Function) => ({
    actionUpdateDemoCount: (data) => (dispatch(actionUpdateDemoCount(data)))
});
