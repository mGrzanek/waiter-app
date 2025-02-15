import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import tablesReducer from './tablesReducer';
import statusReducer from './statusReducer';
import initialState from './initialState';

const subreducers = {
    tables: tablesReducer,
    status: statusReducer
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;