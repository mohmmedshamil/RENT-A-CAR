import * as types from './CarListingTypes'
import * as actions from './CarListingAction'
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CarSvc from '../../Services/CarSvc'

export function* CarListingSaga(payload) {
    try {
        const response = yield call(CarSvc.addCarListing, payload.payload);
        // toast.info(response.message, {
        //     position: toast.POSITION.TOP_RIGHT
        // });
        console.log(response.message)
        yield put(actions.insertCarListingSuccess(payload.payload))

    } catch (err) {
        // toast.error(err.message?err.message:"Error while processing the request",{
        //     position: toast.POSITION.TOP_RIGHT
        // });
        console.log(err.message)

    }
}



export function* GETCarListingSaga() {
    try {
        const response = yield call(CarSvc.getCarListing);
        // alert(response)
        console.log(response)
        yield put(actions.GETCarListingSuccess(response))
    } catch (err) {
        console.info(err)
    }
}

export function* GETCarListingwithcollectionSaga(payload) {
    try {
        const response = yield call(CarSvc.getCarListingwithcollection,payload.payload);
        // alert(response)
        console.log(response)
        yield put(actions.GETCarListingCollectionSuccess(response))
    } catch (err) {
        console.info(err)
    }
}

export function* GETCarListingwithIdSaga(payload) {
    try {
        const response = yield call(CarSvc.getCarListingwithid,payload.payload);
        // alert(response)
        console.log(response)
        yield put(actions.GETCarListingIdSuccess(response))
    } catch (err) {
        console.info(err)
    }
}


export function* clsWatcher() {
    yield takeLatest(types.ADD, CarListingSaga);
    yield takeLatest(types.GET,GETCarListingSaga );
    yield takeLatest(types.GET_COLLECTION,GETCarListingwithcollectionSaga );
    yield takeLatest(types.GET_ID,GETCarListingwithIdSaga );

}
