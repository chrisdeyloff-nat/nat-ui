const buildFailureReason = (error) => {
  let result = '';
  if ( error.response === undefined){
    result = error.message;
  }
  else if ( error.response.status === 404 ){
    result = `${error.message}. Please contact <strong>serc_systems@serc1.org</strong> for assistance.`;
  }
  else if (!!error.response.data
    && !!error.response.data.failureReason) {
    result = error.response.data.failureReason;
  }
  else if (!!error.response.data
    && !!error.response.data.FailureReason) {
    result = error.response.data.FailureReason;
  }
  else {
    result = "Something went wrong. Please try again.\n If problem persists, please contact <strong>serc_systems@serc1.org</strong> for assistance.";
  }
  return result;
}

const returnedStatusCode = (error) => {
  if (!!error.response) {
    return error.response.status;
  }

  return 503;
}

const returnedFailureCode = (error) => {
  if (!!!error.response) {
    return 0;
  }
  
  return error.response.data.failureCode;
}

const returnedPayload = (error) => {

  if (!error.response) return ''; // no response received

  if (error.response.status === 422) {
    return JSON.parse(error.response.data.Payload);
  }

  if (!!error.response && !!error.response.data) {
    return error.response.data;
  }

  if (!!error.response) {
    return error.response;
  }

  return error;
}

const buildErrorResponse = (error) => { return {
  statusCode: returnedStatusCode(error),
  failureReason: buildFailureReason(error),
  failureCode: returnedFailureCode(error),
  payload: returnedPayload(error),
  isSuccess: false,
}}

export const callAPI = async (func, thunkAPI) => {
  return await func()
    .catch( (err) => {
      const errorResponse = buildErrorResponse(err);
      return thunkAPI.rejectWithValue(errorResponse);
    })
}