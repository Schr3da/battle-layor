export interface IVector2d {
  x: number;
  y: number;
}

export const createVector2d = (x: number, y: number) => ({
  x,
  y
});
