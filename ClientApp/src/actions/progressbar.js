export const SET_CURRENT_STEP = "SET_CURRENT_STEP";
export const DO_NOT_DISPLAY = "DO_NOT_DISPLAY";

export const actionCreators = {
    setCurrentStep: (payload) => ({ type: SET_CURRENT_STEP, payload }),
    doNotDisplay: () =>({type: DO_NOT_DISPLAY})
};