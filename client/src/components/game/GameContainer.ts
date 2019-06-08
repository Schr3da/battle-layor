import { connect } from "react-redux";

import { IStore } from "../../stores/Store";
import { GameWrapper } from "./GameWrapper";
import {
  createGameInstance,
  destroyGameInstance
} from "../../actions/GameActions";
import { handleContentResize } from "../../actions/UIActions";

const mapStateToProps = ({ game }: IStore) => ({
  width: game.canvas.width,
  height: game.canvas.height
});

const mapDispatchToProps = (dispatch: Function) => ({
  createGameInstance: (wrapper: HTMLDivElement) =>
    dispatch(createGameInstance(wrapper)),
  resizeGame: (width: number, height: number) =>
    dispatch(handleContentResize(width, height)),
  destroyGameInstance: () => dispatch(destroyGameInstance())
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);
