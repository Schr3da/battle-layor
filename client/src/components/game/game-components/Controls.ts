import { setValueForKeyCode } from "../../../actions/ControlsActions";
import { getStore } from "../../../stores/Store";
import { VirtualGamePad } from "./VirtualGamePad";

export class Controls {
  private virtualPad: VirtualGamePad;

  constructor() {
    this.virtualPad = new VirtualGamePad();

    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("keydown", this.handleKeyDown, false);
  }

  private handleKeyUp = (e: KeyboardEvent) => {
    const store = getStore();
    if (store == null) {
      return;
    }
    store.dispatch(setValueForKeyCode(e.keyCode, false));
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const store = getStore();
    if (store == null) {
      return;
    }
    store.dispatch(setValueForKeyCode(e.keyCode, true));
  };

  public destroy() {
    this.virtualPad.destroy();
    window.removeEventListener("keyup", this.handleKeyUp, false);
    window.removeEventListener("keydown", this.handleKeyDown, false);
  }
}
