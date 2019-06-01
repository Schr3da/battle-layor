import * as React from "react";

import { LoginContainer } from './login/LoginContainer';
import { GameWrapper } from "./game/GameWrapper";
import { MiniMapContainer } from './mini-map/MiniMapContainer';

export const Entry = () => {
  return (
    <>
      <LoginContainer/>
      <GameWrapper />
      <MiniMapContainer/>
    </>
  );
}
