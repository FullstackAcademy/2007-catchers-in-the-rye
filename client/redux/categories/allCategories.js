import axios from 'axios';

const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const _loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories,
});

export const fetchCategories = () => async (dispatch) => {
  try {
  const { data } = await axios.get('/api/categories');
  dispatch(_loadCategories(data));
  } catch (err) {
    console.error(err)
  }
};

export default function allCategoriesReducer (state = [], action) {
  if (action.type === LOAD_CATEGORIES) {
    state = [...action.categories];
  }
  return state;
};
