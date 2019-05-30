import { Entity } from './Entity';
import { IVector2d } from '../../shared/vector/Vector2d';

export class Enemy extends Entity {
	
	private pseudoId: string;

  constructor(x: number, y: number, pseudoId: string) {
    super(x, y);
  	this.pseudoId = pseudoId;
  }

	public getPseudoId() {
		return this.pseudoId;
	}

	public update(_dt: number, position: IVector2d, direction: IVector2d, plane: IVector2d ) {
		this.setPosition(position.x, position.y);
		this.setDirection(direction.x, direction.y);
		this.setPlane(plane.x, plane.y);
	}

}
