import * as React from "react";

import "./GameWrapper.less";

export interface IGameWrapperProps {
  width: number;
  height: number;
  createGameInstance: (canvasRef: HTMLDivElement) => void;
  destroyGameInstance: () => void;
  resizeGame: (width: number, height: number) => void;
}

export class GameWrapper extends React.Component<IGameWrapperProps, {}> {
  private componentWrapper: HTMLDivElement | null = null;
  private canvasWrapperRef: HTMLDivElement | null = null;

  public componentDidMount() {
    if (this.componentWrapper == null) {
      return;
    }

    const { offsetWidth, offsetHeight } = this.componentWrapper;
    this.props.resizeGame(offsetWidth, offsetHeight);
    this.props.createGameInstance(this.canvasWrapperRef!);
  }

  public componentWillUnmount() {
    this.props.destroyGameInstance();
  }

  public render() {
    return (
      <div className="game-wrapper" ref={r => (this.componentWrapper = r)}>
        <div
          key="game-canvas"
          ref={r => (this.canvasWrapperRef = r)}
          className="canvas-wrapper"
        />
        <div className="joystick-wrapper-x" />
        <div className="joystick-wrapper-y" />
      </div>
    );
  }
}
