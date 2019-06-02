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

const receivedGameData = (dispatch: Function, d: IWSResponse<any>) => {
  switch (d.resource) {
    case WSResource.PLAYER:
      dispatch(updateEnemyWithData(d.data as IWSEntity));
      return;
    default:
      console.log("receivedGameData: ", dispatch, d);
      return;
  }
};

const receivedUIData = <T>(dispatch: Function, data: IWSResponse<T>) => {
  switch (data.resource) {
    default:
      console.log("receivedWsData: ", dispatch, data);
      return;
  }
};

export const receivedWsData = <T>(data: IWSResponse<T>) => {
  return (dispatch: Function) => {
    switch (data.action) {
      case WSAction.UI:
        return receivedGameData(dispatch, data);
      case WSAction.GAME:
        return receivedUIData(dispatch, data);
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

// import { IStore } from "../stores/Store";
// import { WSResource, WSAction } from "../providers/WebSocketProvider";

// export const SEND_PLAYER_DATA_ACTION = "SEND_PLAYER_DATA_ACTION";
// export interface ISendPlayerDataAction<T> {
//   data: T;
//   type: typeof SEND_PLAYER_DATA_ACTION;
// }

// export const SendPlayerData = () => {
//   return async (dispatch, getState: () => IStore) => {
//     const ws = getWebsocketProviderFacade(),
//       { position, direction, plane, pseudoID } = getState().entities.player;

//     await ws.sendData({
//       resource: WSResource.PLAYER,
//       action: WSAction.GAME,
//       data: {
//         position,
//         direction,
//         plane,
//         pseudoID
//       }
//     });
//   };
// };
