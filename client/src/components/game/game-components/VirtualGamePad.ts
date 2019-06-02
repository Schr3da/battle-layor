import * as Nipple from "nipplejs";

import { GameSettings } from "../../Settings";
import { querySelector } from "../../../shared/utils/DomUtils";
import { isMobile } from "../../../shared/utils/BrowserUtils";
import { SupportedKeys } from "./Controls";

export enum VirtualGamePadEnum {
  xAxis,
  yAxis
}

const getOptionX = () => ({
  zone: querySelector(".joystick-wrapper-x") as any,
  mode: "dynamic" as "dynamic",
  color: GameSettings.joystickColorX,
  size: GameSettings.joystickSize,
  fadeTime: GameSettings.fadeTime,
  lockX: true
});

const getOptionY = () => ({
  zone: querySelector(".joystick-wrapper-y") as any,
  mode: "dynamic" as "dynamic",
  color: GameSettings.joystickColorY,
  size: GameSettings.joystickSize,
  fadeTime: GameSettings.fadeTime,
  lockY: true
});

export interface IVirtualGamePad {
  xAxis: any;
  yAxis: any;
}

export type OnVirtualGamePadUpdateFunc = (
  action: number,
  type: VirtualGamePadEnum
) => void;

export class VirtualGamePad {
  private controllers: IVirtualGamePad | null = null;
  private onUpdate: OnVirtualGamePadUpdateFunc = () => {};

  constructor(onUpdate: OnVirtualGamePadUpdateFunc) {
    if (isMobile() === false) {
      return;
    }

    this.onUpdate = onUpdate;

    this.controllers = {
      xAxis: Nipple.create(getOptionX()),
      yAxis: Nipple.create(getOptionY())
    };

    this.controllers.xAxis.on("dir:left", () =>
      this.onUpdate(SupportedKeys.Left, VirtualGamePadEnum.xAxis)
    );
    this.controllers.xAxis.on("dir:right", () =>
      this.onUpdate(SupportedKeys.Right, VirtualGamePadEnum.xAxis)
    );
    this.controllers.xAxis.on("end", () =>
      this.onUpdate(SupportedKeys.End, VirtualGamePadEnum.xAxis)
    );

    this.controllers.yAxis.on("dir:up", () =>
      this.onUpdate(SupportedKeys.Up, VirtualGamePadEnum.yAxis)
    );
    this.controllers.yAxis.on("dir:down", () =>
      this.onUpdate(SupportedKeys.Down, VirtualGamePadEnum.yAxis)
    );
    this.controllers.yAxis.on("end", () =>
      this.onUpdate(SupportedKeys.End, VirtualGamePadEnum.yAxis)
    );
  }

  public destroy() {
    if (this.controllers != null && this.controllers.xAxis != null) {
      this.controllers.xAxis.off("dir:left");
      this.controllers.xAxis.off("dir:right");
      this.controllers.xAxis.off("end");
      this.controllers.xAxis.destroy();
    }

    if (this.controllers != null && this.controllers.yAxis != null) {
      this.controllers.yAxis.off("dir:up");
      this.controllers.yAxis.off("dir:down");
      this.controllers.yAxis.off("end");
      this.controllers.yAxis.destroy();
    }
  }
}
