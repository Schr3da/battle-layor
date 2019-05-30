import * as PIXI from "pixi.js";

import {
  IWSResponse,
  WSAction,
  WSResource
} from "../../providers/WebSocketProvider";
import { TMap } from "../../shared/utils/MapUtils";

import { AssetManager } from "./AssetManager";
import { Controls } from "./Controls";
import { GameSettings } from "../Settings";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { updateView } from "./Renderer";

export class Game {
  private animationFrameHandler: any;
  private updateHandler: any;
  private renderer: PIXI.Application;
  private assets: AssetManager;
  private scene: PIXI.Container;
  private controls: Controls;
  private map: TMap;
  private player: Player | null = null;
	private enemies: {[pseudoId: string]: Enemy};  

  constructor(wrapper: Element) {
    this.map = [];
    this.enemies = {};
    this.animationFrameHandler = null;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.renderer = new PIXI.Application({
      width: GameSettings.displayWidth,
      height: GameSettings.displayHeight,
      backgroundColor: GameSettings.background
    });
    this.renderer.ticker.add(this.render);
    wrapper.appendChild(this.renderer.view);

    this.assets = new AssetManager();
    this.controls = new Controls();

    this.scene = new PIXI.Container();
    for (let x = 0; x < GameSettings.displayWidth; x++) {
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
    this.renderer.render();
  };

  private update = () => {
    if (this.player == null) {
      return;
    }
    updateView(this.scene, this.player, this.enemies, this.map, this.assets);
  };

  public start() {
    cancelAnimationFrame(this.animationFrameHandler);
    this.animationFrameHandler = requestAnimationFrame(this.render);

    clearInterval(this.updateHandler);
    this.updateHandler = setInterval(this.update, GameSettings.refreshTime);
  }
  
  public receivedData(d: IWSResponse<any>) {
    if (d.action !== WSAction.GAME) {
      return;
    }

    switch (d.resource) {
      case WSResource.MAP:
        this.map = d.data;
        this.player = new Player(20, 20, this.map, this.controls);
    		break;
    	case WSResource.PLAYER:
				const { pseudoId, position, direction, plane } = d.data,
				enemy = this.enemies[pseudoId] == null ? new Enemy(0, 0, pseudoId) : this.enemies[pseudoId];
    		enemy.update(0, position, direction, plane);
    		break;
    	default:
    		return
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
