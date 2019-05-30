import { isMobile } from "../shared/utils/BrowserUtils";

export interface UIState {
  isMobile: boolean;
}

const initialState = {
  isMobile: isMobile()
};

export const uiReducer = (state = initialState, action: any) => {
  switch (action) {
    default:
      return state;
  }
};
