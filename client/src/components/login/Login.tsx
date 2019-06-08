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
    const { hasLoggedIn, inputs, onInputChange, onRegister } = this.props;

    return (
      <div className={`login ${hasLoggedIn ? "hide" : "show"}`}>
        <div className="logo">
          <div>Laboratory</div>
          <div className="logo-small-text">{"Run | Hunt | Survive"}</div>
        </div>
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

          <button className="join" onClick={onRegister}>
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="28px"
              height="28px"
              viewBox="0 0 612 612"
            >
              <g>
                <g id="_x36__30_">
                  <g>
                    <path
                      d="M331.685,425.378c-7.478,7.479-7.478,19.584,0,27.043c7.479,7.478,19.584,7.478,27.043,0l131.943-131.962
                    c3.979-3.979,5.681-9.276,5.412-14.479c0.269-5.221-1.434-10.499-5.412-14.477L358.728,159.56
                    c-7.459-7.478-19.584-7.478-27.043,0c-7.478,7.478-7.478,19.584,0,27.042l100.272,100.272H19.125C8.568,286.875,0,295.443,0,306
                    c0,10.557,8.568,19.125,19.125,19.125h412.832L331.685,425.378z M535.5,38.25H153c-42.247,0-76.5,34.253-76.5,76.5v76.5h38.25
                    v-76.5c0-21.114,17.117-38.25,38.25-38.25h382.5c21.133,0,38.25,17.136,38.25,38.25v382.5c0,21.114-17.117,38.25-38.25,38.25H153
                    c-21.133,0-38.25-17.117-38.25-38.25v-76.5H76.5v76.5c0,42.247,34.253,76.5,76.5,76.5h382.5c42.247,0,76.5-34.253,76.5-76.5
                    v-382.5C612,72.503,577.747,38.25,535.5,38.25z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
