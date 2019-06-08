import * as React from "react";
import { Footer } from "../footer/Footer";
import { GameContainer } from "../game/GameContainer";
import { MiniMapContainer } from "../mini-map/MiniMapContainer";
import { LoginContainer } from "../login/LoginContainer";

import "./Layout.less";

export interface ILayoutWrapper {
  theme: string;
  copyright: string;
}

export class Layout extends React.Component<ILayoutWrapper, {}> {
  public render() {
    const { copyright, theme } = this.props;

    return (
      <div className={`layout-wrapper ${theme}`}>
        <div className="content">
          <GameContainer />
          <MiniMapContainer />
          <LoginContainer />
        </div>
        <Footer copyright={copyright} />
      </div>
    );
  }
}
