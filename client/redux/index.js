import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import categoryReducer from './category';

const appReducer = combineReducers({
  categories: categoryReducer,
});

let middleware = [
    thunkMiddleware.withExtraArgument({ axios })
];

export default createStore(
    appReducer,
    applyMiddleware(...middleware)
)
