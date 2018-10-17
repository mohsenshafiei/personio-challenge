import { all } from 'redux-saga/effects';
import hierarchySaga from './hierarchy/saga';
import mainSaga from './main/saga';

function* sagas() {
  yield all([...hierarchySaga, ...mainSaga]);
}

export default sagas;
