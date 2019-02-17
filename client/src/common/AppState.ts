import { WebSocketProvider, IWebSocketProviderConfig, IWebSocketData, OnReceiveCb, OnOpenCb, SocketDataAction } from "./WebSocketProvider";

export interface IonOpenedObserverCb {
    [SocketDataAction.UI]: OnOpenCb[];
    [SocketDataAction.GAME]: OnOpenCb[];
}

export interface IonReceivedObserverCb {
    [SocketDataAction.UI]: OnReceiveCb[];
    [SocketDataAction.GAME]: OnReceiveCb[];
}

class GlobalState {

    private id: string | null = null;

    private provider: WebSocketProvider | null = null;
    
    private socketOpenedCb: IonOpenedObserverCb = {
        [SocketDataAction.UI]: [],
        [SocketDataAction.GAME]: [],
    };

    private socketDataReceivedCb: IonReceivedObserverCb = {
        [SocketDataAction.UI]: [],
        [SocketDataAction.GAME]: [],
    };

    private getDefaultConfig = (): IWebSocketProviderConfig => ({
        onOpen: this.onSocketOpened,
        onReceive: this.onSocketDataReceived,
    });

    private onSocketOpened() {
        this.socketOpenedCb[SocketDataAction.UI].forEach((cb) => cb()); 
        this.socketOpenedCb[SocketDataAction.GAME].forEach((cb) => cb());     
    }

    public setId(id: string) {
        this.id = id;
    }

    public getId(): string | null {
        return this.id;
    }

    private onSocketDataReceived = <T>(data: IWebSocketData<T>) => {
        if (data == null || data.action == null) {
            return;
        }
        this.socketDataReceivedCb[data.action].forEach((cb) => cb(data))
    }

    public registerOpened(type: SocketDataAction, cb: OnOpenCb) {
        this.socketOpenedCb[type].push(cb);
    }

    public registerReceived(type: SocketDataAction, cb: OnReceiveCb) {
        this.socketDataReceivedCb[type].push(cb);
    }

    public onSendMessage<T>(data: T) {
        if (this.provider == null) {
            console.error("Connection has been closed");
            return;
        }
        this.provider.onSend(data);
    }

    public newGame() {
        if (this.provider != null) {
            this.provider.destroy();
            this.provider = null;
        }

        const config = this.getDefaultConfig();
        this.provider = new WebSocketProvider(config);
    }
    
    public destroy() {
        this.socketOpenedCb[SocketDataAction.UI] = [];
        this.socketOpenedCb[SocketDataAction.GAME] = [];
        this.socketDataReceivedCb[SocketDataAction.UI] = [];
        this.socketDataReceivedCb[SocketDataAction.GAME] = [];
    }
   
}

let state: GlobalState;
export const getGlobalState = () => {
    if (state == null) {
        state = new GlobalState();
    }
    return state;
}
