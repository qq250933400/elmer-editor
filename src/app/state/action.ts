import { StaticCommon } from "elmer-common";
export const ACTION_UPDATE_PROJECT_TEMPLATE = "ACTION_UPDATE_PROJECT_TEMPLATE";

export const mapStateToProps = (state) => {
    console.log(state);
    return {
        templates: StaticCommon.getValue(state,"app.templates")
    };
};
