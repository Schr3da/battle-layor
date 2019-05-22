import * as React from "react";

import {
  TMap,
  receivedMapData,
  canWalkOver,
  hasValidMapData
} from "../../shared/utils/MapUtils";
import { getGlobalState } from "../../stores/AppState";
import { WSAction, IWSResponse } from "../../providers/WebSocketProvider";
import { MapSettings } from "../Settings";

interface IMapDrawerConfig {
  data: TMap;
  resolution: number;
  background: string;
  foreground: string;
}

const drawMap = (
  context: CanvasRenderingContext2D,
  config: IMapDrawerConfig
) => {
  const { data, resolution, background, foreground } = config;

  context.translate(MapSettings.drawOffsetX, MapSettings.drawOffsetY);

  (data || []).forEach((d, y) => {
    (d || []).forEach((v, x) => {
      const color = canWalkOver(v) ? background : foreground,
        offsetX = x * resolution,
        offsetY = y * resolution;

      context.fillStyle = color;
      context.fillRect(offsetX, offsetY, resolution, resolution);
      context.fill();
    });
  });
};

const setCanvasSize = (canvas: HTMLCanvasElement, data: TMap) => {
  if (canvas == null) {
    return;
  }

  if (hasValidMapData(data) === false) {
    return;
  }

  const height =
    data.length * MapSettings.resolution + MapSettings.drawOffsetY * 2;
  const width =
    data[0].length * MapSettings.resolution + MapSettings.drawOffsetX * 2;

  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");
};

export class MiniMap extends React.Component {
  private mapCanvasRef: HTMLCanvasElement | null = null;

  private onReceivedData = (data: IWSResponse<any>) => {
    if (data == null) {
      console.log("Unable to handle data", data);
      return;
    } else if (receivedMapData(data)) {
      this.handleMapData(data.data);
    }
  };

  private handleMapData(data: TMap) {
    if (this.mapCanvasRef == null) {
      return;
    }

    setCanvasSize(this.mapCanvasRef, data);

    const context = this.mapCanvasRef.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    drawMap(context, {
      data,
      resolution: MapSettings.resolution,
      background: MapSettings.background,
      foreground: MapSettings.foreground
    });
  }

  public componentDidMount() {
    const state = getGlobalState();
    state.registerReceived(WSAction.GAME, this.onReceivedData);
  }

  public render() {
    return (
      <div className="mini-map-wrapper">
        <canvas ref={r => (this.mapCanvasRef = r)} />
      </div>
    );
  }
}
