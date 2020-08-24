import { autoInit,redux } from "elmer-ui-core";
import { ACTION_UPDATE_PROJECT_TEMPLATE } from "./action";

const initState = {
    templates: []
};

redux.defineReducer(autoInit(redux.ReduxController), "app", (state = initState, action):any => {
    switch (action.type) {
        case ACTION_UPDATE_PROJECT_TEMPLATE: {
            console.log("------Load Template", action.data);
            return {
                ...state,
                templates: action.data
            };
        }
        default: {
            return state;
        }
    }
});
