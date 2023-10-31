export const SET_CURRENT_STEP = "SET_CURRENT_STEP";
export const DO_NOT_DISPLAY = "DO_NOT_DISPLAY";
export const COLOR_CONTRAST = "COLOR_CONTRAST";

export const actionCreators = {
    setCurrentStep: (payload) => ({ type: SET_CURRENT_STEP, payload }),
    doNotDisplay: () =>({type: DO_NOT_DISPLAY}),
    setColorContrast:(payload) =>({
        type:COLOR_CONTRAST,
        payload
    })
};