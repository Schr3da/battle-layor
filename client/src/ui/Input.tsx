import * as React from "react";

import { appendClassNames } from "./Utils";

export interface IInputProps<T> {
    id: T;
    value: string | number;
    className: string;
    placeholder: string;
    onChange: (e: any, id: T) => void;
    onKeyDown: (e: any, id: T) => void;
}

export const Input = <T extends {}>(props: IInputProps<T>) => { 
    const { id, className, placeholder, value, onChange, onKeyDown } = props;
    
    return <input className={appendClassNames("input", className)} 
        value={value} 
        placeholder={placeholder} 
        onKeyDown={(e) => onKeyDown(e, id)}
        onChange={(e) => onChange(e, id)}
    />;
}
