import { StaticCommon } from "elmer-common";
import { autoInit,redux } from "elmer-ui-core";
import { ACTION_UPDATE_DEMO_COUNT, ACTION_UPDATE_PROJECT_TEMPLATE } from "./action";

const initState = {
    templates: [],
    demo: {
        count: 0
    }
};

const appReducer = (state = initState, action):any => {
    switch (action.type) {
        case ACTION_UPDATE_PROJECT_TEMPLATE: {
            return {
                ...state,
                templates: StaticCommon.getValue(action,"data.data") || []
            };
        }
        case ACTION_UPDATE_DEMO_COUNT: {
            return {
                ...state,
                demo: {
                    count: action.data
                }
            };
        }
        default: {
            return state;
        }
    }
};

redux.defineReducer(autoInit(redux.ReduxController), "app", appReducer);

export default appReducer;
