import * as React from "react";
import * as ReactDOM from "react-dom";
import { Entry } from "./components/Entry";

const App = () => <Entry />

var container = document.createElement("div");
container.setAttribute("class", "app-wrapper");
document.body.appendChild(container);

ReactDOM.render(<App/>, container);
