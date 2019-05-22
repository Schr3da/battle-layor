export const SupportedKeys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32
};

export class Controls {
  private activeKeys: { [key: number]: true | null };

  constructor() {
    this.destroy();
    this.activeKeys = {};

    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("keydown", this.handleKeyDown, false);
  }

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
    window.removeEventListener("keyup", this.handleKeyUp, false);
    window.removeEventListener("keydown", this.handleKeyDown, false);
  }
}
