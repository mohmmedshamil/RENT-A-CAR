import { API_END_POINTS } from "../Api/apiEndPoints"
import serviceBase from "../Api/servicebase"


export const addCarListing=(carObj) => {
   return serviceBase.post(API_END_POINTS.SERVICE.CARS+API_END_POINTS.ADD,carObj)
}

export const getCarListing=() => {
   return serviceBase.get(API_END_POINTS.SERVICE.CARS+API_END_POINTS.GETALL)
}

export const getCarListingwithcollection=(collection) => {
    return serviceBase.get(API_END_POINTS.SERVICE.CARS+API_END_POINTS.COLLECTION+`/${collection}`)
 }
export const getCarListingwithid=(id) => {
    return serviceBase.get(API_END_POINTS.SERVICE.CARS+API_END_POINTS.GETBYID+`/${id}`)
 }