import { getHost, isJson } from "../shared/utils/NetworkUtils";

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
  onOpen: OnOpenCb;
  onReceive: OnReceiveCb;
}

export class WebSocketProvider {
  private ws: WebSocket;
  private config: IWebSocketProviderConfig;

  constructor(config: IWebSocketProviderConfig) {
    this.config = config;

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
    this.config.onOpen();
  };

  private onReceived = (m: MessageEvent) => {
    if (m == null || m.data == null || isJson(m.data) === false) {
      return;
    }

    const data = JSON.parse(m.data) as IWSResponse<any>;
    this.config.onReceive(data);
  };

  public onSend<T>(data: T) {
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
