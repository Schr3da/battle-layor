import { updateEnemyWithData } from "./EnemyActions";
import { IWSEntity } from "../shared/utils/EntityUtils";

import {
  IWSResponse,
  WSAction,
  IWSRequest,
  WSResource
} from "../providers/WebSocketProvider";

export const OPEN_WS_CONNECTION_ACTION = "OPEN_WS_CONNECTION_ACTION";
export interface IOpenWsConnectionAction {
  id: string;
  pseudoID: string;
  type: typeof OPEN_WS_CONNECTION_ACTION;
}

export const openWebSocketConnection = (id: string, pseudoID: string) => {
  return {
    id,
    pseudoID,
    type: typeof OPEN_WS_CONNECTION_ACTION
  };
};

export const OPENED_WS_CONNECTION_ACTION = "OPENED_WS_CONNECTION_ACTION";
export interface IOpenedWsConnectionAction {
  type: typeof OPENED_WS_CONNECTION_ACTION;
}

export const openedWebSocketConnection = () => ({
  type: OPENED_WS_CONNECTION_ACTION
});

export const SEND_WS_DATA_ACTION = "SEND_WS_DATA_ACTION";
export interface ISendWsConnectionAction<T> {
  data: IWSRequest<T>;
  type: typeof SEND_WS_DATA_ACTION;
}

export const sendWebSocketData = <T>(data: IWSRequest<T>) => ({
  data,
  type: SEND_WS_DATA_ACTION
});

export const CLOSE_WS_CONNECTION_ACTION = "CLOSE_WS_CONNECTION_ACTION";
export interface ICloseWsConnectionAction {
  type: typeof CLOSE_WS_CONNECTION_ACTION;
}

export const closeWebSocketConnection = () => ({
  type: CLOSE_WS_CONNECTION_ACTION
});

const receivedUIData = <T>(dispatch: Function, data: IWSResponse<T>) => {
  switch (data.resource) {
    default:
      console.log("receivedWsData UIData: ", dispatch, data);
      return;
  }
};

const receivedGameData = (dispatch: Function, d: IWSResponse<any>) => {
  switch (d.resource) {
    case WSResource.PLAYER:
      dispatch(updateEnemyWithData(d.data as IWSEntity));
      return;
    default:
      console.log("receivedGameData GameData: ", dispatch, d);
      return;
  }
};

export const receivedWsData = <T>(data: IWSResponse<T>) => {
  return (dispatch: Function) => {
    switch (data.action) {
      case WSAction.UI:
        return receivedUIData(dispatch, data);
      case WSAction.GAME:
        return receivedGameData(dispatch, data);
      default:
        return;
    }
  };
};

export type WebSocketActions =
  | IOpenWsConnectionAction
  | IOpenedWsConnectionAction
  | ISendWsConnectionAction<any>
  | ICloseWsConnectionAction;
