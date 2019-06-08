import { AssetManager } from "../AssetManager";

export const spriteSorter = (a: any, b: any) => {
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

export const drawSprites = (
  _scene: PIXI.Container,
  _assets: AssetManager
) => {};
