import axios from 'axios';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const _fetchCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  categories,
});

export const fetchCategories = () => async (dispatch) => {
  const { data } = await axios.get('/api/categories');
  dispatch(_fetchCategories(data));
};

export default function allCategoriesReducer(state = [], action) {
  if (action.type === FETCH_CATEGORIES) {
    state = action.categories;
  }
  return state;
}
