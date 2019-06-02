import { connect } from "react-redux";

import { IStore } from "../../stores/Store";
import { GameWrapper } from "./GameWrapper";
import { createGameInstance } from "../../actions/GameActions";

const mapStateToProps = (_state: IStore) => ({});

const mapDispatchToProps = (dispatch: Function) => ({
  createGameInstance: (wrapper: Element) =>
    dispatch(createGameInstance(wrapper)),
  resizeGame: () => console.log("resize"),
  destroyGameInstance: () => console.log("destroy")
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);
