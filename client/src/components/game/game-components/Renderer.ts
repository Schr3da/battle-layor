import { AssetManager } from "./AssetManager";
import { updatePlayer } from "./helpers/updatePlayer";
import { drawWalls } from "./helpers/drawWorld";
import { drawSprites } from "./helpers/drawSprites";
import { getStateOfStore } from "../../../stores/Store";

export const getCanvasSize = () => getStateOfStore().game.canvas;

export const updateView = (scene: PIXI.Container, assets: AssetManager) => {
  drawWalls(scene, assets);
  drawSprites(scene, assets);
  updatePlayer();
};
