import { InputFields } from "../../reducers/UIReducer";

export const getInputValue = (inputs: InputFields, key: string) => String(inputs[key] || "");

export const getNullableInputValue = (inputs: InputFields, key: string) => inputs[key] || null;



