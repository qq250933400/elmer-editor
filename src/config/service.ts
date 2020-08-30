import { defineGlobalConfiguration } from "elmer-ui-core";
import { ACTION_UPDATE_PROJECT_TEMPLATE } from "../app/state/action";

defineGlobalConfiguration({
    env: "dev",
    router: {
        service: {
            config: {
                app: {
                    baseUrl: "http://localhost/elmer/public/index.php",
                    envUrls: {
                        DEV: "http://localhost/elmer/public/index.php"
                    },
                    endPoints: {
                        supportProject: {
                            url: "/uieditor/project/template",
                            type: "POST",
                            options: {
                                path: "/",
                                reduxActionType: ACTION_UPDATE_PROJECT_TEMPLATE
                            }
                        }
                    }
                }
            }
        }
    },
    service: {
        config: {
            app: {
                baseUrl: "http://localhost/elmer/public/index.php",
                envUrls: {
                    DEV: "http://localhost/elmer/public/index.php"
                },
                endPoints: {
                    createProject: {
                        url: "/uieditor/project/create",
                        type: "POST"
                    },
                    loadProject: {
                        url: "/uieditor/project/get",
                        type: "POST"
                    }
                }
            }
        }
    }
});

export default {};
