import * as React from "react";

import { Login } from "./login/Login";
import { MiniMap } from "./mini-map/MiniMap";
import { GameWrapper } from "./game/GameWrapper";

export class Entry extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <Login />
        <GameWrapper />
        <MiniMap />
      </>
    );
  }
}
