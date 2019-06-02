import * as React from "react";

import "./GameWrapper.less";

export interface IGameWrapperProps {
  createGameInstance: (canvasRef: Element) => void;
  destroyGameInstance: () => void;
  resizeGame: () => void;
}

export class GameWrapper extends React.Component<IGameWrapperProps, {}> {
  private wrapperRef: Element | null = null;

  public componentDidMount() {
    if (this.wrapperRef == null) {
      return;
    }
    this.props.createGameInstance(this.wrapperRef);
  }

  public componentWillUnmount() {
    this.props.destroyGameInstance();
  }

  public render() {
    return (
      <div className="game-wrapper">
        <div
          key="game-canvas"
          ref={r => (this.wrapperRef = r)}
          className="canvas-wrapper"
        />
        <div className="joystick-wrapper-x" />
        <div className="joystick-wrapper-y" />
      </div>
    );
  }
}
