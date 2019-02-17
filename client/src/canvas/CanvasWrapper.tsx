import * as React from "react";

import { Game } from "./Game";
import { getGlobalState } from "../common/AppState";
import { SocketDataAction } from "./../common/WebSocketProvider";

export class CanvasWrapper extends React.Component<{}, {}> {

    private wrapperRef: Element | null = null;
    private game: Game | null = null;

    private onConnectionOpened = () => {
        if (this.game != null) {
            this.game.start();
        }
    }

    private onReceivedData = (data: any) => {
        if (this.game != null) {
            this.game.receivedData(data);
        }        
    }

    public componentDidMount() {
        this.game = new Game(this.wrapperRef!);
        
        const state = getGlobalState();
        state.registerOpened(SocketDataAction.GAME, this.onConnectionOpened);
        state.registerReceived(SocketDataAction.GAME, this.onReceivedData);
    }

    public render() {
        return <div ref={(r) => this.wrapperRef = r} className="canvas-wrapper"></div>
    }

}
