import * as PIXI from "pixi.js";

import { IWSResponse, WSAction, WSResource } from "./../common/WebSocketProvider";
import { AssetManager } from "./AssetManager";
import { Controls } from "./Controls";
import { Settings } from "./../common/Settings";
import { Player } from "./Player";
import { updateView } from "./Renderer";

export class Game {

    private animationFrameHandler: any;
    private updateHandler: any;
    private renderer: PIXI.Application;
    private assets: AssetManager;
    private controls: Controls;
    private map: number[];
    private player: Player | null = null;

    constructor(wrapper: Element) {
        this.map = [];    
        this.animationFrameHandler = null;

        this.assets = new AssetManager();
        this.controls = new Controls();

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
        this.animationFrameHandler = requestAnimationFrame(this.render);
        this.renderer.render()

    }

    private update = () => {
        if (this.player == null) {
            return;
        }

        updateView(this.player, this.map, this.assets);    
    } 

    public start() {
        cancelAnimationFrame(this.animationFrameHandler);
        this.animationFrameHandler = requestAnimationFrame( this.render );

        clearInterval(this.updateHandler);
        this.updateHandler = setInterval(this.update, Settings.refreshTime);    
    }

    public receivedData(d: IWSResponse<any>) {
        if (d.action !== WSAction.GAME) {
            return;
        }
        
        switch(d.resource) {
            case WSResource.MAP:
                this.map = d.data;
                this.player = new Player(2, 2, this.map, this.controls);    
            default:        
                console.log(d);
        }
    }

    public destory() {
        cancelAnimationFrame(this.animationFrameHandler);
        clearInterval(this.updateHandler);
        
        if (this.renderer != null) {
            this.renderer.destroy(true);
        }
    }

}
