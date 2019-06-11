import { connect } from "react-redux";

import { IStore } from "../../stores/Store";
import { GameWrapper } from "./GameWrapper";
import { handleContentResize } from "../../actions/UIActions";
import {
  createGameInstance,
  destroyGameInstance
} from "../../actions/GameActions";

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
