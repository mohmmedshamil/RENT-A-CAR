
 import { fork, all } from "redux-saga/effects";
import { clsWatcher } from "../CarListing/CarListingSaga";

export function* watchSagas() {

  yield all([ 
    clsWatcher()
              
            ]);
  // OR
  // yield all([fork(FeatureSaga1)]);
}
