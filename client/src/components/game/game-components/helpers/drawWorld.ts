import { GameSettings } from "../../../Settings";
import { AssetManager } from "../AssetManager";
import { getStateOfStore } from "../../../../stores/Store";
import { canWalkOver } from "../../../../shared/utils/MapUtils";

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

export const drawWalls = (scene: PIXI.Container, assets: AssetManager) => {
  const zBuffer = [],
    shadowDepth = 12;

  const state = getStateOfStore(),
    { canvas } = state.game,
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

  for (rayIdx = 0; rayIdx < canvas.width; rayIdx++) {
    const playerX = (2 * rayIdx) / canvas.width - 1,
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

    const lineHeight = Math.abs(Math.round(canvas.height / perpWallDist)),
      drawStart = -lineHeight / 2 + canvas.height / 2,
      drawEnd = lineHeight / 2 + canvas.height / 2;

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
};
