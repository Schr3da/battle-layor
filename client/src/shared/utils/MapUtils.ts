import { MapSettings } from "../../components/Settings";

import {
  IWSResponse,
  WSAction,
  WSResource
} from "../../providers/WebSocketProvider";

export enum MapStructure {
  wall = "#",
  door = "+",
  corner = "!",
  floor = ".",
  nothing = " "
}

export type TMap = Array<MapStructure[]>;

export const canWalkOver = (value: string) =>
  value != null &&
  (value === MapStructure.nothing ||
    value === MapStructure.floor ||
    value === MapStructure.door);

export const receivedMapData = <T>(data: IWSResponse<T>) =>
  data != null &&
  data.action === WSAction.GAME &&
  data.resource === WSResource.MAP;

export const hasValidMapData = (data: TMap) =>
  (data || []).length > 0 && (data[0] || []).length > 0;

export const drawMap = (canvas: HTMLCanvasElement, data: TMap) => {
  const {
    resolution,
    background,
    foreground,
    drawOffsetX,
    drawOffsetY
  } = MapSettings;

  if (canvas == null) {
    return;
  }

  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(drawOffsetX, drawOffsetY);

  (data || []).forEach((d, y) => {
    (d || []).forEach((v, x) => {
      const color = canWalkOver(v) ? background : foreground,
        offsetX = x * resolution,
        offsetY = y * resolution;

      context.fillStyle = color;
      context.fillRect(offsetX, offsetY, resolution, resolution);
      context.fill();
    });
  });
};

export const setCanvasSize = (canvas: HTMLCanvasElement, data: TMap) => {
  if (canvas == null || hasValidMapData(data) === false) {
    return;
  }

  const { resolution, drawOffsetX, drawOffsetY } = MapSettings,
    width = data[0].length * resolution + drawOffsetX * 2,
    height = data.length * resolution + drawOffsetY * 2;

  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");
};
