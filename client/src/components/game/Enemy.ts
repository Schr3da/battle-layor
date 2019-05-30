import { Entity } from "./Entity";
import { IVector2d } from "../../shared/vector/Vector2d";

export class Enemy extends Entity {
  private pseudoID: string;

  constructor(x: number, y: number, pseudoID: string) {
    super(x, y);
    this.pseudoID = pseudoID;
  }

  public getPseudoId() {
    return this.pseudoID;
  }

  public update(
    _dt: number,
    position: IVector2d,
    direction: IVector2d,
    plane: IVector2d
  ) {
    this.setPosition(position.x, position.y);
    this.setDirection(direction.x, direction.y);
    this.setPlane(plane.x, plane.y);
  }
}
