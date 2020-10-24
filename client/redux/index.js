import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import categoryReducer from './categories';
import singleCategoryReducer from './singleCategory'
import costumesReducer from "./reducers/costumesReducer";


const appReducer = combineReducers({
  categories: categoryReducer,
  selectedCategory: singleCategoryReducer,
  costumes: costumesReducer
});

let middleware = [
  thunkMiddleware.withExtraArgument({ axios })
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
)
