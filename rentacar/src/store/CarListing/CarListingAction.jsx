import * as types from './CarListingTypes';

export const addCarListing = (payload) => {

  return {
  type: types.ADD, 
  payload
  };
};


export const insertCarListingSuccess = (payload) => {
  return {
  type: types.ADD_SUCCESS, 
  payload
  };
};

export const GETCarListing = (payload) => {
  return {
  type: types.GET, 
  payload
  };
};


export const GETCarListingSuccess = (payload) => {
  return {
  type: types.GET_SUCCESS, 
  payload
  };
};
export const GETCarListingCollection = (payload) => {
  return {
  type: types.GET_COLLECTION, 
  payload
  };
};


export const GETCarListingCollectionSuccess = (payload) => {
  return {
  type: types.GET_COLLECTION_SUCCESS, 
  payload
  };
};
export const GETCarListingId = (payload) => {
  return {
  type: types.GET_ID, 
  payload
  };
};


export const GETCarListingIdSuccess = (payload) => {
  return {
  type: types.GET_ID_SUCCESS, 
  payload
  };
};
