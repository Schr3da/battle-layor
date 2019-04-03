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

    let  rayIdx, cameraX, rayPosX, rayPosY, rayDirX, rayDirY, mapX, mapY, 
    sideDistX, sideDistY, deltaDistX, deltaDistY, perpWallDist, stepX,
    stepY, hit, side, lineHeight, drawStart, drawEnd; 

    const zBuffer = [],
    shadowDepth = 12,
    position = e.getPosition(),
    direction = e.getDirection(),
    plane = e.getPlane();

    for (rayIdx = 0; rayIdx < Settings.displayWidth; rayIdx++) {
        cameraX = 2 * rayIdx / Settings.displayWidth - 1;
        rayPosX = position.x;
        rayPosY = position.y;
        rayDirX = direction.x + plane.x * cameraX;
        rayDirY = direction.y + plane.y * cameraX;
        
        mapX = Math.floor(rayPosX);
        mapY = Math.floor(rayPosY);
    
        deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
        deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));
                           
        hit = 0;
        if (rayDirX < 0) {
            stepX = -1;
            sideDistX = (rayPosX - mapX) * deltaDistX;
        } else {
            stepX = 1;
            sideDistX = (mapX + 1 - rayPosX) * deltaDistX;
        }

        if (rayDirY < 0) {
            stepY = -1;
            sideDistY = (rayPosY - mapY) * deltaDistY;
        } else {
            stepY = 1;
            sideDistY = (mapY + 1 - rayPosY) * deltaDistY;
        }

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
            perpWallDist = Math.abs((mapX - rayPosX + (1 - stepX) / 2) / rayDirX);
        } else {
            perpWallDist = Math.abs((mapY - rayPosY + (1 - stepY) / 2) / rayDirY);
        }
        
        lineHeight = Math.abs(Math.round(Settings.displayHeight / perpWallDist));
        
        drawStart = -lineHeight / 2 + Settings.displayHeight / 2;
        drawEnd = lineHeight / 2 + Settings.displayHeight / 2;

        let wallX = 0;
        if (side == 1) {
            wallX = rayPosX + ((mapY - rayPosY + (1 - stepY) / 2) / rayDirY) * rayDirX;
        } else {
            wallX = rayPosY + ((mapX - rayPosX + (1 - stepX) / 2) / rayDirX) * rayDirY;
        }
        wallX -= Math.floor(wallX);
        
        let line = scene.getChildAt(rayIdx) as PIXI.Sprite;
        let texX = Math.floor(wallX * Settings.texWidth);
        
        if (side == 0 && rayDirX > 0) {
            texX = Settings.texWidth - texX - 1;
        }
        
        if (side == 1 && rayDirY < 0) {
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

