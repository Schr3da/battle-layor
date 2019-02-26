import * as PIXI from "pixi.js";

import { IWSResponse, WSAction, WSResource } from "./../common/WebSocketProvider";

export class Game {

    private renderer: PIXI.Application;
    private map: number[];

    constructor(wrapper: Element) {
        this.map = [];    
        
        this.renderer = new PIXI.Application();
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
