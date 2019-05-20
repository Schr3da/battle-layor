import * as PIXI from "pixi.js";
import { Settings } from "./Settings";
import { MapStructure } from "./../../shared/utils/MapUtils";

declare var require: any;

//demo assets
const brickImage = require("../../../assets/img/redbrick.png");
const woodImage = require("../../../assets/img/wood.png");
const purpstoneImage = require("../../../assets/img/purplestone.png");
const mossyImage = require("../../../assets/img/mossy.png");
const greyImage = require("../../../assets/img/greystone.png");
const blueImage = require("../../../assets/img/bluestone.png");
const eagleImage = require("../../../assets/img/eagle.png");
const colorImage = require("../../../assets/img/colorstone.png"); 

//new assets
const wallImage = require("../../../assets/img/wall.png");
const wall = PIXI.BaseTexture.fromImage(wallImage)

export const brick = PIXI.BaseTexture.fromImage(brickImage);
const wood = PIXI.BaseTexture.fromImage(woodImage);
export const mossy = PIXI.BaseTexture.fromImage(mossyImage);


export const purpstone = PIXI.BaseTexture.fromImage(purpstoneImage);
export const grey = PIXI.BaseTexture.fromImage(greyImage);
export const blue = PIXI.BaseTexture.fromImage(blueImage);
export const eagle = PIXI.BaseTexture.fromImage(eagleImage);
export const color = PIXI.BaseTexture.fromImage(colorImage);

export class AssetManager {

private textures: {[key: string]: PIXI.Texture[]};

    public constructor() {
        const {texWidth, texHeight} = Settings;
        
        this.textures = {
            [MapStructure.wall]: new Array(texWidth),
            [MapStructure.door]: Array(texWidth),
            [MapStructure.corner]: new Array(texWidth),    
            //" ": Array(texWidth),
            //".": new Array(texWidth),
        };

        for (let step = 0; step < texWidth; step++) {
            this.textures[MapStructure.wall][step] = new PIXI.Texture(wall, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[MapStructure.door][step] = new PIXI.Texture(wood, new PIXI.Rectangle(step, 0, 1, texHeight));
            this.textures[MapStructure.corner][step] = new PIXI.Texture(wall, new PIXI.Rectangle(step, 0, 1, texHeight));
            //this.textures[" "][step] = new PIXI.Texture(purpstone, new PIXI.Rectangle(step, 0, 1, texHeight));
            //this.textures["."][step] = new PIXI.Texture(grey, new PIXI.Rectangle(step, 0, 1, texHeight));
        }
    }

    public getTexturesForKey(k: MapStructure): PIXI.Texture[] {
        return this.textures[k];
    }
}
