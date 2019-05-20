import * as React from "react";

import { TMap, receivedMapData, canWalkOver } from "../../shared/utils/MapUtils";
import { getGlobalState } from "../../stores/AppState";
import { WSAction, IWSResponse } from "../../providers/WebSocketProvider";

export class MiniMap extends React.Component {
   
    private canvasRef: HTMLCanvasElement | null = null;

    private onReceivedData = (data: IWSResponse<any>) => {
        if (receivedMapData(data) === false) {    
            return;
        }
      	this.redraw(data.data); 
    }

    private redraw(data: TMap) {
        if (this.canvasRef == null ) {
            return
        }
        const context = this.canvasRef.getContext('2d') as CanvasRenderingContext2D;    
        const size = 2;

        (data || []).forEach((d, y) => {
            (d || []).forEach((v, x) => { 
                const color = canWalkOver(v) ? "transparent" : "gray",
                offsetX = x * size,
                offsetY = y * size;

                context.fillStyle = color;
                context.fillRect(offsetX, offsetY, size, size);
                context.fill();
            });
        });
    }

    public componentDidMount() {
        const state = getGlobalState();
        state.registerReceived(WSAction.GAME, this.onReceivedData); 
    }
 
    public render() {
        return <div className="mini-map-wrapper" >
            <canvas ref={(r) => this.canvasRef = r}></canvas>
        </div>
    }

}
