import { IVector2d } from "../../shared/vector/Vector2d" 

export abstract class Entity {

	protected position: IVector2d;
	protected direction: IVector2d;
	protected plane: IVector2d;

	constructor(x: number, y: number) {
		this.position = { x, y };
		this.direction = { x: -1, y: 0 };
		this.plane = { x: 0, y: 1 };
	}

	public getPlane() {
		return this.plane;
	}

	public getPosition(): IVector2d {
		return this.position;
	}

	public setPosition(x: number, y: number) {
		this.position = { x, y };
	}

	public getDirection(): IVector2d {
		return this.direction;
	}

	public setDirection(x: number, y: number) {
		this.direction = { x, y };
	}

	abstract update(delta: number);

}


