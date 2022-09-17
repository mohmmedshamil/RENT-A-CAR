import * as types from "./CarListingTypes";

let initialState = {
  carList: [],
  carcolList:[],
  carObj:{}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SUCCESS:
      return {
        ...state,
        carList: action.payload,
      };
    case types.GET_FAILED:
      return {
        ...state,
      };
      case types.GET_COLLECTION_SUCCESS:
      return {
        ...state,
        carcolList: action.payload,
      };
    case types.GET_COLLECTION_FAILED:
      return {
        ...state,
      };
      case types.GET_ID_SUCCESS:
      return {
        ...state,
        carObj: action.payload,
      };
    case types.GET_ID_FAILED:
      return {
        ...state,
      };
      case types.ADD_SUCCESS:
        return {
          ...state,
          carList: [...state.carList,action.payload],
        };
    default:
      {
        return state;
      }
  }
};

