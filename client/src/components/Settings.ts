interface IGameSettings {
  background: number;
  tint: number | null;
  fps: number;
  resolution: number;
  refreshTime: number;
  displayWidth: number;
  displayHeight: number;
  texWidth: number;
  texHeight: number;
}

export const GameSettings: IGameSettings = {
  background: 0xffffff,
  tint: null,
  fps: 60,
  resolution: 640 / 10,
  refreshTime: 1000 / 60,
  displayWidth: 640,
  displayHeight: 480,
  texWidth: 64,
  texHeight: 64
};

interface IMapSettings {
  resolution: number;
  background: string;
  foreground: string;
  drawOffsetX: number;
  drawOffsetY: number;
}

export const MapSettings: IMapSettings = {
  resolution: 2,
  background: "transparent",
  foreground: "gray",
  drawOffsetX: 2,
  drawOffsetY: 2
};
