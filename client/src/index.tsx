import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Entry } from "./components/Entry";
import { getStore } from "./stores/Store";

const App = () => (
  <Provider store={getStore()}>
    <Entry />;
  </Provider>
);

let container = document.createElement("div");
container.setAttribute("class", "app-wrapper");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
