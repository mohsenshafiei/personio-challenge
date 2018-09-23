import { all } from 'redux-saga/effects';
import hierarchySaga from './hierarchy/saga';

function* sagas() {
  yield all([
    ...hierarchySaga,
  ]);
}

export default sagas;
