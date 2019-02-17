import * as PIXI from "pixi.js";

export class Game {

    private renderer: PIXI.Application;

    constructor(wrapper: Element) {
        this.renderer = new PIXI.Application();
        wrapper.appendChild(this.renderer.view);    
    }

    public start() {
        console.log("start");
    }

    public receivedData(data: any) {
        console.log(data);
    }
}
