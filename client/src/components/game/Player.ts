import { canWalkOver, TMap } from "../../shared/utils/MapUtils";
import { getGlobalState } from "../../stores/AppState";

import { Entity } from "./Entity";
import { Controls, SupportedKeys } from "./Controls";

export class Player extends Entity {

    private map: TMap;
    private controls: Controls;
    private moveSpeed: number = 0;
    private rotSpeed: number = 0;
    private prevDirX: number = 0;
    private prevPlaneX: number = 0;

    public constructor(x: number, y: number, map: TMap, controls: Controls) {
        super(x, y);
        this.map = map;
        this.controls = controls
    }

	private sendUpdate(willSend: boolean) {
		if (willSend === false) {
			return;
		}
		
		const state = getGlobalState();
		state.onSendPlayerData(this.direction, this.plane, this.position);
	}

    public update(dt: number) {
    	let willUpdate: boolean = false;
    
    	this.moveSpeed = dt * 5;
        this.rotSpeed = dt * 3;
        
        if (this.controls.getStateForKey(SupportedKeys.Up)) {    
            
            const xValue = this.map[Math.floor(this.position.x + this.direction.x * this.moveSpeed * 4)][Math.floor(this.position.y)];  
            if (canWalkOver(xValue)) {
            	willUpdate = true;
                this.position.x += this.direction.x * this.moveSpeed;
            }

            const yValue = this.map[Math.floor(this.position.x)][Math.floor(this.position.y + this.direction.y * this.moveSpeed * 4)]; 
            if (canWalkOver(yValue)) {
            	willUpdate = true;
            	this.position.y += this.direction.y * this.moveSpeed;
            }
        }

        if (this.controls.getStateForKey(SupportedKeys.Down)) {
            
            const xValue = this.map[Math.floor(this.position.x - this.direction.x * this.moveSpeed * 4)][Math.floor(this.position.y)];  
            if (canWalkOver(xValue)) {
            	willUpdate = true;
                this.position.x -= this.direction.x * this.moveSpeed;
            }

            const yValue = this.map[Math.floor(this.position.x)][Math.floor(this.position.y - this.direction.y * this.moveSpeed * 4)];  
            if (canWalkOver(yValue)) {
            	willUpdate = true;
                this.position.y -= this.direction.y * this.moveSpeed;
            }
        }

        if (this.controls.getStateForKey(SupportedKeys.Right)) {
            this.prevDirX = this.direction.x;
            this.direction.x = this.direction.x * Math.cos(-this.rotSpeed) - this.direction.y * Math.sin(-this.rotSpeed);
            this.direction.y = this.prevDirX * Math.sin(-this.rotSpeed) + this.direction.y * Math.cos(-this.rotSpeed);
            this.prevPlaneX = this.plane.x;
            this.plane.x = this.plane.x * Math.cos(-this.rotSpeed) - this.plane.y * Math.sin(-this.rotSpeed);
            this.plane.y = this.prevPlaneX * Math.sin(-this.rotSpeed) + this.plane.y * Math.cos(-this.rotSpeed);
        }

        if (this.controls.getStateForKey(SupportedKeys.Left)) {
            this.prevDirX = this.direction.x;
            this.direction.x = this.direction.x * Math.cos(this.rotSpeed) - this.direction.y * Math.sin(this.rotSpeed);
            this.direction.y = this.prevDirX * Math.sin(this.rotSpeed) + this.direction.y * Math.cos(this.rotSpeed);
            this.prevPlaneX = this.plane.x;
            this.plane.x = this.plane.x * Math.cos(this.rotSpeed) - this.plane.y * Math.sin(this.rotSpeed);
            this.plane.y = this.prevPlaneX * Math.sin(this.rotSpeed) + this.plane.y * Math.cos(this.rotSpeed);
        }   
    	
    	this.sendUpdate(willUpdate);	
    }

}
