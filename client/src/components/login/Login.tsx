import * as React from "react";

import { Input } from "../../shared/input-field/Input";
import { InputField, InputFields } from "../../reducers/UIReducer";
import { getInputValue } from "../../shared/utils/InputUtils";

import "./Login.less";

export interface ILoginProps {
  hasLoggedIn: boolean;
  inputs: InputFields;
  onInputChange: (key: string, value: string) => void;
  onRegister: () => void;
  onUnregister: () => void;
}

export class Login extends React.Component<ILoginProps, {}> {
  private handleInputKeyUp = (e: any, id: InputField) => {
    if (e.keyCode === 13) {
      this.props.onRegister();
      return;
    }
    this.props.onInputChange(id, e.target.value);
  };

  public render() {
    const {
      hasLoggedIn,
      inputs,
      onInputChange,
      onRegister,
      onUnregister
    } = this.props;

    return (
      <div className={`login ${hasLoggedIn ? "hide" : "show"}`}>
        <div className="form-wrapper">
          <div className="input-label">Enter Player name to join</div>
          <Input
            id={InputField.PlayerName}
            className="playername"
            placeholder="Name"
            value={getInputValue(inputs, InputField.PlayerName)}
            onChange={(e, id) => onInputChange(id, e.target.value)}
            onKeyUp={this.handleInputKeyUp}
          />
          <button onClick={onRegister}>Register</button>
          <button onClick={onUnregister}>Unregister</button>
        </div>
      </div>
    );
  }
}
