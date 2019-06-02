import { connect } from "react-redux";

import { IStore } from "../../stores/Store";
import { GameWrapper } from "./GameWrapper";
import {
  createGameInstance,
  destroyGameInstance
} from "../../actions/GameActions";

const mapStateToProps = (_state: IStore) => ({});

const mapDispatchToProps = (dispatch: Function) => ({
  createGameInstance: (wrapper: Element) =>
    dispatch(createGameInstance(wrapper)),
  resizeGame: () => console.log("resize"),
  destroyGameInstance: () => dispatch(destroyGameInstance())
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);
