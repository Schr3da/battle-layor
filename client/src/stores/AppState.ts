import { WebSocketProvider, IWebSocketProviderConfig, IWSRequest, IWSResponse, OnReceiveCb, OnOpenCb, WSAction, WSResource } from "../providers/WebSocketProvider";
import { IVector2d } from "../shared/vector/Vector2d";

export interface IonOpenedObserverCb {
    [WSAction.UI]: OnOpenCb[];
    [WSAction.GAME]: OnOpenCb[];
}

export interface IonReceivedObserverCb {
    [WSAction.UI]: OnReceiveCb[];
    [WSAction.GAME]: OnReceiveCb[];
}

class GlobalState {

    private id: string | null = null;

    private provider: WebSocketProvider | null = null;

    private socketOpenedCb: IonOpenedObserverCb = {
        [WSAction.UI]: [],
        [WSAction.GAME]: [],
    };

    private socketDataReceivedCb: IonReceivedObserverCb = {
        [WSAction.UI]: [],
        [WSAction.GAME]: [],
    };

    private getDefaultConfig = (): IWebSocketProviderConfig => ({
        id: this.getId(),
        onOpen: this.onSocketOpened,
        onReceive: this.onSocketDataReceived,
    });

    private onSocketOpened = () => {
        //Request map data
        this.sendData({resource: WSResource.MAP, action: WSAction.GAME, data: []});   

        this.socketOpenedCb[WSAction.UI].forEach((cb) => cb()); 
        this.socketOpenedCb[WSAction.GAME].forEach((cb) => cb());     
    }

		public onSendPlayerData = (direction: IVector2d, plane: IVector2d, position: IVector2d) => {
			this.sendData({
				resource: WSResource.PLAYER,
				action: WSAction.GAME,
				data: { position, direction, plane },
			})
		}

    private onSocketDataReceived = <T>(data: IWSResponse<T>) => {
        if (data == null || data.action == null) {
            return;
        }
        this.socketDataReceivedCb[data.action].forEach((cb) => cb(data))
    }

    public setId(id: string | null) {
        this.id = id;
    }

    public getId(): string | null {
        return this.id;
    }

    public registerOpened(type: WSAction, cb: OnOpenCb) {
      this.socketOpenedCb[type].push(cb);
    }

    public registerReceived(type: WSAction, cb: OnReceiveCb) {
        this.socketDataReceivedCb[type].push(cb);
    }

    public sendData<T>(data: IWSRequest<T>) {
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
 
		public endGame() {
			if (this.provider != null) {
				this.provider.destroy();
			}
			this.setId(null)
		}

    public destroy() {
        this.socketOpenedCb[WSAction.UI] = [];
        this.socketOpenedCb[WSAction.GAME] = [];
        this.socketDataReceivedCb[WSAction.UI] = [];
        this.socketDataReceivedCb[WSAction.GAME] = [];

      	if(this.provider != null) {
            this.provider.destroy();
            this.provider = null;
        }
    }
   
}

export const getGlobalState = () => {
    if ((window as any).state == null) {
        (window as any).state = new GlobalState();
    }
    return (window as any).state as GlobalState;
}
