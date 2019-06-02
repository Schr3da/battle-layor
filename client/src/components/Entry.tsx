import * as React from "react";

import { LoginContainer } from "./login/LoginContainer";
import { MiniMapContainer } from "./mini-map/MiniMapContainer";
import { GameContainer } from "./game/GameContainer";

export const Entry = () => {
  return (
    <>
      <LoginContainer />
      <GameContainer />
      <MiniMapContainer />
    </>
  );
};
