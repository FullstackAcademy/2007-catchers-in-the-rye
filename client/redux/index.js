import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import categoryReducer from './categories';
import singleCategoryReducer from './singleCategory'

const appReducer = combineReducers({
  categories: categoryReducer,
  selectedCategory: singleCategoryReducer
});

let middleware = [
    thunkMiddleware.withExtraArgument({ axios })
];

export default createStore(
    appReducer,
    applyMiddleware(...middleware)
)
