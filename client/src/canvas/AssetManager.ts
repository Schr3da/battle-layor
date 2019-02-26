import * as PIXI from "pixi.js";
import { Settings } from "./../common/Settings";

const brick = PIXI.BaseTexture.fromImage("assets/img/redbrick.png");
const wood = PIXI.BaseTexture.fromImage("assets/img/wood.png");
const purpstone = PIXI.BaseTexture.fromImage("assets/img/purplestone.png");
const mossy = PIXI.BaseTexture.fromImage("assets/img/mossy.png");
const grey = PIXI.BaseTexture.fromImage("assets/img/greystone.png");
const blue = PIXI.BaseTexture.fromImage("assets/img/bluestone.png");
const eagle = PIXI.BaseTexture.fromImage("assets/img/eagle.png");
const color = PIXI.BaseTexture.fromImage("assets/img/colorstone.png");

export class AssetManager {

    private textures: PIXI.Texture[][];

    public constructor() {
        const {texWidth, texHeight} = Settings;
        
        this.textures = [
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
            new Array(texWidth),
        ];

        for (let step = 0; step < texWidth; step++) {
            this.textures[0][step] = new PIXI.Texture(eagle, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[1][step] = new PIXI.Texture(brick, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[2][step] = new PIXI.Texture(purpstone, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[3][step] = new PIXI.Texture(grey, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[4][step] = new PIXI.Texture(blue, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[5][step] = new PIXI.Texture(mossy, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[6][step] = new PIXI.Texture(wood, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[7][step] = new PIXI.Texture(color, new PIXI.Rectangle(step, 0, 1, texHeight));
        }
    }

    public getTextures(): PIXI.Texture[][] {
        return this.textures;
    }

}
