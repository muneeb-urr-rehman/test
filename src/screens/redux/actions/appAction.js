import ActionTypes from "./actionTypes";

const getData = (payload) => {

  return {
    type: ActionTypes.GET_DATA,
    payload,
  };
};


const clearData = (payload) => {

  return {
    type: ActionTypes.CLEAR_DATA,
  };
};

export { getData,clearData };
