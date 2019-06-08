import * as PIXI from "pixi.js";

import { AssetManager } from "./AssetManager";
import { Controls } from "./Controls";
import { GameSettings } from "../../Settings";
import { updateView } from "./Renderer";

export class Game {
  private animationFrameHandler: any;
  private updateHandler: any;
  private renderer: PIXI.Application;
  private assets: AssetManager;
  private scene: PIXI.Container;
  private controls: Controls;

  constructor(wrapper: HTMLDivElement, width: number, height: number) {
    this.animationFrameHandler = null;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.renderer = new PIXI.Application({
      width,
      height,
      backgroundColor: GameSettings.background
    });

    this.renderer.ticker.add(this.render);
    wrapper.appendChild(this.renderer.view);

    this.assets = new AssetManager();
    this.controls = new Controls();

    this.scene = new PIXI.Container();
    for (let x = 0; x < width; x++) {
      let sprite = new PIXI.Sprite(undefined);
      sprite.position.x = x;
      this.scene.addChild(sprite);
    }
    this.renderer.stage.addChild(this.scene);
  }

  private render = () => this.renderer.render();

  private update = () => updateView(this.scene, this.assets);

  public init() {
    cancelAnimationFrame(this.animationFrameHandler);
    this.animationFrameHandler = requestAnimationFrame(this.render);

    clearInterval(this.updateHandler);
    this.updateHandler = setInterval(this.update, GameSettings.refreshTime);
  }

  public destroy() {
    cancelAnimationFrame(this.animationFrameHandler);
    clearInterval(this.updateHandler);

    if (this.controls) {
      this.controls.destroy();
    }

    if (this.renderer != null) {
      this.renderer.destroy(true);
    }
  }
}
