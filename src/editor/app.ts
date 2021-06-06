import { useComponent,Loadable } from "elmer-ui-core";

const EditorComponent = Loadable({
    loader: () => import(/** webpackChunkName: 'editor' */ "./CodeEditor")
});

export default () => {
    useComponent("Editor", EditorComponent);
    return '<Editor />';
};
