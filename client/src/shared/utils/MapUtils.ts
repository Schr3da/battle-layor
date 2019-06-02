import { MapSettings } from "../../components/Settings";

import {
  IWSResponse,
  WSAction,
  WSResource
} from "../../providers/WebSocketProvider";
import { IEntityState, IEntity } from "../../reducers/EntityReducer";

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

export const clearCanvas = (canvas: HTMLCanvasElement | null) => {
  if (canvas == null) {
    return;
  }
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawMap = (canvas: HTMLCanvasElement, data: TMap) => {
  if (canvas == null) {
    return;
  }

  const {
    resolution,
    background,
    foreground,
    drawOffsetX,
    drawOffsetY
  } = MapSettings;

  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(drawOffsetX, drawOffsetY);

  (data || []).forEach((d, x) => {
    (d || []).forEach((v, y) => {
      const color = canWalkOver(v) ? background : foreground,
        offsetX = x * resolution,
        offsetY = y * resolution;

      context.fillStyle = color;
      context.fillRect(offsetX, offsetY, resolution, resolution);
      context.fill();
    });
  });
};

const drawEntity = (
  context: CanvasRenderingContext2D,
  color: string,
  entitity: IEntity
) => {
  const resolution = MapSettings.resolution,
    size = resolution * 2;

  context.fillStyle = color;
  context.fillRect(
    entitity.position.x * resolution - size,
    entitity.position.y * resolution - size,
    size,
    size
  );
  context.fill();
};

export const drawEntities = (
  canvas: HTMLCanvasElement,
  entities: IEntityState
) => {
  if (canvas == null) {
    return;
  }

  const {
    resolution,
    playerColor,
    enemyColor,
    drawOffsetX,
    drawOffsetY
  } = MapSettings;

  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(drawOffsetX + resolution, drawOffsetY + resolution);

  drawEntity(context, playerColor, entities.player);

  const enemies = entities.enemies;
  Object.keys(enemies).forEach(k => {
    const e = enemies[k];
    if (e == null) {
      return;
    }
    drawEntity(context, enemyColor, enemies[k]);
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
