import * as React from "react";

import { appendClassNames } from "./Utils";

export interface IInputProps<T> {
    id: T;
    value: string
    className: string;
    placeholder: string;
    onChange: (e: any, id: T) => void;
    onKeyUp: (e: any, id: T) => void;
}

export const Input = <T extends {}>(props: IInputProps<T>) => { 
    const { id, className, placeholder, onChange, onKeyUp, value  } = props;
    return <input className={appendClassNames("input", className)} 
        value={value}
        placeholder={placeholder} 
        onKeyUp={(e) => onKeyUp(e, id)}
        onChange={(e) => onChange(e, id)}
    />;
}
