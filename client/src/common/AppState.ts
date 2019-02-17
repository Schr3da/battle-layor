import { WebSocketProvider, IWebSocketProviderConfig } from "./WebSocketProvider";

export class AppState {
    
    private provider: WebSocketProvider | null = null;
    
    private getDefaultConfig = (): IWebSocketProviderConfig => ({
        onOpen: this.onConnectionOpened,
        onReceive: this.onMessageReceived,
    });
    
    private onConnectionOpened() {
        console.log("Open");
    }

    private onMessageReceived = (data: any) => {
        console.log("Data received", data);        
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
}
