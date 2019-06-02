import * as PIXI from "pixi.js";
import { GameSettings } from "../../Settings";
import { MapStructure } from "./../../../shared/utils/MapUtils";

declare var require: any;

const wallImage = require("../../../../assets/img/wall.png");
const wall = PIXI.BaseTexture.fromImage(wallImage);

export class AssetManager {
  private textures: { [key: string]: PIXI.Texture[] };

  public constructor() {
    const { texWidth, texHeight } = GameSettings;

    this.textures = {
      [MapStructure.wall]: new Array(texWidth),
      [MapStructure.door]: Array(texWidth),
      [MapStructure.corner]: new Array(texWidth)
    };

    for (let step = 0; step < texWidth; step++) {
      this.textures[MapStructure.wall][step] = new PIXI.Texture(
        wall,
        new PIXI.Rectangle(step, 0, 1, texHeight)
      );

      this.textures[MapStructure.corner][step] = new PIXI.Texture(
        wall,
        new PIXI.Rectangle(step, 0, 1, texHeight)
      );
    }
  }

  public getTexturesForKey(k: MapStructure): PIXI.Texture[] {
    return this.textures[k];
  }
}
