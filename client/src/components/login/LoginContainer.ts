import { connect } from "react-redux";
import { Login } from "./Login";
import { IStore } from "../../stores/Store";
import {
  handleInputChange,
  handleRegister,
  handleUnregister
} from "../../actions/UIActions";

const mapStateTopProps = (state: IStore) => {
  console.log(state);

  return {
    hasLoggedIn:
      state.entities.player.id != null && state.entities.player.pseudoID,
    inputs: state.ui.inputs
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  onInputChange: (key: string, value: string) =>
    dispatch(handleInputChange(key, value)),
  onRegister: () => dispatch(handleRegister()),
  onUnregister: () => dispatch(handleUnregister())
});

export const LoginContainer = connect(
  mapStateTopProps,
  mapDispatchToProps
)(Login);
