import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import categoryReducer from './categories';
import singleCategoryReducer from './singleCategory'
import { costumesReducer, sCostumeReducer } from "./reducers/costumesReducer";



const appReducer = combineReducers({
  categories: categoryReducer,
  selectedCategory: singleCategoryReducer,
  costumes: costumesReducer,
  sCostume: sCostumeReducer
});

let middleware = [
  thunkMiddleware.withExtraArgument({ axios })
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
)
