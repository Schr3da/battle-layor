import { getHost } from "./RestProvider";

type OnOpenCb = () => void;
type OnReceiveCb = <T>(data: T) => void;

export enum SocketMessageType {
    STRING,
    OBJECT,
}

export enum SocketMessageAction {
    GAME,
    UI,
}

export interface IWebSocketProviderConfig {
    onOpen: OnOpenCb;
    onReceive: OnReceiveCb;
}

export interface ISocketMessage {
    type: SocketMessageType;
    action: SocketMessageAction;
    data: any; 
}

export class WebSocketProvider {

    private ws: WebSocket;
    private config: IWebSocketProviderConfig;

    constructor(config: IWebSocketProviderConfig) {
        this.config = config;

        this.ws = new WebSocket("ws://" + getHost()+ "/socket");
        this.ws.onopen = this.onOpen as any; 
        this.ws.onmessage = this.onMessage as any;
        this.ws.onclose = this.onClose as any;
        this.ws.onerror = this.onError as any;  
    }

    private onOpen = (_e: Event) => {
        this.config.onOpen();    
    }

    private onMessage = (m: MessageEvent) => {
        this.config.onReceive(m.data);
    } 

    public onSend(data) {
        this.ws.send(data);
    }

    private onClose= (ws: WebSocket) => {
        console.log("onClose: ", ws);
    } 

    private onError = (ws: WebSocket) => {
        console.log("onError: ", ws);
    } 

    public destroy() {
        if(this.ws == null) {
            return
        }

        this.ws.close();
    }

}
