import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Entry } from "./components/Entry";
import { initStore } from "./stores/Store";

declare global {
  interface Window {
    opera: any;
    store: any;
  }
}

export const App = () => (
  <Provider store={initStore()}>
    <Entry />
  </Provider>
);

let container = document.createElement("div");
container.setAttribute("class", "app-wrapper");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
