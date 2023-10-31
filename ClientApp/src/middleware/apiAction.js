export function apiAction({
    path = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    headersOverride = null,
    currentAction=()=>{}
  }) {
    return {
      type: "API",
      payload: {
        path,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headersOverride,
        currentAction
      }
    };
  }