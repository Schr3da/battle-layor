import { canWalkOver } from "../../../shared/utils/MapUtils";

import { AssetManager } from "./AssetManager";
import { GameSettings } from "../../Settings";
import { getStateOfStore, getStore } from "../../../stores/Store";
import { SupportedKeys } from "../../../reducers/ControlsReducer";
import { updatePlayerWithData } from "../../../actions/PlayerActions";

const calculateTint = (
  side: number,
  perpWallDist: number,
  shadowDepth: number
) => {
  const color = GameSettings.tint;

  if (color == null) {
    return 0xffffff;
  }

  let tint = color;

  if (side == 1) {
    tint -= 0x444444;
  }

  tint -= 0x010101 * Math.round(perpWallDist * shadowDepth);

  if (tint <= 0x000000) {
    tint = 0x000000;
  }
  return tint;
};

const spriteSorter = (a: any, b: any) => {
  let posX: any;
  let posY: any;

  const distanceA = (posX - a.x) * (posX - a.x) + (posY - a.y) * (posY - a.y);
  const distanceB = (posX - b.x) * (posX - b.x) + (posY - b.y) * (posY - b.y);

  if (distanceA < distanceB) {
    return -1;
  }

  if (distanceA > distanceB) {
    return 1;
  }

  return 0;
};

const drawWalls = (scene: PIXI.Container, assets: AssetManager) => {
  const zBuffer = [],
    shadowDepth = 12;

  const state = getStateOfStore(),
    map = state.map.data,
    p = state.entities.player;

  if (map == null) {
    return;
  }

  const position = p.position,
    direction = p.direction,
    plane = p.plane;

  let rayIdx = 0;
  let perpWallDist = 0;

  for (rayIdx = 0; rayIdx < GameSettings.displayWidth; rayIdx++) {
    const playerX = (2 * rayIdx) / GameSettings.displayWidth - 1,
      rayPositionX = position.x,
      rayPositionY = position.y,
      rayDirectionX = direction.x + plane.x * playerX,
      rayDirectionY = direction.y + plane.y * playerX,
      deltaDistX = Math.sqrt(
        1 + (rayDirectionY * rayDirectionY) / (rayDirectionX * rayDirectionX)
      ),
      deltaDistY = Math.sqrt(
        1 + (rayDirectionX * rayDirectionX) / (rayDirectionY * rayDirectionY)
      );

    let hit = 0,
      stepX = 0,
      sideDistX = 0,
      mapX = Math.floor(rayPositionX),
      mapY = Math.floor(rayPositionY);

    if (rayDirectionX < 0) {
      stepX = -1;
      sideDistX = (rayPositionX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - rayPositionX) * deltaDistX;
    }

    let stepY = 0,
      sideDistY = 0;

    if (rayDirectionY < 0) {
      stepY = -1;
      sideDistY = (rayPositionY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - rayPositionY) * deltaDistY;
    }

    let side = 0;
    while (hit == 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      const value = map[Math.round(mapX)][Math.round(mapY)];
      if (canWalkOver(value) === false) {
        hit = 1;
      }
    }

    if (side == 0) {
      perpWallDist = Math.abs(
        (mapX - rayPositionX + (1 - stepX) / 2) / rayDirectionX
      );
    } else {
      perpWallDist = Math.abs(
        (mapY - rayPositionY + (1 - stepY) / 2) / rayDirectionY
      );
    }

    const lineHeight = Math.abs(
        Math.round(GameSettings.displayHeight / perpWallDist)
      ),
      drawStart = -lineHeight / 2 + GameSettings.displayHeight / 2,
      drawEnd = lineHeight / 2 + GameSettings.displayHeight / 2;

    let wallX = 0;
    if (side == 1) {
      wallX =
        rayPositionX +
        ((mapY - rayPositionY + (1 - stepY) / 2) / rayDirectionY) *
          rayDirectionX;
    } else {
      wallX =
        rayPositionY +
        ((mapX - rayPositionX + (1 - stepX) / 2) / rayDirectionX) *
          rayDirectionY;
    }
    wallX -= Math.floor(wallX);

    let line = scene.getChildAt(rayIdx) as PIXI.Sprite;
    let texX = Math.floor(wallX * GameSettings.texWidth);

    if (side == 0 && rayDirectionX > 0) {
      texX = GameSettings.texWidth - texX - 1;
    }

    if (side == 1 && rayDirectionY < 0) {
      texX = GameSettings.texWidth - texX - 1;
    }

    const key = map[mapX][mapY];
    const texture = assets.getTexturesForKey(key);

    line.tint = calculateTint(side, perpWallDist, shadowDepth);
    line.texture = texture == null ? texture : texture[texX];
    line.position.y = drawStart;
    line.height = drawEnd - drawStart;
  }

  (zBuffer as any)[rayIdx] = perpWallDist;
  scene.children.sort(spriteSorter);
};

let prevDt: number = 0;
let nextDt: number = 0;

const updatePlayer = () => {
  prevDt = nextDt;
  nextDt = performance.now();

  const dt = (nextDt - prevDt) / 1000,
    state = getStateOfStore();

  let {
      direction,
      plane,
      position,
      moveSpeed,
      rotSpeed,
      prevDirX,
      prevPlaneX
    } = {
      ...state.entities.player
    },
    map = state.map.data,
    controls = state.controls;

  if (map == null) {
    return;
  }

  moveSpeed = dt * 5;
  rotSpeed = dt * 3;

  const willUpdate = Object.keys(controls.activeKeys).some(
    k => controls.activeKeys[k] === true
  );

  if (willUpdate == false) {
    return;
  }

  let sendResult = false;

  if (controls.activeKeys[SupportedKeys.Up]) {
    const xValue =
      map[Math.floor(position.x + direction.x * moveSpeed * 4)][
        Math.floor(position.y)
      ];
    if (canWalkOver(xValue)) {
      sendResult = true;
      position.x += direction.x * moveSpeed;
    }

    const yValue =
      map[Math.floor(position.x)][
        Math.floor(position.y + direction.y * moveSpeed * 4)
      ];
    if (canWalkOver(yValue)) {
      sendResult = true;
      position.y += direction.y * moveSpeed;
    }
  }

  if (controls.activeKeys[SupportedKeys.Down]) {
    const xValue =
      map[Math.floor(position.x - direction.x * moveSpeed * 4)][
        Math.floor(position.y)
      ];
    if (canWalkOver(xValue)) {
      sendResult = true;
      position.x -= direction.x * moveSpeed;
    }

    const yValue =
      map[Math.floor(position.x)][
        Math.floor(position.y - direction.y * moveSpeed * 4)
      ];
    if (canWalkOver(yValue)) {
      sendResult = true;
      position.y -= direction.y * moveSpeed;
    }
  }

  if (controls.activeKeys[SupportedKeys.Right]) {
    prevDirX = direction.x;
    direction.x =
      direction.x * Math.cos(-rotSpeed) - direction.y * Math.sin(-rotSpeed);
    direction.y =
      prevDirX * Math.sin(-rotSpeed) + direction.y * Math.cos(-rotSpeed);
    prevPlaneX = plane.x;
    plane.x = plane.x * Math.cos(-rotSpeed) - plane.y * Math.sin(-rotSpeed);
    plane.y = prevPlaneX * Math.sin(-rotSpeed) + plane.y * Math.cos(-rotSpeed);
  }

  if (controls.activeKeys[SupportedKeys.Left]) {
    prevDirX = direction.x;
    direction.x =
      direction.x * Math.cos(rotSpeed) - direction.y * Math.sin(rotSpeed);
    direction.y =
      prevDirX * Math.sin(rotSpeed) + direction.y * Math.cos(rotSpeed);
    prevPlaneX = plane.x;
    plane.x = plane.x * Math.cos(rotSpeed) - plane.y * Math.sin(rotSpeed);
    plane.y = prevPlaneX * Math.sin(rotSpeed) + plane.y * Math.cos(rotSpeed);
  }

  const store = getStore();
  if (store == null) {
    return;
  }

  store.dispatch(
    updatePlayerWithData(
      position,
      direction,
      plane,
      prevDirX,
      prevPlaneX,
      sendResult
    )
  );
};

export const updateView = (scene: PIXI.Container, assets: AssetManager) => {
  drawWalls(scene, assets);
  updatePlayer();
};
