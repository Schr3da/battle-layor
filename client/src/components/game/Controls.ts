import { VirtualGamePad, VirtualGamePadEnum } from "./VirtualGamePad";

export const SupportedKeys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
  End: 0
};

export class Controls {
  private activeKeys: { [key: number]: true | null };
  private virtualPad: VirtualGamePad;

  constructor() {
    this.destroy();
    this.activeKeys = {};
    this.virtualPad = new VirtualGamePad(this.handleVirtualGamePad);

    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("keydown", this.handleKeyDown, false);
  }

  private handleVirtualGamePad = (action: number, type: VirtualGamePadEnum) => {
    switch (type) {
      case VirtualGamePadEnum.yAxis:
        this.activeKeys[SupportedKeys.Down] =
          action == SupportedKeys.Down ? true : null;
        this.activeKeys[SupportedKeys.Up] =
          action == SupportedKeys.Up ? true : null;
        break;
      case VirtualGamePadEnum.xAxis:
        this.activeKeys[SupportedKeys.Left] =
          action == SupportedKeys.Left ? true : null;
        this.activeKeys[SupportedKeys.Right] =
          action == SupportedKeys.Right ? true : null;
        break;
      default:
        break;
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.activeKeys[e.keyCode] = null;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    this.activeKeys[e.keyCode] = true;
  };

  public getStateForKey(key: number) {
    return this.activeKeys[key] === true;
  }

  public destroy() {
    this.virtualPad.destroy();
    window.removeEventListener("keyup", this.handleKeyUp, false);
    window.removeEventListener("keydown", this.handleKeyDown, false);
  }
}
