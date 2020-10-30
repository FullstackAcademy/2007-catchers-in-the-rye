import { FETCH_CATEGORIES } from '../actionStrings';

export default function categoryReducer(state = [], action) {
  if (action.type === FETCH_CATEGORIES) {
    state = action.categories;
  }
  return state;
}
