import * as React from "react";

import { getGlobalState } from "../../stores/AppState";
import {
  registerNewPlayer,
  unregisterPlayer
} from "../../providers/RestProvider";
import { Input } from "../../shared/input-field/Input";
import { InputField, InputFields } from '../../reducers/UIReducer';
import { getInputValue } from '../../shared/utils/InputUtils';

export interface ILoginProps {
	inputs: InputFields;
	onInputChange: (key: string, value: string) => void;
	onRegister: () => void;
	onUnregister: () => void;
}

export class Login extends React.Component<ILoginProps, {}> {
  private handleInputKeyUp = (e: any, id: InputField) => {
    e.persist();

    if (e.keyCode === 13) {
      this.handleRegister();
      return;
    }

		this.props.onInputChange(id, e.target.value);
  };

	public  handleUnregister = async () => {
    const state = getGlobalState();
    await unregisterPlayer(state.getId());
    state.endGame();
  };

  public render() {
    const { inputs, onInputChange, onRegister, onUnregister } = this.props;
    
    return (
      <div className="ui-wrapper">
        <div>
          <Input
            id={InputField.PlayerName}
            className="playername"
            placeholder="Name"
            value={getInputValue(inputs, InputField.PlayerName)}
            onChange={(e, id) => onInputChange(id, e.target.value)}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
        <div>
          <button onClick={onRegister}>Register</button>
          <button onClick={onUnregister}>Unregister</button>
        </div>
      </div>
    );
  }
}
