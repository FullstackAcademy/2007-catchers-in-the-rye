import axios from 'axios';
import { FETCH_CATEGORIES } from '../actionStrings';

const _fetchCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  categories,
});

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get('/api/categories');
  dispatch(_fetchCategories(response.data));
};
