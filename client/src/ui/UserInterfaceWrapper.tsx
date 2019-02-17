import * as React from "react";

import { RegisterNewPlayer } from "./../common/RestProvider";
import { Input } from "./Input";

export interface IUserInterfaceWrapperProps {}

export interface IUserInterfaceWrapperState  {
    inputs: {[id in InputField]: string};
}

export enum InputField {
    PlayerName = "player"
}

export class UserInterfaceWrapper extends React.Component<IUserInterfaceWrapperProps, IUserInterfaceWrapperState> {

    constructor(props: IUserInterfaceWrapperProps) {
        super(props);
        this.state = {
            inputs: {
                player: "",
            },
        }
    }

    private handleInputKeyDown = (e: any) => {
        if (e.keyCode !== 13) {
            return;
        }
        this.handleRegister();
    }

    private handleInputChange = (e: any, id: InputField) => {
        e.persist()
        
        this.setState((prev) => ({...prev, 
            inputs: {...prev.inputs,
                [id]: e.target.value,
            },
        }));
    }

    private handleRegister = async () => {
        const value = this.state.inputs[InputField.PlayerName];
        if (value == null || value.trim().length === 0) {
            return;
        }
        await RegisterNewPlayer(value);        
    }

    public render() {
        const { inputs } = this.state;

        return <div className="ui-wrapper">
            <div>
               <Input id={InputField.PlayerName} 
                    className="playername" 
                    placeholder="Name" 
                    value={inputs[InputField.PlayerName]}
                    onChange={this.handleInputChange} 
                    onKeyDown={this.handleInputKeyDown}/> 
            </div>
            <div>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        </div> 
    }    

}
