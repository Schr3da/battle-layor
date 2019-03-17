import * as PIXI from "pixi.js";

import { IWSResponse, WSAction, WSResource } from "./../common/WebSocketProvider";
import { AssetManager } from "./AssetManager";
import { Controls } from "./Controls";
import { Settings } from "./../common/Settings";

export class Game {

    private renderer: PIXI.Application;
    private assets: AssetManager;
    private controls: Controls;
    private map: number[];

    constructor(wrapper: Element) {
        this.map = [];    

        this.assets = new AssetManager();
        console.log(this.assets);

        this.controls = new Controls();
        console.log(this.controls);

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.renderer = new PIXI.Application({
            width: Settings.displayWidth, 
            height: Settings.displayHeight,
        });

        this.renderer.ticker.add(this.render);
        wrapper.appendChild(this.renderer.view);    
    }

    private render = () => {
        if ((this.map || []).length === 0) {
            return;
        }
    }

    public start() {
        console.log("start");
    }

    public receivedData(d: IWSResponse<any>) {
        if (d.action !== WSAction.GAME) {
            return;
        }
        
        switch(d.resource) {
            case WSResource.MAP:
                this.map = d.data;
            default:        
                console.log(d);
        }
    }
}
