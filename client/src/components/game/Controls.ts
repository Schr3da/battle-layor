import * as Nipple from "nipplejs"
import { GameSettings } from '../Settings';
import { querySelector } from "../../shared/utils/DomUtils";
import { isMobile } from '../../shared/utils/BrowserUtils';

export const SupportedKeys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
	End: 0,
};

enum JoystickEnum {
	xAxis,
	yAxis,
}

const getOptionX = () => ({
	zone: querySelector(".joystick-wrapper-x") as any,
	mode: 'dynamic' as "dynamic",
	color: GameSettings.joystickColorX,
	size: GameSettings.joystickSize,
	lockX: true,
});

const getOptionY = () => ({
	zone: querySelector(".joystick-wrapper-y") as any,
	mode: 'dynamic' as "dynamic",
	color: GameSettings.joystickColorY,
	size: GameSettings.joystickSize,
	lockY: true,
});

export interface Joysticks {
	xAxis: any;
	yAxis: any;
}

export class Controls {
  
private activeKeys: { [key: number]: true | null };

	private joysticks: Joysticks | null = null;
  	
  constructor() {
    this.destroy();
    this.activeKeys = {};
		this.setupJoysticks();

    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("keydown", this.handleKeyDown, false);
  }

  private setupJoysticks() {
		if (isMobile() === false) {
			return;
		}
		
		this.joysticks = {
			xAxis: Nipple.create(getOptionX()),
			yAxis: Nipple.create(getOptionY()),
		};	

		this.joysticks.xAxis.on("dir:left", () => 
 			this.handleJoystick(SupportedKeys.Left, JoystickEnum.xAxis));
		this.joysticks.xAxis.on("dir:right", () => 
			this.handleJoystick(SupportedKeys.Right, JoystickEnum.xAxis));
 		this.joysticks.xAxis.on("end", () => 
 			this.handleJoystick(SupportedKeys.End, JoystickEnum.xAxis));
 	
 		this.joysticks.yAxis.on("dir:up", () => 
 			this.handleJoystick(SupportedKeys.Up, JoystickEnum.yAxis));	
		this.joysticks.yAxis.on("dir:down", () => 
			this.handleJoystick(SupportedKeys.Down, JoystickEnum.yAxis));
		this.joysticks.yAxis.on("end", () => 
			this.handleJoystick(SupportedKeys.End, JoystickEnum.yAxis));
 	}

	private handleJoystick(action: number, jType: JoystickEnum) {
		switch(jType){
			case JoystickEnum.yAxis:
				this.activeKeys[SupportedKeys.Down] = action == SupportedKeys.Down ? true : null;
 				this.activeKeys[SupportedKeys.Up]  = action == SupportedKeys.Up ? true : null;
				break;
			case JoystickEnum.xAxis:
		 		this.activeKeys[SupportedKeys.Left] = action == SupportedKeys.Left ? true : null;
		 		this.activeKeys[SupportedKeys.Right] = action == SupportedKeys.Right ? true : null;
				break;
			default: 
				break;
		}
	}

  private handleKeyUp = (e: KeyboardEvent) => {
    this.activeKeys[e.keyCode] = null;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    this.activeKeys[e.keyCode] = true;
  };

  public getStateForKey(key: number) {
    return this.activeKeys[key] === true;
  }

  public destroy() {
	
		if (this.joysticks != null && this.joysticks.xAxis != null) {
 			this.joysticks.xAxis.off("dir:left");
			this.joysticks.xAxis.off("dir:right");
 			this.joysticks.xAxis.off("end");
			this.joysticks.xAxis.destroy();
		}
		
		if (this.joysticks != null && this.joysticks.yAxis != null) {
			this.joysticks.yAxis.off("dir:up");	
			this.joysticks.yAxis.off("dir:down");
			this.joysticks.yAxis.off("end");
			this.joysticks.yAxis.destroy();
		}
	
    window.removeEventListener("keyup", this.handleKeyUp, false);
    window.removeEventListener("keydown", this.handleKeyDown, false);
  }
}
