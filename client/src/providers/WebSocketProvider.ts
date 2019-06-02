import { getHost, isJson } from "../shared/utils/NetworkUtils";
import { receivedInitialGameData } from "../actions/GameActions";

import {
  openedWebSocketConnection,
  receivedWsData
} from "../actions/WebSocketActions";

export interface IWSRequest<T> {
  action: number;
  resource: WSResource;
  data: T;
}

export interface IWSResponse<T> {
  status: number;
  action: number;
  resource: WSResource;
  data: T;
}

export enum WSAction {
  UI,
  GAME
}

export enum WSResource {
  MAP,
  PLAYER,
  STATS
}

export type OnOpenCb = () => void;
export type OnReceiveCb = <T>(data: IWSResponse<T>) => void;

export interface IWebSocketProviderConfig {
  id: string | null;
  pseudoID: string | null;
}

export class WebSocketProvider {
  private ws: WebSocket | null = null;

  constructor(config: IWebSocketProviderConfig) {
    this.ws = new WebSocket(
      "ws://" +
        getHost() +
        "/socket?id=" +
        config.id +
        "&pseudoID=" +
        config.pseudoID
    );

    this.ws.onopen = this.onOpen as any;
    this.ws.onmessage = this.onReceived as any;
    this.ws.onclose = this.onClose as any;
    this.ws.onerror = this.onError as any;
  }

  private onOpen = (_e: Event) => {
    const store = window.store;
    store.dispatch(openedWebSocketConnection());
  };

  private onReceived = (m: MessageEvent) => {
    if (m == null || m.data == null || isJson(m.data) === false) {
      return;
    }

    const store = window.store;
    const data = JSON.parse(m.data) as IWSResponse<any>;

    if (data.resource == WSResource.MAP) {
      store.dispatch(receivedInitialGameData(data));
      return;
    }

    store.dispatch(receivedWsData(data));
  };

  public onSend<T>(data: T) {
    if (this.ws == null) {
      console.error("WebsocketProvider: No current SocketConnection");
      return;
    }

    try {
      const d = JSON.stringify(data);
      this.ws.send(d);
    } catch {
      console.error("An error has occurred");
    }
  }

  private onClose = (ws: WebSocket) => {
    console.log("onClose: ", ws);
  };

  private onError = (ws: WebSocket) => {
    console.log("onError: ", ws);
  };

  public destroy() {
    if (this.ws != null) {
      this.ws.close();
    }
  }
}
