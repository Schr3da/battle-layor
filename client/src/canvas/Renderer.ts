import { Entity } from "../common/Entity";

let prevDt: number = 0;
let nextDt: number = 0;

export const updateView = (e: Entity) => {
    prevDt = nextDt;
    nextDt = performance.now();

    const dt = (nextDt - prevDt) / 1000;
    e.update(dt);
}
