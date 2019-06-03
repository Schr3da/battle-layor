import * as PIXI from "pixi.js";

import { AssetManager } from "./AssetManager";
import { Controls } from "./Controls";
import { GameSettings } from "../../Settings";
import { updateView } from "./Renderer";
import { AssetManagerSprites } from "../../../shared/utils/AssetManagerUtils";

export class Game {
  private animationFrameHandler: any;
  private updateHandler: any;
  private renderer: PIXI.Application;
  private assets: AssetManager;
  private scene: PIXI.Container;
  private controls: Controls;

  constructor(wrapper: Element) {
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

    let weapon = new PIXI.Sprite(
      this.assets.getSpriteForKey(AssetManagerSprites.Weapon)
    );
    weapon.position.x = GameSettings.displayWidth - weapon.width * 1.05;
    weapon.position.y = GameSettings.displayHeight - weapon.height * 0.8;
    weapon.name = AssetManagerSprites.Weapon;
    this.scene.addChild(weapon);
    this.setWeaponVisibility(false);

    this.renderer.stage.addChild(this.scene);
  }

  private setWeaponVisibility(isVisible: boolean) {
    const sprite = this.scene.getChildByName(AssetManagerSprites.Weapon);
    if (sprite == null) {
      return;
    }
    sprite.visible = isVisible;
  }

  private render = () => this.renderer.render();

  private update = () => updateView(this.scene, this.assets);

  public init() {
    this.setWeaponVisibility(true);

    cancelAnimationFrame(this.animationFrameHandler);
    this.animationFrameHandler = requestAnimationFrame(this.render);

    clearInterval(this.updateHandler);
    this.updateHandler = setInterval(this.update, GameSettings.refreshTime);
  }

  public destroy() {
    this.setWeaponVisibility(false);

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
