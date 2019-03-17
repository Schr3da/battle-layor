import * as PIXI from "pixi.js";
import { Settings } from "./../common/Settings";

declare var require: any;

const brickImage = require("./../../assets/img/redbrick.png");
const woodImage = require("./../../assets/img/wood.png");
const purpstoneImage = require("./../../assets/img/purplestone.png");
const mossyImage = require("./../../assets/img/mossy.png");
const greyImage = require("./../../assets/img/greystone.png");
const blueImage = require("./../../assets/img/bluestone.png");
const eagleImage = require("./../../assets/img/eagle.png");
const colorImage = require("./../../assets/img/colorstone.png"); 

const brick = PIXI.BaseTexture.fromImage(brickImage);
const wood = PIXI.BaseTexture.fromImage(woodImage);
const purpstone = PIXI.BaseTexture.fromImage(purpstoneImage);
const mossy = PIXI.BaseTexture.fromImage(mossyImage);
const grey = PIXI.BaseTexture.fromImage(greyImage);
const blue = PIXI.BaseTexture.fromImage(blueImage);
const eagle = PIXI.BaseTexture.fromImage(eagleImage);
const color = PIXI.BaseTexture.fromImage(colorImage);

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
