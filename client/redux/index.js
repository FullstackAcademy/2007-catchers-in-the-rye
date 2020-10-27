import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import categoryReducer from './categories';
import singleCategoryReducer from './singleCategory'
import costumesReducer from "./reducers/costumesReducer";
import cartReducer from './cart'


const appReducer = combineReducers({
  categories: categoryReducer,
  selectedCategory: singleCategoryReducer,
  costumes: costumesReducer,
  cart: cartReducer
});

let middleware = [
  thunkMiddleware.withExtraArgument({ axios })
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
)
