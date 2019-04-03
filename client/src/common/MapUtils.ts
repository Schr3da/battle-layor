import { IWSResponse, WSAction, WSResource } from "./WebSocketProvider"

export enum MapStructure {
    wall = "#",
    door = "+",
    corner = "!",
    floor = ".",
    nothing = " ",
}

export type TMap = Array<MapStructure[]>;

export const canWalkOver = (value: string) => value != null && (
    value === MapStructure.nothing ||
    value === MapStructure.floor ||
    value === MapStructure.door
);

export const receivedMapData = <T>(data: IWSResponse<T>) => data != null &&
    data.action === WSAction.GAME &&
    data.resource === WSResource.MAP;
