import { SupportedKeys } from "../../../../reducers/ControlsReducer";
import { getStateOfStore, getStore } from "../../../../stores/Store";
import { canWalkOver } from "../../../../shared/utils/MapUtils";
import { updatePlayerWithData } from "../../../../actions/PlayerActions";

let prevDt: number = 0;
let nextDt: number = 0;

export const updatePlayer = () => {
  prevDt = nextDt;
  nextDt = performance.now();

  const dt = (nextDt - prevDt) / 1000,
    state = getStateOfStore();

  let {
      direction,
      plane,
      position,
      moveSpeed,
      rotSpeed,
      prevDirX,
      prevPlaneX
    } = {
      ...state.entities.player
    },
    map = state.map.data,
    controls = state.controls;

  if (map == null) {
    return;
  }

  moveSpeed = dt * 5;
  rotSpeed = dt * 3;

  const willUpdate = Object.keys(controls.activeKeys).some(
    k => controls.activeKeys[k] === true
  );

  if (willUpdate == false) {
    return;
  }

  let sendResult = false;

  if (controls.activeKeys[SupportedKeys.Up]) {
    const xValue =
      map[Math.floor(position.x + direction.x * moveSpeed * 4)][
        Math.floor(position.y)
      ];
    if (canWalkOver(xValue)) {
      sendResult = true;
      position.x += direction.x * moveSpeed;
    }

    const yValue =
      map[Math.floor(position.x)][
        Math.floor(position.y + direction.y * moveSpeed * 4)
      ];
    if (canWalkOver(yValue)) {
      sendResult = true;
      position.y += direction.y * moveSpeed;
    }
  }

  if (controls.activeKeys[SupportedKeys.Down]) {
    const xValue =
      map[Math.floor(position.x - direction.x * moveSpeed * 4)][
        Math.floor(position.y)
      ];
    if (canWalkOver(xValue)) {
      sendResult = true;
      position.x -= direction.x * moveSpeed;
    }

    const yValue =
      map[Math.floor(position.x)][
        Math.floor(position.y - direction.y * moveSpeed * 4)
      ];
    if (canWalkOver(yValue)) {
      sendResult = true;
      position.y -= direction.y * moveSpeed;
    }
  }

  if (controls.activeKeys[SupportedKeys.Right]) {
    prevDirX = direction.x;
    direction.x =
      direction.x * Math.cos(-rotSpeed) - direction.y * Math.sin(-rotSpeed);
    direction.y =
      prevDirX * Math.sin(-rotSpeed) + direction.y * Math.cos(-rotSpeed);
    prevPlaneX = plane.x;
    plane.x = plane.x * Math.cos(-rotSpeed) - plane.y * Math.sin(-rotSpeed);
    plane.y = prevPlaneX * Math.sin(-rotSpeed) + plane.y * Math.cos(-rotSpeed);
  }

  if (controls.activeKeys[SupportedKeys.Left]) {
    prevDirX = direction.x;
    direction.x =
      direction.x * Math.cos(rotSpeed) - direction.y * Math.sin(rotSpeed);
    direction.y =
      prevDirX * Math.sin(rotSpeed) + direction.y * Math.cos(rotSpeed);
    prevPlaneX = plane.x;
    plane.x = plane.x * Math.cos(rotSpeed) - plane.y * Math.sin(rotSpeed);
    plane.y = prevPlaneX * Math.sin(rotSpeed) + plane.y * Math.cos(rotSpeed);
  }

  const store = getStore();
  if (store == null) {
    return;
  }

  store.dispatch(
    updatePlayerWithData(
      position,
      direction,
      plane,
      prevDirX,
      prevPlaneX,
      sendResult
    )
  );
};
