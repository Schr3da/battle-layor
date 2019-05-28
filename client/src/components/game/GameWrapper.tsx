import * as React from "react";

import { getGlobalState } from "../../stores/AppState";
import { WSAction } from "../../providers/WebSocketProvider";

import { Game } from "./Game";

import "./GameWrapper.less";

export class GameWrapper extends React.Component<{}, {}> {
  private wrapperRef: Element | null = null;
  private game: Game | null = null;

  private onConnectionOpened = () => {
    if (this.game != null) {
      this.game.start();
    }
  };

  private onReceivedData = (data: any) => {
    if (this.game != null) {
      this.game.receivedData(data);
    }
  };

  public componentDidMount() {
    this.game = new Game(this.wrapperRef!);

    const state = getGlobalState();
    state.registerOpened(WSAction.GAME, this.onConnectionOpened);
    state.registerReceived(WSAction.GAME, this.onReceivedData);
  }

  public componentWillUnmount() {
    const state = getGlobalState();
    state.destroy();
  }

  public render() {
    return (
      <div className="game-wrapper">
        <div ref={r => (this.wrapperRef = r)} className="canvas-wrapper" />
    		<div className="joystick-wrapper-x"></div>
    		<div className="joystick-wrapper-y"></div>
    	</div>
    );
  }
}
