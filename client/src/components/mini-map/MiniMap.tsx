import * as React from "react";

import { TMap, setCanvasSize, drawMap } from "../../shared/utils/MapUtils";
import { IEntityState } from '../../reducers/EntityReducer';

export interface IMiniMapProps {
	entities: IEntityState; 
	data: TMap;
}

export class MiniMap extends React.Component <IMiniMapProps, {}>{
  private mapCanvasRef: HTMLCanvasElement | null = null;

	public componentWillReceiveProps(nextProps) {
		this.handleMapData(nextProps.data);
	}

  private handleMapData(data: TMap) {
		const canvas = this.mapCanvasRef!;
    setCanvasSize(canvas, data);
		drawMap(canvas, data);
  }

  public render() {
    return (
      <div className="mini-map-wrapper">
        <canvas ref={r => (this.mapCanvasRef = r)} />
      </div>
    );
  }
}
