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
	private scene: PIXI.Container;
	private controls: Controls;
	private map: number[];
	private player: Player | null = null;

	constructor(wrapper: Element) {
		this.map = [];
		this.animationFrameHandler = null;

		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		this.renderer = new PIXI.Application({
			width: Settings.displayWidth,
			height: Settings.displayHeight,
		});
		this.renderer.ticker.add(this.render);
		wrapper.appendChild(this.renderer.view);

		this.assets = new AssetManager();
		this.controls = new Controls();

		this.scene = new PIXI.Container();
		for (var x = 0; x < Settings.displayWidth; x++) {
			let sprite = new PIXI.Sprite(undefined);
			sprite.position.x = x;
			this.scene.addChild(sprite);
		}

		this.renderer.stage.addChild(this.scene);
	}

	private render = () => {
		if ((this.map || []).length === 0) {
			return;
		}
        this.renderer.render()
	}

	private update = () => {
		if (this.player == null) {
			return;
		}
		updateView(this.scene, this.player, this.map, this.assets);
	}

	public start() {
		cancelAnimationFrame(this.animationFrameHandler);
		this.animationFrameHandler = requestAnimationFrame(this.render);

		clearInterval(this.updateHandler);
		this.updateHandler = setInterval(this.update, Settings.refreshTime);
	}

	public receivedData(d: IWSResponse<any>) {
		if (d.action !== WSAction.GAME) {
			return;
		}

		switch (d.resource) {
			case WSResource.MAP:
				this.map = d.data;
				this.player = new Player(20, 20, this.map, this.controls);
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
