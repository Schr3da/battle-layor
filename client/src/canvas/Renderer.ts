import { Entity } from "../common/Entity";
import { AssetManager } from "./AssetManager";
import { Settings } from "../common/Settings";
import { canWalkOver } from "../common/MapUtils";

const spriteSorter = (a: any, b: any) => {
    let posX: any;
    let posY: any;
    
    const distanceA = ((posX - a.x) * (posX - a.x) + (posY - a.y) * (posY - a.y));
    const distanceB = ((posX - b.x) * (posX - b.x) + (posY - b.y) * (posY - b.y));
    
    if (distanceA < distanceB) {
        return -1
    }
        
    if (distanceA > distanceB) {
        return 1;
    }
    
    return 0;
}

const drawWalls = (scene: PIXI.Container, e: Entity, map: any[], assets: AssetManager) => {
    
    const zBuffer = [],
    shadowDepth = 12,
    position = e.getPosition(),
    direction = e.getDirection(),
    plane = e.getPlane();

    let rayIdx = 0;
    let perpWallDist = 0;
    
    for (rayIdx = 0; rayIdx < Settings.displayWidth; rayIdx++) {
        const playerX = 2 * rayIdx / Settings.displayWidth - 1,
        rayPositionX = position.x,
        rayPositionY = position.y,
        rayDirectionX = direction.x + plane.x * playerX,
        rayDirectionY = direction.y + plane.y * playerX,
        deltaDistX = Math.sqrt(1 + (rayDirectionY* rayDirectionY) / (rayDirectionX * rayDirectionX)),
        deltaDistY = Math.sqrt(1 + (rayDirectionX * rayDirectionX) / (rayDirectionY * rayDirectionY));
        
        let hit = 0,
        stepX = 0,
        sideDistX = 0,
        mapX = Math.floor(rayPositionX),
        mapY = Math.floor(rayPositionY);

        if (rayDirectionX < 0) {
            stepX = -1;
            sideDistX = (rayPositionX - mapX) * deltaDistX;
        } else {
            stepX = 1;
            sideDistX = (mapX + 1 - rayPositionX) * deltaDistX;
        }

        let stepY = 0,
        sideDistY = 0;

        if (rayDirectionY< 0) {
            stepY = -1;
            sideDistY = (rayPositionY - mapY) * deltaDistY;
        } else {
            stepY = 1;
            sideDistY = (mapY + 1 - rayPositionY) * deltaDistY;
        }

        let side = 0; 
        while (hit == 0) {
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            } else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
						
            const value = map[Math.round(mapX)][Math.round(mapY)]; 
            if (canWalkOver(value) === false) {
                hit = 1;
            }
        }

        if (side == 0) {
            perpWallDist = Math.abs((mapX - rayPositionX + (1 - stepX) / 2) / rayDirectionX);
        } else {
            perpWallDist = Math.abs((mapY - rayPositionY + (1 - stepY) / 2) / rayDirectionY);
        }
        
        const lineHeight = Math.abs(Math.round(Settings.displayHeight / perpWallDist)),
        drawStart = -lineHeight / 2 + Settings.displayHeight / 2,
        drawEnd = lineHeight / 2 + Settings.displayHeight / 2;

        let wallX = 0;
        if (side == 1) {
            wallX = rayPositionX + ((mapY - rayPositionY + (1 - stepY) / 2) / rayDirectionY) * rayDirectionX;
        } else {
            wallX = rayPositionY + ((mapX - rayPositionX + (1 - stepX) / 2) / rayDirectionX) * rayDirectionY;
        }
        wallX -= Math.floor(wallX);
        
        let line = scene.getChildAt(rayIdx) as PIXI.Sprite;
        let texX = Math.floor(wallX * Settings.texWidth);
        
        if (side == 0 && rayDirectionX > 0) {
            texX = Settings.texWidth - texX - 1;
        }
        
        if (side == 1 && rayDirectionY < 0) {
            texX = Settings.texWidth - texX - 1;
        }
    
        let tint = 0xFFFFFF;
        if (side == 1) {
            tint -= 0x444444;
        }
        
        tint -= (0x010101 * Math.round(perpWallDist * shadowDepth));

        if (tint <= 0x000000) {
            tint = 0x000000;
        }
    
        line.tint = tint;
    
        const key = map[mapX][mapY];
        const texture = assets.getTexturesForKey(key);

        line.texture = texture == null ? texture : texture[texX];
        line.position.y = drawStart;
        line.height = drawEnd - drawStart;
    }

    (zBuffer as any)[rayIdx] = perpWallDist;
    scene.children.sort(spriteSorter); 
}

let prevDt: number = 0;
let nextDt: number = 0;

export const updateView = (scene: PIXI.Container, e: Entity, m: any[], assets: AssetManager) => {
	drawWalls(scene, e, m, assets);

	prevDt = nextDt;
	nextDt = performance.now();

    const dt = (nextDt - prevDt) / 1000;
	e.update(dt);
}

