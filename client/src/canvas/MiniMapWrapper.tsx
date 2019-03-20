import * as React from "react";
import { getGlobalState } from "./../common/AppState";
import { WSResource, WSAction } from "./../common/WebSocketProvider";

export class MiniMapWrapper extends React.Component {
   
    private canvasRef: HTMLCanvasElement | null = null;

    private onReceivedData = (data: any) => {
        if (data == null || data.action !== WSAction.GAME || data.resource !== WSResource.MAP) {
            return null;
        }
        
        this.redraw(); 
    }

    private redraw() {
        if (this.canvasRef == null) {
            return
        }

        console.log("add drawing code here");
    }

    public componentDidMount() {
        const state = getGlobalState();
        state.registerReceived(WSAction.GAME, this.onReceivedData); 
    }
 
    public render() {
        console.log(getGlobalState())
        return <div className="mini-map-wrapper" >
            <canvas ref={(r) => this.canvasRef = r}></canvas>
        </div>
    }

}
