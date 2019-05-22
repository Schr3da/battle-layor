import * as React from "react";

import { getGlobalState } from "../../stores/AppState";
import {
  registerNewPlayer,
  unregisterPlayer
} from "../../providers/RestProvider";
import { Input } from "../../shared/input-field/Input";

export interface ILoginProps {}

export interface ILoginState {
  inputs: { [id in InputField]: string };
}

export enum InputField {
  PlayerName = "player"
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      inputs: {
        player: ""
      }
    };
  }

  private handleInputKeyUp = (e: any, id: InputField) => {
    e.persist();

    if (e.keyCode === 13) {
      this.handleRegister();
      return;
    }

    this.handleInputChange(e, id);
  };

  private handleInputChange = (e: any, id: InputField) => {
    e.persist();
    this.setState(prev => ({
      ...prev,
      inputs: { ...prev.inputs, [id]: e.target.value }
    }));
  };

  private handleRegister = async () => {
    const value = this.state.inputs[InputField.PlayerName];
    if (value == null || value.trim().length === 0) {
      return;
    }

    const d = await registerNewPlayer(value);
    if (d == null) {
      return;
    }

    const state = getGlobalState();
    state.setIds(d.data.id, d.data.pseudoId);
    state.newGame();
  };

  private handleUnregister = async () => {
    const state = getGlobalState();
    await unregisterPlayer(state.getId());
    state.endGame();
  };

  public render() {
    const { inputs } = this.state;
    return (
      <div className="ui-wrapper">
        <div>
          <Input
            id={InputField.PlayerName}
            className="playername"
            placeholder="Name"
            value={inputs[InputField.PlayerName]}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
        <div>
          <button onClick={this.handleRegister}>Register</button>
          <button onClick={this.handleUnregister}>Unregister</button>
        </div>
      </div>
    );
  }
}
