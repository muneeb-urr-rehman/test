import ActionTypes from "../actions/actionTypes";

let initialState = {
  Users: [],
  paginateCount: 0,
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA:
      state = {
        ...state,
        Users: [...state.Users, ...action.payload.items],
        paginateCount: action.payload.total_count,
      };
      break;
      case ActionTypes.CLEAR_DATA:
        state = {
          ...state,
          Users: [],
          paginateCount: 0,
        };
        break;
    default:
      break;
  }
  return state;
};

export default AppReducer;
