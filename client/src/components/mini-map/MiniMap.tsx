import * as React from "react";

import { TMap, setCanvasSize, drawMap } from "../../shared/utils/MapUtils";
import { IEntityState } from "../../reducers/EntityReducer";

export interface IMiniMapProps {
  entities: IEntityState;
  data: TMap | null;
}

export class MiniMap extends React.Component<IMiniMapProps, {}> {
  private mapCanvasRef: HTMLCanvasElement | null = null;

  public componentWillReceiveProps(nextProps) {
    this.handleMapData(nextProps.data);
  }

  private handleMapData(data: TMap) {
    if (data == null) {
      return;
    }

    const canvas = this.mapCanvasRef!;
    setCanvasSize(canvas, data);
    drawMap(canvas, data);
  }

  public render() {
    return (
      <div className="mini-map-wrapper">
        <canvas key="mini-map-canvas" ref={r => (this.mapCanvasRef = r)} />
      </div>
    );
  }
}
