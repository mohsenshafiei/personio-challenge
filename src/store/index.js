/* eslint-disable no-undef,no-underscore-dangle */
import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import hierarchyReducers from './hierarchy/reducers';
import mainReducers from './main/reducers';
import sagas from './sagas';

const reducers = combineReducers({
  main: mainReducers,
  hierarchy: hierarchyReducers,
});
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const middleware = applyMiddleware(logger, sagaMiddleware);
const enhancer = composeEnhancers(middleware);
const store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);
export default store;
