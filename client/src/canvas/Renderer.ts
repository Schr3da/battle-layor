import { Entity } from "../common/Entity";
import { Settings } from "./../common/Settings";
import { AssetManager } from "./AssetManager";

const drawWalls = (scene: PIXI.Container, e: Entity, map: any[], assets: AssetManager) => {
	const { displayWidth, displayHeight } = Settings;
	const zBuffer = [] as any[];
	const textures = assets.getTextures();

	for (let rayIdx = 0; rayIdx < displayWidth; rayIdx++) {
		const eX = 2 * rayIdx / displayWidth - 1;
		const rayDirection = e.getDirection();
		const curPosition = e.getPosition();
		const curPlane = e.getPlane();

		const rayPosX = curPosition.x;
		const rayPosY = curPosition.y;
		const rayDirX = rayDirection.x + curPlane.x * eX;
		const rayDirY = rayDirection.y + curPlane.y * eX;

		let mapX = Math.floor(rayPosX);
		let mapY = Math.floor(rayPosY);
		// Length of ray from current pos to next x or y side
		const deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
		const deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));

		let stepX = 0;
		let sideDistX = 0;
		if (rayDirX < 0) {
			stepX = -1;
			sideDistX = (rayPosX - mapX) * deltaDistX;
		} else {
			stepX = 1;
			sideDistX = (mapX + 1 - rayPosX) * deltaDistX;
		}

		let stepY = 0;
		let sideDistY = 0;
		if (rayDirY < 0) {
			stepY = -1;
			sideDistY = (rayPosY - mapY) * deltaDistY;
		} else {
			stepY = 1;
			sideDistY = (mapY + 1 - rayPosY) * deltaDistY;
		}

		let hit = 0;
		let side = 0;
		while (hit == 0) {
			// jump to next map square
			if (sideDistX < sideDistY) {
				sideDistX += deltaDistX;
				mapX += stepX;
				side = 0;
			} else {
				sideDistY += deltaDistY;
				mapY += stepY;
				side = 1;
			}

			const indexX = Math.round(mapX),
				indexY = Math.round(mapY);

			if (indexX < 0 || indexY < 0) {
				hit = 1;
				break;
			}

			hit = map[indexX][indexY] > 0 ? 1 : hit;
		}

		let projectedWallDistance = 0;
		if (side == 0) {
			projectedWallDistance = Math.abs((mapX - rayPosX + (1 - stepX) / 2) / rayDirX);
		} else {
			projectedWallDistance = Math.abs((mapY - rayPosY + (1 - stepY) / 2) / rayDirY);
		}

		const lineHeight = Math.abs(Math.round(displayHeight / projectedWallDistance));
		const drawStart = -lineHeight / 2 + displayHeight / 2;
		const drawEnd = lineHeight / 2 + displayHeight / 2;

		let wallX = 0;
		if (side == 1) {
			wallX = rayPosX + ((mapY - rayPosY + (1 - stepY) / 2) / rayDirY) * rayDirX;
		} else {
			wallX = rayPosY + ((mapX - rayPosX + (1 - stepX) / 2) / rayDirX) * rayDirY;
		}
		wallX -= Math.floor(wallX);

		var line = scene.children[rayIdx] as any;
		if (line == null) {
			console.error("no wall slice found");
			return
		}

		const { texWidth } = Settings;
		let texX = Math.floor(wallX * texWidth);

		if (side == 0 && rayDirX > 0) {
			texX = texWidth - texX - 1;
		}

		if (side == 1 && rayDirY < 0) {
			texX = texWidth - texX - 1;
		}

		let tint = 0xFFFFFF;
		if (side == 1) {
			tint -= 0x444444;
		}

		const shadowDepth = 12;
		tint -= (0x010101 * Math.round(projectedWallDistance * shadowDepth));

		if (tint <= 0x000000) {
			tint = 0x000000;
		}
		line.tint = tint;

		const texture = map[mapX][mapY] - 1;
		line.setTexture(textures[texture][texX]);
		line.position.y = drawStart;
		line.height = drawEnd - drawStart;

		// store z dist for sprites!
		zBuffer[rayIdx] = projectedWallDistance;
	}
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

