import { Entity } from "./../common/Entity";

export class Camera extends Entity {
    
    public update(dt: number) {
       console.log("camera: ", dt); 
    }

}

