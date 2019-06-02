import { IVector2d } from "../vector/Vector2d";

export interface IWSEntity {
  pseudoID: string;
  position: IVector2d;
  direction: IVector2d;
  plane: IVector2d;
}
