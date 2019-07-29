import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { initStore } from "./stores/Store";
import { LayoutContainer } from "./components/layout/LayoutContainer";

declare global {
  interface Window {
    opera: any;
    store: any;
  }
}

export const App = () => (
  <Provider store={initStore()}>
    <LayoutContainer />
  </Provider>
);

declare const __FIXED_PORT_9000__;

console.error(__FIXED_PORT_9000__);

let container = document.createElement("div");
container.setAttribute("class", "app-wrapper");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
