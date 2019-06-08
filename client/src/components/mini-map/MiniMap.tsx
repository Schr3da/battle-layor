import * as React from "react";

import { IEntityState } from "../../reducers/EntityReducer";
import {
  TMap,
  setCanvasSize,
  drawMap,
  clearCanvas,
  drawEntities
} from "../../shared/utils/MapUtils";

import "./MiniMap.less";

export interface IMiniMapProps {
  entities: IEntityState;
  data: TMap | null;
}

export class MiniMap extends React.Component<IMiniMapProps, {}> {
  private mapCanvasRef: HTMLCanvasElement | null = null;
  private entityCanvasRef: HTMLCanvasElement | null = null;

  public componentWillReceiveProps(nextProps: IMiniMapProps) {
    if (this.props.data != nextProps.data) {
      this.handleMapData(nextProps.data);
    }

    if (this.props.entities.player != nextProps.entities.player) {
      this.handleEntityData(nextProps.entities, nextProps.data);
    }
  }

  private handleMapData(data: TMap | null) {
    if (data == null) {
      clearCanvas(this.mapCanvasRef);
      return;
    }

    const canvas = this.mapCanvasRef!;
    setCanvasSize(canvas, data);
    drawMap(canvas, data);
  }

  private handleEntityData(entities: IEntityState, map: TMap | null) {
    if (map == null) {
      clearCanvas(this.entityCanvasRef);
      return;
    }

    const canvas = this.entityCanvasRef!;
    setCanvasSize(canvas, map);
    drawEntities(canvas, entities);
  }

  public render() {
    return (
      <div className="mini-map-wrapper" key="mini-map-wrapper">
        <canvas className="world-layer" ref={r => (this.mapCanvasRef = r)} />
        <canvas
          className="player-layer"
          ref={r => (this.entityCanvasRef = r)}
        />
      </div>
    );
  }
}
