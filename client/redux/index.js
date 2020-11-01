import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import allCategoriesReducer from './categories/allCategories';
import singleCategoryReducer from './categories/singleCategory';
import allCostumesReducer from './costumes/allCostumes';
import singleCostumeReducer from './costumes/singleCostume';
import cartReducer from './cart/cart';
import sessionReducer from './authentication/session';
import userReducer from './authentication/user';

const appReducer = combineReducers({
  categories: allCategoriesReducer,
  selectedCategory: singleCategoryReducer,
  costumes: allCostumesReducer,
  sCostume: singleCostumeReducer,
  cart: cartReducer,
  session: sessionReducer,
  user: userReducer,
});

const middleware = [
  thunkMiddleware.withExtraArgument({ axios }),
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware),
);
