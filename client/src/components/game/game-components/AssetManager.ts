import * as PIXI from "pixi.js";
import { GameSettings } from "../../Settings";
import { MapStructure } from "./../../../shared/utils/MapUtils";
import { AssetManagerSprites } from "../../../shared/utils/AssetManagerUtils";

declare var require: any;

const wallImage = require("../../../../assets/img/wall.png");
const wall = PIXI.BaseTexture.fromImage(wallImage);

const enemyImage = require("../../../../assets/img/enemy.png");
const enemy = PIXI.BaseTexture.fromImage(enemyImage);

export class AssetManager {
  private textures: { [key: string]: PIXI.Texture[] };
  private sprites: Map<AssetManagerSprites, PIXI.Texture>;

  public constructor() {
    const { texWidth, texHeight } = GameSettings;

    this.sprites = new Map();
    this.sprites.set(
      AssetManagerSprites.Enemy,
      new PIXI.Texture(
        enemy,
        new PIXI.Rectangle(0, 0, GameSettings.texWidth, GameSettings.texHeight)
      )
    );

    this.textures = {
      [MapStructure.wall]: new Array(texWidth),
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

  public getSpriteForKey(k: AssetManagerSprites) {
    return this.sprites.get(k);
  }
}
