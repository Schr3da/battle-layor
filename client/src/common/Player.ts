import { Entity } from "./Entity";

export class Player extends Entity {

    public constructor(x: number, y: number) {
        super(x, y);
    }
    
    public update(delta: number) {
        console.log("player udpate called, ", delta); 
    }

}
