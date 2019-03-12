import * as React from "react";
import * as ReactDOM from "react-dom";

import { CanvasWrapper } from "./canvas/CanvasWrapper";
import { MiniMapWrapper } from "./canvas/MiniMapWrapper";
import { UserInterfaceWrapper } from "./ui/UserInterfaceWrapper";

class App extends React.Component<{}, {}> {
    public render() {
        return <>
            <UserInterfaceWrapper/>
            <CanvasWrapper />
            <MiniMapWrapper />
        </>
    }
}

var container = document.createElement("div");
container.setAttribute("class", "app-wrapper");
document.body.appendChild(container);

ReactDOM.render(<App/>, container);

